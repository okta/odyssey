import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges/manager-helpers";
import { addons } from "storybook/manager-api";

import theme from "./odysseyStorybookTheme";

addons.setConfig({
  theme,
  tagBadges: [
    {
      tags: "deprecated",
      badge: {
        text: "Deprecated",
        style: {
          backgroundColor: "#7e2845",
          color: "#f4ecec",
        },
        tooltip:
          "This component has possibly been superseded by another component and will be removed in a future release.",
      },
      display: {
        mdx: true,
        toolbar: true,
      },
    },
    {
      tags: "icons-export",
      badge: {
        text: "/icons",
        style: {
          backgroundColor: "#134a97",
          color: "#e3e8ed",
        },
        tooltip: "These are in the `/icons` export.",
      },
      display: {
        mdx: true,
        toolbar: true,
      },
    },
    {
      tags: "labs-export",
      badge: {
        text: "/labs",
        style: {
          backgroundColor: "#978613",
          color: "#edece3",
        },
        tooltip:
          "This component's API is experimental and may change in future releases. These are in the `/labs` export.",
      },
      display: {
        mdx: true,
        toolbar: true,
      },
    },
    ...defaultConfig.filter(
      (badge) => !["deprecated"].includes(badge.tags as string),
    ),
  ] satisfies TagBadgeParameters,
});
