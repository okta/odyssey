import inquirer from "inquirer";
import autocomplete, { Separator } from "inquirer-autocomplete-standalone";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";
import openLink from "open";
import { CommandModule } from "yargs";

import { fetchTeams } from "../../api";
import {
  execAsync,
  getHasFileOrDirectory,
  getLogger,
  getPackageName,
} from "../../utils";

const PROPERTIES_PATH_SEGMENTS = ["src", "properties"] as const;
const CONFIG = {
  PROPERTIES_PATH_SEGMENTS,
  TRANSLATION_PATH_SEGMENTS: [...PROPERTIES_PATH_SEGMENTS, "translations"],
  I18N_CONFIG_FILENAME: "i18n.config.json",
  CONTRIBUTIONS_PREFIX: "odyssey-contributions",
  DEFAULT_REVIEWER: "atko-eng/a-globalizationcore",
  NAMESPACE: "enduser",
  JIRA_TICKET_TEMPLATE_URL:
    "https://oktainc.atlassian.net/secure/CloneIssueDetails!default.jspa?id=1268459",
} as const;

const I18nConfigMethods = {
  MANUAL_DETAILS: "MANUAL_DETAILS",
  MANUAL_TEAM: "MANUAL_TEAM",
  SELECTED_TEAM: "SELECTED_TEAM",
} as const;

type I18nConfigMethod = keyof typeof I18nConfigMethods;
type I18nConfigAnswers = {
  guardian?: string;
  homeTeam?: string;
  i18nConfigMethod: I18nConfigMethod;
  jiraComponent?: string;
  secondaryReviewer: string;
  slackChannelName?: string;
};

const log = getLogger("init:i18n");

const getRelativePackagePath = (path: string) => {
  const pathSegments = path.split(sep);

  const packagesIndex = pathSegments.indexOf("packages");

  if (packagesIndex === -1) {
    throw new Error(
      `Could not find 'packages' directory in the current path: ${path}.
      Please run this command from within a package directory.`,
    );
  }

  return pathSegments.slice(packagesIndex).join(sep);
};

const nonEmptyStringValidator = (message: string) => (input: string) =>
  input.length > 0 || message;

/**
 * Prompts user for i18n configuration details based on the selected method.
 */
const collectI18nConfig = (i18nConfigMethod: I18nConfigMethod) => {
  return inquirer.prompt<I18nConfigAnswers>([
    {
      type: "input",
      name: "homeTeam",
      message:
        "Enter your home team name (Warning: must exist at https://aperture-go.aue1e.saasure.net/v1/teams):",
      validate: nonEmptyStringValidator("Please enter a home team name"),
      when: i18nConfigMethod === I18nConfigMethods.MANUAL_TEAM,
    },
    {
      type: "input",
      name: "guardian",
      message: "Enter the guardian (ex. guardian-odyssey-eng):",
      validate: nonEmptyStringValidator("Please enter a guardian"),
      when: i18nConfigMethod === I18nConfigMethods.MANUAL_DETAILS,
    },
    {
      type: "input",
      name: "jiraComponent",
      message: "Enter the JIRA component (ex. Team: UICore Odyssey):",
      validate: nonEmptyStringValidator("Please enter a JIRA component"),
      when: i18nConfigMethod === I18nConfigMethods.MANUAL_DETAILS,
    },
    {
      type: "input",
      name: "slackChannelName",
      message: "Enter the Slack channel name, without the '#' (ex. odyssey):",
      validate: nonEmptyStringValidator("Please enter a Slack channel name"),
      when: i18nConfigMethod === I18nConfigMethods.MANUAL_DETAILS,
    },
    {
      type: "input",
      name: "secondaryReviewer",
      message:
        "Enter the reviewing team, your team’s alias on GitHub (ex. atko/odyssey-design-system):",
      validate: nonEmptyStringValidator(
        "Please enter your team’s alias on GitHub",
      ),
    },
  ]);
};

type I18nConfig = {
  guardian?: string;
  homeTeam?: string;
  jiraComponent?: string;
  namespace: string;
  resourceFile: string;
  resourceFilePath: string;
  reviewers: string[];
  slackChannel?: string;
  translationsFilePath: string;
};

