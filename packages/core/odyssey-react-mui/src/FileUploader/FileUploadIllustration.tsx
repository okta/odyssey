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

import styled from "@emotion/styled";
import { memo } from "react";

import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";

const UploadIllustrationContainer = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  marginBlockEnd: odysseyDesignTokens.Spacing3,
  padding: odysseyDesignTokens.Spacing3,
  backgroundColor: odysseyDesignTokens.HueNeutral50,
  borderRadius: "50%",

  svg: {
    display: "flex",
    width: odysseyDesignTokens.Spacing8,
    height: odysseyDesignTokens.Spacing8,
  },
}));

const FileUploadIllustration = () => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <UploadIllustrationContainer
      aria-hidden="true"
      odysseyDesignTokens={odysseyDesignTokens}
    >
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 44 45"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.0763 11.001C29.3564 3.7855 21.6595 -0.565827 13.7765 0.726748C5.35441 2.10773 -0.676662 9.50714 0.0603005 17.8612C0.441865 22.1865 2.56458 25.9787 5.71703 28.614L8.28246 25.545C5.90122 23.5544 4.32811 20.7209 4.04483 17.5097C3.50262 11.3633 7.94433 5.73648 14.4238 4.67404C20.9164 3.60944 27.0806 7.52016 28.6895 13.5191C28.9239 14.3932 29.7162 15.001 30.6212 15.001H32.9114C36.8985 15.001 39.9997 18.0938 39.9997 21.7505C39.9997 24.3423 38.4576 26.6352 36.1259 27.7678L37.8736 31.3658C41.4737 29.6171 43.9997 25.9917 43.9997 21.7505C43.9997 15.7428 38.963 11.001 32.9114 11.001H32.0763Z"
          fill={odysseyDesignTokens.HueNeutral200}
        />
        <path
          d="M23.9994 29.3277V44.5H19.9994V29.3289L14.4142 34.9141L11.5858 32.0857L19.7373 23.9342C20.9869 22.6845 23.0131 22.6845 24.2627 23.9342L32.4142 32.0857L29.5858 34.9141L23.9994 29.3277Z"
          fill={odysseyDesignTokens.HueNeutral200}
        />
      </svg>
    </UploadIllustrationContainer>
  );
};

const MemoizedFileUploadIllustration = memo(FileUploadIllustration);
MemoizedFileUploadIllustration.displayName = "FileUploadIllustration";

export { MemoizedFileUploadIllustration as FileUploadIllustration };
