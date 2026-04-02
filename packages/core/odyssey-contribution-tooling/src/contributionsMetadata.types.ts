export type ContributionsMetadataEntry = {
  componentName: string;
  /**
   * When `true`, this component is excluded from Odyssey Core promotion
   * recommendations. Omit this field entirely for components that are
   * eligible for promotion.
   */
  isIgnoredFromPromotion?: true;
  libraryName: string;
} & (
  | {
      forkedFrom?: never;
      /**
       * Components with different requirements but matching designs to
       * existing ones. References use the format "libraryName::ComponentName".
       */
      similarTo: string[];
    }
  | {
      /**
       * The component this was copy-pasted (forked) from. A code diff can be
       * run against the source to patch in upstream changes. References use
       * the format "libraryName::ComponentName".
       */
      forkedFrom: string;
      similarTo?: never;
    }
  | {
      forkedFrom?: never;
      similarTo?: never;
    }
);

export type ContributionsMetadataFile = {
  components: ContributionsMetadataEntry[];
};
