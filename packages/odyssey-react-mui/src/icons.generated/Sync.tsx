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
import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon";

export type SyncIconProps = SvgIconNoChildrenProps;

const SyncIcon = forwardRef<SVGSVGElement, SyncIconProps>((props, ref) => {
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
          d="M17.293 2.707 19.586 5H5a3 3 0 0 0-3 3v5.757l2-2V8a1 1 0 0 1 1-1h14.586l-2.293 2.293 1.414 1.414 3.434-3.434.017-.017c.084-.084.185-.184.266-.28.094-.111.22-.28.296-.512a1.5 1.5 0 0 0 0-.928 1.508 1.508 0 0 0-.296-.512c-.081-.096-.182-.196-.266-.28l-.017-.017-3.434-3.434-1.414 1.414ZM20 16v-3.757l2-2V16a3 3 0 0 1-3 3H4.414l2.293 2.293-1.414 1.414-3.434-3.434-.017-.017c-.084-.084-.185-.184-.266-.28a1.506 1.506 0 0 1-.295-.512 1.5 1.5 0 0 1 0-.927c.075-.233.2-.402.295-.513.081-.096.182-.196.266-.28l.017-.017 3.434-3.434 1.414 1.414L4.414 17H19a1 1 0 0 0 1-1Z"
          fill="currentColor"
        />
      </>
    </SvgIcon>
  );
});

const MemoizedSyncIcon = memo(SyncIcon);
MemoizedSyncIcon.displayName = "SyncIcon";

export { MemoizedSyncIcon as SyncIcon };
