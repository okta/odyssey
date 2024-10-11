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

const OktaLogo = () => {
  return (
    <svg
      width="67"
      height="24"
      viewBox="0 0 67 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55.308 20.5716C52.1058 20.5716 49.8418 18.0813 49.8418 14.8145C49.8418 11.5476 52.1058 9.0574 55.308 9.0574C58.5103 9.0574 60.7097 11.5476 60.7097 14.8145C60.7097 18.0813 58.478 20.5716 55.308 20.5716ZM54.7905 24C57.3782 24 59.5777 22.9972 60.9682 20.8947C61.2267 22.9326 62.7147 23.6763 64.5905 23.6763H66.0785V20.4418H65.4317C64.3643 20.4418 64.1058 19.9242 64.1058 18.7276V5.95153H60.6774V8.57159C59.5131 6.72814 57.3136 5.62842 54.7911 5.62842C50.2952 5.62842 46.1554 9.38051 46.1554 14.8139C46.1554 20.2473 50.2947 24 54.7905 24ZM37.1309 19.5688C37.1309 22.4797 38.942 23.6763 41.1092 23.6763H45.2813V20.4418H42.2412C40.9799 20.4418 40.7209 19.9565 40.7209 18.7276V9.18608H45.2813V5.95153H40.7209V0H37.1309V19.5688ZM20.7972 23.6763H24.3872V16.0758H25.5838L31.6969 23.6763H36.225L28.4301 14.0379L34.4139 5.9521H30.371L25.4869 12.7766H24.3872V0.00113398H20.7972V23.6763ZM9.1532 5.62842C4.13983 5.62842 0 9.38051 0 14.8139C0 20.2473 4.13983 23.9994 9.1532 23.9994C14.1666 23.9994 18.3064 20.2473 18.3064 14.8139C18.3064 9.38051 14.1666 5.62842 9.1532 5.62842ZM9.1532 20.5716C5.95096 20.5716 3.68689 18.0813 3.68689 14.8145C3.68689 11.5476 5.95096 9.0574 9.1532 9.0574C12.3554 9.0574 14.6195 11.5476 14.6195 14.8145C14.6195 18.0813 12.3554 20.5716 9.1532 20.5716Z"
        fill="black"
      />
    </svg>
  );
};
const MemoizedOktaLogo = memo(OktaLogo);

export { MemoizedOktaLogo as OktaLogo };
