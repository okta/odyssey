import { http, HttpResponse } from "msw";

export const getTeamsUrl = "https://aperture-go.aue1e.saasure.net/v1/teams";
export const handlers = [
  http.get(getTeamsUrl, () => {
    return HttpResponse.json([
      {
        name: "am_client_foundations_team",
        email: "am_client_foundations_team@okta.com",
        slackChannel: "amf-client-foundations",
        jiraComponent: "Team: Client Foundations",
        guardian: "guardian-amp-foundations",
        pillarName: "Unclassified",
        members: [],
      },
      {
        name: "amp_passwordless",
        email: "amp_passwordless@okta.com",
        slackChannel: "amp-eng-passwordless",
        jiraComponent: "Team: Credential Platform",
        guardian: "guardian-passwordless",
        pillarName: "Unclassified",
        members: [],
      },
      {
        name: "amp-oda-backend",
        email: "amp-oda-backend@okta.com",
        slackChannel: "amp-device-access",
        jiraComponent: "Team: ODA Cloud Services",
        guardian: "oda-backend",
        pillarName: "Access Management",
        members: [],
      },
      {
        name: "authenticator_platform",
        email: "authenticator_platform@okta.com",
        slackChannel: "amp-eng-access-frameworks",
        jiraComponent: "Team: Access Frameworks",
        guardian: "guardian-access-frameworks",
        pillarName: "Access Management",
        members: [],
      },
      {
        name: "coreidentity",
        email: "coreidentity@okta.com",
        slackChannel: "eng-core-identity",
        jiraComponent: "Team: Core Identity",
        guardian: "guardian-coreidentity",
        pillarName: "Identity Management",
        members: [],
      },
      {
        name: "eng_ilm",
        email: "eng_ilm@okta.com",
        slackChannel: "eng-lca",
        jiraComponent: "Team: Lifecycle Automation",
        guardian: null,
        pillarName: "Unclassified",
        members: [],
      },
      {
        name: "wic_oktajoin",
        email: "wic_oktajoin@okta.com",
        slackChannel: "dsr-device-access",
        jiraComponent: "Team: Device-platform",
        guardian: "guardian-deviceidentity",
        pillarName: "Unclassified",
        members: [],
      },
      {
        name: "workforce_authenticators",
        email: "workforce_authenticators@okta.com",
        slackChannel: "amp-eng-workforce-authenticators",
        jiraComponent: "Team: Workforce Authenticators",
        guardian: "guardian-workforce-authenticators",
        pillarName: "Access Management",
        members: [],
      },
    ]);
  }),
];
