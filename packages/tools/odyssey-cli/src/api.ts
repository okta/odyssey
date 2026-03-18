import { execSync } from "node:child_process";

import { getLogger } from "./utils.js";

const log = getLogger("api");

/**
 * Executes the `ocm auth aurm` command to retrieve the user's token.
 */
export const getAurmToken = () => {
  try {
    const token = execSync("ocm auth aurm", {
      encoding: "utf-8",
      stdio: "pipe",
    });

    return token.trim();
  } catch (error) {
    log.error((error as Error).message);
    log.error(
      "\nError: Could not retrieve AurmToken." +
        "\nPlease ensure 'ocm' is installed, in your PATH, and you are logged in.",
    );

    return null;
  }
};

export interface Team {
  email: string;
  guardian: string;
  jiraComponent: string;
  name: string;
  slackChannel: string;
}

/**
 * Fetches the list of teams from the Aperture API
 */
export const fetchTeams = async (): Promise<{
  isFetchSuccessful: boolean;
  teams: { name: string; value: string }[];
}> => {
  try {
    log.info("Attempting to get AurmToken...");
    const token = getAurmToken();

    if (!token) {
      throw new Error("Could not get AurmToken.");
    }

    log.info("Fetching teams from API...");

    const response = await fetch(
      "https://aperture-go.aue1e.saasure.net/v1/teams",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const teams = (await response.json()) as Team[];

    return {
      teams: teams.map(({ name, jiraComponent }) => ({
        name: `${name} (JIRA - ${jiraComponent})`,
        value: name,
      })),
      isFetchSuccessful: true,
    };
  } catch (error) {
    log.warn(`Failed to fetch teams: ${(error as Error).message}`);
    log.warn(
      `If you wish to configure i18n with a view of the team list, please check ocm credentials and try again.`,
    );

    return {
      teams: [],
      isFetchSuccessful: false,
    };
  }
};
