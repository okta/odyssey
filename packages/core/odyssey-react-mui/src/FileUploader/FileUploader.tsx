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
import { ChangeEvent, memo, useCallback, useRef, useState } from "react";

import { Button } from "../Buttons/Button.js";
import { Field, RenderFieldComponentProps } from "../Field.js";
import { FieldComponentProps } from "../FieldComponentProps.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import { UploadIcon } from "../icons.generated/index.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { Support } from "../Typography.js";
import { FileUploadIllustration } from "./FileUploadIllustration.js";
import { FileUploadPreview } from "./FileUploadPreview.js";

export const fileUploadTypes = ["single", "multiple"] as const;
export const fileUploadVariants = [
  "button",
  "dragAndDrop",
  "dragAndDropWithIcon",
] as const;

const BaseInputWrapper = styled.div({
  position: "relative",
  alignSelf: "flex-start",

  input: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },
});

const InputContainer = styled(BaseInputWrapper)<{
  hasError: boolean;
  odysseyDesignTokens: DesignTokens;
}>(
  {
    display: "flex",
    alignSelf: "unset",
    alignItems: "center",
    justifyContent: "center",

    "&:has(input:focus)": {
      borderStyle: "solid",
    },
  },
  ({ hasError, odysseyDesignTokens }) => ({
    padding: `${odysseyDesignTokens.Spacing6} ${odysseyDesignTokens.Spacing3}`,
    border: hasError
      ? `1px solid ${odysseyDesignTokens.PaletteDangerMain}`
      : `1px dashed ${odysseyDesignTokens.HueNeutral300}`,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
    transition: `border-color ${odysseyDesignTokens.TransitionTimingMain}, box-shadow ${odysseyDesignTokens.TransitionTimingMain}`,

    "&:hover": {
      borderColor: odysseyDesignTokens.HueNeutral700,
    },

    "&:has(input:focus)": {
      borderColor: odysseyDesignTokens.FocusOutlineColorPrimary,
      boxShadow: `0 0 0 1px ${odysseyDesignTokens.FocusOutlineColorPrimary}`,
      outline: `${odysseyDesignTokens.FocusOutlineWidthMain} ${odysseyDesignTokens.FocusOutlineStyle} transparent`,
      outlineOffset: odysseyDesignTokens.FocusOutlineOffsetTight,
    },

    "&:has(input:disabled)": {
      backgroundColor: odysseyDesignTokens.HueNeutral50,
      border: `1px solid ${odysseyDesignTokens.BorderColorDisabled}`,
      color: odysseyDesignTokens.TypographyColorDisabled,

      "&:hover": {
        borderColor: odysseyDesignTokens.BorderColorDisabled,
      },
    },
  }),
);

const ButtonAndInfoContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const CenterAlignedSupportText = styled.div({
  textAlign: "center",
});

export type FileUploaderProps = {
  /**
   * an array of file types the user is able to upload.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers for examples
   */
  acceptedFileTypes?: string[];
  /**
   * The initial file list for uncontrolled usage. Applied only on mount.
   */
  defaultValue?: File[];
  /**
   * If `true`, the file uploader is disabled and cannot accept new files.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The label for the `input` element.
   */
  label: string;
  /**
   * Called when the list of files to upload changes. Receives the updated file array.
   */
  onChange: (files: File[]) => void;
  /**
   * Controls how many files the uploader accepts.
   * - If `'single'`, only one file can be selected at a time.
   * - If `'multiple'`, the user can select more than one file at once.
   */
  type?: (typeof fileUploadTypes)[number];
  /**
   * The file list for controlled usage. When provided, the consumer is
   * responsible for updating it via `onChange`.
   */
  value?: File[];
  /**
   * The visual interaction style. `"button"` renders a compact upload button;
   * `"dragAndDrop"` renders a drop zone; `"dragAndDropWithIcon"` adds an illustration
   * to the drop zone.
   */
  variant: (typeof fileUploadVariants)[number];
} & Pick<
  FieldComponentProps,
  | "errorMessage"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isFullWidth"
  | "isOptional"
>;

/**
 * A form field that allows users to select and upload one or more files,
 * supporting button, drag-and-drop, and drag-and-drop-with-icon interaction variants.
 */
