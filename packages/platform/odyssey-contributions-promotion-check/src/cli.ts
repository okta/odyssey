#!/usr/bin/env node
import { intro, log, note, outro } from "@clack/prompts";
import { writeFileSync } from "node:fs";
import { parseArgs, styleText } from "node:util";

import type { ComponentReport } from "./index.js";

import { runPromotionChecks } from "./index.js";
import {
  formatComponentReference,
  parseComponentReference,
} from "./utils/componentReference.js";
import { runGitCommand } from "./utils/git.js";

const { values } = parseArgs({
  options: {
    "output-file": { type: "string" },
  },
  strict: false,
});

const outputFilePath =
  typeof values["output-file"] === "string" ? values["output-file"] : undefined;

const isFileMode = outputFilePath !== undefined;

export interface RenderCommandLineOutputArgs {
  isFileMode: boolean;
  log: (message: string) => void;
}

export const renderCommandLineOutput = ({
  isFileMode,
  log,
}: RenderCommandLineOutputArgs): ((message: string) => void) =>
  isFileMode
    ? (message: string): void => {
        process.stderr.write(`warn: ${message}\n`);
      }
    : log;

const printComponent = (component: ComponentReport): void => {
  log.message(
    `${styleText(["bold", "cyan"], component.componentName)} ${styleText("dim", `in ${component.libraryName}`)}`,
  );

  if (component.flags.forkedFrom) {
    try {
      const reference = parseComponentReference(component.flags.forkedFrom);
      log.message(
        styleText("dim", `Forked from: ${formatComponentReference(reference)}`),
      );
    } catch {
      log.warn(
        `Malformed forkedFrom reference: "${component.flags.forkedFrom}"`,
      );
    }
  }

  component.flags.similarTo?.forEach((similarReference) => {
    try {
      const reference = parseComponentReference(similarReference);
      log.message(
        styleText("dim", `Similar to: ${formatComponentReference(reference)}`),
      );
    } catch {
      log.warn(`Malformed similarTo reference: "${similarReference}"`);
    }
  });
};

runGitCommand({
  args: ["rev-parse", "--show-toplevel"],
  repoRoot: process.cwd(),
})
  .then((repoRoot) => {
    if (!isFileMode) {
      intro(styleText(["black", "bgCyan"], " Contribution Promotion Check "));
    }
    return runPromotionChecks({
      onWarn: renderCommandLineOutput({ isFileMode, log: log.warn }),
      repoRoot,
    });
  })
  .then((report) => {
    const reportJson = JSON.stringify(report, null, 2);

    if (isFileMode) {
      writeFileSync(outputFilePath, `${reportJson}\n`, "utf8");
      return;
    }

    const timeQualified = report.components.filter(
      (component) =>
        component.checks.age.isValid && component.checks.apiStability.isValid,
    );
    const eligible = timeQualified.filter(
      (component) => component.isEligibleForPromotion,
    );
    const pendingUsage = timeQualified.filter(
      (component) => !component.isEligibleForPromotion,
    );

    note(
      [
        `Total components checked:  ${styleText("bold", String(report.components.length))}`,
        `Meet time criteria:        ${styleText("bold", String(timeQualified.length))}`,
        `Eligible for promotion:    ${styleText(["bold", "green"], String(eligible.length))}`,
        `Pending usage criteria:    ${styleText(["bold", "yellow"], String(pendingUsage.length))}`,
      ].join("\n"),
      report.generatedAt,
    );

    if (report.completenessViolations.length > 0) {
      log.warn(styleText("bold", "Metadata Completeness Issues"));
      report.completenessViolations.forEach((violation) => {
        const label =
          violation.kind === "exported_but_missing_from_metadata"
            ? "missing from metadata"
            : "in metadata but not exported";
        log.message(
          `${styleText(["bold", "cyan"], violation.componentName)} ${styleText("dim", `in ${violation.libraryName}`)} — ${styleText("yellow", label)}`,
        );
      });
    }

    if (eligible.length > 0) {
      log.success(styleText("bold", "Eligible for Promotion"));
      eligible.forEach(printComponent);
    }

    if (pendingUsage.length > 0) {
      log.warn(styleText("bold", "Meets Time Criteria — Pending Usage"));
      pendingUsage.forEach(printComponent);
    }

    log.info(styleText("bold", "Full Report (JSON)"));
    log.info(reportJson);

    outro(styleText("dim", `Generated ${report.generatedAt}`));
  })
  .catch((error: unknown) => {
    if (isFileMode) {
      process.stderr.write(
        `Error: ${error instanceof Error ? error.message : String(error)}\n`,
      );
    } else {
      log.error("Promotion check failed");
      console.error(error);
    }
    process.exit(1);
  });
