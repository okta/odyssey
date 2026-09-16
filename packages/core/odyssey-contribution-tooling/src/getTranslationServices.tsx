import type { UseTranslationOptions as UseI18NextTranslationOptions } from "react-i18next";

import i18n, { createInstance, TOptions } from "i18next";
import { memo, ReactElement, ReactNode, useEffect } from "react";
import {
  I18nextProvider,
  initReactI18next,
  Trans as TransI18nNext,
  TransProps as TransI18nNextProps,
  useTranslation as useI18nNextTranslation,
} from "react-i18next";

import type { TranslationBundleGroup } from "./getTranslationOverrideRestorePlan.js";
import type { DefaultSupportedLanguages } from "./translationServices.types.js";

import { getBundleWithRestoredOverrides } from "./getBundleWithRestoredOverrides.js";
import { getTranslationOverrideRestorePlan } from "./getTranslationOverrideRestorePlan.js";
import { getTypedObjectEntries } from "./getTypedObjectEntries.js";

/** A record of translation keys and their corresponding translated strings. */
export type I18nTranslationBundle = Record<string, string>;

/** A record of language codes and their corresponding translation bundles. */
export type ResourcesRecord = Record<string, I18nTranslationBundle>;

/**
 * Props for the `getTranslationServices` function.
 * It infers the supported language codes and bundle types from the `resources` object.
 */
export type GetTranslationServicesProps<
  TNamespace extends string,
  TResources extends ResourcesRecord,
  TDefaultLanguageCode extends Extract<keyof TResources, string>,
> = {
  /**
   * Default language code to fall back to.
   * MUST be one of the keys in the `resources` object.
   */
  defaultLanguageCode: TDefaultLanguageCode;
  /** The namespace for the translation resources. */
  namespace: TNamespace;
  /** The resources object, from which all language codes and bundle types are inferred. */
  resources: TResources;
};

export type TranslationOverrides<
  SupportedLanguageCodes extends string = DefaultSupportedLanguages,
> = Record<SupportedLanguageCodes, Partial<I18nTranslationBundle>>;

export type TranslationProviderProps<
  SupportedLanguageCodes extends string = DefaultSupportedLanguages,
> = {
  children: ReactNode;
  languageCode?: SupportedLanguageCodes;
  translationOverrides?: TranslationOverrides<SupportedLanguageCodes>;
};

type ExtractPlaceholders<TString extends string> =
  TString extends `${string}{{${infer PlaceholderId}}}${infer Rest}`
    ? PlaceholderId | ExtractPlaceholders<Rest>
    : never;

export type PlaceholderValues =
  | string
  | number
  | TemplateStringsArray
  | (string | TemplateStringsArray)[];

export type PlaceholderRecord<
  TResourceBundle extends I18nTranslationBundle,
  TKey extends keyof TResourceBundle & string,
> = Record<ExtractPlaceholders<TResourceBundle[TKey]>, PlaceholderValues>;

/**
 * Custom function signature that enforces strong typing
 * against the keys of a specific resource bundle.
 */
export type TypedTFunction<TResourceBundle extends I18nTranslationBundle> = <
  TKey extends keyof TResourceBundle & string,
>(
  key: TKey | TKey[],
  ...options: TKey extends keyof TResourceBundle
    ? // key exists in the resource bundle, we check for placeholders
      [ExtractPlaceholders<TResourceBundle[TKey]>] extends [never]
      ? [options?: TOptions] // no placeholders, options are optional
      : [options: TOptions<PlaceholderRecord<TResourceBundle, TKey>>] // placeholders exist, placeholder values are required
    : // key does not exist in the resource bundle
      [never]
) => string;

/**
 * Return type of our strongly-typed `useTranslation` hook.
 *
 * Matches the original `useTranslation` return type, but with
 * our `TypedTFunction` rather than the generic `TFunction`.
 */
export type TypedUseTranslationResponse<
  TResourceBundle extends I18nTranslationBundle,