const constructI18nConfig = ({
  cwd,
  secondaryReviewer,
  slackChannelName,
  ...restConfig
}: Omit<I18nConfigAnswers, "i18nConfigMethod"> & {
  cwd: string;
}): I18nConfig => {
  const packageName = getPackageName();

  const relativePackagePath = getRelativePackagePath(cwd);
  const resourceFilePath = join(
    relativePackagePath,
    ...CONFIG.PROPERTIES_PATH_SEGMENTS,
  );
  const translationsFilePath = join(
    relativePackagePath,
    ...CONFIG.TRANSLATION_PATH_SEGMENTS,
  );

  return {
    ...restConfig,
    slackChannel: slackChannelName,
    namespace: CONFIG.NAMESPACE,
    resourceFile: `${packageName}.properties`,
    resourceFilePath,
    reviewers: [CONFIG.DEFAULT_REVIEWER, secondaryReviewer],
    translationsFilePath,
  };
};

/**
 * Prompts user to select their team from a fetched list, or enter details manually if not found.
 * If fetching fails or no teams are returned, allows user to retry or enter details manually.
 */
const collectTeamChoice = async (retryCount = 3) => {
  const { teams, isFetchSuccessful } = await fetchTeams();

  if (teams.length) {
    const teamChoice = await autocomplete<string>({
      message: "Start typing to find your team:",
      source: (input = "") => {
        // filter teams list based on user input
        const filteredTeams = teams.filter(({ name }) =>
          name.toLowerCase().includes(input.toLowerCase()),
        );

        return Promise.resolve([
          {
            name: "My team isn't listed (Enter all details manually)",
            value: I18nConfigMethods.MANUAL_DETAILS,
          },
          new Separator(),
          ...filteredTeams,
        ]);
      },
      // 5 teams will be shown + the manual option and separator
      pageSize: 7,
    });

    if (teamChoice === I18nConfigMethods.MANUAL_DETAILS) {
      return { i18nConfigMethod: I18nConfigMethods.MANUAL_DETAILS };
    }

    return {
      i18nConfigMethod: I18nConfigMethods.SELECTED_TEAM,
      homeTeam: teamChoice,
    };
  }

  // Fetch returned no teams or failed.
  // We will ask the user if they want to retry or enter details manually.
  const message = isFetchSuccessful
    ? "No teams found. What would you like to do?"
    : "Failed to fetch teams. What would you like to do?";
  const manualEntryMessage =
    "We were unable to successfully fetch the teams at this time. Please select a method for manual entry";

  const hasRetry = retryCount !== 0;

  const { i18nConfigMethod } = await inquirer.prompt<{
    i18nConfigMethod: "RETRY" | I18nConfigMethod;
  }>([
    {
      type: "list",
      name: "i18nConfigMethod",
      message: hasRetry ? message : manualEntryMessage,
      choices: [
        ...(hasRetry ? [{ name: "Try fetching again", value: "RETRY" }] : []),
        {
          name: "Enter team name manually",
          value: I18nConfigMethods.MANUAL_TEAM,
        },
        {
          name: "Enter all details manually",
          value: I18nConfigMethods.MANUAL_DETAILS,
        },
      ],
    },
  ]);

  if (i18nConfigMethod === "RETRY") {
    return collectTeamChoice(retryCount - 1);
  }

  return { i18nConfigMethod };
};

const createI18nConfigJsonFile = async ({
  i18nConfig,
  i18nConfigFilePath,
}: {
  i18nConfig: I18nConfig;
  i18nConfigFilePath: string;
}) => {
  await rm(i18nConfigFilePath, { recursive: true, force: true });
  await writeFile(i18nConfigFilePath, JSON.stringify(i18nConfig, null, 2));

  log.info(`Created ${CONFIG.I18N_CONFIG_FILENAME} file`);
};

