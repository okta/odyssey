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

import { Button } from "../Button";
import { UploadIcon } from "../icons.generated";
import { Field } from "../Field";
import { FieldComponentProps } from "../FieldComponentProps";
import { Support } from "../Typography";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";
import { FileUploadPreview } from "./FileUploadPreview";

export const fileUploadTypes = ["single", "multiple"] as const;
export const fileUploadVariants = [
  "buttonOnly",
  "dragAndDrop",
  "dragAndDropWithIcon",
] as const;

const BaseInputWrapper = styled.div`
  position: relative;
  align-self: flex-start;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const InputContainer = styled(BaseInputWrapper, {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  align-self: unset;
  align-items: center;
  justify-content: center;
  padding: ${({ odysseyDesignTokens }) =>
    `${odysseyDesignTokens.Spacing6} ${odysseyDesignTokens.Spacing3}`};
  border: ${({ odysseyDesignTokens }) =>
    `1px dashed ${odysseyDesignTokens.HueNeutral300}`};
  border-radius: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderRadiusMain};
  transition: ${({ odysseyDesignTokens }) =>
    `border-color ${odysseyDesignTokens.TransitionTimingMain}, box-shadow ${odysseyDesignTokens.TransitionTimingMain}`};

  &:hover {
    border-color: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.HueNeutral700};
  }

  &:has(input:focus) {
    border-style: solid;
    border-color: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.FocusOutlineColorPrimary};
    box-shadow: ${({ odysseyDesignTokens }) =>
      `0 0 0 1px ${odysseyDesignTokens.FocusOutlineColorPrimary}`};
    outline: ${({ odysseyDesignTokens }) =>
      `${odysseyDesignTokens.FocusOutlineWidthMain} ${odysseyDesignTokens.FocusOutlineStyle} transparent`};
    outline-offset: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.FocusOutlineOffsetTight};
  }

  &:has(input:disabled) {
    background-color: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.HueNeutral50};
    border: ${({ odysseyDesignTokens }) =>
      `1px solid ${odysseyDesignTokens.BorderColorDisabled}`};
    color: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.TypographyColorDisabled};

    &:hover {
      border-color: ${({ odysseyDesignTokens }) =>
        odysseyDesignTokens.BorderColorDisabled};
    }
  }
`;

const ButtonAndInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UploadIllustrationContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  margin-block-end: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.Spacing2};
  padding: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing3};
  background-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutral50};
  border-radius: 50%;

  svg {
    display: flex;
    width: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing8};
    height: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing8};
  }
`;

const UploadIllustration = () => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <UploadIllustrationContainer odysseyDesignTokens={odysseyDesignTokens}>
      <svg viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32.0763 11.001C29.3564 3.7855 21.6595 -0.565827 13.7765 0.726748C5.35441 2.10773 -0.676662 9.50714 0.0603005 17.8612C0.441865 22.1865 2.56458 25.9787 5.71703 28.614L8.28246 25.545C5.90122 23.5544 4.32811 20.7209 4.04483 17.5097C3.50262 11.3633 7.94433 5.73648 14.4238 4.67404C20.9164 3.60944 27.0806 7.52016 28.6895 13.5191C28.9239 14.3932 29.7162 15.001 30.6212 15.001H32.9114C36.8985 15.001 39.9997 18.0938 39.9997 21.7505C39.9997 24.3423 38.4576 26.6352 36.1259 27.7678L37.8736 31.3658C41.4737 29.6171 43.9997 25.9917 43.9997 21.7505C43.9997 15.7428 38.963 11.001 32.9114 11.001H32.0763Z"
          fill="#E1E1E1"
        />
        <path
          d="M23.9994 29.3277V44.5H19.9994V29.3289L14.4142 34.9141L11.5858 32.0857L19.7373 23.9342C20.9869 22.6845 23.0131 22.6845 24.2627 23.9342L32.4142 32.0857L29.5858 34.9141L23.9994 29.3277Z"
          fill="#E1E1E1"
        />
      </svg>
    </UploadIllustrationContainer>
  );
};

export type FileUploadProps = {
  /**
   * an array of file types the user is able to upload. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers for examples
   */
  acceptedFileTypes?: string[];
  /**
   * If `true` the drag and drop area will not be rendered
   */
  isButtonOnly?: boolean;
  /**
   * The label for the `input` element.
   */
  label: string;
  /**
   * Function that is called when the list of ifles to upload is changed
   */
  onChange: (files: File[]) => void;
  /**
   * If `true` multiple files can be uploaded.
   */
  type?: (typeof fileUploadTypes)[number];
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
  isButtonOnly,
  isDisabled = false,
  isOptional,
  hint,
  HintLinkComponent,
  label,
  onChange,
  type,
}: FileUploadProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const inputRef = useRef<HTMLInputElement>(null);

  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  useEffect(() => {
    onChange(filesToUpload);
  }, [filesToUpload, onChange]);

  const handleFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (files && files.length > 0) {
        const mergedFiles = type ? [...filesToUpload, ...files] : [...files];

        setFilesToUpload(mergedFiles);
      }

      // reset input value to allow re-upload of a file with the same name
      event.target.value = "";
    },
    [type, filesToUpload]
  );

  const handleUploadButtonClick = useCallback(() => {
    inputRef?.current?.click();
  }, [inputRef]);

  const handleFileRemoval = useCallback(
    (name: string) => {
      const deletedFileFilteredOut = filesToUpload.filter(
        (file) => file.name != name
      );
      setFilesToUpload(deletedFileFilteredOut);
    },
    [filesToUpload]
  );

  const renderFileInput = useCallback(
    ({ ariaDescribedBy, errorMessageElementId, id, labelElementId }) => {
      const fileNames = filesToUpload.map((file) => file.name);

      const Input = () => (
        <input
          accept={acceptedFileTypes?.toString()}
          aria-describedby={ariaDescribedBy}
          aria-errormessage={errorMessageElementId}
          aria-labelledby={labelElementId}
          disabled={isDisabled}
          id={id}
          multiple={type === "multiple"}
          onChange={handleFileInputChange}
          ref={inputRef}
          title=""
          type="file"
        />
      );

      if (isButtonOnly) {
        return (
          <>
            <BaseInputWrapper>
              <Input />
              <Button
                isDisabled={isDisabled}
                label="Upload Files"
                onClick={handleUploadButtonClick}
                startIcon={<UploadIcon />}
                variant="secondary"
              />
            </BaseInputWrapper>
            <FileUploadPreview
              fileNames={fileNames}
              handleFileRemoval={handleFileRemoval}
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
              <UploadIllustration />
              <Support color="textSecondary">
                Drag and drop files here or click to add files.
              </Support>
              <Button
                isDisabled={isDisabled}
                label="Add Files"
                onClick={handleUploadButtonClick}
                startIcon={<UploadIcon />}
                variant="secondary"
              />
            </ButtonAndInfoContainer>
          </InputContainer>
          <FileUploadPreview
            fileNames={fileNames}
            handleFileRemoval={handleFileRemoval}
            isDisabled={isDisabled}
          />
        </>
      );
    },
    [
      acceptedFileTypes,
      filesToUpload,
      handleFileInputChange,
      handleFileRemoval,
      handleUploadButtonClick,
      isButtonOnly,
      isDisabled,
      inputRef,
      odysseyDesignTokens,
      type,
    ]
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
