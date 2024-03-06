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

import {
  memo,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Button } from "../Button";
import { UploadIcon } from "../icons.generated";
import { Field, RenderFieldComponentProps } from "../Field";
import { FieldComponentProps } from "../FieldComponentProps";
import { FileUploadPreview } from "./FileUploadPreview";
import { FileUploadIllustration } from "./FileUploadIllustration";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";
import { Support } from "../Typography";

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
  ({ odysseyDesignTokens }) => ({
    padding: `${odysseyDesignTokens.Spacing6} ${odysseyDesignTokens.Spacing3}`,
    border: `1px dashed ${odysseyDesignTokens.HueNeutral300}`,
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

export type FileUploadProps = {
  /**
   * an array of file types the user is able to upload. @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers for examples
   */
  acceptedFileTypes?: string[];
  /**
   * The label for the `input` element.
   */
  label: string;
  /**
   * Function that is called when the list of ifles to upload is changed
   */
  onChange: (files: File[]) => void;
  /**
   * Either `single` or `multiple`. If `multiple`, multiple files can be uploaded
   */
  type?: (typeof fileUploadTypes)[number];
  /**
   * Either `button`, `dragAndDrop` or `dragAndDropWithIcon`. Will determine how component appears visually
   */
  variant: (typeof fileUploadVariants)[number];
} & Pick<
  FieldComponentProps,
  | "errorMessage"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isDisabled"
  | "isOptional"
>;

const FileUpload = ({
  acceptedFileTypes,
  errorMessage,
  id,
  isDisabled = false,
  isOptional,
  hint,
  HintLinkComponent,
  label,
  onChange,
  type,
  variant,
}: FileUploadProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  useEffect(() => {
    onChange(filesToUpload);
  }, [filesToUpload, onChange]);

  const updateFilesToUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (files && files.length > 0) {
        const mergedFiles =
          type === "multiple"
            ? [...filesToUpload, ...files]
            : ([...files] satisfies File[] as File[]);

        setFilesToUpload(mergedFiles);
      }

      // reset input value to allow re-upload of a file with the same name
      event.target.value = "";
    },
    [type, filesToUpload],
  );

  const triggerFileInputClick = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const removeFileFromFilesToUploadList = useCallback<(name: string) => void>(
    (name) => {
      const deletedFileFilteredOut = filesToUpload.filter(
        (file) => file.name !== name,
      );
      setFilesToUpload(deletedFileFilteredOut);
    },
    [filesToUpload],
  );

  const renderFileInput = useCallback(
    ({
      ariaDescribedBy,
      errorMessageElementId,
      id,
      labelElementId,
    }: RenderFieldComponentProps) => {
      const fileNames = filesToUpload.map((file) => file.name);
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
            <FileUploadPreview
              fileNames={fileNames}
              onFileRemove={removeFileFromFilesToUploadList}
              isDisabled={isDisabled}
            />
          </>
        );
      }

      return (
        <>
          <InputContainer odysseyDesignTokens={odysseyDesignTokens}>
            <Input />
            <ButtonAndInfoContainer>
              {variant === "dragAndDropWithIcon" && <FileUploadIllustration />}
              <Support color="textSecondary">
                {t("fileupload.prompt.text")}
              </Support>
              <Button
                isDisabled={isDisabled}
                label={t("fileupload.button.text")}
                onClick={triggerFileInputClick}
                startIcon={<UploadIcon />}
                variant="secondary"
              />
            </ButtonAndInfoContainer>
          </InputContainer>
          <FileUploadPreview
            fileNames={fileNames}
            onFileRemove={removeFileFromFilesToUploadList}
            isDisabled={isDisabled}
          />
        </>
      );
    },
    [
      acceptedFileTypes,
      filesToUpload,
      isDisabled,
      inputRef,
      odysseyDesignTokens,
      removeFileFromFilesToUploadList,
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
        isFullWidth
        isOptional={isOptional}
        label={label}
        renderFieldComponent={renderFileInput}
      />
    </>
  );
};

const MemoizedFileUpload = memo(FileUpload);
MemoizedFileUpload.displayName = "FileUpload";

export { MemoizedFileUpload as FileUpload };
