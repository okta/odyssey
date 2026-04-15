import styled from "@emotion/styled";
import { Tooltip as MuiTooltip } from "@mui/material";
import {
  Button,
  DesignTokens,
  Overline,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import { InformationCircleFilledIcon } from "@okta/odyssey-react-mui/icons";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  clearComponentVisualization,
  type ScanResult,
  visualizeComponents,
} from "./componentVisualizer.js";

const shouldForwardProp = (prop: string) =>
  prop !== "odysseyDesignTokens" && prop !== "scannerColor";

const ICON_SLOT_WIDTH = 24;

const ButtonContainer = styled("span", {
  shouldForwardProp,
})<{
  odysseyDesignTokens: DesignTokens;
  scannerColor: string;
}>(({ odysseyDesignTokens, scannerColor }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  marginBottom: 8,
  "& .MuiButton-root": {
    justifySelf: "end",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeft: `4px solid ${odysseyDesignTokens["HueNeutral300"]}`,
    borderRadius: 4,
    "&[aria-expanded='true'], &:active": {
      backgroundColor: "transparent",
      borderColor: odysseyDesignTokens["HueNeutral300"],
      borderLeft: `4px solid ${scannerColor}`,
      color: odysseyDesignTokens["TypographyColorBody"],
    },
  },
}));

const IconSlot = styled("span")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: ICON_SLOT_WIDTH,
  minWidth: ICON_SLOT_WIDTH,
  fontSize: 16,
  color: "inherit",
  cursor: "default",
});

const CountBadge = styled("span")({
  backgroundColor: "rgba(0,0,0,0.4)",
  paddingLeft: 6,
  paddingRight: 6,
  paddingTop: 2,
  paddingBottom: 2,
  borderRadius: 20,
  fontSize: "10px",
});

type ScannerButtonProps = {
  color: string;
  controlledResults?: ScanResult[] | null;
  label: string;
  onToggle?: () => void;
  scanner: () => ScanResult[];
  scannerId: string;
  tooltip?: string;
};

export const ScannerButton = ({
  color,
  controlledResults,
  label,
  onToggle,
  scanner,
  scannerId,
  tooltip = "",
}: ScannerButtonProps) => {
  const isControlled = controlledResults !== undefined;
  const [internalResults, setInternalResults] = useState<ScanResult[] | null>(
    null,
  );

  const odysseyDesignTokens = useOdysseyDesignTokens();

  const activeResults = isControlled ? controlledResults : internalResults;

  useEffect(() => {
    if (activeResults && activeResults.length > 0) {
      visualizeComponents({ color, results: activeResults, scannerId });
    }

    return () => {
      if (activeResults && activeResults.length > 0) {
        clearComponentVisualization({ results: activeResults, scannerId });
      }
    };
  }, [activeResults, color, scannerId]);

  const toggleScanner = useCallback(() => {
    if (isControlled) {
      onToggle?.();
    } else {
      if (internalResults !== null) {
        setInternalResults(null);
      } else {
        setInternalResults(scanner());
      }
    }
  }, [isControlled, onToggle, internalResults, scanner]);

  const isActive = activeResults !== null;

  const EndIcon = useMemo(
    () =>
      activeResults ? (
        <CountBadge>
          <Overline>{activeResults?.length}</Overline>
        </CountBadge>
      ) : undefined,
    [activeResults],
  );

  return (
    <ButtonContainer
      odysseyDesignTokens={odysseyDesignTokens}
      scannerColor={color}
    >
      <IconSlot>
        {tooltip ? (
          // Odyssey tooltip does not work with just an icon, or even an icon wrapped in a div/span
          <MuiTooltip
            placement="top"
            slotProps={{
              popper: {
                sx: {
                  zIndex: 100000, // One above 99,999
                },
              },
            }}
            title={tooltip}
          >
            <InformationCircleFilledIcon />
          </MuiTooltip>
        ) : null}
      </IconSlot>
      <Button
        // TODO: Add ariaPressed to @okta/odyssey-react-mui Button
        ariaExpanded={isActive}
        endIcon={EndIcon}
        isFullWidth
        label={label}
        onClick={toggleScanner}
        size="small"
        variant="secondary"
      />
    </ButtonContainer>
  );
};
