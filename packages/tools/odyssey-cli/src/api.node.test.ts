import { http, HttpResponse } from "msw";
import { execSync } from "node:child_process";
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

import { fetchTeams, getAurmToken } from "./api";
import { getTeamsUrl } from "./mocks/handlers";
import { server } from "./mocks/server";

vi.mock("node:child_process", async () => {
  return {
    ...(await vi.importActual("node:child_process")),
    execSync: vi.fn(),
  };
});

const mockedExecSync = vi.mocked(execSync);

describe("odyssey-cli api", () => {
  const token = " FAKE_TOKEN ";

  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  beforeEach(() => {
    mockedExecSync.mockReturnValue(token);
  });

  afterEach(() => {
    server.resetHandlers();
    vi.resetAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  describe("getAurmToken", () => {
    test("returns token when command succeeds", () => {
      expect(getAurmToken()).toEqual("FAKE_TOKEN");
    });

    test("logs error and returns null when command fails", () => {
      mockedExecSync.mockImplementation(() => {
        throw new Error("Something went wrong with ocm command");
      });

      expect(getAurmToken()).toEqual(null);
    });
  });

  describe("fetchTeams", () => {
    test("retrieves and transforms teams from aperture API", async () => {
      const teamsResponse = await fetchTeams();

      expect(teamsResponse).toEqual({
        teams: [
          {
            name: "am_client_foundations_team (JIRA - Team: Client Foundations)",
            value: "am_client_foundations_team",
          },
          {
            name: "amp_passwordless (JIRA - Team: Credential Platform)",
            value: "amp_passwordless",
          },
          {
            name: "amp-oda-backend (JIRA - Team: ODA Cloud Services)",
            value: "amp-oda-backend",
          },
          {
            name: "authenticator_platform (JIRA - Team: Access Frameworks)",
            value: "authenticator_platform",
          },
          {
            name: "coreidentity (JIRA - Team: Core Identity)",
            value: "coreidentity",
          },
          {
            name: "eng_ilm (JIRA - Team: Lifecycle Automation)",
            value: "eng_ilm",
          },
          {
            name: "wic_oktajoin (JIRA - Team: Device-platform)",
            value: "wic_oktajoin",
          },
          {
            name: "workforce_authenticators (JIRA - Team: Workforce Authenticators)",
            value: "workforce_authenticators",
          },
        ],
        isFetchSuccessful: true,
      });
    });

    test("logs warning and returns empty list when call to aperture api fails", async () => {
      server.use(
        http.get(getTeamsUrl, () =>
          HttpResponse.json({ error: "Unauthorized" }, { status: 401 }),
        ),
      );

      const teamsResponse = await fetchTeams();

      expect(teamsResponse).toEqual({
        teams: [],
        isFetchSuccessful: false,
      });
    });

    test("logs warning and returns empty list when token is null", async () => {
      mockedExecSync.mockImplementation(() => {
        throw new Error("Something went wrong with ocm command");
      });

      const teamsResponse = await fetchTeams();

      expect(teamsResponse).toEqual({
        teams: [],
        isFetchSuccessful: false,
      });
    });
  });
});
