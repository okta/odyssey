import styled from "@emotion/styled";
import { Collapse, IconButton as MuiIconButton, Stack } from "@mui/material";
import {
  Button,
  DesignTokens,
  Overline,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import { ChevronDownIcon, ChevronUpIcon } from "@okta/odyssey-react-mui/icons";
import {
  memo,
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { type ScanResult } from "./componentVisualizer.js";
import { UI_STRINGS } from "./constants.js";
import { ScannerButton } from "./ScannerButton.js";
import { readState, subscribeToChanges, writeState } from "./stateStorage.js";

export type ScannerConfig = {
  color: string;
  group: string;
  label: string;
  scanner: () => ScanResult[];
  scannerId: string;
  tooltip?: string;
};

type ScannerGroupProps = {
  discoveryResultsByScanner: Partial<Record<string, ScanResult[]>>;
  label: string;
  scannerConfigs: ScannerConfig[];
};

const OnOffIndicator = styled("span", {
  shouldForwardProp: (prop) =>
    prop !== "isAllActive" &&
    prop !== "odysseyDesignTokens" &&
    prop !== "isSomeActive",
})<{
  isAllActive: boolean;
  isSomeActive: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ isAllActive, odysseyDesignTokens, isSomeActive }) => {
  const statusColor = isSomeActive
    ? odysseyDesignTokens["PaletteSuccessMain"]
    : odysseyDesignTokens["PaletteNeutralMain"];
  const statusBorderStyle = isSomeActive && !isAllActive ? "dashed" : "solid";

  return {
    border: `1px ${statusBorderStyle}`,
    borderColor: statusColor,
    borderRadius: 1,
    color: statusColor,
    px: 1,
    py: 0.25,
    width: 40,
    textAlign: "center",
  };
});

const GroupButtonContainer = styled(Stack)(() => ({
  alignItems: "center",
  "& .MuiButton-root": {
    justifyContent: "space-between",
  },
}));

type ScannerButtonItemProps = {
  controlledResults: ScanResult[] | null;
  onToggleScanner: (scannerConfig: ScannerConfig) => void;
  scannerConfig: ScannerConfig;
};

const ScannerButtonItem = memo(
  ({
    scannerConfig,
    controlledResults,
    onToggleScanner,
  }: ScannerButtonItemProps) => {
    const onToggle = useCallback(
      () => onToggleScanner(scannerConfig),
      [onToggleScanner, scannerConfig],
    );

    return (
      <ScannerButton
        color={scannerConfig.color}
        controlledResults={controlledResults}
        label={scannerConfig.label}
        onToggle={onToggle}
        scanner={scannerConfig.scanner}
        scannerId={scannerConfig.scannerId}
        tooltip={scannerConfig.tooltip}
      />
    );
  },
);

