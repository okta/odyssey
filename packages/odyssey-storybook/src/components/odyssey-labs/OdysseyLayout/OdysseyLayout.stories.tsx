/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Meta, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  Planet,
  columns as planetColumns,
  data as planetData,
} from "../../odyssey-mui/DataTable/planetData";
import {
  Grid,
  OdysseyLayout,
  OdysseyLayoutProps,
} from "@okta/odyssey-react-mui/labs";
import { Box, Button, DataTable } from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";

// const drawerLongText = (
//   <>
//     <div>
//       Okta Privileged Access is a Privileged Access Management (PAM) solution
//       designed to help customers mitigate the risk of unauthorized access to
//       resources, a critical area of security and risk management in any
//       organization. Okta Privileged Access builds on the current server access
//       control capabilities provided with Okta Advanced Server Access and
//       delivers a unified approach to managing access to all your privileged
//       accounts. It securely connects people, machines, and applications to
//       privileged resources such as servers, containers, and enterprise apps.
//     </div>
//     <div>
//       A critical capability that Okta Privileged Access offers is the separation
//       of administrative roles and responsibilities. Management of users and
//       groups, resources, and security are separated, with each administrative
//       role designed to perform a specific function. For example, the management
//       of security policies to access resources is separated and decoupled from
//       the administration of the resources. To meet this requirement, the team
//       that sets the policy is separated from the team that administers the
//       resource. Likewise, the administrator managing users and groups can only
//       perform user and group management tasks and isn't involved in
//       administering resources or creating security policies.
//     </div>
//     <div>
//       The level of access within a Okta Privileged Access team depends on the
//       role that you're assigned and the permissions granted to that role. The
//       table below discusses the types of roles, and each has a unique set of
//       permissions and restrictions.To start using Okta Privileged Access, you
//       need to add the Okta Privileged Access OIN application to your Okta org.
//       You can then sync your users and groups from the Okta Universal Directory
//       by configuring SCIM. End users must install the Okta Privileged Access
//       client in their local machine, enroll the client, and then access their
//       dashboard using the link provided by their team administrator.
//     </div>
//   </>
// );

const drawerShortText = (
  <div>
    Okta Privileged Access is a Privileged Access Management (PAM) solution
    designed to help customers mitigate the risk of unauthorized access to
    resources, a critical area of security and risk management in any
    organization. Okta Privileged Access builds on the current server access
    control capabilities provided with Okta Advanced Server Access and delivers
    a unified approach to managing access to all your privileged accounts. It
    securely connects people, machines, and applications to privileged resources
    such as servers, containers, and enterprise apps.
  </div>
);

const storybookMeta: Meta<OdysseyLayoutProps> = {
  title: "Labs Components/OdysseyLayout",
  component: OdysseyLayout,
  argTypes: {
    title: {
      control: "text",
      table: {
        type: {
          required: true,
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
  },
  decorators: [MuiThemeDecorator],
  parameters: {
    backgrounds: {
      default: "gray",
      values: [
        { name: "gray", value: "#f4f4f4" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default storybookMeta;

export const Basic: StoryObj<OdysseyLayoutProps> = {
  args: {},
  render: function C() {
    const [data] = useState<Planet[]>(planetData);
    const [isOverlayDrawerVisible, setIsOverlayVisible] = useState(false);
    const [isEmbeddedDrawerVisible, setIsEmbeddedVisible] = useState(false);

    const getData = useCallback(() => {
      return data;
    }, [data]);

    const onOpenOverlayDrawer = useCallback(() => {
      setIsOverlayVisible(true);
    }, []);

    const onCloseOverlayDrawer = useCallback(() => {
      setIsOverlayVisible(false);
    }, []);

    const onOpenEmbeddedDrawer = useCallback(() => {
      setIsEmbeddedVisible(true);
    }, []);

    const onCloseEmbeddedDrawer = useCallback(() => {
      setIsEmbeddedVisible(false);
    }, []);

    return (
      <OdysseyLayout
        title="Table title"
        description="Optional brief description about the page"
        documentationLink="https://www.okta.com/"
        documentationText="Documentation"
        primaryCallToActionComponent={
          <Button
            label={
              isOverlayDrawerVisible
                ? "Close overlay drawer"
                : "Open overlay drawer"
            }
            variant="primary"
            onClick={
              isOverlayDrawerVisible
                ? onCloseOverlayDrawer
                : onOpenOverlayDrawer
            }
          />
        }
        secondaryCallToActionComponent={
          <Button
            label={
              isEmbeddedDrawerVisible
                ? "Close embedded drawer"
                : "Open embedded drawer"
            }
            variant="secondary"
            onClick={
              isEmbeddedDrawerVisible
                ? onCloseEmbeddedDrawer
                : onOpenEmbeddedDrawer
            }
          />
        }
        tertiaryCallToActionComponent={
          <Button label="Action 3" variant="secondary" />
        }
        // drawer={
        //   // <Drawer
        //   //   variant="persistent"
        //   //   title="Drawer title"
        //   //   primaryCallToActionComponent={
        //   //     <Button label="Primary" onClick={onCloseEmbeddedDrawer} variant="primary" />
        //   //   }
        //   //   onClose={onCloseEmbeddedDrawer}
        //   //   isOpen={isEmbeddedDrawerVisible}
        //   //   showDividers
        //   // >
        //   //   {drawerShortText}
        //   // </Drawer>
        //   <Drawer
        //     variant="temporary"
        //     title="Drawer title"
        //     primaryCallToActionComponent={
        //       <Button label="Primary" onClick={onCloseOverlayDrawer} variant="primary" />
        //     }
        //     onClose={onCloseOverlayDrawer}
        //     isOpen={isOverlayDrawerVisible}
        //     showDividers
        //   >
        //     {drawerLongText}
        //   </Drawer>
        // }
      >
        <Grid columns={[2, 1]}>
          <DataTable
            columns={planetColumns}
            getData={getData}
            hasSearch
            hasFilters
          />
          <Box>{drawerShortText}</Box>
        </Grid>
        <Grid columns={[1]}>
          <DataTable
            columns={planetColumns}
            getData={getData}
            hasSearch
            hasFilters
          />
        </Grid>
      </OdysseyLayout>
    );
  },
};
