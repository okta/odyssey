import * as odysseyIconsExport from "@okta/odyssey-react-mui/icons";
import { SideNavItem } from "@okta/odyssey-react-mui/labs";
import {
  renderUiShell as odysseyRenderUiShell,
  type RenderedUiShell,
  type UiShellNavComponentProps,
} from "@okta/odyssey-react-mui/ui-shell";
import { createElement, type ReactElement } from "react";

type IconDictionary = Omit<typeof odysseyIconsExport, "default">;

const iconDictionary: IconDictionary = odysseyIconsExport;

export {
  adminAppUiShellBreakpoints,
  TURN_OFF_APP_SWITCHER,
  useUiShellBreakpoints,
} from "@okta/odyssey-react-mui/ui-shell";

export type NavigationApp = {
  appIconDefaultUrl: string;
  appIconSelectedUrl: string;
  appName: string;
  label: string;
  linkUrl: string;
};

export type ModifiedSideNavItem = Omit<
  SideNavItem,
  | "endIcon"
  | "href"
  | "isDefaultExpanded"
  | "isExpanded"
  | "isSectionHeader"
  | "isSortable"
  | "nestedNavItems"
  | "startIcon"
> &
  (
    | {
        endIcon?: never;
        /**
         * Name of the icon to display after the nav item text.
         */
        endIconName?: keyof typeof iconDictionary;
      }
    | {
        /**
         * The icon element to display after the nav item text. Only use this with images that don't have React context. Even the official Odyssey Icons use MUI which references the MUI theme in context and will error when rendered in Unified UI Shell.
         */
        endIcon?: SideNavItem["endIcon"];
        endIconName?: never;
      }
  ) &
  (
    | {
        startIcon?: never;
        /**
         * Name of the icon to display before the text.
         */
        startIconName?: keyof typeof iconDictionary;
      }
    | {
        /**
         * The icon element to display before the nav item text. Only use this with images that don't have React context. Even the official Odyssey Icons use MUI which references the MUI theme in context and will error when rendered in Unified UI Shell.
         */
        startIcon?: SideNavItem["startIcon"];
        startIconName?: never;
      }
  ) &
  (
    | {
        href?: never;
        isDefaultExpanded?: never;
        isExpanded?: never;
        /**
         * Determines if the side nav item is a section header
         */
        isSectionHeader: true;
        isSortable?: never;
        nestedNavItems?: never;
      }
    | {
        /**
         * link added to the nav item. if it is undefined, static text will be displayed.
         * fires onClick event when it is passed
         */
        href?: string;
        isDefaultExpanded?: never;
        isExpanded?: never;
        isSectionHeader?: never;
        isSortable?: boolean;
        nestedNavItems?: never;
      }
    | {
        endIcon?: never;
        endIconName?: never;
        href?: never;
        /**
         * Whether the accordion (nav item with nestedNavItems) is expanded by default
         */
        isDefaultExpanded?: boolean;
        /**
         * If true, expands the accordion, otherwise collapse it.
         * Setting this prop enables control over the accordion.
         */
        isExpanded?: boolean;
        /**
         * If true, enables sorting for the accordion items
         */
        isSectionHeader?: never;
        isSortable?: boolean;
        /**
         * An array of side nav items to be displayed as nestedNavItems within Accordion
         */
        nestedNavItems: ModifiedSideNavItem[];
      }
  );

export type ModifiedUiShellNavComponentProps = Omit<
  UiShellNavComponentProps,
  "sideNavProps"
> & {
  sideNavProps?: Omit<
    NonNullable<UiShellNavComponentProps["sideNavProps"]>,
    "sideNavItems"
  > & {
    sideNavItems?: ModifiedSideNavItem[];
  };
};

/**
 * `ComponentPropsStateAction` is a `SetStateAction` from React, but the types are unique.
 *
 * If you are getting a previous state, it will always be `UiShellNavComponentProps` because that's what Odyssey's `SideNav` gives you. You'll wanna give it back a `UiShellNavComponentProps` as well.
 *
 * If you're passing in a new state, it will be either a `UiShellNavComponentProps` or `ModifiedUiShellNavComponentProps`, but since `ModifiedUiShellNavComponentProps` is a superset of `UiShellNavComponentProps`, we don't need to include it here, or it'll cause other type issues.
 */
export type ModifiedComponentPropsStateAction =
  | ModifiedUiShellNavComponentProps
  | ((
      previousComponentProps: UiShellNavComponentProps,
    ) => UiShellNavComponentProps);

export type ModifiedSetComponentProps = (
  componentPropsStateAction: ModifiedComponentPropsStateAction,
) => void;

