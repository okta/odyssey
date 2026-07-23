/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ActionEdit,
  ActionRead,
  type BaseRule,
  ConditionEdit,
  ConditionRead,
  type NetworkZone,
  NetworkZoneService,
  NetworkZoneUsage,
  type PolicyDescriptor,
  PolicyRulesProvider,
  type PolicyRulesService,
  RuleAccess,
  RuleEditor,
  RulesTable,
  validateNetworkZone,
} from "@okta/odyssey-contributions-policy-rules-components";
import { Box, useOdysseyDesignTokens } from "@okta/odyssey-react-mui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useMemo } from "react";
import { action } from "storybook/actions";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { PolicyRulesComponentsStorybookThemeDecorator } from "../../tools/PolicyRulesComponentsStorybookThemeDecorator.js";

// Local demo wrapper — the compound intentionally ships without a Card so
// consumers pick their own surface. Stories still show what a typical
// consumer-supplied card looks like.
const Card = ({ children }: { children?: ReactNode }) => {
  const tokens = useOdysseyDesignTokens();
  return (
    <Box
      sx={{
        backgroundColor: tokens.HueNeutralWhite,
        borderRadius: tokens.BorderRadiusOuter,
        display: "flex",
        flexDirection: "column",
        gap: tokens.Spacing5,
        pt: tokens.Spacing5,
        px: tokens.Spacing5,
      }}
    >
      {children}
    </Box>
  );
};

// ── Domain types ───────────────────────────────────────────────────────────────

interface SSRRule extends BaseRule {
  actions?: {
    registration?: { access: RuleAccess };
  };
  conditions?: {
    emailDomains?: { include?: string[] };
    network?: { connection?: string; exclude?: string[]; include?: string[] };
  };
}

// ── Constants ──────────────────────────────────────────────────────────────────

const MOCK_POLICY_ID = "policy-story-ssr-001";

const SSR_DESCRIPTOR: PolicyDescriptor<SSRRule> = {
  policyType: "SELF_SERVICE_REGISTRATION",
  defaultRule: {
    conditions: {},
    actions: { registration: { access: RuleAccess.Allow } },
  },
};

const SSR_MAX_TOTAL_RULES = 10;

// ── Mock network zone service ──────────────────────────────────────────────────

const MOCK_ZONES: NetworkZone[] = [
  {
    id: "nzid-office-network",
    name: "Office Network",
    usage: NetworkZoneUsage.Policy,
    type: "IP",
    system: false,
  },
  {
    id: "nzid-vpn-zone",
    name: "Corporate VPN",
    usage: NetworkZoneUsage.Policy,
    type: "IP",
    system: false,
  },
  {
    id: "nzid-trusted-proxies",
    name: "Trusted Proxies",
    usage: NetworkZoneUsage.Policy,
    type: "IP",
    system: false,
  },
];

class MockNetworkZoneService extends NetworkZoneService {
  private readonly zones: NetworkZone[];

  constructor(zones: NetworkZone[]) {
    // Pass empty options so the base class does not attempt to build OIDC
    // clients that rely on `window.okta.*` globals absent in Storybook.
    super({});
    this.zones = zones;
  }

  override listNetworkZones(): Promise<NetworkZone[]> {
    return new Promise<NetworkZone[]>((resolve) => {
      setTimeout(() => {
        resolve([...this.zones]);
      }, 300);
    });
  }
}

// ── Mock rules ─────────────────────────────────────────────────────────────────

const SSR_RULES: SSRRule[] = [
  {
    id: "ssr-rule-1",
    type: "SELF_SERVICE_REGISTRATION",
    name: "Allow everyone",
    priority: 1,
    status: "ACTIVE",
    system: false,
    conditions: {},
    actions: { registration: { access: RuleAccess.Allow } },
  },
  {
    id: "ssr-rule-2",
    type: "SELF_SERVICE_REGISTRATION",
    name: "Block disposable domains on office network",
    priority: 2,
    status: "ACTIVE",
    system: false,
    conditions: {
      emailDomains: { include: ["ALL_SUSPICIOUS_EMAIL_DOMAINS"] },
      network: {
        connection: "ZONE",
        include: ["nzid-office-network"],
      },
    },
    actions: { registration: { access: RuleAccess.Deny } },
  },
  {
    id: "ssr-rule-3",
    type: "SELF_SERVICE_REGISTRATION",
    name: "Allow outside VPN",
    priority: 3,
    status: "INACTIVE",
    system: false,
    conditions: {
      network: {
        connection: "ZONE",
        exclude: ["nzid-vpn-zone"],
      },
    },
    actions: { registration: { access: RuleAccess.Allow } },
  },
  {
    id: "ssr-catch-all",
    type: "SELF_SERVICE_REGISTRATION",
    name: "Default rule",
    priority: 99,
    status: "ACTIVE",
    system: true,
    conditions: {},
    actions: { registration: { access: RuleAccess.Allow } },
  },
];