export const ScannerGroup = ({
  scannerConfigs,
  discoveryResultsByScanner,
  label,
}: ScannerGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(() => {
    const stored = readState();
    return stored?.groupExpanded[label] ?? true;
  });

  const [childScannerStates, setChildScannerStates] = useState<
    Map<string, ScanResult[] | null>
  >(() => {
    const stored = readState();
    return new Map(
      scannerConfigs.map(({ scanner, scannerId }) => {
        if (stored?.scannerStates[scannerId] === false) {
          return [scannerId, null];
        }
        return [scannerId, discoveryResultsByScanner[scannerId] ?? scanner()];
      }),
    );
  });

  const odysseyDesignTokens = useOdysseyDesignTokens();

  useEffect(() => {
    const stored = readState();
    setChildScannerStates(
      (prev) =>
        new Map(
          scannerConfigs.map(({ scanner, scannerId }) => {
            const prevState = prev.get(scannerId);
            if (
              prevState === null ||
              stored?.scannerStates[scannerId] === false
            ) {
              // Scanner was turned off (locally or in storage) — keep it off
              return [scannerId, null] as const;
            }
            // New or active scanner — refresh its results
            const freshResults = discoveryResultsByScanner[scannerId];
            return [scannerId, freshResults ?? scanner()] as const;
          }),
        ),
    );
  }, [scannerConfigs, discoveryResultsByScanner]);

  // Persist scanner on/off states to storage
  useEffect(() => {
    const scannerStates: Record<string, boolean> = {};
    childScannerStates.forEach((value, key) => {
      scannerStates[key] = value !== null;
    });
    writeState({ scannerStates });
  }, [childScannerStates]);

  // Persist group expanded state to storage
  useEffect(() => {
    writeState({ groupExpanded: { [label]: isExpanded } });
  }, [isExpanded, label]);

  // Sync state from other tabs
  useEffect(() => {
    return subscribeToChanges((state) => {
      const storedExpanded = state.groupExpanded[label];
      if (storedExpanded !== undefined) {
        setIsExpanded(storedExpanded);
      }

      setChildScannerStates((previousScannerStatesMap) =>
        scannerConfigs
          .map(({ scanner, scannerId }) => ({
            scanner,
            scannerId,
            storedIsActive: state.scannerStates[scannerId],
            currentIsActive: previousScannerStatesMap.get(scannerId) !== null,
          }))
          .filter(
            ({ storedIsActive, currentIsActive }) =>
              storedIsActive !== undefined &&
              storedIsActive !== currentIsActive,
          )
          .reduce(
            (nextScannerStatesMap, { scanner, scannerId, storedIsActive }) =>
              new Map(nextScannerStatesMap).set(
                scannerId,
                storedIsActive ? scanner() : null,
              ),
            new Map(previousScannerStatesMap),
          ),
      );
    });
  }, [label, scannerConfigs]);

  const activeCount = useMemo(
    () =>
      Array.from(childScannerStates.values()).filter((v) => v !== null).length,
    [childScannerStates],
  );

  const isAllActive = activeCount === scannerConfigs.length;
  const isSomeActive = activeCount > 0;

  const toggleExpanded = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  }, []);

  const toggleAll = useCallback(() => {
    setChildScannerStates(
      () =>
        new Map(
          scannerConfigs.map(({ scanner, scannerId }) => [
            scannerId,
            isSomeActive ? null : scanner(),
          ]),
        ),
    );
  }, [isSomeActive, scannerConfigs]);

  const toggleChildScanner = useCallback(
    ({ scanner, scannerId }: ScannerConfig) => {
      setChildScannerStates((prev) => {
        const next = new Map(prev);
        if (prev.get(scannerId) !== null) {
          next.set(scannerId, null);
        } else {
          next.set(scannerId, scanner());
        }
        return next;
      });
    },
    [],
  );

  const EndIcon = useMemo(() => {
    return (
      <OnOffIndicator
        isAllActive={isAllActive}
        isSomeActive={isSomeActive}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <Overline>
          {isSomeActive ? UI_STRINGS.statusOn : UI_STRINGS.statusOff}
        </Overline>
      </OnOffIndicator>
    );
  }, [isAllActive, odysseyDesignTokens, isSomeActive]);

  return (
    <Stack rowGap={2}>
      <GroupButtonContainer direction="row">
        <MuiIconButton
          aria-label={
            isExpanded
              ? UI_STRINGS.collapseAriaLabel
              : UI_STRINGS.expandAriaLabel
          }
          onClick={toggleExpanded}
          size="small"
        >
          {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </MuiIconButton>
        <Button
          endIcon={EndIcon}
          isFullWidth
          label={label}
          onClick={toggleAll}
          variant="secondary"
        />
      </GroupButtonContainer>
      <Collapse in={isExpanded}>
        {scannerConfigs.map((scannerConfig) => (
          <ScannerButtonItem
            controlledResults={
              childScannerStates.get(scannerConfig.scannerId) ?? null
            }
            key={scannerConfig.scannerId}
            onToggleScanner={toggleChildScanner}
            scannerConfig={scannerConfig}
          />
        ))}
      </Collapse>
    </Stack>
  );
};
