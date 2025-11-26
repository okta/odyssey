/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import inquirer from "inquirer";
import autocomplete from "inquirer-autocomplete-standalone";
import { vol, type Volume } from "memfs";
import { http, HttpResponse } from "msw";
import { execSync } from "node:child_process";
import { join } from "node:path";
import open from "open";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import { buildParser } from "./cli-parser.js";
import { getTeamsUrl } from "./mocks/handlers";
import { server } from "./mocks/server";
import { execAsync } from "./utils";

const FIXTURES_BASE = join(__dirname, "__tests__", "expected_outputs");

vi.mock("inquirer");
vi.mock("inquirer-autocomplete-standalone");
vi.mock("node:fs", async () => {
  return (await vi.importActual("memfs")).fs;
});
vi.mock("node:fs/promises", async () => {
  return ((await vi.importActual("memfs")).fs as Volume).promises;
});
vi.mock("node:child_process", async () => {
  return {
    ...(await vi.importActual("node:child_process")),
    execSync: vi.fn(),
  };
});
vi.mock("open");
vi.mock("./utils", async () => {
  return {
    ...(await vi.importActual("./utils")),
    execAsync: vi.fn(),
  };
});

const mockedAutocomplete = vi.mocked(autocomplete);
const mockedInquirerPrompt = vi.mocked(inquirer.prompt);
const mockedExecSync = vi.mocked(execSync);
const mockedExecAsync = vi.mocked(execAsync);
const mockedOpen = vi.mocked(open);

const spyOnProcessCwd = vi.spyOn(process, "cwd");

