#!/usr/bin/env node
import { hideBin } from "yargs/helpers";

import { buildParser } from "./cli-parser.js";

buildParser(hideBin(process.argv)).parseAsync().catch(console.error);
