/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { ForwardedRef } from "react";
import { forwardRef, createRef } from "react";
import { render, screen } from "@testing-library/react";
import { withStyles } from ".";

const message = "with styles!";
const styles = {
  __digest: "bfa81d",
  __template() {
    return ".ods-8129bf{color: red};";
  },
  red: "ods-8129bf",
};

const tree = ({ ...props }: Record<string, unknown> = {}) => {
  const Composed = withStyles(styles)(
    forwardRef(
      (props: { message: string }, ref: ForwardedRef<HTMLSpanElement>) => (
        <span ref={ref} className={styles.red}>
          {props.message}
        </span>
      )
    )
  );
  return <Composed {...props} message={message} />;
};

describe("withStyles", () => {
  it("renders composed component visibly into the document", () => {
    render(tree());
    expect(screen.getByText(message)).toBeVisible();
  });

  it("renders composed styles into the document", () => {
    render(tree());
    expect(screen.getByText(message)).toHaveStyle({ color: "red" });
  });

  it("forwards refs as expected", () => {
    const ref = createRef();
    render(tree({ ref }));
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("hoists statics as expected", () => {
    const Component = withStyles(styles)(
      Object.assign(() => <div className={styles.red}>{message}</div>, {
        MyStatic: true,
      })
    );
    expect(Component).toMatchObject({ MyStatic: true });
  });

  a11yCheck(() => render(tree()));
});
