/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as prompts from "@clack/prompts";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { ciMigrate, interactiveMigrate } from "./init.js";
import { migrate } from "./migrate.js";
import * as utils from "./utils.js";

const logger = vi.fn();

vi.spyOn(process, "exit").mockImplementation((number) => {
  throw new Error(`process.exit: ${number}`);
});

vi.mock("./utils.js", async () => {
  return {
    ...(await vi.importActual("./utils.js")),
    createLogger: () => logger,
    updateOdyssey: vi.fn(),
    getEligibleMappings: vi.fn(),
    formatMigrationLabel: vi.fn((key: string) => key),
  };
});
vi.mock("./migrate.js", () => ({ migrate: vi.fn() }));
vi.mock("@clack/prompts", () => ({
  autocompleteMultiselect: vi.fn(),
  cancel: vi.fn(),
  confirm: vi.fn(),
  group: vi.fn(),
  info: vi.fn(),
  intro: vi.fn(),
  isCancel: vi.fn(() => false),
  note: vi.fn(),
  outro: vi.fn(),
  spinner: vi.fn(() => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
  text: vi.fn(),
}));

const mockedMigrate = vi.mocked(migrate);
const mockedUtils = vi.mocked(utils);
const mockedPrompts = vi.mocked(prompts);

describe("init", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("interactiveMigrate", () => {
    test("runs migration when eligible options exist", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [],
      });
      mockedPrompts.confirm.mockResolvedValueOnce(false); // verbose
      mockedPrompts.confirm.mockResolvedValueOnce(true); // shouldUpdateOdyssey
      mockedUtils.updateOdyssey.mockResolvedValue(true);
      mockedPrompts.group.mockResolvedValue({
        components: ["DataTable"],
        paths: "src/",
        dryRun: false,
      });
      mockedPrompts.confirm.mockResolvedValueOnce(true);
      mockedMigrate.mockResolvedValue({
        success: true,
        ok: 1,
        nochange: 0,
        skip: 0,
        error: 0,
        timeElapsed: "0s",
      });

      await interactiveMigrate();
      expect(mockedUtils.updateOdyssey).toHaveBeenCalled();
      expect(mockedMigrate).toHaveBeenCalledWith(
        expect.objectContaining({
          components: "DataTable",
          dryRun: false,
          paths: ["src/"],
          logger: expect.any(Function),
        }),
      );
    });

    test("handles no eligible migrations", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [],
        hidden: [],
      });
      mockedPrompts.confirm.mockResolvedValueOnce(false);
      await interactiveMigrate();
      expect(mockedPrompts.outro).toHaveBeenCalledWith("Done");
    });

    test("handles user cancel at update prompt", async () => {
      mockedPrompts.confirm.mockResolvedValueOnce(true);
      mockedPrompts.isCancel.mockReturnValueOnce(true);

      await expect(interactiveMigrate()).rejects.toThrow("process.exit: 0");
      expect(mockedPrompts.cancel).toHaveBeenCalledWith("Migration cancelled.");
    });

    test("handles user cancel at final confirm", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [],
      });
      mockedPrompts.confirm.mockResolvedValueOnce(false);
      mockedPrompts.group.mockResolvedValue({
        components: ["DataTable"],
        paths: "src/",
        dryRun: false,
      });
      mockedPrompts.confirm.mockResolvedValueOnce(false);
      await expect(interactiveMigrate()).rejects.toThrow("process.exit: 0");
      expect(mockedPrompts.cancel).toHaveBeenCalledWith("Migration cancelled.");
    });

    test("logs hidden migrations", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [{ key: "Uploader", reason: "not installed" }],
      });
      mockedPrompts.confirm.mockResolvedValueOnce(false); // verbose
      mockedPrompts.confirm.mockResolvedValueOnce(false); // shouldUpdateOdyssey
      mockedPrompts.group.mockResolvedValue({
        components: ["DataTable"],
        paths: "src/",
        dryRun: false,
      });
      mockedPrompts.confirm.mockResolvedValueOnce(true); // proceed
      mockedMigrate.mockResolvedValue({
        success: true,
        ok: 1,
        nochange: 0,
        skip: 0,
        error: 0,
        timeElapsed: "0s",
      });
      await interactiveMigrate();
      expect(logger).toHaveBeenCalledWith({
        message: 'Hiding migration "Uploader": not installed',
        type: "warn",
      });
    });

    test("handles migration failure", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [],
      });
      mockedPrompts.confirm.mockResolvedValueOnce(false); // verbose
      mockedPrompts.confirm.mockResolvedValueOnce(false); // shouldUpdateOdyssey
      mockedPrompts.group.mockResolvedValue({
        components: ["DataTable"],
        paths: "src/",
        dryRun: false,
      });
      mockedPrompts.confirm.mockResolvedValueOnce(true); // proceed
      mockedMigrate.mockResolvedValue({
        success: false,
        error: 2,
        ok: 0,
        nochange: 0,
        skip: 0,
        timeElapsed: "0s",
      });
      await interactiveMigrate();
      expect(mockedMigrate).toHaveBeenCalled();
    });

    test("handles migration throw", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [],
      });
      mockedPrompts.confirm.mockResolvedValueOnce(false); // verbose
      mockedPrompts.confirm.mockResolvedValueOnce(false); // shouldUpdateOdyssey
      mockedPrompts.group.mockResolvedValue({
        components: ["DataTable"],
        paths: "src/",
        dryRun: false,
      });
      mockedPrompts.confirm.mockResolvedValueOnce(true);
      mockedMigrate.mockRejectedValue(new Error("fail"));
      await interactiveMigrate();
      expect(mockedMigrate).toHaveBeenCalled();
    });
  });

  describe("ciMigrate", () => {
    test("ciMigrate runs migration with valid keys", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [],
      });
      mockedUtils.updateOdyssey.mockResolvedValue(true);
      mockedMigrate.mockResolvedValue({
        success: true,
        ok: 1,
        nochange: 0,
        skip: 0,
        error: 0,
        timeElapsed: "0s",
      });

      await ciMigrate({
        components: "DataTable",
        dryRun: false,
        paths: ["src/"],
        updateOdyssey: true,
        verbose: false,
      });
      expect(mockedUtils.updateOdyssey).toHaveBeenCalled();
      expect(mockedMigrate).toHaveBeenCalledWith(
        expect.objectContaining({
          components: "DataTable",
          dryRun: false,
          paths: ["src/"],
          logger: expect.any(Function),
        }),
      );
    });

    test("handles unknown keys", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [],
        hidden: [],
      });
      mockedUtils.updateOdyssey.mockResolvedValue(true);

      await ciMigrate({
        components: "UnknownComponent",
        dryRun: false,
        paths: ["src/"],
        updateOdyssey: true,
        verbose: false,
      });
      expect(mockedUtils.updateOdyssey).toHaveBeenCalled();
      expect(mockedMigrate).not.toHaveBeenCalled();
    });

    test("handles updateOdyssey failure", async () => {
      mockedUtils.updateOdyssey.mockResolvedValue(false);
      await ciMigrate({
        components: "DataTable",
        dryRun: false,
        paths: ["src/"],
        updateOdyssey: true,
        verbose: false,
      });
      expect(mockedUtils.updateOdyssey).toHaveBeenCalled();
      expect(mockedMigrate).not.toHaveBeenCalled();
    });

    test("handles unknown keys", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [],
        hidden: [],
      });
      await ciMigrate({
        components: "UnknownComponent",
        dryRun: false,
        paths: ["src/"],
        updateOdyssey: false,
        verbose: false,
      });
      expect(mockedMigrate).not.toHaveBeenCalled();
    });

    test("handles hidden migrations", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [{ key: "Uploader", reason: "not installed" }],
      });
      mockedMigrate.mockResolvedValue({
        success: true,
        ok: 1,
        nochange: 0,
        skip: 0,
        error: 0,
        timeElapsed: "0s",
      });
      await ciMigrate({
        components: "DataTable",
        dryRun: false,
        paths: ["src/"],
        updateOdyssey: false,
        verbose: false,
      });
      expect(mockedMigrate).toHaveBeenCalled();
    });

    test("handles no eligible migrations", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [],
        hidden: [],
      });
      await ciMigrate({
        components: "DataTable",
        dryRun: false,
        paths: ["src/"],
        updateOdyssey: false,
        verbose: false,
      });
      expect(mockedMigrate).not.toHaveBeenCalled();
    });

    test("handles migrate failure", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [],
      });
      mockedMigrate.mockResolvedValue({
        success: false,
        error: 2,
        ok: 0,
        nochange: 0,
        skip: 0,
        timeElapsed: "0s",
      });
      await ciMigrate({
        components: "DataTable",
        dryRun: false,
        paths: ["src/"],
        updateOdyssey: false,
        verbose: false,
      });
      expect(mockedMigrate).toHaveBeenCalled();
    });

    test("handles migrate throw", async () => {
      mockedUtils.getEligibleMappings.mockReturnValue({
        eligible: [{ key: "DataTable" }],
        hidden: [],
      });
      mockedMigrate.mockRejectedValue(new Error("fail"));
      await ciMigrate({
        components: "DataTable",
        dryRun: false,
        paths: ["src/"],
        updateOdyssey: false,
        verbose: false,
      });
      expect(mockedMigrate).toHaveBeenCalled();
    });
  });
});