type ComputeComponentProps = (
  componentProps: ModifiedUiShellNavComponentProps,
) => UiShellNavComponentProps;

export type ModifiedRenderUiShellReturnValues = Omit<
  ReturnType<typeof odysseyRenderUiShell>,
  "setComponentProps"
> & {
  setComponentProps: ModifiedSetComponentProps;
};

export type ModifiedRenderUiShell = (
  args: Omit<Parameters<typeof odysseyRenderUiShell>[0], "onRender"> & {
    /**
     * If `true`, the UI Component Checker is enabled.
     *
     * @default false
     * @see {@link https://github.com/atko-eng/odyssey-design-system/blob/master/packages/platform/ui-component-identifier/README.md|UI Component Identifier Documentation}
     */
    isUiComponentCheckerEnabled?: boolean;
    onRender?: (uiShellReturnValues: ModifiedRenderUiShellReturnValues) => void;
  },
) => ModifiedRenderUiShellReturnValues;

const getIcon = ({
  icon,
  iconName,
}: {
  icon?: ReactElement;
  iconName?: Exclude<keyof IconDictionary, "default">;
}) =>
  iconName && iconName in iconDictionary
    ? createElement(iconDictionary[iconName])
    : icon;

export const renderUiShell: ModifiedRenderUiShell = (
  odysseyRenderUiShellArgs,
) => {
  if (odysseyRenderUiShellArgs.isUiComponentCheckerEnabled) {
    console.debug(
      "[Unified UI Shell] Attempting to load the UI Component Checker.",
    );
    import("@okta/odyssey-contributions-ui-component-identifier")
      .then(({ setupOdysseyDebugListener }) => {
        setupOdysseyDebugListener();
      })
      .catch((error) => {
        console.error(
          "[Unified UI Shell] Failed to load the UI Component Checker.",
          error,
        );
      });
  }

  const computeModifiedComponentProps: ComputeComponentProps = (
    componentProps,
  ) => ({
    ...componentProps,
    ...("sideNavProps" in componentProps
      ? {
          sideNavProps: {
            ...componentProps.sideNavProps,
            ...{
              sideNavItems: componentProps.sideNavProps?.sideNavItems?.map(
                (sideNavItem) => ({
                  ...sideNavItem,
                  nestedNavItems:
                    "nestedNavItems" in sideNavItem &&
                    sideNavItem.nestedNavItems
                      ? sideNavItem.nestedNavItems.map((nestedNavItem) => ({
                          ...nestedNavItem,
                          endIcon: getIcon({
                            icon: nestedNavItem.endIcon,
                            iconName: nestedNavItem.endIconName,
                          }),
                        }))
                      : undefined,
                  endIcon: getIcon({
                    icon: sideNavItem.endIcon,
                    iconName: sideNavItem.endIconName,
                  }),
                  startIcon: getIcon({
                    icon: sideNavItem.startIcon,
                    iconName: sideNavItem.startIconName,
                  }),
                }),
                // We can do this `as` with `satisfies`, but the complex discriminated unions in `SideNavItem` make this nearly impossible. It's simplest to write the JavaScript and let the user-facing types and React code handle the rest as they're already managing this situation.
              ) as SideNavItem[],
            },
          },
        }
      : {
          sideNavItems: [] satisfies SideNavItem[],
        }),
  });

  const onRender = (onRenderUiShellReturnValues: RenderedUiShell) => {
    if (odysseyRenderUiShellArgs.onRender) {
      odysseyRenderUiShellArgs.onRender({
        ...onRenderUiShellReturnValues,
        appElement: onRenderUiShellReturnValues.appElement!, // `!` makes TypeScript happy; appElement will definitely be defined by the time this is called.
        setComponentProps,
      });
    }
  };

  const {
    setComponentProps: originalSetComponentProps,
    ...uiShellReturnValues
  } = odysseyRenderUiShell({
    ...odysseyRenderUiShellArgs,

    onRender,
  });

  const setComponentProps: ModifiedSetComponentProps = (
    componentPropsStateAction,
  ) =>
    originalSetComponentProps(
      typeof componentPropsStateAction === "function"
        ? (previousComponentProps) =>
            computeModifiedComponentProps(
              componentPropsStateAction(
                previousComponentProps,
                // `ModifiedUiShellNavComponentProps` is a superset of `UiShellNavComponentProps`, but `computeModifiedComponentProps` has issues when you tell it one or the other will be passed in. It vastly increases the complexity of that function, so we're using `as` here instead.
              ) as ModifiedUiShellNavComponentProps,
            )
        : computeModifiedComponentProps(componentPropsStateAction),
    );

  return { ...uiShellReturnValues, setComponentProps };
};
