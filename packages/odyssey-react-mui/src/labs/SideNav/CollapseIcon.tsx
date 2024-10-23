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

import { memo } from "react";

const CollapseIcon = () => {
  return (
    <svg
      id="sidenavcollapseicon"
      width="32"
      height="32"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.55226 9.99998L11.2761 2.27612L9.39051 0.390503L0.723837 9.05717C0.473789 9.30722 0.333313 9.64636 0.333313 9.99998C0.333313 10.3536 0.473789 10.6927 0.723837 10.9428L9.3905 19.6095L11.2761 17.7238L3.55226 9.99998Z"
        fill="#6E6E6E"
      />
    </svg>
  );
};
const MemoizedCollapseIcon = memo(CollapseIcon);

export { MemoizedCollapseIcon as CollapseIcon };
