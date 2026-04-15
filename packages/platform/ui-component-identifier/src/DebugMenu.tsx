import styled from "@emotion/styled";
import { Collapse, IconButton, Stack } from "@mui/material";
import {
  type DesignTokens,
  Surface,
  Typography,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import {
  AddIcon,
  CloseIcon,
  DragIndicatorIcon,
  RefreshIcon,
  SubtractIcon,
} from "@okta/odyssey-react-mui/icons";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getBackwardsCompatibleScanner,
  getDiscoveryScanner,
  getTargetedScanner,
} from "./componentScanner.js";
import { type ScanResult } from "./componentVisualizer.js";
import { DEBUG_ROOT_ID, UI_STRINGS } from "./constants.js";
import { getPackageDisplayName } from "./displayNameUtils.js";
import {
  getBackwardsCompatibleColor,
  getContributionColor,
  getOdysseyColor,
} from "./scannerColors.js";
import { type ScannerConfig, ScannerGroup } from "./ScannerGroup.js";
import { ODYSSEY_TARGETS } from "./targets.js";
import { useCornerDrag } from "./useCornerDrag.js";
import { useMenuState } from "./useMenuState.js";

type ScannerGroupConfig = {
  label: string;
  order: number;
  scannerConfigs: ScannerConfig[];
};

const ODYSSEY_PACKAGE = "odyssey";

const MenuWrapper = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "positionStyles",
})<{
  odysseyDesignTokens: DesignTokens;
  positionStyles: Record<string, number | "unset">;
}>(({ odysseyDesignTokens, positionStyles }) => ({
  position: "fixed",
  zIndex: 99999,
  minWidth: 204,
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: odysseyDesignTokens.ShadowScale1,
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  ...positionStyles,
}));

const CollapseDivider = styled("div")({
  borderTopWidth: 1,
  borderTopStyle: "solid",
  marginTop: 8,
  paddingTop: 8,
});

const DragHandle = styled("span")({
  display: "flex",
  alignItems: "center",
  cursor: "grab",
  "&:active": { cursor: "grabbing" },
});

const Header = styled(Stack)({
  justifyContent: "space-between",
  alignItems: "center",
});

const RefreshButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isSpinning",
})<{ isSpinning?: boolean }>(({ isSpinning }) => ({
  "@keyframes refresh-spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(180deg)" },
  },
  ...(isSpinning && { animation: "refresh-spin 0.4s ease" }),
}));

const ODYSSEY_GROUP_NAME = UI_STRINGS.odysseyGroup;
const CONTRIBUTIONS_GROUP_NAME = UI_STRINGS.contributionsGroup;
const getPackageGroup = (packageName: string) =>
  packageName === ODYSSEY_PACKAGE
    ? ODYSSEY_GROUP_NAME
    : CONTRIBUTIONS_GROUP_NAME;

const formatScannerConfig = (
  { packageName, odysseyVersion, scannerId }: ScanResult,
  index: number,
): ScannerConfig => {
  const displayName = getPackageDisplayName(packageName);
  const isOdyssey = packageName === ODYSSEY_PACKAGE;

  // For Odyssey packages, the version *is* the Odyssey version.
  // For contributions, the version is the Odyssey dependency version.
  let label = displayName;
  if (odysseyVersion) {
    label = isOdyssey
      ? `${displayName} v${odysseyVersion}`
      : `${displayName} (Odyssey v${odysseyVersion})`;
  }

  return {
    color: isOdyssey ? getOdysseyColor(index) : getContributionColor(index),
    label,
    group: getPackageGroup(packageName),
    scanner: getTargetedScanner(packageName, odysseyVersion),
    scannerId,
  };
};

const getGroupOrder = (groupName: string) => {
  return groupName === ODYSSEY_GROUP_NAME ? 1 : 2;
};

/**
 * Groups a flat list of ChildScannerConfig[] into ScannerGroupData[],
 * using `ChildScannerConfig.group` as the grouping key.
 */
const groupScannerConfigs = (configs: ScannerConfig[]): ScannerGroupConfig[] =>
  Object.entries(Object.groupBy(configs, (config) => config.group))
    .map(([label, scannerConfigs]) => ({
      label,
      scannerConfigs: scannerConfigs ?? [],
      order: getGroupOrder(label),
    }))
    .toSorted((a, b) => a.order - b.order);

const buildGroupsFromDiscovery = (
  results: ScanResult[],
): ScannerGroupConfig[] => {
  const backwardsCompatibleConfig = {
    color: getBackwardsCompatibleColor(),
    group: ODYSSEY_GROUP_NAME,
    label: UI_STRINGS.backwardsCompatibleLabel,
    scanner: getBackwardsCompatibleScanner(ODYSSEY_TARGETS),
    scannerId: "odyssey-backwards-compatible",
    tooltip: UI_STRINGS.backwardsCompatibleTooltip,
  };

  const dedupedResults = Array.from(
    new Map(
      results
        .filter(({ packageName }) => packageName)
        .map((item) => [item.scannerId, item]),
    ).values(),
  );

  // Index each group independently so color functions receive per-group indices
  const odysseyConfigs = dedupedResults
    .filter(({ packageName }) => packageName === ODYSSEY_PACKAGE)
    .map(formatScannerConfig);

  const contributionConfigs = dedupedResults
    .filter(({ packageName }) => packageName !== ODYSSEY_PACKAGE)
    .map(formatScannerConfig);

  return groupScannerConfigs([
    backwardsCompatibleConfig,
    ...odysseyConfigs,
    ...contributionConfigs,
  ]);
};

