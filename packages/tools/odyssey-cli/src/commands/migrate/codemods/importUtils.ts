import { namedTypes } from "ast-types";
import { ASTPath, Collection, JSCodeshift } from "jscodeshift";

type FindOrCreateImportOptions = {
  importKind?: "type";
  localName?: string;
  specifierName?: string;
};

/**
 * Returns the imported name from an ImportSpecifier node.
 *
 * Handles all possible imported key types: Identifier, JSXIdentifier,
 * Literal, and StringLiteral.
 *
 * @param {ImportSpecifier} specifier - The import specifier AST node.
 * @returns {string | null} The imported name, or null if unresolvable.
 *
 * @example
 * import { X as Y } from "module" → returns "X"
 * import { Foo } from "module" → returns "Foo"
 * import { "Foo" as Bar } from "module" → returns "Foo"
 */
export const getImportedSpecifierName = (
  specifier: namedTypes.ImportSpecifier,
): string | null => {
  const imported = specifier.imported;

  // import { Foo } from "module"; Identifier or JSXIdentifier
  if (
    namedTypes.Identifier.check(imported) ||
    namedTypes.JSXIdentifier.check(imported)
  ) {
    return imported.name;
  } else if (
    // import { "Foo" as Bar } from "module"; Literal or StringLiteral
    namedTypes.Literal.check(imported) ||
    namedTypes.StringLiteral.check(imported)
  ) {
    const literalNode: namedTypes.Literal | namedTypes.StringLiteral = imported;
    return typeof literalNode.value === "string" ? literalNode.value : null;
  }

  return null;
};

/**
 * Determines if an import declaration is compatible with adding value named specifiers.
 */
const isCompatibleImport = (
  importPath: ASTPath<namedTypes.ImportDeclaration>,
): boolean => {
  const specs = importPath.value.specifiers ?? [];
  const isNamespaceImport =
    specs.length > 0 &&
    specs.every((s) => namedTypes.ImportNamespaceSpecifier.check(s));
  return !isNamespaceImport && !(importPath.value.importKind === "type");
};

/**
 * Finds the first import declaration for the given package that is compatible
 * with adding **value** named specifiers.
 *
 * Skips:
 * - Pure namespace imports (e.g. `import * as X from "pkg"`) since
 *   `import * as X, { Y } from "pkg"` is invalid ES syntax.
 * - Type-only imports (e.g. `import type { Foo } from "pkg"`) since
 *   appending a value specifier would make it type-only at runtime.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {Collection<unknown>} fileRoot - The root AST collection for the file.
 * @param {string} packageName - The package to find a compatible import for.
 * @returns {namedTypes.ImportDeclaration | null} The import declaration node, or null if not found.
 */
const findCompatibleImport = (
  j: JSCodeshift,
  fileRoot: Collection<unknown>,
  packageName: string,
): namedTypes.ImportDeclaration | null => {
  const existing = fileRoot
    .find(j.ImportDeclaration, { source: { value: packageName } })
    .filter(isCompatibleImport);

  return existing.size() > 0
    ? (existing.at(0).paths()[0]?.value ?? null)
    : null;
};

/**
 * Creates a new empty import declaration for the given package and inserts it
 * after the last import in the file. If no imports exist, the new import is
 * inserted at the beginning.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {Collection<unknown>} fileRoot - The root AST collection for the file.
 * @param {string} packageName - The package to create an import for.
 * @returns {namedTypes.ImportDeclaration} The newly created import declaration node.
 */
const createAndInsertImport = (
  j: JSCodeshift,
  fileRoot: Collection<unknown>,
  packageName: string,
): namedTypes.ImportDeclaration => {
  const newImport = j.importDeclaration([], j.literal(packageName));
  const allImports = fileRoot.find(j.ImportDeclaration);

  if (allImports.size() > 0) {
    allImports.at(-1).insertAfter(newImport);
  } else {
    const programPath = fileRoot.find(j.Program).paths()[0];
    if (!programPath) {
      throw new Error("Program node not found");
    }
    programPath.value.body.unshift(newImport);
  }

  return newImport;
};

/**
 * Checks if an import declaration already has the given named specifier.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {namedTypes.ImportDeclaration} importDecl - The import declaration to check.
 * @param {string} specifierName - The named specifier to look for.
 * @param {string} [localName] - Optional local name to match (for aliasing).
 * @returns {boolean} True if the specifier exists in the import declaration.
 */
const hasNamedSpecifier = (
  j: JSCodeshift,
  importDecl: namedTypes.ImportDeclaration,
  specifierName: string,
  localName?: string,
): boolean => {
  return (importDecl.specifiers ?? []).some((spec) => {
    if (
      !j.ImportSpecifier.check(spec) ||
      getImportedSpecifierName(spec) !== specifierName
    )
      return false;
    else {
      return localName ? spec.local?.name === localName : true;
    }
  });
};

/**
 * Creates a named import specifier, optionally with an alias and type modifier.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {string} specifierName - The name of the export to import.
 * @param {string} [localName] - Optional local name if aliasing (e.g., `import { X as Y }`).
 * @param {"type"} [importKind] - If "type", creates an inline type-only specifier (e.g., `import { type X }`).
 * @returns {namedTypes.ImportSpecifier} The created specifier node.
 */
const createNamedSpecifier = (
  j: JSCodeshift,
  specifierName: string,
  localName?: string,
  importKind?: "type",
) => {
  const specifier = j.importSpecifier(
    j.identifier(specifierName),
    localName && localName !== specifierName ? j.identifier(localName) : null,
  );

  if (importKind === "type") {
    return {
      ...specifier,
      importKind: "type",
    } satisfies namedTypes.ImportSpecifier & { importKind?: "type" };
  }

  return specifier;
};

/**
 * Finds the first import declaration for the given package that is compatible
 * with adding **value** named specifiers, or creates a new empty one.
 *
 * Skips:
 * - Pure namespace imports (e.g. `import * as X from "pkg"`) since
 *   `import * as X, { Y } from "pkg"` is invalid ES syntax.
 * - Type-only imports (e.g. `import type { Foo } from "pkg"`) since
 *   appending a value specifier would make it type-only at runtime.
 *
 * @param {JSCodeshift} j - The jscodeshift API instance.
 * @param {Collection<unknown>} fileRoot - The root AST collection for the file.
 * @param {string} packageName - The package to find or create an import for.
 * @param {FindOrCreateImportOptions} options - Optional named specifier to add.
 * @returns {namedTypes.ImportDeclaration} The import declaration node (always succeeds).
 */
export const findOrCreateImportDeclaration = (
  j: JSCodeshift,
  fileRoot: Collection<unknown>,
  packageName: string,
  options?: FindOrCreateImportOptions,
): namedTypes.ImportDeclaration => {
  const importDeclaration =
    findCompatibleImport(j, fileRoot, packageName) ??
    createAndInsertImport(j, fileRoot, packageName);

  if (options?.specifierName) {
    const { specifierName, localName, importKind } = options;
    if (!hasNamedSpecifier(j, importDeclaration, specifierName, localName)) {
      importDeclaration.specifiers = [
        ...(importDeclaration.specifiers ?? []),
        createNamedSpecifier(j, specifierName, localName, importKind),
      ];
    }
  }

  return importDeclaration;
};
