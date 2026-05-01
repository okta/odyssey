import ts from "typescript";

/** File path patterns that contain infrastructure exports, not contribution components. */
const SKIPPED_PATH_PATTERNS = ["/i18n.generated/", "/node_modules/"];

const shouldSkipFilePath = (filePath: string): boolean =>
  SKIPPED_PATH_PATTERNS.some((pattern) => filePath.includes(pattern));

const isPascalCase = (name: string): boolean => /^[A-Z]/.test(name);

const resolveAlias = (symbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol =>
  symbol.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(symbol)
    : symbol;

const isValueSymbol = (symbol: ts.Symbol): boolean =>
  (symbol.flags & ts.SymbolFlags.Value) !== 0;

const isTypeOnlyExport = (symbol: ts.Symbol): boolean =>
  (symbol.declarations ?? []).some(
    (declaration) =>
      ts.isExportSpecifier(declaration) &&
      (declaration.isTypeOnly || declaration.parent.parent.isTypeOnly),
  );

/**
 * Returns true when the symbol is a named re-export from an external package
 * (i.e. the module specifier is not a relative path like `./foo`).
 */
const isExternalPackageExport = (symbol: ts.Symbol): boolean =>
  (symbol.declarations ?? []).some((declaration) => {
    const exportDeclaration = declaration.parent.parent;
    return (
      ts.isExportSpecifier(declaration) &&
      ts.isExportDeclaration(exportDeclaration) &&
      exportDeclaration.moduleSpecifier !== undefined &&
      ts.isStringLiteral(exportDeclaration.moduleSpecifier) &&
      !exportDeclaration.moduleSpecifier.text.startsWith(".") &&
      !exportDeclaration.moduleSpecifier.text.startsWith("/")
    );
  });

const getDeclarationFilePath = (symbol: ts.Symbol): string | null =>
  symbol.valueDeclaration?.getSourceFile().fileName ?? null;

/**
 * Returns the set of PascalCase component names exported from a contribution
 * package's `src/index.ts` file.
 *
 * Uses TypeScript type checker to resolve all transitive re-exports,
 * including `export * from` chains. Re-exports from external packages and
 * infrastructure files (e.g. i18n.generated) are excluded automatically.
 */
export const getExportedComponentNames = (
  indexFilePath: string,
  compilerHost?: ts.CompilerHost,
): Set<string> => {
  const program = ts.createProgram(
    [indexFilePath],
    {
      allowJs: true,
      // Required for type checker to resolve namespace imports (import * as Foo from "...")
      jsx: ts.JsxEmit.Preserve,
      module: ts.ModuleKind.Preserve,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      noEmit: true,
      noLib: true,
      skipLibCheck: true,
    },
    compilerHost,
  );

  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(indexFilePath);
  const moduleSymbol =
    sourceFile !== undefined
      ? checker.getSymbolAtLocation(sourceFile)
      : undefined;

  if (!moduleSymbol) return new Set();

  return new Set(
    checker.getExportsOfModule(moduleSymbol).flatMap((exportedSymbol) => {
      const exportName = exportedSymbol.name;
      const resolvedSymbol = resolveAlias(exportedSymbol, checker);
      const filePath = getDeclarationFilePath(resolvedSymbol);

      return isPascalCase(exportName) &&
        !isTypeOnlyExport(exportedSymbol) &&
        !isExternalPackageExport(exportedSymbol) &&
        isValueSymbol(resolvedSymbol) &&
        (filePath === null || !shouldSkipFilePath(filePath))
        ? [exportName]
        : [];
    }),
  );
};
