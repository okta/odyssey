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

import React from "react";
import "./ErrorBoundary.scss";

type ErrorBoundaryProps = {
  children: JSX.Element | JSX.Element[];
};

type ErrorBoundaryState = {
  hasError: boolean;
  name: string;
  message: string;
  stack: string;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, name: "", message: "", stack: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  render(): JSX.Element | JSX.Element[] {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <h2 className="error-heading">Compiled with problems:</h2>
          <dl className="error-text">
            <dt>{this.state.name}</dt>
            <dd>{this.state.message}</dd>
          </dl>
          <pre>
            <code>{this.state.stack}</code>
          </pre>
        </div>
      );
    }

    return <div className="boundary">{this.props.children}</div>;
  }
}
