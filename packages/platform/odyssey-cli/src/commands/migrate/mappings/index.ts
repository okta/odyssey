import { DataTable } from "./DataTable.js";

export type PropMapping = string | { [key: string]: PropMapping };

export type ComponentPropMap = Record<string, PropMapping>;

export type ComponentMappings = Record<string, ComponentMapping>;

export type ComponentMapping = {
  defaultProps?: Record<string, unknown>;
  propMap: ComponentPropMap;
  source: {
    component: string;
    package: string;
    propsType: string;
  };
  target: {
    component: string;
    minimumVersion?: string;
    package: string;
    propsType: string;
  };
};

export const COMPONENT_MAPPINGS: ComponentMappings = {
  ...DataTable,
};