const createBasePropertiesFile = async ({
  propertiesDirectoryPath,
}: {
  propertiesDirectoryPath: string;
}) => {
  await rm(propertiesDirectoryPath, { recursive: true, force: true });
  await mkdir(propertiesDirectoryPath, { recursive: true });

  const fileName = `${getPackageName()}.properties`;
  const propertiesFilePath = resolve(propertiesDirectoryPath, fileName);

  await writeFile(propertiesFilePath, "test.property = Delete Me");

  log.info(`Created base properties file at ${propertiesFilePath}`);
};

const runFollowUpI18nCommands = async () => {
  const commands = [
    {
      title: "Installing @okta/odyssey-contribution-tooling",
      cmd: "yarn add --dev @okta/odyssey-contribution-tooling",
    },
    {
      title: "Generating pseudo locales",
      cmd: "yarn odyssey-cli i18n generate:pseudoLocaleProperties",
    },
    {
      title: "Building translation types",
      cmd: "yarn odyssey-cli i18n build:ts",
    },
    {
      title: "Generating i18n files",
      cmd: "yarn odyssey-cli i18n generate",
    },
  ];

  for (const { title, cmd } of commands) {
    log.info(title, { newLineBefore: true });
    await execAsync(cmd);
  }
};

const promptTicketCreation = async () => {
  log.warn("Almost done! One final step...", { newLineBefore: true });

  const { openTicket } = await inquirer.prompt<{ openTicket: boolean }>([
    {
      type: "confirm",
      name: "openTicket",
      message:
        "Would you like to open a ticket in Jira for the UI Global Access team in your browser now? (required in order to add a new bundle to the translation pipeline)",
      default: true,
    },
  ]);

  if (openTicket) {
    log.info("Opening browser...");
    await openLink(CONFIG.JIRA_TICKET_TEMPLATE_URL);
  } else {
    log.info(
      `No problem. Here is the link for later: ${CONFIG.JIRA_TICKET_TEMPLATE_URL}`,
    );
  }
};

/**
 * 1. Checks for existing i18n configuration or properties directory and prompts user to overwrite if found.
 * 2. Prompts user for all required config options for `i18n.config.json`, including team selection and details.
 * 3. Creates `i18n.config.json` with user-provided options.
 * 4. Creates a base `<project_name>.properties` file with a default value.
 * 5. Runs follow-up commands to install tooling, generate pseudo locales, build translation types, and generate i18n files.
 * 6. Prompts user to open a Jira ticket for the UI Global Access team.
 */
const initI18n = async () => {
  const cwd = process.cwd();
  const i18nConfigFilePath = resolve(CONFIG.I18N_CONFIG_FILENAME);
  const propertiesDirectoryPath = resolve(...CONFIG.PROPERTIES_PATH_SEGMENTS);

  const isI18nConfigPresent = (
    await Promise.all([
      getHasFileOrDirectory(i18nConfigFilePath),
      getHasFileOrDirectory(propertiesDirectoryPath),
    ])
  ).some(Boolean);

  if (isI18nConfigPresent) {
    const { shouldOverwrite } = await inquirer.prompt<{
      shouldOverwrite: boolean;
    }>([
      {
        type: "confirm",
        name: "shouldOverwrite",
        message:
          "i18n configuration detected, continuing will result in existing files being overwritten, would you like to continue?",
        default: false,
      },
    ]);

    if (!shouldOverwrite) {
      log.info("Exiting without making changes.");
      return;
    }
  }

  const { i18nConfigMethod, homeTeam } = await collectTeamChoice();
  const partialI18nConfig = await collectI18nConfig(i18nConfigMethod);

  const i18nConfig = constructI18nConfig({
    cwd,
    homeTeam,
    ...partialI18nConfig,
  });

  await createI18nConfigJsonFile({ i18nConfig, i18nConfigFilePath });
  await createBasePropertiesFile({ propertiesDirectoryPath });
  await runFollowUpI18nCommands();

  log.success("Successfully initialized i18n configuration!", {
    newLineBefore: true,
  });

  await promptTicketCreation();
};

export const initI18nCommand: CommandModule = {
  command: "init",
  describe: "Initializes i18n configuration for the project.",
  handler: initI18n,
};
