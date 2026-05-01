export type ComponentReference = {
  componentName: string;
  libraryName: string;
};

/**
 * Parses a component reference string in the format "libraryName::ComponentName"
 * used in contributionsMetadata.json `forkedFrom` and `similarTo` fields.
 *
 * Example: "odyssey-react-mui::Dialog" → { libraryName: "odyssey-react-mui", componentName: "Dialog" }
 */
export const parseComponentReference = (
  reference: string,
): ComponentReference => {
  const hasSeparator = reference.includes("::");

  if (!hasSeparator) {
    throw new Error(
      `Invalid component reference "${reference}". Expected format "libraryName::ComponentName".`,
    );
  }

  const [libraryName, componentName] = reference.split("::");

  return {
    componentName,
    libraryName,
  };
};

/**
 * Formats a parsed component reference as a human-readable string.
 * Example: { libraryName: "odyssey-react-mui", componentName: "Dialog" } → "Dialog in odyssey-react-mui"
 */
export const formatComponentReference = (
  reference: ComponentReference,
): string => `${reference.componentName} in ${reference.libraryName}`;
