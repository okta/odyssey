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

import { memo, ReactElement } from "react";

import { Box } from "@mui/material";
import { Button } from "./Button";
import { Infobox } from "./Infobox";
import { Heading4, Support } from "./Typography";
import { useUniqueId } from "./useUniqueId";

export const formEncodingTypeValues = [
  "application/x-www-form-urlencoded",
  "application/json",
  "multipart/form-data",
  "text/plain",
] as const;
export const formAutoCompleteTypeValues = ["on", "off"] as const;
export const formMethodValues = ["post", "get", "dialog"] as const;

export type FormProps = {
  /**
   * An Infobox indicating a Form-wide error or status update.
   */
  alert?: ReactElement<typeof Infobox>;
  /**
   * Indicates whether input elements can by default have their values automatically completed by the browser.
   * `autocomplete` attributes on form elements override it on <form>
   */
  autoCompleteType?: (typeof formAutoCompleteTypeValues)[number];
  /**
   * The Field or FieldSet components within the Form
   */
  children: ReactElement | Array<ReactElement>;
  /**
   * A supplementary description
   */
  description?: string;
  /**
   * If the value of the method attribute is post, enctype is the MIME type of the form submission.
   * This value can be overridden by formenctype attributes on <button>, <input type="submit">, or <input type="image"> elements.
   */
  encodingType?: (typeof formEncodingTypeValues)[number];
  /**
   * The Field or FieldGroup components within the Form
   */
  formActions?:
    | ReactElement<typeof Button>
    | Array<ReactElement<typeof Button>>;
  /**
   * Defines a unique identifier (ID) which must be unique in the whole document.
   */
  id?: string;
  /**
   * The HTTP method to submit the form with.
   * This value is overridden by formmethod attributes on <button>, <input type="submit">, or <input type="image"> elements.
   */
  method?: (typeof formMethodValues)[number];
  /**
   * The name of the form. The value must not be the empty string, and must be unique among the form elements in the forms collection that it is in, if any.
   */
  name: string;
  /**
   * This Boolean attribute indicates that the form shouldn't be validated when submitted.
   * If this attribute is not set (and therefore the form is validated),
   * it can be overridden by a formnovalidate attribute on a <button>, <input type="submit">, or <input type="image"> element belonging to the form.
   */
  noValidate?: boolean;
  /**
   * Indicates where to display the response after submitting the form. It is a name/keyword for a browsing context (for example, tab, window, or iframe).
   * This value can be overridden by a formtarget attribute on a <button>, <input type="submit">, or <input type="image"> element.
   */
  target?: string;
  /**
   * The title of the Form
   */
  title?: string;
};

const Form = ({
  alert,
  autoCompleteType,
  children,
  description,
  encodingType,
  formActions,
  id: idOverride,
  method,
  name,
  noValidate = false,
  target,
  title,
}: FormProps) => {
  const id = useUniqueId(idOverride);

  return (
    <Box
      component="form"
      autoComplete={autoCompleteType}
      name={name}
      encType={encodingType}
      method={method}
      noValidate={noValidate}
      target={target}
      id={id}
      sx={{
        maxWidth: (theme) => theme.mixins.maxWidth,
        margin: (theme) => theme.spacing(0),
        padding: (theme) => theme.spacing(0),
      }}
    >
      <Box
        component="div"
        sx={{
          marginBlockEnd: (theme) => theme.spacing(4),
        }}
      >
        {title && <Heading4 component="h1">{title}</Heading4>}
        {description && <Support>{description}</Support>}
        {alert}
      </Box>
      <Box component="div">{children}</Box>
      {formActions && (
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: (theme) => theme.spacing(1),
            marginBlockStart: (theme) => theme.spacing(7),
          }}
        >
          {formActions}
        </Box>
      )}
    </Box>
  );
};

const MemoizedForm = memo(Form);
MemoizedForm.displayName = "Form";

export { MemoizedForm as Form };
