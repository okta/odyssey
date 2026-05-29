/**
 * Sentinel for source props that have no equivalent in the target API.
 * Use this instead of omitting the entry so the type system confirms the
 * prop was considered (not accidentally forgotten).
 * The codemod skips any prop whose mapping resolves to `DROPPED`.
 */
export const DROPPED = Symbol("dropped");
export type Dropped = typeof DROPPED;

export type PropMapping<TTargetKeys extends string = string> =
  | TTargetKeys
  | Dropped
  | { [key: string]: PropMapping<TTargetKeys> };

/**
 * Produces a union of valid target prop paths for a given Props type:
 *   - "propName"                   for every prop
 *   - "propName.nestedKey"         for every prop whose value is a plain object
 *
 * Arrays, functions, and primitives are never expanded — only plain objects
 * descend one level. This keeps the union clean and prevents paths like
 * "columns.length" or "getData.name" from appearing.
 */
type IsShallowObject<T> = T extends object
  ? T extends unknown[] | ((...args: never) => unknown)
    ? false
    : true
  : false;

export type PropPaths<T> = {
  [K in keyof T]: IsShallowObject<NonNullable<T[K]>> extends true
    ? (string & K) | `${string & K}.${string & keyof NonNullable<T[K]>}`
    : string & K;
}[keyof T];

/**
 * Recursively maps source prop types to their allowed propMap value types:
 *   - Shallow-object props allow either a nested TypedPropMap OR a flat target path.
 *     This covers the "nested source extraction" pattern where an inline source
 *     object (e.g. tableLayoutOptions={{ columns: [...] }}) is unpacked into
 *     individual flat target props.
 *   - All other props (primitives, arrays, functions) allow only a flat target
 *     path or DROPPED.
 *
 * Required<> is applied at every recursion level so optional sub-props are also
 * exhaustively required in the propMap.
 */
export type TypedPropMap<TSourceProps, TTargetKeys extends string = string> = {
  [K in keyof Required<TSourceProps>]: IsShallowObject<
    NonNullable<Required<TSourceProps>[K]>
  > extends true
    ?
        | TypedPropMap<NonNullable<Required<TSourceProps>[K]>, TTargetKeys>
        | TTargetKeys
        | Dropped
    : TTargetKeys | Dropped;
};

export type ComponentMappings = Record<string, ComponentMapping>;

/**
 * TSourceProps — the raw source component Props type (e.g. TypographyProps).
 *   Required<> and TypedPropMap are applied internally, so every source prop
 *   (including optional ones) must be explicitly mapped. Shallow-object props
 *   may use the nested extraction pattern; all others accept a flat target path
 *   or DROPPED.
 *
 * TTargetProps — the raw target component Props type (e.g. DataViewProps<Record<string, unknown>>).
 *   PropPaths<Required<TTargetProps>> is derived internally, constraining
 *   propMap values to valid target prop paths and catching stale mappings when
 *   the target API changes.
 *
 * Omit both (defaults to Record<string, unknown>) when the Props type is
 * generic (e.g. DataTableProps<TData>) — propMap values fall back to string.
 */
export type ComponentMapping<
  TSourceProps extends Record<string, unknown> = Record<string, unknown>,
  TTargetProps extends Record<string, unknown> = Record<string, unknown>,
> = {
  defaultProps?: Record<string, unknown>;
  propMap: TypedPropMap<TSourceProps, PropPaths<Required<TTargetProps>>>;
  source: {
    component: string;
    packages: string[];
    propsType: string;
  };
  target: {
    component: string;
    minimumVersion?: string;
    package: string;
    propsType: string;
  };
};