> = [t: TypedTFunction<TResourceBundle>, i18n: typeof i18n, ready: boolean] & {
  i18n: typeof i18n;
  ready: boolean;
  t: TypedTFunction<TResourceBundle>;
};

export interface IGenericTranslationProvider {
  <SupportedLanguageCodes extends string = DefaultSupportedLanguages>(
    props: TranslationProviderProps<SupportedLanguageCodes>,
  ): ReactNode;
}

export type UseTranslationOptions<TNamespace extends string> = Omit<
  UseI18NextTranslationOptions<TNamespace>,
  "i18n"
>;

/**
 * A strongly-typed version of the `useTranslation` hook from `react-i18next`,
 * bound to a specific namespace and resource bundle type.
 */
export type UseTranslation<
  TNamespace extends string,
  TResourceBundle extends I18nTranslationBundle,
> = (
  options?: UseTranslationOptions<TNamespace>,
) => TypedUseTranslationResponse<TResourceBundle>;

export type TypedTrans<
  TNamespace extends string,
  TResourceBundle extends I18nTranslationBundle,
> = <TKey extends Extract<keyof TResourceBundle, string>>(
  props: Omit<
    TransI18nNextProps<TKey & string, TNamespace>,
    "i18n" | "values" | "i18nKey"
  > & {
    // explicitly type `i18nKey` to be the specific key
    i18nKey: TKey | TKey[];
  } & ([ExtractPlaceholders<TResourceBundle[TKey]>] extends [never] // add conditional `values` prop
      ? // if no placeholders, `values` is forbidden
        { values?: never }
      : // if placeholders exist, `values` is required and strictly typed
        {
          values: PlaceholderRecord<TResourceBundle, TKey>;
        }),
) => ReactElement;

export type TranslationServices<
  TNamespace extends string,
  TResources extends ResourcesRecord,
  TDefaultLanguageCode extends Extract<keyof TResources, string>,
> = {
  /** The i18next instance created for this package. */
  i18n: typeof i18n;
  Trans: TypedTrans<TNamespace, TResources[TDefaultLanguageCode]>;
  /**
   * A ready-to-use Translation Provider, which is a generic component.
   *
   * The consumer can specify the supported languages when using it.
   * @example <TranslationProvider<"en" | "ja">>
   */
  TranslationProvider: IGenericTranslationProvider;
  /** A pre-typed `useTranslation` hook bound to the given namespace. */
  useTranslation: UseTranslation<TNamespace, TResources[TDefaultLanguageCode]>;
};

/**
 * Initializes an `i18next` instance and provides strongly-typed
 * translation utilities: `useTranslation`, `Trans`, and `TranslationProvider`.
 */
export function getTranslationServices<
  TNamespace extends string,
  TResources extends ResourcesRecord,
  TDefaultLanguageCode extends Extract<keyof TResources, string>,