// ── Mock service ───────────────────────────────────────────────────────────────

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

class MockSSRPolicyRulesService implements PolicyRulesService<SSRRule> {
  private rules: SSRRule[];

  constructor(initialRules: SSRRule[]) {
    this.rules = [...initialRules];
  }

  async listRules(): Promise<SSRRule[]> {
    await delay(400);
    return [...this.rules];
  }

  async getRule(_policyId: string, ruleId: string): Promise<SSRRule> {
    await delay(300);
    const rule = this.rules.find((r) => r.id === ruleId);
    if (!rule) throw new Error(`Rule ${ruleId} not found`);
    return { ...rule };
  }

  async createRule(_policyId: string, payload: unknown): Promise<SSRRule> {
    await delay(400);
    const rule = payload as Partial<SSRRule>;
    const created: SSRRule = {
      id: `ssr-rule-${Date.now()}`,
      type: "SELF_SERVICE_REGISTRATION",
      name: rule.name ?? "",
      priority: this.rules.length + 1,
      status: "ACTIVE",
      system: false,
      ...rule,
    };
    this.rules = [...this.rules, created];
    action("createRule")(created);
    return created;
  }

  async updateRule(_policyId: string, rule: SSRRule): Promise<SSRRule> {
    await delay(400);
    this.rules = this.rules.map((existing) =>
      existing.id === rule.id ? rule : existing,
    );
    action("updateRule")(rule);
    return rule;
  }

  async updateRulePriority(
    _policyId: string,
    rule: SSRRule,
    newPriority: number,
  ): Promise<SSRRule> {
    await delay(300);
    const updated = { ...rule, priority: newPriority };
    this.rules = this.rules.map((existing) =>
      existing.id === rule.id ? updated : existing,
    );
    return updated;
  }

  async activateRule(_policyId: string, ruleId: string): Promise<void> {
    await delay(300);
    this.rules = this.rules.map((existing) =>
      existing.id === ruleId
        ? { ...existing, status: "ACTIVE" as const }
        : existing,
    );
  }

  async deactivateRule(_policyId: string, ruleId: string): Promise<void> {
    await delay(300);
    this.rules = this.rules.map((existing) =>
      existing.id === ruleId
        ? { ...existing, status: "INACTIVE" as const }
        : existing,
    );
  }

  async deleteRule(_policyId: string, ruleId: string): Promise<void> {
    await delay(300);
    this.rules = this.rules.filter((existing) => existing.id !== ruleId);
  }
}

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  component: RulesTable.Table,
  decorators: [
    OdysseyStorybookThemeDecorator,
    PolicyRulesComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Stories showing the \`policy-rules-components\` compound wired up for a Self-Service Registration (SSR) policy. SSR rules use three condition/action components: \`ConditionEdit.Email\`, \`ConditionEdit.NetworkZone\`, and \`ActionEdit.Registration\`. Network zones are resolved via a \`MockNetworkZoneService\` that returns named zones so cells display names instead of raw IDs.`,
      },
    },
  },
} satisfies Meta<typeof RulesTable.Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ────────────────────────────────────────────────────────────────────

