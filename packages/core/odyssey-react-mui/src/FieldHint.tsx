/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import styled from "@emotion/styled";
import { FormHelperText } from "@mui/material";
import { memo } from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { FieldComponentProps } from "./FieldComponentProps.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";

const HintLinkContainer = styled.span<{ odysseyDesignTokens: DesignTokens }>(
  ({ odysseyDesignTokens }) => ({
    a: {
      color: odysseyDesignTokens.TypographyColorBody,
      textDecoration: "underline",

      "&:visited": {
        color: odysseyDesignTokens.TypographyColorBody,
      },

      "&:hover": {
        color: odysseyDesignTokens.TypographyColorSubordinate,
      },
    },
  }),
);

export type FieldHintProps = {
  id?: string;
  LinkComponent?: FieldComponentProps["HintLinkComponent"];
  text: string;
} & Pick<HtmlProps, "testId" | "translate">;

const FieldHint = ({
  id,
  LinkComponent,
  testId,
  text,
  translate,
}: FieldHintProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <FormHelperText data-se={testId} id={id} translate={translate}>
      {text}
      {LinkComponent && (
        <HintLinkContainer odysseyDesignTokens={odysseyDesignTokens}>
          {" "}
          {LinkComponent}
        </HintLinkContainer>
      )}
    </FormHelperText>
  );
};

const MemoizedFieldHint = memo(FieldHint);
MemoizedFieldHint.displayName = "FieldHint";

export { MemoizedFieldHint as FieldHint };
