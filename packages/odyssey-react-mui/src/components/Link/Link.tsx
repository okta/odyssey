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

import React, { forwardRef, ReactElement } from "react";

import { Link as MuiLink, SvgIcon } from "@mui/material";
import type { LinkProps as MuiLinkProps } from "@mui/material";

export interface LinkProps extends MuiLinkProps {
  icon?: ReactElement;
}

export const Link = forwardRef<HTMLLinkElement | HTMLAnchorElement, LinkProps>(
  (props) => {
    const { icon, children, target } = props;
    return (
      <MuiLink {...props}>
        <span className="icon">{icon}</span>
        {children}
        {target === "_blank" && (
          <span className="indicator" role="presentation">
            <SvgIcon viewBox="0 0 16 16" titleAccess="external link icon">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2929 2H7.99998V1H14.5C14.7761 1 15 1.22386 15 1.5V8H14V2.70711L6.35353 10.3536L5.64642 9.64645L13.2929 2ZM1.5 4H1V4.5V14.5V15H1.5H11.5H12V14.5V8H11V14H2V5H8V4H1.5Z"
                fill="currentColor"
              />
            </SvgIcon>
          </span>
        )}
      </MuiLink>
    );
  }
);
