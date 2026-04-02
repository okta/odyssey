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

import { EmptyState, Surface } from "@okta/odyssey-react-mui";
import { PageTemplate } from "@okta/odyssey-react-mui/labs";

export type StubPageProps = {
  description?: string;
  title: string;
};

export const StubPage = ({ title, description }: StubPageProps) => (
  <PageTemplate
    description={description || `This is the ${title} page.`}
    title={title}
  >
    <Surface>
      <EmptyState
        description="Use Claude Code to add Odyssey components to this content area. See README.md for how to get started."
        heading="Prompt to build your features"
      />
    </Surface>
  </PageTemplate>
);
