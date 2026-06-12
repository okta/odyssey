export type PropMetadata = {
  defaultValue: { value: unknown } | null;
  deprecated?: string;
  description: string;
  name: string;
  required: boolean;
  type: { name: string };
};

export type ComponentMetadata = {
  deprecated?: string;
  description: string;
  props: PropMetadata[];
};

export type AllComponentEntry = {
  deprecated?: string;
  description?: string;
  isContribution: boolean;
  name: string;
  packageName: string;
  props?: PropMetadata[];
};

export type ContributionComponentEntry = {
  componentName: string;
  description?: string;
  forkedFrom?: string;
  isIgnoredFromPromotion?: true;
  libraryName: string;
  props?: PropMetadata[];
  similarTo?: string[];
};
