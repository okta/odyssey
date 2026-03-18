/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

export type GlobeIconProps = SvgIconNoChildrenProps;

const GlobeIcon = forwardRef<SVGSVGElement, GlobeIconProps>((props, ref) => {
  return (
    <SvgIcon
      fill="none"
      ref={ref}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <>
        <path
          clipRule="evenodd"
          d="M7.446 2.315C7.686 2.061 7.874 2 8 2c.126 0 .313.061.554.315.241.256.49.662.713 1.219.387.968.657 2.295.72 3.8H6.013c.062-1.505.332-2.832.72-3.8.222-.557.47-.963.712-1.219ZM4.68 7.333c.063-1.644.357-3.145.816-4.295a7.29 7.29 0 0 1 .278-.611 6.006 6.006 0 0 0-3.736 4.906H4.68ZM2.037 8.667a6.006 6.006 0 0 0 3.736 4.906 7.09 7.09 0 0 1-.278-.611c-.46-1.15-.753-2.65-.816-4.295H2.037Zm3.977 0h3.972c-.062 1.504-.332 2.83-.72 3.8-.222.556-.47.962-.712 1.218-.24.254-.428.315-.554.315-.126 0-.313-.061-.554-.315-.241-.256-.49-.662-.713-1.219-.387-.968-.657-2.295-.72-3.8Zm5.307 0c-.063 1.644-.357 3.145-.816 4.295a7.116 7.116 0 0 1-.278.611 6.006 6.006 0 0 0 3.736-4.906h-2.642Zm2.642-1.334a6.006 6.006 0 0 0-3.736-4.906c.1.194.192.398.278.611.46 1.15.753 2.65.816 4.295h2.642Zm1.37.667A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedGlobeIcon = memo(GlobeIcon);
MemoizedGlobeIcon.displayName = "GlobeIcon";

export { MemoizedGlobeIcon as GlobeIcon };