export const RulesTableCanManage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full management mode — Add button, drag-to-reorder, and all row action menu items (Edit, Activate/Deactivate, Delete) are available. Three user rules plus a system catch-all. Conditions resolve to human-readable labels via the mock network zone service.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(() => new MockSSRPolicyRulesService(SSR_RULES), []);
    const networkZoneService = useMemo(
      () => new MockNetworkZoneService(MOCK_ZONES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={SSR_DESCRIPTOR}
          networkZoneService={networkZoneService}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root maxTotalRules={SSR_MAX_TOTAL_RULES}>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table
              actions={[ActionRead.Registration]}
              conditions={[ConditionRead.Email, ConditionRead.NetworkZone]}
              onEditRule={action("edit-rule")}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const RulesTableReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Read-only mode — `<RulesTable.Root permissions={{ canManage: false }}>` hides the Add button, disables drag and hides the drag handle (Priority column remains visible), and suppresses all row-action menu items. Conditions and actions still render their read-only cells.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(() => new MockSSRPolicyRulesService(SSR_RULES), []);
    const networkZoneService = useMemo(
      () => new MockNetworkZoneService(MOCK_ZONES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={SSR_DESCRIPTOR}
          networkZoneService={networkZoneService}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root
            maxTotalRules={SSR_MAX_TOTAL_RULES}
            permissions={{ canManage: false }}
          >
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table
              actions={[ActionRead.Registration]}
              conditions={[ConditionRead.Email, ConditionRead.NetworkZone]}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const RulesTableCustomI18n: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Overrides the compound's built-in strings via `<PolicyRulesProvider i18nOverrides={...}>`. The prop is a locale-agnostic partial map — the compound applies each override under whichever language its i18next instance is currently rendering, and stays in sync with the parent app's react-i18next language. Anything you omit falls through to the compound's default. Here the Add button, empty-state title/description, and rule-name label are re-worded for the SSR context; every other string still comes from the compound.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(() => new MockSSRPolicyRulesService([]), []);
    const networkZoneService = useMemo(
      () => new MockNetworkZoneService(MOCK_ZONES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={SSR_DESCRIPTOR}
          i18nOverrides={{
            "rulesTable.addRule": "Add SSR rule",
            "rulesTable.empty": "No SSR rules yet",
            "rulesTable.emptyDescription":
              "Add a rule to control who can self-register for this org.",
            "ruleEditor.name.label": "SSR rule name",
          }}
          networkZoneService={networkZoneService}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root maxTotalRules={SSR_MAX_TOTAL_RULES}>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table
              actions={[ActionRead.Registration]}
              conditions={[ConditionRead.Email, ConditionRead.NetworkZone]}
              onEditRule={action("edit-rule")}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const RuleEditorNew: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "New rule — the editor starts from `descriptor.defaultRule` (email: any, network: anywhere, registration: Allow). Clicking Save triggers `createRule`. The network zone picker is loaded from the mock service.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(() => new MockSSRPolicyRulesService(SSR_RULES), []);
    const networkZoneService = useMemo(
      () => new MockNetworkZoneService(MOCK_ZONES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={SSR_DESCRIPTOR}
          networkZoneService={networkZoneService}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RuleEditor.Root ruleId={null} validators={[validateNetworkZone]}>
            <RuleEditor.ErrorBanner />
            <Card>
              <RuleEditor.NameField />
              <RuleEditor.Conditions>
                <ConditionEdit.Email />
                <ConditionEdit.NetworkZone />
              </RuleEditor.Conditions>
              <RuleEditor.Actions>
                <ActionEdit.Registration />
              </RuleEditor.Actions>
              <RuleEditor.Footer
                onCancel={action("cancel")}
                onSaveSuccess={action("save-success")}
              />
            </Card>
          </RuleEditor.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const RuleEditorEdit: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Edit — loads rule `ssr-rule-2` (disposable email domains + office network zone, registration denied). A 300 ms simulated delay shows the loading spinner before the form appears. Saving fires `updateRule`.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(() => new MockSSRPolicyRulesService(SSR_RULES), []);
    const networkZoneService = useMemo(
      () => new MockNetworkZoneService(MOCK_ZONES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={SSR_DESCRIPTOR}
          networkZoneService={networkZoneService}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RuleEditor.Root
            ruleId="ssr-rule-2"
            validators={[validateNetworkZone]}
          >
            <RuleEditor.ErrorBanner />
            <Card>
              <RuleEditor.NameField />
              <RuleEditor.Conditions>
                <ConditionEdit.Email />
                <ConditionEdit.NetworkZone />
              </RuleEditor.Conditions>
              <RuleEditor.Actions>
                <ActionEdit.Registration />
              </RuleEditor.Actions>
              <RuleEditor.Footer
                onCancel={action("cancel")}
                onSaveSuccess={action("save-success")}
              />
            </Card>
          </RuleEditor.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};