const debounceTimeoutMs = 300;
/**
 * Observes DOM mutations on `document.body`, ignoring changes from the debug
 * menu itself, and calls `onMutation` after a 300ms debounce once the DOM
 * settles. Returns a cleanup function that disconnects the observer.
 */
const observeDomForDiscovery = (onMutation: () => void) => {
  let debounceTimerId: ReturnType<typeof setTimeout>;

  const isDebugNode = (node: Node) =>
    node instanceof HTMLElement &&
    (node.id === DEBUG_ROOT_ID ||
      node.closest?.(`#${DEBUG_ROOT_ID}`) !== null ||
      node.dataset?.scannerId !== undefined);

  const hasRelevantMutation = (mutations: MutationRecord[]) =>
    mutations.some(
      ({ addedNodes, removedNodes, target }) =>
        (!isDebugNode(target) &&
          Array.from(addedNodes).some((node) => !isDebugNode(node))) ||
        Array.from(removedNodes).some((node) => !isDebugNode(node)),
    );

  const observer = new MutationObserver((mutations) => {
    if (hasRelevantMutation(mutations)) {
      clearTimeout(debounceTimerId);
      debounceTimerId = setTimeout(onMutation, debounceTimeoutMs);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return () => {
    clearTimeout(debounceTimerId);
    observer.disconnect();
  };
};

export type DebugMenuProps = { onClose: () => void };

export const DebugMenu = ({ onClose }: DebugMenuProps) => {
  const discoveryScanner = useMemo(() => getDiscoveryScanner(), []);
  const [discoveryResults, setDiscoveryResults] = useState<ScanResult[] | null>(
    null,
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const runDiscovery = useCallback(() => {
    setDiscoveryResults(discoveryScanner());
  }, [discoveryScanner]);

  const {
    menuPosition,
    positionStyles,
    handleCornerChange,
    isMinimized,
    toggleMinimized,
  } = useMenuState();
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { containerRef, dragHandleProps } = useCornerDrag(
    menuPosition,
    handleCornerChange,
  );

  const handleRefresh = useCallback(() => {
    if (!isSpinning) {
      setIsSpinning(true);
      runDiscovery();
    }
  }, [isSpinning, runDiscovery]);

  const onRefreshEnd = useCallback(() => {
    setIsSpinning(false);
  }, []);

  // Run discovery immediately, then re-run when the DOM settles after mutations.
  // This handles:
  // * auto-open from storage before the app renders,
  // * SPA page navigations that swap content.
  useEffect(() => {
    runDiscovery();

    return observeDomForDiscovery(runDiscovery);
  }, [runDiscovery]);

  const groups = useMemo(
    () => (discoveryResults ? buildGroupsFromDiscovery(discoveryResults) : []),
    [discoveryResults],
  );

  const discoveryResultsByScanner = useMemo(
    () =>
      Object.groupBy(
        (discoveryResults ?? []).filter((r) => r.packageName),
        (result) => result.scannerId,
      ),
    [discoveryResults],
  );

  return (
    <MenuWrapper
      odysseyDesignTokens={odysseyDesignTokens}
      positionStyles={positionStyles}
      ref={containerRef}
    >
      <Surface>
        <Header direction="row">
          <Stack alignItems="center" direction="row" gap={0.5}>
            <DragHandle
              aria-label={UI_STRINGS.dragAriaLabel}
              title={UI_STRINGS.dragTitle}
              {...dragHandleProps}
            >
              <DragIndicatorIcon />
            </DragHandle>
            <Typography>{UI_STRINGS.menuTitle}</Typography>
          </Stack>
          <Stack alignItems="center" direction="row" gap={0.5}>
            <RefreshButton
              aria-label={UI_STRINGS.refreshAriaLabel}
              isSpinning={isSpinning}
              onAnimationEnd={onRefreshEnd}
              onClick={handleRefresh}
              size="small"
              title={UI_STRINGS.refreshTitle}
            >
              <RefreshIcon />
            </RefreshButton>
            <IconButton
              aria-label={
                isMinimized
                  ? UI_STRINGS.expandMenuAriaLabel
                  : UI_STRINGS.minimizeMenuAriaLabel
              }
              onClick={toggleMinimized}
              size="small"
              title={
                isMinimized
                  ? UI_STRINGS.expandMenuTitle
                  : UI_STRINGS.minimizeMenuTitle
              }
            >
              {isMinimized ? <AddIcon /> : <SubtractIcon />}
            </IconButton>
            <IconButton
              aria-label={UI_STRINGS.closeAriaLabel}
              onClick={onClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </Header>

        <Collapse in={!isMinimized}>
          <CollapseDivider>
            {groups.map((group) => (
              <ScannerGroup
                discoveryResultsByScanner={discoveryResultsByScanner}
                key={group.label}
                label={group.label}
                scannerConfigs={group.scannerConfigs}
              />
            ))}
          </CollapseDivider>
        </Collapse>
      </Surface>
    </MenuWrapper>
  );
};
