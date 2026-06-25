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

import type {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementType,
} from "react";

import styled, { type CSSObject } from "@emotion/styled";
import { memo } from "react";

import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";

export type CreateOdysseyStyledComponentArgs<Tag extends ElementType> = {
  shouldForwardProp?: (prop: string) => boolean;
  tag: Tag;
};

type OdysseyStyleFunction<
  Tag extends ElementType,
  StyleProps extends object,
> = (
  props: ComponentPropsWithoutRef<Tag> &
    StyleProps & { odysseyDesignTokens: DesignTokens },
) => CSSObject;

/**
 * Creates a styled component that automatically receives Odyssey design tokens
 * from context, eliminating the need to pass `odysseyDesignTokens` as a prop at
 * every call site.
 *
 * @example Basic usage
 * ```tsx
 * const StyledCard = createOdysseyStyledComponent({ tag: "div" })(
 *   ({ odysseyDesignTokens }) => ({
 *     padding: odysseyDesignTokens.Spacing4,
 *     borderRadius: odysseyDesignTokens.BorderRadiusTight,
 *   })
 * );
 * // No need to call useOdysseyDesignTokens or pass tokens as a prop:
 * <StyledCard>content</StyledCard>
 * ```
 *
 * @example With custom styling props
 * ```tsx
 * const StyledButton = createOdysseyStyledComponent({
 *   tag: "button",
 *   shouldForwardProp: (prop) => prop !== "isActive",
 * })<{ isActive: boolean }>(({ odysseyDesignTokens, isActive }) => ({
 *   backgroundColor: isActive
 *     ? odysseyDesignTokens.PalettePrimaryMain
 *     : "transparent",
 * }));
 * <StyledButton isActive={true}>click me</StyledButton>
 * ```
 */
export const createOdysseyStyledComponent =
  <Tag extends ElementType>({
    tag,
    shouldForwardProp,
  }: CreateOdysseyStyledComponentArgs<Tag>) =>
  <StyleProps extends object = Record<never, never>>(
    styleArg: OdysseyStyleFunction<Tag, StyleProps> | CSSObject,
  ) => {
    type InternalProps = ComponentPropsWithoutRef<Tag> &
      StyleProps & { odysseyDesignTokens: DesignTokens };

    // Cast to ComponentType<InternalProps> so emotion's overload resolver sees
    // a concrete component type — ElementType is too broad for styled() to pick
    // the correct overload signature.
    const InternalStyled = styled(tag as ComponentType<InternalProps>, {
      shouldForwardProp: (prop) =>
        prop !== "odysseyDesignTokens" && (shouldForwardProp?.(prop) ?? true),
    })(typeof styleArg === "function" ? styleArg : () => styleArg);

    // LibraryManagedAttributes wraps StyledComponent and cannot be satisfied
    // with a generic Tag. Cast to ComponentType<any> for the render site;
    // the public API is typed by the outer curried function.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const InternalComponent = InternalStyled as unknown as ComponentType<any>;

    type PublicProps = ComponentPropsWithoutRef<Tag> & StyleProps;

    return memo(function OdysseyStyledComponent(props: PublicProps) {
      const odysseyDesignTokens = useOdysseyDesignTokens();
      return (
        <InternalComponent
          {...props}
          odysseyDesignTokens={odysseyDesignTokens}
        />
      );
    });
  };
