/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  Box,
  Breadcrumb,
  BreadcrumbList,
  EmptyState,
  Surface,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import { PageTemplate } from "@okta/odyssey-react-mui/labs";
import {
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

import { useAdminBreadcrumb } from "../shell/useAdminBreadcrumb";

export type StubPageProps = {
  children?: ReactNode;
  description?: string;
  primaryCallToActionComponent?: ReactElement;
  title: string;
};

export const StubPage = ({
  children,
  description,
  primaryCallToActionComponent,
  title,
}: StubPageProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const navigate = useNavigate();
  const { breadcrumbHref, breadcrumbLabel } = useAdminBreadcrumb();

  const breadcrumbSx = useMemo(
    () => ({ marginBottom: odysseyDesignTokens.Spacing2 }),
    [odysseyDesignTokens.Spacing2],
  );

  const navigateToBreadcrumb = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      navigate(breadcrumbHref!);
    },
    [breadcrumbHref, navigate],
  );

  return (
    <>
      {breadcrumbLabel && breadcrumbHref && (
        <Box sx={breadcrumbSx}>
          <BreadcrumbList homeHref="/">
            <Breadcrumb href={breadcrumbHref} onClick={navigateToBreadcrumb}>
              {breadcrumbLabel}
            </Breadcrumb>
            <Breadcrumb>{title}</Breadcrumb>
          </BreadcrumbList>
        </Box>
      )}
      <PageTemplate
        description={description || `This is the ${title} page.`}
        primaryCallToActionComponent={primaryCallToActionComponent}
        title={title}
      >
        <Surface>
          {children ?? (
            <EmptyState
              description="Use Claude Code to add Odyssey components to this content area. See README.md for how to get started."
              heading="Prompt to build your features"
            />
          )}
        </Surface>
      </PageTemplate>
    </>
  );
};
