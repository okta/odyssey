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
          d="M11.17 3.473c.36-.381.64-.473.83-.473.189 0 .47.091.83.473.363.384.736.992 1.07 1.827.581 1.454.986 3.443 1.08 5.7H9.02c.094-2.257.499-4.246 1.08-5.7.334-.835.707-1.443 1.07-1.827ZM7.019 11c.094-2.467.534-4.718 1.224-6.442.128-.32.267-.627.416-.918A9.009 9.009 0 0 0 3.055 11h3.964Zm-3.964 2a9.009 9.009 0 0 0 5.604 7.36c-.15-.29-.288-.598-.416-.918-.69-1.724-1.13-3.975-1.224-6.442H3.055Zm5.966 0h5.958c-.093 2.257-.498 4.246-1.079 5.7-.334.835-.707 1.444-1.07 1.827-.36.381-.641.473-.83.473-.189 0-.47-.091-.83-.473-.363-.384-.736-.992-1.07-1.827-.581-1.454-.986-3.443-1.08-5.7Zm7.96 0c-.094 2.467-.534 4.718-1.224 6.442-.128.32-.267.627-.416.918A9.009 9.009 0 0 0 20.945 13h-3.964Zm3.964-2a9.009 9.009 0 0 0-5.604-7.36c.15.29.288.598.416.918.69 1.724 1.13 3.975 1.224 6.442h3.964ZM23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedGlobeIcon = memo(GlobeIcon);
MemoizedGlobeIcon.displayName = "GlobeIcon";

export { MemoizedGlobeIcon as GlobeIcon };
