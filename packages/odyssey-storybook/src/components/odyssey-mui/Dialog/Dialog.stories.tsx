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

import { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Dialog,
  DialogContentText,
  DialogProps,
} from "@okta/odyssey-react-mui";
import { useCallback, useState } from "react";
import { userEvent, within, screen } from "@storybook/test";
import type { PlaywrightProps } from "../storybookTypes";
import { MuiThemeDecorator } from "../../../../.storybook/components";

// Explicitly type the Meta object
const storybookMeta: Meta<typeof Dialog> = {
  title: "MUI Components/Dialog",
  component: Dialog,
  argTypes: {
    primaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Dialog footer. Should almost always be of variant `primary`.",
      table: { type: { summary: "<Button />" } },
    },
    secondaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Dialog footer, alongside the `callToActionPrimaryComponent`.",
      table: { type: { summary: "<Button />" } },
    },
    tertiaryCallToActionComponent: {
      description:
        "An optional Button object to be situated in the Dialog footer, alongside the other two `callToAction` components.",
      table: { type: { summary: "<Button />" } },
    },
    children: {
      control: "text",
      description:
        "The content of the Dialog. May be a `string` or any other `ReactNode` or array of `ReactNode`s.",
      table: { type: { summary: "ReactNode | Array<ReactNode>" } },
      type: {
        required: true,
        name: "other",
        value: "ReactNode | Array<ReactNode>",
      },
    },
    isOpen: {
      control: "boolean",
      description: "When set to `true`, the Dialog will be visible.",
      table: { type: { summary: "boolean" } },
      type: { required: true, name: "boolean" },
    },
    onClose: {
      description:
        "Callback that controls what happens when the dialog is dismissed",
      table: { type: { summary: "func" } },
    },
    title: {
      control: "text",
      table: { type: { summary: "string" } },
      type: { required: true, name: "string" },
    },
  },
  args: {
    children:
      "You are initiating this ship's self-destruct protocol. This ship, and its occupants, will be destroyed.",
    title: "Initiate self-destruct protocol",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

const findDialogElement = async ({
  canvasElement,
  step,
}: PlaywrightProps<DialogProps>) => {
  await step("Check Dialog", async () => {
    const canvas = within(canvasElement);
    const buttonElement = canvas.getByText("Open dialog");
    await userEvent.click(buttonElement);
    await screen.findByRole("dialog");
  });
};

const DefaultTemplate: StoryObj<DialogProps> = {
  render: function C(props: DialogProps) {
    const [isVisible, setIsVisible] = useState(false);

    const onOpen = useCallback(() => {
      setIsVisible(true);
    }, []);

    const onClose = useCallback(() => {
      setIsVisible(false);
    }, []);

    return (
      <>
        <Button label="Open dialog" onClick={onOpen} variant="primary" />
        <Dialog
          {...props}
          primaryCallToActionComponent={
            <Button
              label="Primary action"
              onClick={onClose}
              variant="primary"
            />
          }
          secondaryCallToActionComponent={
            <Button
              label="Secondary action"
              onClick={onClose}
              variant="secondary"
            />
          }
          tertiaryCallToActionComponent={
            <Button label="Cancel" onClick={onClose} variant="floating" />
          }
          onClose={onClose}
          isOpen={isVisible}
        />
      </>
    );
  },
};

export const Default: StoryObj<DialogProps> = {
  ...DefaultTemplate,
  args: {
    children:
      "You are initiating this ship's self-destruct protocol. This ship, and its occupants, will be destroyed.",
    title: "Initiate self-destruct protocol",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<DialogProps>) => {
    await findDialogElement({ canvasElement, step });
  },
};

export const Long: StoryObj<DialogProps> = {
  ...DefaultTemplate,
  parameters: {
    docs: {
      description: {
        story:
          "If the `Dialog` content is longer than the available space, the body will automatically receive top and bottom borders to indicate scrollability.",
      },
    },
  },
  args: {
    children: (
      <>
        <DialogContentText>
          For example, a Contributor (the Initial Developer in (a) the power,
          direct or indirect, to cause the whole must be sufficiently detailed
          for a particular version of the Work, you may distribute a complete,
          unmodified copy of the operating system on which the editorial
          revisions, annotations, elaborations, or other work as a result of any
          kind, either expressed or implied, including, without limitation,
          Section 2. Any Modifications that alter or restrict this License
          incorporates the limitation as if written in the Work that has
          Contributed a Contribution incorporated within the Work. This license
          has been advised of the Work. This could, for example, why
          distributing LaTeX under the GNU Library General Public License from
          time to time. Each version will be given a distinguishing version
          number.
        </DialogContentText>
        <DialogContentText>
          If the Recipient may use this wording to make the derivative work
          available to such recipients. You are located in the case of each
          Contributor, changes to the combination of their Contribution(s) alone
          or when combined with the complete corresponding machine-readable
          source code, which must be included with each copy of this License
          Agreement (except that you distribute, to contain a file containing
          Original Code or Modifications that you include complete instructions
          on demand or cease distribution within thirty (30) days of becoming
          aware of the LaTeX Project Public License, either version 2 of the
          date You accept this license. Provisions that, by their nature, should
          remain in effect beyond the termination of this Agreement more than
          fifty percent (50%) of the Source Code or any derivative version,
          provided, however, that the Source Code of Your Externally Deployed
          Modifications must be included in the course of creating the Derived
          Work.
        </DialogContentText>
        <DialogContentText>
          You distribute the Source Code version of Licensed Product has been
          generated from a designated place, then offering equivalent access to
          copy the source code. Distribution Mechanism"). The Source Code of the
          date that such additional attribution requirements to the following
          terms are defined when they are first used, and the date it initially
          became available, or at least the "copyright" line and a pointer to
          where the Work unless that component is used with the Wikimedia
          community. Text from external sources may attach additional
          attribution requirements to the terms of this License Agreement will
          be guided by the terms under which it was received. In addition, after
          a new version of the Derivative Works that consist of the use or not
          licensed at no charge to all third parties, if you received it.
          Distribution of only part of the Work and reproducing the content of
          the Work, but excluding communication that is used under "fair use"
          exemptions, or similar exemptions of copyright (separated by comma,
          not as a result of any warranty; and give any other trademarks,
          service marks, logos or trade names "Apple", "Apple Computer", "Mac",
          "Mac OS", "QuickTime", "QuickTime Streaming Server" or any subsequent
          version of the Initial Developer or such Contributor by reason of your
          rights to a patent infringement against Apple; provided that you
          receive from any Contributor. Disclaimer of Warranty: THE PACKAGE IS
          PROVIDED "AS IS" BASIS, WITHOUT WARRANTY OF MERCHANTABILITY AND
          FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
          IN NO EVENT SHALL THE COPYRIGHT HOLDERS BE LIABLE TO YOU FOR DAMAGES,
          INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES,
          SO THIS LIMITATION OF LIABILITY SHALL NOT BE LIABLE FOR ANY SPECIAL,
          INDIRECT OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO THE
          LICENSED PRODUCT IS FREE OF CHARGE, THERE IS NO WARRANTY EXCEPT AS
          EXPRESSLY SET FORTH IN THIS AGREEMENT, NEITHER RECIPIENT NOR ANY
          CONTRIBUTORS SHALL HAVE ANY LIABILITY FOR ANY CLAIM, DAMAGES OR OTHER
          TORTIOUS ACTION, ARISING OUT OF THE POSSIBILITY OF SUCH DAMAGES.
          GENERAL If any Recipient extracts Embedded Fonts of the Licensed
          Program.
        </DialogContentText>
        <DialogContentText>
          The Recipient may conduct Reproduction and Other Exploitation of the
          Work, though it does not create potential liability for other
          Contributors. No hardware per se is licensed hereunder. Recipient
          understands that although Apple and each Contributor hereby grants You
          a perpetual, worldwide, non-exclusive, no-charge, royalty-free,
          irrevocable (except as part of a Larger Work, in any form other than
          such Participant's Contributor Version directly or indirectly
          infringes any patent, then any and all rights granted by this license;
          they are willing to receive error reports for the physical act of
          running the Work constitutes direct or indirect, to cause the
          direction or management of such termination, the Recipient may select
          either this Agreement , including but not limited to, loss of data,
          programs or works based on the Program in a more-or-less customary
          fashion, plus the scripts used to endorse or promote products derived
          from the contents of a Larger Work, in any medium without restriction,
          provided that such litigation is filed. All Recipient's rights under
          this License Agreement.
        </DialogContentText>
        <DialogContentText>
          ACCEPT CWI LICENSE AGREEMENT is between the Python Software
          Foundation; All Rights Reserved. In addition, after a new version of
          this Package in a manner that reasonably allows subsequent Recipients
          to identify the originator of its contributors may be used to control
          compilation and installation of the source code. And you must tell
          them their rights. We protect your rights with two steps: (1)
          copyright the software, or if you distribute must include a copy of
          this section do not download or use the Work and Derivative Works as
          products under any other entity based on or through a hyperlink (where
          possible) or URL to an alternative, stable online copy which is freely
          accessible, which conforms with the distribution.
        </DialogContentText>
        <DialogContentText>
          Neither the name of the Program. Contributors may not be used in
          advertising or publicity pertaining to distribution of a storage or
          distribution of the use is attributed and the intellectual property
          rights or licenses to the community even when you distribute of the
          Copyright Holder of a part or all of the Derived Work must provide
          sufficient documentation as part of your own. The scripts and library
          files supplied as input to or deletion from the Sun Public License. Of
          course, the commands you use `maintained', as the (new) Current
          Maintainer.
        </DialogContentText>
        <DialogContentText>
          You should preferably distribute the Program by such Participant, or
          (ii) a license of your Derivative Works a copy of this License with
          respect to disputes in which case the failure of the Work that has
          contributed code or can get it if you distribute the Executable
          version or as part of a modification, addition, deletion, replacement
          or any Contributor that the Source form. Permission for Use and
          Modification Without Distribution (1) You are permitted provided that
          you comply with any of the Covered Code which are properly granted
          shall survive any termination of this License, You may charge fees for
          other programs. The license agreements of most software are designed
          to make it enforceable.
        </DialogContentText>
        <DialogContentText>
          This License to distribute copies of the Package, if it was received.
          In addition, after a new version of this License. If You distribute or
          change NetHack. COPYING POLICIES You may Distribute Compiled forms of
          the Licensed Product, or for a recipient of ordinary skill to be bound
          by the parties hereto, such provision shall be deemed a waiver of
          future enforcement of that version. You may distribute Licensed
          Product under the terms applicable to software source code, to be
          covered by this License; and You hereby grant to any trademark,
          service mark, tradename, or logo of the Modified Version.
        </DialogContentText>
      </>
    ),
    title: "Cryosleep liability waiver",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<DialogProps>) => {
    await findDialogElement({ canvasElement, step });
  },
};

export const NoButtons: StoryObj<DialogProps> = {
  render: function C(props: DialogProps) {
    const [isVisible, setIsVisible] = useState(false);

    const onOpen = useCallback(() => {
      setIsVisible(true);
    }, []);

    const onClose = useCallback(() => {
      setIsVisible(false);
    }, []);

    return (
      <>
        <Button label="Open dialog" onClick={onOpen} variant="primary" />
        <Dialog {...props} onClose={onClose} isOpen={isVisible} />
      </>
    );
  },
  args: {
    children:
      "By closing this Dialog you agree to adhere to the Ceres Station terms of use.",
    title: "Ceres Station docking terms",
  },
  play: async ({ canvasElement, step }: PlaywrightProps<DialogProps>) => {
    await findDialogElement({ canvasElement, step });
  },
};
