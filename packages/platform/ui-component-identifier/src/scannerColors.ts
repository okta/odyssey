const ODYSSEY_BACKWARDS_COMPATIBLE_COLOR = "#ec008c";

/**
 * Curated palette for Odyssey version scanners.
 * Starts with purple and cycles through distinct, brand-friendly hues.
 * Colors cycle if there are ever more versions than palette entries.
 */
const ODYSSEY_PALETTE = [
  "#9b59b6", // purple
  "#5dade2", // sky blue
  "#48c9b0", // medium turquoise
  "#ec407a", // rose pink
  "#eb984e", // sandy orange
  "#66bb6a", // sage green
  "#26c6da", // cyan
];

/**
 * Curated palette for contribution package scanners.
 * Chosen to be distinct from each other and from the Odyssey and backwards compatible colors.
 * Colors cycle if there are ever more packages than palette entries.
 */
const CONTRIBUTION_PALETTE = [
  "#0073e6", // blue
  "#00b894", // teal
  "#e67e22", // orange
  "#2ecc71", // emerald
  "#e74c3c", // red
  "#f39c12", // amber
  "#1abc9c", // turquoise
  "#ffa726", // marigold
];

/**
 * Returns a color from the curated Odyssey palette by index.
 * The first Odyssey version gets purple, the second gets sky blue, etc.
 */
export const getOdysseyColor = (index: number) =>
  ODYSSEY_PALETTE[index % ODYSSEY_PALETTE.length];

/**
 * Returns the color for the backwards compatible scanner.
 */
export const getBackwardsCompatibleColor = () =>
  ODYSSEY_BACKWARDS_COMPATIBLE_COLOR;

/**
 * Returns a color from the curated contribution palette by index.
 * The first contribution package gets blue, the second gets teal, etc.
 */
export const getContributionColor = (index: number) =>
  CONTRIBUTION_PALETTE[index % CONTRIBUTION_PALETTE.length];
