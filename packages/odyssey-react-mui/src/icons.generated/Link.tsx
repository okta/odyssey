/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// Code automatically generated; DO NOT EDIT.

import { forwardRef, memo } from "react";
import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon.js";

export type LinkIconProps = SvgIconNoChildrenProps;

const LinkIcon = forwardRef<SVGSVGElement, LinkIconProps>((props, ref) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m20.927 2.934.069.068.068.069c.395.395.689.688.899.994a4 4 0 0 1 0 4.526c-.21.306-.504.6-.899.994l-.068.068-4.023 4.023-.03.03c-.569.569-1.038 1.039-1.452 1.39-.43.365-.865.66-1.383.829a4 4 0 0 1-2.472 0c-.518-.168-.954-.464-1.383-.829a21.726 21.726 0 0 1-1.2-1.138l1.414-1.414c.456.455.792.783 1.08 1.027.335.285.54.398.707.452a2 2 0 0 0 1.236 0c.167-.054.371-.167.706-.452.345-.292.757-.703 1.363-1.309l4.023-4.023c.493-.493.64-.647.732-.78a2 2 0 0 0 0-2.263c-.092-.133-.239-.286-.732-.78-.494-.493-.647-.64-.78-.731a2 2 0 0 0-2.263 0c-.133.091-.286.238-.78.732l-1.181 1.181a5.153 5.153 0 0 0-.721-.297 6 6 0 0 0-1.526-.284l2.014-2.015.068-.068c.395-.395.688-.688.994-.898a4 4 0 0 1 4.526 0c.306.21.6.503.994.898Zm-6.305 5.098c.351.298.742.682 1.2 1.138l-1.414 1.415a19.95 19.95 0 0 0-1.08-1.028c-.336-.285-.54-.397-.707-.451a2 2 0 0 0-1.236 0c-.167.054-.372.166-.707.451-.344.292-.756.704-1.362 1.31l-4.9 4.898c-.493.494-.64.647-.731.78a2 2 0 0 0 0 2.263c.091.133.238.286.732.78.493.494.646.64.78.732a2 2 0 0 0 2.263 0c.133-.091.286-.238.78-.732l2.057-2.058c.223.112.463.213.72.297a5.982 5.982 0 0 0 1.527.285l-2.89 2.89-.069.069c-.395.395-.688.688-.994.898a4 4 0 0 1-4.526 0c-.306-.21-.6-.503-.994-.898l-.069-.069-.068-.068c-.395-.395-.688-.688-.898-.994a4 4 0 0 1 0-4.526c.21-.306.503-.6.898-.994l.068-.069 4.9-4.899.029-.03c.569-.568 1.039-1.038 1.453-1.39.43-.365.865-.66 1.383-.829a4 4 0 0 1 2.472 0c.518.169.953.464 1.383.83Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedLinkIcon = memo(LinkIcon);
MemoizedLinkIcon.displayName = "LinkIcon";

export { MemoizedLinkIcon as LinkIcon };
