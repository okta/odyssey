#!/usr/bin/env node
import { parseArgs } from "node:util";

import {
  extractComponentUsageDetail,
  getComponentUsageDetail,
} from "./utils/uiStats.js";

const { values } = parseArgs({
  options: {
    component: { type: "string" },
    package: { type: "string" },
  },
  strict: false,
});

const packageName =
  typeof values["package"] === "string" ? values["package"] : undefined;
const componentName =
  typeof values["component"] === "string" ? values["component"] : undefined;

if (!packageName || !componentName) {
  process.stderr.write(
    "Usage: cli-usage-detail.js --package <npm-package-name> --component <ComponentName>\n",
  );
  process.exit(1);
}

const usageDetailResponse = await getComponentUsageDetail({
  onWarn: (message) => process.stderr.write(`warn: ${message}\n`),
  packageName,
});

const usageDetail = usageDetailResponse
  ? extractComponentUsageDetail({ componentName, usageDetailResponse })
  : [];

process.stdout.write(`${JSON.stringify(usageDetail, null, 2)}\n`);
