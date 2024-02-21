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

import { memo, useCallback } from "react";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

import { FileUploadProps } from "./FileUpload";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";
import { DeleteIcon } from "../icons.generated";
import { MuiPropsContext, MuiPropsContextType } from "../MuiPropsContext";
import { Tooltip } from "../Tooltip";

const PreviewContainer = styled.div<{
  isDisabled: FileUploadProps["isDisabled"];
  odysseyDesignTokens: DesignTokens;
}>`
  margin-block-start: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.Spacing2};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "normal")};
  color: ${({ isDisabled, odysseyDesignTokens }) =>
    isDisabled ? odysseyDesignTokens.TypographyColorDisabled : "inherit"};
`;

const UploadedFileContainer = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ odysseyDesignTokens }) =>
    `${odysseyDesignTokens.Spacing1} ${odysseyDesignTokens.Spacing2}`};
  border-radius: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderRadiusMain};
  transition: ${({ odysseyDesignTokens }) =>
    `background-color ${odysseyDesignTokens.TransitionTimingMain}`};

  button {
    transform: scale(0);
  }

  &:hover,
  &:focus-within,
  &:focus {
    button {
      transform: scale(1);
    }
  }

  &:hover,
  &:focus-within {
    background-color: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.HueNeutral100};
  }

  &:focus {
    border-color: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.FocusOutlineColorPrimary};
    box-shadow: ${({ odysseyDesignTokens }) =>
      `0 0 0 2px ${odysseyDesignTokens.FocusOutlineColorPrimary}`};
    outline: ${({ odysseyDesignTokens }) =>
      `${odysseyDesignTokens.FocusOutlineWidthMain} ${odysseyDesignTokens.FocusOutlineStyle} transparent`};
  }
`;

type UploadedFileProps = {
  name: string;
  onFileRemove?: (name: string) => void;
};

const UploadedFile = ({ name, onFileRemove }: UploadedFileProps) => {
  const { t } = useTranslation();
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const deleteHandler = useCallback(() => {
    onFileRemove?.(name);
  }, [onFileRemove, name]);

  const renderDeleteButton = useCallback(
    (muiProps: MuiPropsContextType) => {
      return (
        <IconButton
          {...muiProps}
          aria-label={t("fileupload.removefile.text")}
          onClick={deleteHandler}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      );
    },
    [deleteHandler],
  );

  return (
    <UploadedFileContainer
      // tabindex added to make div focusable
      tabIndex={0}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {name}
      <Tooltip
        ariaType="description"
        placement="top"
        text={t("fileupload.removefile.text")}
      >
        <MuiPropsContext.Consumer>
          {renderDeleteButton}
        </MuiPropsContext.Consumer>
      </Tooltip>
    </UploadedFileContainer>
  );
};

type FileUploadPreviewProps = {
  fileNames: string[];
  isDisabled: FileUploadProps["isDisabled"];
  onFileRemove?: (name: string) => void;
};

const FileUploadPreview = ({
  fileNames,
  isDisabled,
  onFileRemove,
}: FileUploadPreviewProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <PreviewContainer
      isDisabled={isDisabled}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {fileNames?.map((name: string, index: number) => (
        <UploadedFile
          key={`${index}-${name}`}
          onFileRemove={onFileRemove}
          name={name}
        />
      ))}
    </PreviewContainer>
  );
};

const MemoizedFileUploadPreview = memo(FileUploadPreview);
MemoizedFileUploadPreview.displayName = "FileUploadPreview";

export { MemoizedFileUploadPreview as FileUploadPreview };
