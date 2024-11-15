/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { BaseButton, BaseButtonWithLabelProps } from "./BaseButton";

export type ButtonProps = BaseButtonWithLabelProps;
const Button = (props: BaseButtonWithLabelProps) => {
  return <BaseButton {...props} />;
};

const MemoizedButton = memo(Button);
MemoizedButton.displayName = "Button";

export { MemoizedButton as Button };
