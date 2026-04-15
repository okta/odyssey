import { ScanResult } from "./componentVisualizer.js";
import { parseStampedDisplayName } from "./displayNameUtils.js";

interface FiberType {
  _context?: { displayName?: string };
  _payload?: {
    _result?: FiberType;
  };
  displayName?: string;
  name?: string;
  render?: { displayName?: string };
  type?: {
    displayName?: string;
    render?: { displayName?: string };
  };
}

interface FiberNode {
  child?: FiberNode | null;
  elementType?: FiberType | string;
  return?: FiberNode | null;
  sibling?: FiberNode | null;
  stateNode?: Element | null;
  tag?: number; // React internal tag (5 = HostComponent, etc)
  type?: FiberType | string;
}

interface ReactInternalElement extends Element {
  [key: string]: unknown;
}

/**
 * Gets the starting Fiber node from a DOM element.
 */
const getReactFiber = (domNode: Element) => {
  const node = domNode as ReactInternalElement;
  const key = Object.keys(node).find(
    (k) =>
      k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$"),
  );
  return key ? (node[key] as FiberNode) : null;
};

/**
 * Gets the display name for a given Fiber type.
 */
const getDisplayNameForType = (type?: FiberType | string) => {
  if (!type) return null;

  // Ignore HTML strings (div, span)
  if (typeof type === "string") return null;

  // 1. Direct displayName (User set)
  if (type.displayName) return type.displayName;

  // 2. Function name (Might be minified in prod, but worth checking)
  if (type.name) return type.name;

  // 3. Recursive Unwrapping (For Memo, ForwardRef, etc.)
  // Handle React.memo / ForwardRef wrappers
  if (type.type) {
    return getDisplayNameForType(type.type);
  }

  if (type.render) {
    return getDisplayNameForType(type.render);
  }

  // Handle React.lazy
  if (type._payload && type._payload._result) {
    return getDisplayNameForType(type._payload._result);
  }

  // Handle Context Provider
  if (type._context && type._context.displayName) {
    return `${type._context.displayName}.Provider`;
  }

  return null;
};

/**
 * Extracts a human-readable name from a Fiber node.
 */
const getComponentName = (fiber: FiberNode) => {
  if (!fiber) return null;

  // Try fiber.elementType (The original source type)
  // This catches cases where the 'type' was swapped out internally
  // We attempt this first because type may still exist with the incorrect name.
  const elementTypeName = getDisplayNameForType(fiber.elementType);
  if (elementTypeName) return elementTypeName;

  // Try fiber.type
  // May not be needed if elementType is always present
  const typeName = getDisplayNameForType(fiber.type);
  if (typeName) return typeName;

  return null;
};

/**
 * Finds the first physical DOM Node for a given Component Fiber.
 * Necessary because Functional Components (like Banner) do not have a stateNode.
 * We must drill down to find the 'div' they render.
 */
const findHostNode = (startFiber: FiberNode) => {
  if (!startFiber) return null;

  // Success: We found a real DOM node
  // React Host Components (div, span, etc.) have the DOM element in stateNode
  if (startFiber.stateNode instanceof Element) {
    return startFiber.stateNode;
  }

  // Drill Down: It's a Component, Fragment, or Provider
  // The actual DOM node is inside the component
  const stack = [startFiber.child];

  while (stack.length > 0) {
    const fiber = stack.pop();
    if (!fiber) continue;

    // Success: We found a real DOM node
    if (fiber.stateNode instanceof Element) {
      return fiber.stateNode;
    }

    // To process the child (Depth) before the sibling (Breadth), we push sibling first.
    if (fiber.sibling) stack.push(fiber.sibling);
    if (fiber.child) stack.push(fiber.child);
  }

  return null;
};

/**
 * Iterative Tree Walker (Stack-based) - Discovery mode
 * Finds ALL components with a stamped displayName pattern (component::pkg=<package>&odysseyV=<version>).
 * Discovers any stamped component without filtering by package.
 */
const traverseAllStamped = ({ rootFiber }: { rootFiber: FiberNode }) => {
  const found: ScanResult[] = [];
  const stack = [rootFiber];

  while (stack.length > 0) {
    const fiber = stack.pop();
    if (!fiber) continue;

    const stampedName = getComponentName(fiber);

    if (stampedName) {
      const parsed = parseStampedDisplayName(stampedName);

      if (parsed) {
        const hostNode = findHostNode(fiber);

        if (hostNode) {
          found.push({
            componentName: parsed.componentName,
            element: hostNode,
            odysseyVersion: parsed.version,
            packageName: parsed.package,
            scannerId: `${parsed.package}@${parsed.version ?? ""}`,
          });
        }
      }
    }

    if (fiber.sibling) stack.push(fiber.sibling);
    if (fiber.child) stack.push(fiber.child);
  }

  return found;
};

