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

import { FileUploaderProps } from "./FileUploader.js";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { DeleteIcon } from "../icons.generated/index.js";
import { MuiPropsContext, MuiPropsContextType } from "../MuiPropsContext.js";
import { Tooltip } from "../Tooltip.js";

const PreviewContainer = styled.div<{
  isDisabled: FileUploaderProps["isDisabled"];
  odysseyDesignTokens: DesignTokens;
}>(({ isDisabled, odysseyDesignTokens }) => ({
  color: isDisabled ? odysseyDesignTokens.TypographyColorDisabled : "inherit",
  marginBlockStart: odysseyDesignTokens.Spacing2,
  pointerEvents: isDisabled ? "none" : "auto",
}));

const UploadedFileContainer = styled.div<{ odysseyDesignTokens: DesignTokens }>(
  {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    button: {
      transform: "scale(0)",
    },

    "&:hover, &:focus-within, &:focus": {
      button: {
        transform: "scale(1)",
      },
    },
  },
  ({ odysseyDesignTokens }) => ({
    padding: `${odysseyDesignTokens.Spacing1} ${odysseyDesignTokens.Spacing2}`,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
    transition: `background-color ${odysseyDesignTokens.TransitionTimingMain}`,

    "&:hover, &:focus-within": {
      backgroundColor: odysseyDesignTokens.HueNeutral100,
    },

    "&:focus": {
      borderColor: odysseyDesignTokens.FocusOutlineColorPrimary,
      boxShadow: `0 0 0 2px ${odysseyDesignTokens.FocusOutlineColorPrimary}`,
      outline: `${odysseyDesignTokens.FocusOutlineWidthMain} ${odysseyDesignTokens.FocusOutlineStyle} transparent`,
    },
  }),
);

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
    [deleteHandler, t],
  );

  return (
    <UploadedFileContainer
      // tabindex added to make this element focusable
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
  isDisabled: FileUploaderProps["isDisabled"];
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
      data-file-preview-container="true"
      isDisabled={isDisabled}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {fileNames?.map((name, index) => (
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