const FileUploader = ({
  acceptedFileTypes,
  defaultValue,
  errorMessage,
  id,
  isDisabled = false,
  isFullWidth,
  isOptional,
  hint,
  HintLinkComponent,
  label,
  onChange,
  type,
  value,
  variant,
}: FileUploaderProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesToUpload, setFilesToUpload] = useState<File[]>(
    defaultValue ?? [],
  );

  const resolvedFiles = value !== undefined ? value : filesToUpload;

  const updateFilesToUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (files && files.length > 0) {
        const mergedFiles =
          type === "multiple"
            ? resolvedFiles.concat(Array.from(files))
            : Array.from(files).slice();

        setFilesToUpload(mergedFiles);
        onChange(mergedFiles);
      }

      // reset input value to allow re-upload of a file with the same name
      event.target.value = "";
    },
    [type, resolvedFiles, onChange],
  );

  const triggerFileInputClick = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  const removeFileFromFilesToUploadList = useCallback<(name: string) => void>(
    (name) => {
      const deletedFileFilteredOut = resolvedFiles.filter(
        (file) => file.name !== name,
      );
      setFilesToUpload(deletedFileFilteredOut);
      onChange(deletedFileFilteredOut);
    },
    [resolvedFiles, onChange],
  );

  const renderFileInput = useCallback(
    ({
      ariaDescribedBy,
      errorMessageElementId,
      id,
      labelElementId,
    }: RenderFieldComponentProps) => {
      const acceptedFileTypesAsString = acceptedFileTypes?.join(",");

      const Input = () => (
        <input
          accept={acceptedFileTypesAsString}
          aria-describedby={ariaDescribedBy}
          aria-errormessage={errorMessageElementId}
          aria-labelledby={labelElementId}
          disabled={isDisabled}
          id={id}
          multiple={type === "multiple"}
          onChange={updateFilesToUpload}
          ref={inputRef}
          title=""
          type="file"
        />
      );

      if (variant === "button") {
        return (
          <>
            <BaseInputWrapper>
              <Input />
              <Button
                isDisabled={isDisabled}
                label={t("fileupload.button.text")}
                onClick={triggerFileInputClick}
                startIcon={<UploadIcon />}
                variant="secondary"
              />
            </BaseInputWrapper>
          </>
        );
      }

      return (
        <>
          <InputContainer
            hasError={Boolean(errorMessage)}
            odysseyDesignTokens={odysseyDesignTokens}
          >
            <Input />
            <ButtonAndInfoContainer>
              {variant === "dragAndDropWithIcon" && <FileUploadIllustration />}
              <CenterAlignedSupportText>
                <Support color="textSecondary">
                  {t("fileupload.prompt.text")}
                </Support>
              </CenterAlignedSupportText>
              <Button
                isDisabled={isDisabled}
                label={t("fileupload.button.text")}
                onClick={triggerFileInputClick}
                startIcon={<UploadIcon />}
                variant="secondary"
              />
            </ButtonAndInfoContainer>
          </InputContainer>
        </>
      );
    },
    [
      acceptedFileTypes,
      errorMessage,
      isDisabled,
      inputRef,
      odysseyDesignTokens,
      triggerFileInputClick,
      t,
      type,
      updateFilesToUpload,
      variant,
    ],
  );

  return (
    <>
      <Field
        errorMessage={errorMessage}
        fieldType="single"
        hasVisibleLabel
        hint={hint}
        HintLinkComponent={HintLinkComponent}
        id={id}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth && variant !== "button"}
        isOptional={isOptional}
        label={label}
        renderFieldComponent={renderFileInput}
      />
      {resolvedFiles.length > 0 && (
        <FileUploadPreview
          fileNames={resolvedFiles.map((file) => file.name)}
          isDisabled={isDisabled}
          onFileRemove={removeFileFromFilesToUploadList}
        />
      )}
    </>
  );
};

const MemoizedFileUploader = memo(FileUploader);
MemoizedFileUploader.displayName = "FileUploader";

export {
  MemoizedFileUploader as FileUpload,
  MemoizedFileUploader as FileUploader,
};
