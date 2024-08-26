/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo } from "react";
import { Grid as MuiGrid, GridProps as MuiGridProps } from "@mui/material";

type GridBreakpoints = {
  /**
   * If a number, it sets the number of columns the grid item uses. It can't be greater than the total number of columns of the container (12 by default). If 'auto', the grid item's width matches its content. If false, the prop is ignored. If true, the grid item's width grows to use the space available in the grid container. The value is applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg?: MuiGridProps["lg"];
  /**
   * If a number, it sets the number of columns the grid item uses. It can't be greater than the total number of columns of the container (12 by default). If 'auto', the grid item's width matches its content. If false, the prop is ignored. If true, the grid item's width grows to use the space available in the grid container. The value is applied for the `md` breakpoint and wider screens if not overridden.
   */
  md?: MuiGridProps["md"];
  /**
   * If a number, it sets the number of columns the grid item uses. It can't be greater than the total number of columns of the container (12 by default). If 'auto', the grid item's width matches its content. If false, the prop is ignored. If true, the grid item's width grows to use the space available in the grid container. The value is applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm?: MuiGridProps["sm"];
  /**
   * If a number, it sets the number of columns the grid item uses. It can't be greater than the total number of columns of the container (12 by default). If 'auto', the grid item's width matches its content. If false, the prop is ignored. If true, the grid item's width grows to use the space available in the grid container. The value is applied for all the screen sizes with the lowest priority.
   */
  xs?: MuiGridProps["xs"];
};

export type GridProps = {
  /**
   * The `Grid` content. Will be made up of `<Grid item />` components
   */
  children: MuiGridProps["children"];
  /**
   * The number of columns.
   */
  columns?: MuiGridProps["columns"];
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: MuiGridProps["component"];
  /**
   * If true, the component will have the flex container behavior. You should be wrapping items with a container.
   */
  container?: MuiGridProps["container"];
  /**
   * Defines the horizontal space between the type item components. It overrides the value of the spacing prop.
   */
  columnSpacing?: MuiGridProps["columnSpacing"];
  /**
   * Defines the flex-direction style property. It is applied for all screen sizes.
   */
  direction?: MuiGridProps["direction"];
  /**
   * designates the `Grid` component as a child item of it's parent container
   */
  item?: MuiGridProps["item"];
  /**
   * Defines the vertical space between the type item components. It overrides the value of the spacing prop.
   */
  rowSpacing?: MuiGridProps["rowSpacing"];
  /**
   * Defines the space between the type item components. It can only be used on a type container component.
   */
  spacing?: MuiGridProps["spacing"];
};

export type GridContainerProps = Pick<
  GridProps,
  | "children"
  | "component"
  | "columnSpacing"
  | "direction"
  | "rowSpacing"
  | "spacing"
>;

export type GridItemProps = Pick<GridProps, "children" | "component"> &
  GridBreakpoints;

const Grid = ({
  children,
  columns,
  component = "div",
  container,
  direction,
  item,
  rowSpacing,
  spacing,
}: GridProps) => {
  return (
    <MuiGrid
      columns={columns}
      container={container}
      component={component}
      direction={direction}
      item={item}
      rowSpacing={rowSpacing}
      spacing={spacing}
    >
      {children}
    </MuiGrid>
  );
};

const GridContainer = ({ children, ...props }: GridContainerProps) => {
  return (
    <Grid container {...props}>
      {children}
    </Grid>
  );
};

const GridItem = ({ children, ...props }: GridItemProps) => {
  return (
    <Grid item {...props}>
      {children}
    </Grid>
  );
};

const MemoizedGridContainer = memo(GridContainer);
MemoizedGridContainer.displayName = "GridContainer";

const MemoizedGridItem = memo(GridItem);
MemoizedGridItem.displayName = "GridItem";

export { MemoizedGridContainer as GridContainer, MemoizedGridItem as GriItem };
