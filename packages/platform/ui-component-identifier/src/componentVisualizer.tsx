export interface ScanResult {
  componentName: string;
  element: Element;
  odysseyVersion: string | null;
  /** Package short name (e.g., "odyssey", "iga-components") */
  packageName: string;
  /** Unique identifier for the scanner that produced this result (e.g., "odyssey@1.55.0") */
  scannerId: string;
}

type ScannerState = {
  color: string;
  id: string;
};

const getStack = (el: HTMLElement) => {
  try {
    return JSON.parse(el.dataset.odysseyStack || "[]") as ScannerState[];
  } catch {
    return [];
  }
};

const setStack = (el: HTMLElement, stack: ScannerState[]) => {
  if (stack.length === 0) {
    delete el.dataset.odysseyStack;
  } else {
    el.dataset.odysseyStack = JSON.stringify(stack);
  }
};

const applyStyles = ({ color, el }: { color: string; el: HTMLElement }) => {
  el.style.outline = `1px solid ${color}`;
  el.style.outlineOffset = "2px";
};

const logComponentCounts = (results: ScanResult[], scannerId: string) => {
  const componentCounts = results.reduce(
    (acc, { componentName }) => {
      acc[componentName] = (acc[componentName] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const versionCounts = results.reduce(
    (acc, { odysseyVersion }) => {
      const key = odysseyVersion ?? "unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  console.log(`[Scanner: ${scannerId}] Component Counts:`, componentCounts);
  console.log(`[Scanner: ${scannerId}] Version Counts:`, versionCounts);
};

/**
 * Adds visualizations for the specific list of results provided.
 */
export const visualizeComponents = ({
  color = "red",
  isDetailedLabelEnabled = false,
  results,
  scannerId,
}: {
  color?: string;
  /** When true, labels include package name and version info. */
  isDetailedLabelEnabled?: boolean;
  results: ScanResult[];
  scannerId: string;
}) => {
  logComponentCounts(results, scannerId);

  results.forEach(({ element, componentName, odysseyVersion, packageName }) => {
    const el = element as HTMLElement;

    // Add to the top of the stack
    const odysseyStack = getStack(el).filter((s) => s.id !== scannerId);
    odysseyStack.push({ id: scannerId, color });
    setStack(el, odysseyStack);

    // Mark State
    el.dataset.odysseyDebug = "true";

    // Apply Styles
    applyStyles({ color, el });

    // Handle Position, force relative if it's currently static (to avoid breaking layout)
    const computedPos = window.getComputedStyle(el).position;
    if (computedPos === "static") {
      el.style.position = "relative";
      el.dataset.odysseyDebugForcedPos = "true";
    }

    // Add Label
    let labelText = componentName;
    if (isDetailedLabelEnabled) {
      if (packageName && odysseyVersion) {
        labelText = `${componentName} (${packageName}, v${odysseyVersion})`;
      } else if (odysseyVersion) {
        labelText = `${componentName} (v${odysseyVersion})`;
      } else if (packageName) {
        labelText = `${componentName} (${packageName})`;
      }
    }
    const label = document.createElement("div");
    label.innerText = labelText;
    label.dataset.scannerId = scannerId;

    Object.assign(label.style, {
      borderRadius: "4px",
      position: "absolute",
      background: color,
      color: "white",
      fontSize: "10px",
      padding: "2px 6px",
      zIndex: "10000",
      pointerEvents: "none",
      fontWeight: "bold",
      whiteSpace: "nowrap",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      textTransform: "initial",
    });

    el.appendChild(label);

    // Position Label
    const rect = el.getBoundingClientRect();
    const labelHeight = 22;
    const labelWidth = 100;

    // Snap Top/Inside if off-screen
    if (rect.top < labelHeight) {
      label.style.top = "0px";
    } else {
      label.style.top = `-${labelHeight}px`;
    }

    // Snap Right/Inside if off-screen
    const distanceToRight = window.innerWidth - rect.right;
    if (distanceToRight < labelWidth) {
      label.style.right = "0px";
    } else {
      label.style.right = "-2px";
    }
  });
};

/**
 * Reverses the visualization for the specific list of results provided.
 */
export const clearComponentVisualization = ({
  results,
  scannerId,
}: {
  results: ScanResult[];
  scannerId: string;
}) => {
  results.forEach(({ element }) => {
    const el = element as HTMLElement;

    const odysseyStack = getStack(el).filter((s) => s.id !== scannerId);
    setStack(el, odysseyStack);

    // Remove Label
    const label = el.querySelector(`:scope > [data-scanner-id="${scannerId}"]`);
    if (label) {
      label.remove();
    }

    if (odysseyStack.length === 0) {
      // Revert Styles
      el.style.outline = "";
      el.style.outlineOffset = "";

      // Revert Position (only if we forced it previously)
      if (el.dataset.odysseyDebugForcedPos) {
        el.style.position = "";
        delete el.dataset.odysseyDebugForcedPos;
      }

      // Remove Data Attribute
      delete el.dataset.odysseyDebug;
    } else {
      // Re-apply the previous top of stack color style
      const { color } = odysseyStack[odysseyStack.length - 1];
      applyStyles({ color, el });
    }
  });
};