>({
  defaultLanguageCode,
  namespace,
  resources,
}: GetTranslationServicesProps<
  TNamespace,
  TResources,
  TDefaultLanguageCode
>): TranslationServices<TNamespace, TResources, TDefaultLanguageCode> {
  const i18nInstance = createInstance();

  i18nInstance
    .use(initReactI18next)
    .init({
      defaultNS: namespace,
      ns: [namespace],
      fallbackLng: defaultLanguageCode,
      load: "currentOnly",
      keySeparator: false,
      interpolation: {
        escapeValue: false,
        skipOnVariables: false,
      },
      react: {
        bindI18nStore: "added",
        useSuspense: false,
      },
    })
    .catch((error) => {
      console.error(
        `[odyssey-contribution-tooling] Error initializing i18nInstance for namespace: ${namespace}`,
      );
      console.error(error);
    });

  Object.entries(resources).forEach(([languageCode, bundle]) => {
    i18nInstance.addResourceBundle(languageCode, namespace, bundle);
  });

  // `getResourceBundle` is typed `any`, and it returns `undefined` rather than an
  // empty bundle when the instance holds nothing for that language.
  const getStoredBundle = (languageCode: string) =>
    i18nInstance.getResourceBundle(languageCode, namespace) as
      | TranslationBundleGroup
      | undefined;

  const TranslationProvider = <
    ProviderSupportedLanguageCodes extends string = DefaultSupportedLanguages,
  >({
    children,
    languageCode,
    translationOverrides,
  }: TranslationProviderProps<ProviderSupportedLanguageCodes>) => {
    useEffect(() => {
      const updatedLanguageCode = languageCode || window.navigator.language;
      i18nInstance.changeLanguage(updatedLanguageCode).catch((error) => {
        console.error(
          `[odyssey-contribution-tooling] Error changing language code in i18nInstance to: ${updatedLanguageCode}`,
        );
        console.error(error);
      });
    }, [languageCode]);

    useEffect(() => {
      if (!translationOverrides) {
        return;
      }

      const overrideEntries = getTypedObjectEntries(translationOverrides);

      // Snapshotting the live bundle, rather than the bundle
      // `getTranslationServices` was called with, is what makes teardown safe
      // for anything else that has written to this instance: an outer provider's
      // overrides and a consumer's own `addResourceBundle` are both part of the
      // state this provider restores.
      const restorePlanEntries = overrideEntries.map(
        ([languageCode, overrideBundle]) =>
          [
            languageCode,
            getTranslationOverrideRestorePlan({
              currentBundle: getStoredBundle(languageCode),
              overrideBundle,
            }),
          ] as const,
      );

      overrideEntries.forEach(([languageCode, overrideBundle]) => {
        i18nInstance.addResourceBundle(
          languageCode,
          namespace,
          overrideBundle,
          true,
          true,
        );
      });

      // `i18nInstance` is created once per package and shared by every consumer,
      // so an override applied here outlives the provider that asked for it
      // unless it is undone. Undoing it keeps a tree that mounts later in the
      // same page from inheriting strings it never opted into. In Storybook that
      // showed up as one story's overrides bleeding into unrelated stories
      // rendered after it in the same tab.
      return () => {
        restorePlanEntries.forEach(([languageCode, restorePlan]) => {
          const restoredBundle = getBundleWithRestoredOverrides({
            overriddenBundle: getStoredBundle(languageCode) ?? {},
            restorePlan,
          });

          // `removeResourceBundle` splices the namespace out of `options.ns`
          // whether or not the bundle existed, and only `addResourceBundle` puts
          // it back, so the re-add has to run on every path.
          i18nInstance.removeResourceBundle(languageCode, namespace);
          i18nInstance.addResourceBundle(
            languageCode,
            namespace,
            restoredBundle,
            true,
            true,
          );
        });
      };
    }, [translationOverrides]);

    return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
  };

  const MemoizedTranslationProvider = memo(TranslationProvider);
  MemoizedTranslationProvider.displayName = "TranslationProvider";

  const Trans: TypedTrans<TNamespace, TResources[TDefaultLanguageCode]> = (
    props,
  ) => {
    return (
      <TransI18nNext
        {...(props satisfies TransI18nNextProps<string, TNamespace>)}
        i18n={i18nInstance}
      />
    );
  };

  const useTranslation: UseTranslation<
    TNamespace,
    TResources[TDefaultLanguageCode]
  > = (options?: UseTranslationOptions<TNamespace>) => {
    const [t, i18n, ready] = useI18nNextTranslation(namespace, {
      ...options,
      i18n: i18nInstance,
    });
    const typedT = t as unknown as TypedTFunction<
      TResources[TDefaultLanguageCode]
    >;

    const result = [typedT, i18n, ready] as TypedUseTranslationResponse<
      TResources[TDefaultLanguageCode]
    >;

    result.t = typedT;
    result.i18n = i18n;
    result.ready = ready;

    return result;
  };

  return {
    i18n: i18nInstance,
    TranslationProvider: MemoizedTranslationProvider,
    Trans,
    useTranslation,
  };
}
