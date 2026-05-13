/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

export type PersonaIconProps = SvgIconNoChildrenProps;

const PersonaIcon = forwardRef<SVGSVGElement, PersonaIconProps>(
  (props, ref) => {
    return (
      <SvgIcon
        fill="none"
        ref={ref}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <>
          <path
            clipRule="evenodd"
            d="M15.884 4C10.822 4 7 7.656 7 12.576V28h4.339v-6.882h4.545c5.062 0 8.884-3.656 8.884-8.542 0-4.92-3.822-8.576-8.884-8.576m4.546 8.576c0-2.733-1.963-4.613-4.546-4.613-2.582 0-4.545 1.88-4.545 4.613v4.578h4.545c2.583 0 4.546-1.879 4.546-4.578"
            fill="#2F4EF7"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedPersonaIcon = memo(PersonaIcon);
MemoizedPersonaIcon.displayName = "PersonaIcon";

export { MemoizedPersonaIcon as PersonaIcon };