/**
 * Recursively finds Shadow Roots in the DOM tree.
 * Allows us to target #shadow-root without relying on specific data attributes.
 */
const getAllOpenShadowRoots = (rootNode: ParentNode) => {
  const shadowRoots: ShadowRoot[] = [];

  const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_ELEMENT);

  let currentNode = walker.nextNode();

  while (currentNode) {
    const el = currentNode as Element;

    if (el.shadowRoot) {
      shadowRoots.push(el.shadowRoot);

      // Recurse: We must also scan *inside* this shadow root for nested shadow roots
      shadowRoots.push(...getAllOpenShadowRoots(el.shadowRoot));
    }

    currentNode = walker.nextNode();
  }

  return shadowRoots;
};

const CSSBaselineRoot = ".MuiScopedCssBaseline-root";

const findScanRoots = () => {
  const lightRoots = Array.from(document.querySelectorAll(CSSBaselineRoot));
  const shadowRoots = getAllOpenShadowRoots(document).flatMap((shadowRoot) =>
    Array.from(shadowRoot.querySelectorAll(CSSBaselineRoot)),
  );
  return [...lightRoots, ...shadowRoots];
};

const deduplicateResults = (results: ScanResult[]) =>
  results.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.element === value.element),
  );

/**
 * Creates a discovery scanner that finds ALL stamped components on the page.
 * Returns results for any component matching the stamped displayName pattern,
 * regardless of whether the package is known ahead of time.
 */
export const getDiscoveryScanner = () => {
  return () => {
    const roots = findScanRoots();

    const rawResults = roots.flatMap((rootEl) => {
      const rootFiber = getReactFiber(rootEl);
      if (!rootFiber) return [];

      return traverseAllStamped({ rootFiber });
    });

    return deduplicateResults(rawResults);
  };
};

/**
 * Creates a targeted scanner for a specific package name and version combination.
 * Re-scans the page and returns only components matching the target.
 */
export const getTargetedScanner = (
  targetPackage: string,
  targetVersion: string | null,
) => {
  return () => {
    const roots = findScanRoots();

    const rawResults = roots.flatMap((rootEl) => {
      const rootFiber = getReactFiber(rootEl);
      if (!rootFiber) return [];

      return traverseAllStamped({ rootFiber });
    });

    const filtered = rawResults.filter(
      (r) =>
        r.packageName === targetPackage &&
        (r.odysseyVersion ?? null) === targetVersion,
    );

    return deduplicateResults(filtered);
  };
};

/**
 * Creates a scanner for components matching a list of displayName targets.
 * Used as a fallback for components from before the stamped displayName
 * convention existed — these have bare displayNames like "Button".
 *
 * Stamped components are excluded; use the discovery or targeted scanners
 * for components that follow the stamped displayName convention.
 */
export const getBackwardsCompatibleScanner = (
  targets: string[],
  scannerId = "odyssey-backwards-compatible",
) => {
  const targetSet = new Set(targets);

  return () => {
    const roots = findScanRoots();

    const rawResults = roots.flatMap((rootEl) => {
      const rootFiber = getReactFiber(rootEl);
      if (!rootFiber) return [];

      const found: ScanResult[] = [];
      const stack = [rootFiber];

      while (stack.length > 0) {
        const fiber = stack.pop();
        if (!fiber) continue;

        const displayName = getComponentName(fiber);

        if (displayName) {
          // Skip stamped components — they belong to the discovery/targeted scanners
          if (parseStampedDisplayName(displayName)) {
            if (fiber.sibling) stack.push(fiber.sibling);
            if (fiber.child) stack.push(fiber.child);
            continue;
          }

          if (targetSet.has(displayName)) {
            const hostNode = findHostNode(fiber);

            if (hostNode) {
              found.push({
                componentName: displayName,
                element: hostNode,
                odysseyVersion: null,
                packageName: "Odyssey",
                scannerId,
              });
            }
          }
        }

        if (fiber.sibling) stack.push(fiber.sibling);
        if (fiber.child) stack.push(fiber.child);
      }

      return found;
    });

    return deduplicateResults(rawResults);
  };
};