describe("odyssey-cli", () => {
  const CWD = "/packages/contributions/fake-contribution-package";

  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  beforeEach(() => {
    vol.reset();

    mockedExecSync.mockReturnValue("FAKE_TOKEN");

    spyOnProcessCwd.mockImplementation(() => CWD);
  });

  afterEach(() => {
    server.resetHandlers();
    vi.resetAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  async function runCli(args: string[] | string) {
    return buildParser(args).exitProcess(false).parseAsync();
  }

  test("throws an error when given an unknown command", async () => {
    await expect(runCli("notACommand")).rejects.toThrowError(
      "Unknown command: notACommand",
    );
  });

  test("throw an error when given no commands", async () => {
    await expect(runCli("")).rejects.toThrowError(
      "You must provide a valid command.",
    );
  });

  describe("build:translationsJson", () => {
    const propertiesDir = `${CWD}/src/properties`;
    const translationPropertiesDir = `${propertiesDir}/translations`;
    const tsOutputDir = `${propertiesDir}/ts`;

    const createTranslationPropertiesDir = () => {
      vol.mkdirSync(translationPropertiesDir, { recursive: true });
    };

    test("converts .properties files to translation files", async () => {
      // ---- SETUP ----
      createTranslationPropertiesDir();
      vol.writeFileSync(
        `${translationPropertiesDir}/fake-contribution-package.properties`,
        "test.label = Hello\ntest.ariaLabel = my-label",
      );
      vol.writeFileSync(
        `${translationPropertiesDir}/fake-contribution-package_fr.properties`,
        "test.label = Bonjour\ntest.ariaLabel = my-label-fr",
      );

      const expectedInitialFileSystem = {
        [`${translationPropertiesDir}/fake-contribution-package.properties`]:
          "test.label = Hello\ntest.ariaLabel = my-label",
        [`${translationPropertiesDir}/fake-contribution-package_fr.properties`]:
          "test.label = Bonjour\ntest.ariaLabel = my-label-fr",
      };
      expect(vol.toJSON()).toEqual(expectedInitialFileSystem);

      // ---- RUN ----
      await runCli("build:translationsJson");

      // ---- ASSERT ----
      expect(vol.toJSON()).toEqual({
        ...expectedInitialFileSystem,
        [`${tsOutputDir}/fake-contribution-package.ts`]:
          'export const translation = {"test.label":"Hello","test.ariaLabel":"my-label"} as const;',
        [`${tsOutputDir}/fake-contribution-package_fr.ts`]:
          'export const translation = {"test.label":"Bonjour","test.ariaLabel":"my-label-fr"} as const;',
      });
    });

    test("exits the process without creating any files and warns the user that the translations are not setup if the source directory does not exist", async () => {
      expect(vol.toJSON()).toEqual({});

      await runCli("build:translationsJson");

      expect(vol.toJSON()).toEqual({});
    });

    test("throws an error if the source directory does not contain any properties files", async () => {
      createTranslationPropertiesDir();

      await expect(runCli("build:translationsJson")).rejects.toThrowError(
        "No `.properties` files found to convert.",
      );
    });
  });

  describe("generate:i18n", () => {
    const createTsFiles = (tsDir: string, packageName: string) => {
      vol.writeFileSync(
        `${tsDir}/${packageName}.ts`,
        'export const translation = {"test.property":"Delete Me"} as const;',
      );
      vol.writeFileSync(
        `${tsDir}/${packageName}_fr.ts`,
        'export const translation = {"test.property":"Supprimez-moi"} as const;',
      );
      vol.writeFileSync(
        `${tsDir}/${packageName}_pt_BR.ts`,
        'export const translation = {"test.property":"Delete"} as const;',
      );
    };

    test("exits process when the translations file directory is not setup", async () => {
      const spyOnConsoleWarn = vi.spyOn(console, "warn");

      expect(vol.toJSON()).toEqual({});

      await runCli("generate:i18n");

      expect(spyOnConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining("Translations are not yet setup."),
      );

      // nothing written to the virtual fs
      expect(vol.toJSON()).toEqual({});
    });

    test("throws an error if there are no translation files", async () => {
      vol.mkdirSync(`${CWD}/src/properties/ts`, { recursive: true });

      await expect(runCli("generate:i18n")).rejects.toThrowError(
        /No translation files found in/,
      );
    });

    test("throws error if there are duplicate language codes", async () => {
      const tsDir = `${CWD}/src/properties/ts`;
      vol.mkdirSync(tsDir, { recursive: true });
      vol.writeFileSync(`${tsDir}/fake-contribution-package.ts`, "");
      vol.writeFileSync(`${tsDir}/fake-contribution-package_fr.ts`, "");

      await expect(
        runCli("generate:i18n --defaultLanguageCode=fr"),
      ).rejects.toThrowError(
        "Duplicate language codes found. This must be resolved before files can be generated.\n" +
          "\n" +
          '  - Language Code "fr" was found in multiple files:\n' +
          "    - fake-contribution-package.ts (/packages/contributions/fake-contribution-package/src/properties/ts/fake-contribution-package.ts)\n" +
          "    - fake-contribution-package_fr.ts (/packages/contributions/fake-contribution-package/src/properties/ts/fake-contribution-package_fr.ts)\n" +
          "\n" +
          "This often happens if a file like 'package-name_en.ts' exists and the default language is also 'en'.",
      );
    });

    test.each([
      {
        variant: "odyssey-react-mui",
        cwd: "/packages/core/odyssey-react-mui",
        packageName: "odyssey-react-mui",
      },
      {
        variant: "contribution",
        cwd: CWD,
        packageName: "fake-contribution-package",
      },
    ])(
      "generates all i18n files correctly for $variant package",
      async ({ cwd, packageName }) => {
        vi.useFakeTimers();
        // mock date to keep generated copyright date is consistent
        vi.setSystemTime(new Date("2050-06-21"));

        spyOnProcessCwd.mockImplementation(() => cwd);

        const tsDir = `${cwd}/src/properties/ts`;
        vol.mkdirSync(tsDir, { recursive: true });
        createTsFiles(tsDir, packageName);

        await runCli("generate:i18n");

        const finalFileSystem = vol.toJSON();
        const i18nResourcesPath = `${cwd}/src/i18n.generated/i18n.resources.ts`;
        const i18nTypesPath = `${cwd}/src/i18n.generated/i18n.types.ts`;
        const i18nPath = `${cwd}/src/i18n.generated/i18n.ts`;

        expect(Object.keys(finalFileSystem)).toEqual([
          `${tsDir}/${packageName}.ts`,
          `${tsDir}/${packageName}_fr.ts`,
          `${tsDir}/${packageName}_pt_BR.ts`,
          i18nResourcesPath,
          i18nTypesPath,
          i18nPath,
        ]);

        // need to read the real fs
        const { readFileSync } =
          await vi.importActual<typeof import("node:fs")>("node:fs");
        const readExpected = (fileName: string) =>
          readFileSync(
            join(FIXTURES_BASE, packageName, `${fileName}.expected`),
            "utf8",
          );

        expect(finalFileSystem[i18nResourcesPath]).toEqual(
          readExpected("i18n.resources.ts"),
        );
        expect(finalFileSystem[i18nTypesPath]).toEqual(
          readExpected("i18n.types.ts"),
        );
        expect(finalFileSystem[i18nPath]).toEqual(readExpected("i18n.ts"));

        vi.useRealTimers();
      },
    );
  });

  describe("init:i18n", () => {
    const i18nConfigPath = `${CWD}/i18n.config.json`;
    const i18nPropertiesPath = `${CWD}/src/properties/fake-contribution-package.properties`;

    beforeEach(() => {
      vol.mkdirSync(CWD, { recursive: true });
      expect(vol.toJSON()).toEqual({ [CWD]: null });
    });

    const baseI18nConfig = {
      namespace: "enduser",
      resourceFile: "fake-contribution-package.properties",
      resourceFilePath:
        "packages/contributions/fake-contribution-package/src/properties",
      translationsFilePath:
        "packages/contributions/fake-contribution-package/src/properties/translations",
    };

    const assertPostInitCommandsRan = ({ isOpenCalled = false } = {}) => {
      expect(mockedExecAsync).toHaveBeenCalledTimes(4);
      expect(mockedExecAsync).toHaveBeenNthCalledWith(
        1,
        "yarn add --dev @okta/odyssey-contribution-tooling",
      );
      expect(mockedExecAsync).toHaveBeenNthCalledWith(
        2,
        "yarn generate:pseudoLocales",
      );
      expect(mockedExecAsync).toHaveBeenNthCalledWith(
        3,
        "yarn build:translationsJson",
      );
      expect(mockedExecAsync).toHaveBeenNthCalledWith(4, "yarn generate:i18n");

      expect(mockedOpen).toHaveBeenCalledTimes(isOpenCalled ? 1 : 0);
    };

    const assertFinalFileSystem = (
      i18nConfig: Record<string, string | string[]>,
    ) => {
      const finalFileSystem = vol.toJSON();

      expect(finalFileSystem).toEqual({
        [i18nConfigPath]: expect.any(String),
        [i18nPropertiesPath]: "test.property = Delete Me",
      });

      expect(JSON.parse(finalFileSystem[i18nConfigPath] as string)).toEqual(
        i18nConfig,
      );
    };

    const getExpectedPromptQuestions = ({
      isManualHomeTeamEntryRequired = false,
      isManualDetailEntryRequired = false,
    } = {}) => [
      {
        message:
          "Enter your home team name (Warning: must exist at https://aperture-go.aue1e.saasure.net/v1/teams):",
        name: "homeTeam",
        type: "input",
        validate: expect.any(Function),
        when: isManualHomeTeamEntryRequired,
      },
      {
        message: "Enter the guardian (ex. guardian-odyssey-eng):",
        name: "guardian",
        type: "input",
        validate: expect.any(Function),
        when: isManualDetailEntryRequired,
      },
      {
        message: "Enter the JIRA component (ex. Team: UICore Odyssey):",
        name: "jiraComponent",
        type: "input",
        validate: expect.any(Function),
        when: isManualDetailEntryRequired,
      },
      {
        message: "Enter the Slack channel name, without the '#' (ex. odyssey):",
        name: "slackChannelName",
        type: "input",
        validate: expect.any(Function),
        when: isManualDetailEntryRequired,
      },
      {
        message:
          "Enter the reviewing team, your team’s alias on GitHub (ex. atko/odyssey-design-system):",
        name: "secondaryReviewer",
        type: "input",
        validate: expect.any(Function),
      },
    ];

    const expectedOpenTicketPrompt = [
      {
        type: "confirm",
        name: "openTicket",
        message:
          "Would you like to open a ticket in Jira for the UI Global Access team in your browser now? (required in order to add a new bundle to the translation pipeline)",
        default: true,
      },
    ];

    test("creates files correctly when a home team is selected", async () => {
      // ---- SETUP ----
      const secondaryReviewer = "atko-eng/a-fake-team";
      mockedInquirerPrompt.mockResolvedValueOnce({ secondaryReviewer });
      mockedInquirerPrompt.mockResolvedValueOnce({ openTicket: false });

      // Team selected via autocomplete
      mockedAutocomplete.mockResolvedValue("authenticator_platform");

      // ---- RUN ----
      await runCli("init:i18n");

      // ---- Assert Inquirer Autocomplete was called with the correct config ----
      expect(mockedAutocomplete).toHaveBeenCalledTimes(1);
      expect(mockedAutocomplete).toHaveBeenCalledWith({
        message: "Start typing to find your team:",
        pageSize: 7,
        source: expect.any(Function),
      });

      // ---- Assert Inquirer prompt was called with the correct config ----
      expect(mockedInquirerPrompt).toHaveBeenCalledTimes(2);
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(
        1,
        getExpectedPromptQuestions(),
      );
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(
        2,
        expectedOpenTicketPrompt,
      );

      // ---- Assert Follow-up commands were executed ----
      assertPostInitCommandsRan();

      // ---- Assert on the file creation ----
      assertFinalFileSystem({
        ...baseI18nConfig,
        homeTeam: "authenticator_platform",
        reviewers: ["atko-eng/a-globalizationcore", secondaryReviewer],
      });
    });

    test("creates files correctly when a home team is inputted manually", async () => {
      // ---- SETUP ----
      server.use(
        http.get(getTeamsUrl, () =>
          HttpResponse.json({ error: "Unauthorized" }, { status: 401 }),
        ),
      );

      // MANUAL_TEAM selected via autocomplete
      mockedInquirerPrompt.mockResolvedValueOnce({
        i18nConfigMethod: "MANUAL_TEAM",
      });

      const homeTeam = "my_manual_team";
      const secondaryReviewer = "atko-eng/a-fake-team";
      mockedInquirerPrompt.mockResolvedValueOnce({
        homeTeam,
        secondaryReviewer,
      });
      mockedInquirerPrompt.mockResolvedValueOnce({ openTicket: false });

      // ---- RUN ----
      await runCli("init:i18n");

      // ---- Assert Inquirer Autocomplete was not called ----
      expect(mockedAutocomplete).not.toHaveBeenCalled();

      // ---- Assert Inquirer prompt was called with the correct config ----
      expect(mockedInquirerPrompt).toHaveBeenCalledTimes(3);
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(1, [
        {
          type: "list",
          name: "i18nConfigMethod",
          message: "Failed to fetch teams. What would you like to do?",
          choices: [
            { name: "Try fetching again", value: "RETRY" },
            { name: "Enter team name manually", value: "MANUAL_TEAM" },
            { name: "Enter all details manually", value: "MANUAL_DETAILS" },
          ],
        },
      ]);
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(
        2,
        getExpectedPromptQuestions({ isManualHomeTeamEntryRequired: true }),
      );
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(
        3,
        expectedOpenTicketPrompt,
      );

      // ---- Assert Follow-up commands were executed ----
      assertPostInitCommandsRan();

      // ---- Assert on the file creation ----
      assertFinalFileSystem({
        ...baseI18nConfig,
        homeTeam,
        reviewers: ["atko-eng/a-globalizationcore", secondaryReviewer],
      });
    });

    test("creates files correctly when all details are inputted manually & opens JIRA clone ticket URL when prompted", async () => {
      // ---- SETUP ----
      const secondaryReviewer = "atko-eng/a-fake-team";
      const guardian = "guardian-test-eng";
      const jiraComponent = "UICore Test";
      const slackChannelName = "ui-core-test";
      mockedInquirerPrompt.mockResolvedValueOnce({
        guardian,
        jiraComponent,
        secondaryReviewer,
        slackChannelName,
      });
      mockedInquirerPrompt.mockResolvedValueOnce({ openTicket: true });

      // Manual details selected via autocomplete
      mockedAutocomplete.mockResolvedValue("MANUAL_DETAILS");

      // ---- RUN ----
      await runCli("init:i18n");

      // ---- Assert Inquirer Autocomplete was called with the correct config ----
      expect(mockedAutocomplete).toHaveBeenCalledTimes(1);
      expect(mockedAutocomplete).toHaveBeenCalledWith({
        message: "Start typing to find your team:",
        pageSize: 7,
        source: expect.any(Function),
      });

      // ---- Assert Inquirer prompt was called with the correct config ----
      expect(mockedInquirerPrompt).toHaveBeenCalledTimes(2);
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(
        1,
        getExpectedPromptQuestions({ isManualDetailEntryRequired: true }),
      );
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(
        2,
        expectedOpenTicketPrompt,
      );

      // ---- Assert Follow-up commands were executed ----
      assertPostInitCommandsRan({ isOpenCalled: true });
      expect(mockedOpen).toHaveBeenCalledWith(
        "https://oktainc.atlassian.net/secure/CloneIssueDetails!default.jspa?id=1268459",
      );

      // ---- Assert on the file creation ----
      assertFinalFileSystem({
        ...baseI18nConfig,
        guardian,
        jiraComponent,
        slackChannel: slackChannelName,
        reviewers: ["atko-eng/a-globalizationcore", secondaryReviewer],
      });
    });

    test("overwrites existing configuration when user confirms overwrite", async () => {
      // ---- SETUP ----
      vol.mkdirSync(`${CWD}/src/properties`, { recursive: true });
      vol.writeFileSync(
        i18nPropertiesPath,
        "existing.property = Will be overwritten",
      );
      vol.writeFileSync(i18nConfigPath, "nonsense");

      expect(vol.toJSON()).toEqual({
        [i18nConfigPath]: "nonsense",
        [i18nPropertiesPath]: "existing.property = Will be overwritten",
      });

      mockedInquirerPrompt.mockResolvedValueOnce({ shouldOverwrite: true });
      const secondaryReviewer = "atko-eng/a-fake-team";
      mockedInquirerPrompt.mockResolvedValueOnce({ secondaryReviewer });
      mockedInquirerPrompt.mockResolvedValueOnce({ openTicket: false });

      // Team selected via autocomplete
      mockedAutocomplete.mockResolvedValue("authenticator_platform");

      // ---- RUN ----
      await runCli("init:i18n");

      // ---- Assert Inquirer Autocomplete was called with the correct config ----
      expect(mockedAutocomplete).toHaveBeenCalledTimes(1);
      expect(mockedAutocomplete).toHaveBeenCalledWith({
        message: "Start typing to find your team:",
        pageSize: 7,
        source: expect.any(Function),
      });

      // ---- Assert Inquirer prompt was called with the correct config ----
      expect(mockedInquirerPrompt).toHaveBeenCalledTimes(3);
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(1, [
        {
          type: "confirm",
          name: "shouldOverwrite",
          message:
            "i18n configuration detected, continuing will result in existing files being overwritten, would you like to continue?",
          default: false,
        },
      ]);
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(
        2,
        getExpectedPromptQuestions(),
      );
      expect(mockedInquirerPrompt).toHaveBeenNthCalledWith(
        3,
        expectedOpenTicketPrompt,
      );

      // ---- Assert Follow-up commands were executed ----
      assertPostInitCommandsRan();

      // ---- Assert on the file creation ----
      assertFinalFileSystem({
        ...baseI18nConfig,
        homeTeam: "authenticator_platform",
        reviewers: ["atko-eng/a-globalizationcore", secondaryReviewer],
      });
    });

    test.each([
      {
        testCase: "i18n.config.json detected",
        setupFs: () => {
          vol.writeFileSync(i18nConfigPath, "nonsense");
        },
        initialFileSystemState: {
          [i18nConfigPath]: "nonsense",
        },
      },
      {
        testCase: "i18n properties detected",
        setupFs: () => {
          vol.mkdirSync(`${CWD}/src/properties`, { recursive: true });
          vol.writeFileSync(
            i18nPropertiesPath,
            "existing.property = Will be overwritten",
          );
        },
        initialFileSystemState: {
          [i18nPropertiesPath]: "existing.property = Will be overwritten",
        },
      },
    ])(
      "exits process and does not overwrite when user denies overwrite ($testCase)",
      async ({ setupFs, initialFileSystemState }) => {
        // ---- SETUP ----
        setupFs();
        expect(vol.toJSON()).toEqual(initialFileSystemState);

        mockedInquirerPrompt.mockResolvedValue({ shouldOverwrite: false });

        // ---- RUN ----
        await runCli("init:i18n");

        // ---- ASSERT ----
        // ---- Assert Inquirer Autocomplete was not called ----
        expect(mockedAutocomplete).not.toHaveBeenCalled();

        // ---- Assert Inquirer prompt was only called once ----
        expect(mockedInquirerPrompt).toHaveBeenCalledTimes(1);

        // ---- Assert Follow-up commands were not executed ----
        expect(mockedExecAsync).not.toHaveBeenCalled();

        // ---- Assert no changes to file system ----
        expect(vol.toJSON()).toEqual(initialFileSystemState);
      },
    );

    test("allows a maximum of 3 retry attempts when fetching teams fails", async () => {
      // ---- SETUP ----
      server.use(
        http.get(
          getTeamsUrl,
          () => HttpResponse.json({ error: "Unauthorized" }, { status: 401 }),
          { once: true },
        ),
        http.get(getTeamsUrl, () => HttpResponse.json([])),
      );

      // User choosing "RETRY" 3 times
      mockedInquirerPrompt.mockResolvedValueOnce({ i18nConfigMethod: "RETRY" }); // Attempt 1
      mockedInquirerPrompt.mockResolvedValueOnce({ i18nConfigMethod: "RETRY" }); // Attempt 2
      mockedInquirerPrompt.mockResolvedValueOnce({ i18nConfigMethod: "RETRY" }); // Attempt 3

      // User being forced to choose an option ("MANUAL_TEAM" selected)
      mockedInquirerPrompt.mockResolvedValueOnce({
        i18nConfigMethod: "MANUAL_TEAM",
      });

      const homeTeam = "my_manual_team";
      const secondaryReviewer = "atko-eng/a-fake-team";
      mockedInquirerPrompt.mockResolvedValueOnce({
        homeTeam,
        secondaryReviewer,
      });
      mockedInquirerPrompt.mockResolvedValueOnce({ openTicket: false });

      // ---- RUN ----
      await runCli("init:i18n");

      // ---- ASSERT ----
      // ---- Assert Inquirer Autocomplete was not called ----
      expect(mockedAutocomplete).not.toHaveBeenCalled();

      // ---- Assert Inquirer prompt was called 5 times with the correct config each time ----
      const i18nConfigMethodBase = {
        type: "list",
        name: "i18nConfigMethod",
      };
      const i18nConfigMethodRetryChoice = {
        name: "Try fetching again",
        value: "RETRY",
      };
      const i18nConfigMethodBaseChoices = [
        { name: "Enter team name manually", value: "MANUAL_TEAM" },
        { name: "Enter all details manually", value: "MANUAL_DETAILS" },
      ];

      const getPromptWithRetry = (message: string) => [
        {
          ...i18nConfigMethodBase,
          message,
          choices: [
            i18nConfigMethodRetryChoice,
            ...i18nConfigMethodBaseChoices,
          ],
        },
      ];

      const promptWithoutRetry = [
        {
          ...i18nConfigMethodBase,
          message:
            "We were unable to successfully fetch the teams at this time. Please select a method for manual entry",
          choices: i18nConfigMethodBaseChoices,
        },
      ];

      expect(mockedInquirerPrompt).toHaveBeenCalledTimes(6);
      expect(mockedInquirerPrompt.mock.calls).toEqual([
        [
          getPromptWithRetry(
            "Failed to fetch teams. What would you like to do?",
          ),
        ],
        [getPromptWithRetry("No teams found. What would you like to do?")],
        [getPromptWithRetry("No teams found. What would you like to do?")],
        [promptWithoutRetry],
        [getExpectedPromptQuestions({ isManualHomeTeamEntryRequired: true })],
        [expectedOpenTicketPrompt],
      ]);

      // ---- Assert Follow-up commands were executed ----
      assertPostInitCommandsRan();

      // ---- Assert on the file creation ----
      assertFinalFileSystem({
        ...baseI18nConfig,
        homeTeam,
        reviewers: ["atko-eng/a-globalizationcore", secondaryReviewer],
      });
    });
  });
});
