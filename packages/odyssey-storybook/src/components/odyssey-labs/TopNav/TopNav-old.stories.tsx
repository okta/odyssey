/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// import { TopNav, TopNavProps, UserProfile } from "@okta/odyssey-react-mui/labs";
// import { Meta, StoryObj } from "@storybook/react";
// import { MuiThemeDecorator } from "../../../../.storybook/components";
// import { Button, SearchField } from "@okta/odyssey-react-mui";
// import { UserIcon } from "@okta/odyssey-react-mui/icons";

// const storybookMeta: Meta<TopNavProps> = {
//   title: "Labs Components/TopNav",
//   component: TopNav,
//   argTypes: {
//     additionalNavItem: {
//       description:
//         "Additional element to be displayed at the end of the top nav",
//       table: {
//         type: {
//           summary: "ReactElement (Button)",
//         },
//       },
//     },
//     helpPageHref: {
//       description: "Display the help icon/link",
//       table: {
//         type: {
//           summary: "boolean",
//         },
//       },
//     },
//     searchField: {
//       control: "ReactElement",
//       description: "Display global search field",
//       table: {
//         type: {
//           summary: "ReactElement (SearchField)",
//         },
//       },
//     },
//     settingsPageHref: {
//       description: "Display the settings icon/link",
//       table: {
//         type: {
//           summary: "boolean",
//         },
//       },
//     },
//     topNavLinkItems: {
//       description: "Array of links to be displayed in the top nav",
//       table: {
//         type: {
//           summary: "Array<TopNavLinkItem>",
//         },
//       },
//     },
//     userProfile: {
//       description: "Shows the logged in user account info",
//       table: {
//         type: {
//           summary: "UserProfileProps",
//         },
//       },
//     },
//   },
//   args: {
//     additionalNavItem: <Button variant="secondary" label="Connect Builder" />,
//     helpPageHref: "#none",
//     searchField: <SearchField label="Search" placeholder="Search..." />,
//     settingsPageHref: "#none",
//     topNavLinkItems: [
//       {
//         id: "link-01",
//         label: "Home",
//         href: "#none",
//       },
//       {
//         id: "link-02",
//         label: "Flows",
//         href: "#none",
//       },
//       {
//         id: "link-03",
//         label: "Connections",
//         href: "#none",
//         isDisabled: true,
//       },
//       {
//         id: "link-04",
//         label: "Template",
//         onClick: () => {},
//       },
//     ],
//     userProfile: (
//       <UserProfile
//         profileIcon={<UserIcon />}
//         orgName="ORG123"
//         userName="test.user@test.com"
//       />
//     ),
//   },
//   decorators: [MuiThemeDecorator],
//   parameters: {
//     layout: "fullscreen",
//   },
//   tags: ["autodocs"],
// };

// export default storybookMeta;

// export const Default: StoryObj<TopNavProps> = {
//   render: (props: TopNavProps) => {
//     return <TopNav {...props} />;
//   },
// };
