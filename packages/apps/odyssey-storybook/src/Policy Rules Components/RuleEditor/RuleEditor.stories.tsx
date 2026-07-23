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
  type BaseRule,
  ConditionEdit,
  type PolicyDescriptor,
  PolicyRulesProvider,
  type PolicyRulesService,
  RuleAccess,
  RuleEditor,
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
  actions?: { registration?: { access?: RuleAccess } };
  conditions?: { emailDomains?: { include?: string[] } };
}

// ── Constants ──────────────────────────────────────────────────────────────────

const MOCK_POLICY_ID = "policy-story-001";

const MOCK_DESCRIPTOR: PolicyDescriptor<SSRRule> = {
  policyType: "PROFILE_ENROLLMENT",
  defaultRule: {
    conditions: {},
    actions: { registration: { access: RuleAccess.Allow } },
  },
};

// ── Mock rule data ─────────────────────────────────────────────────────────────

const EXISTING_USER_RULE: SSRRule = {
  id: "rule-1",
  type: "PROFILE_ENROLLMENT",
  name: "Allow suspicious domains",
  priority: 1,
  status: "ACTIVE",
  system: false,
  conditions: { emailDomains: { include: ["ALL_SUSPICIOUS_EMAIL_DOMAINS"] } },
  actions: { registration: { access: RuleAccess.Allow } },
};

const SYSTEM_CATCH_ALL: SSRRule = {
  id: "rule-catch-all",
  type: "PROFILE_ENROLLMENT",
  name: "Catch-all rule",
  priority: 99,
  status: "ACTIVE",
  system: true,
  conditions: {},
  actions: { registration: { access: RuleAccess.Allow } },
};

// ── Mock service ───────────────────────────────────────────────────────────────

class MockPolicyRulesService implements PolicyRulesService<SSRRule> {
  private rules: SSRRule[];

  constructor(initialRules: SSRRule[]) {
    this.rules = [...initialRules];
  }

  listRules(): Promise<SSRRule[]> {
    return Promise.resolve([...this.rules]);
  }

  async getRule(_policyId: string, ruleId: string): Promise<SSRRule> {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 300);
    });
    const rule = this.rules.find((r) => r.id === ruleId);
    if (!rule) throw new Error(`Rule ${ruleId} not found`);
    return { ...rule };
  }

  async createRule(_policyId: string, payload: unknown): Promise<SSRRule> {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 400);
    });
    const rule = payload as Partial<SSRRule>;
    const created: SSRRule = {
      id: `rule-${Date.now()}`,
      type: rule.type ?? "PROFILE_ENROLLMENT",
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
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 400);
    });
    this.rules = this.rules.map((existing) =>
      existing.id === rule.id ? rule : existing,
    );
    action("updateRule")(rule);
    return rule;
  }

  updateRulePriority(
    _policyId: string,
    rule: SSRRule,
    newPriority: number,
  ): Promise<SSRRule> {
    const updated = { ...rule, priority: newPriority };
    this.rules = this.rules.map((existing) =>
      existing.id === rule.id ? updated : existing,
    );
    return Promise.resolve(updated);
  }

  activateRule(_policyId: string, ruleId: string): Promise<void> {
    this.rules = this.rules.map((existing) =>
      existing.id === ruleId
        ? { ...existing, status: "ACTIVE" as const }
        : existing,
    );
    return Promise.resolve();
  }

  deactivateRule(_policyId: string, ruleId: string): Promise<void> {
    this.rules = this.rules.map((existing) =>
      existing.id === ruleId
        ? { ...existing, status: "INACTIVE" as const }
        : existing,
    );
    return Promise.resolve();
  }

  deleteRule(_policyId: string, ruleId: string): Promise<void> {
    this.rules = this.rules.filter((existing) => existing.id !== ruleId);
    return Promise.resolve();
  }
}

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  component: Card,
  decorators: [
    OdysseyStorybookThemeDecorator,
    PolicyRulesComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `\`RuleEditor\` is a compound component for creating and editing individual policy rules. It must be composed inside a \`PolicyRulesProvider\` that supplies the policy descriptor, labels, and service layer, and a \`QueryClientProvider\` from React Query.

\`\`\`tsx
<QueryClientProvider client={queryClient}>
  <PolicyRulesProvider policyId="policy-001" descriptor={descriptor} service={service}>
    <RuleEditor.Root ruleId={ruleId}>
      <RuleEditor.ErrorBanner />
      <Card>
        <RuleEditor.NameField />
        <RuleEditor.Conditions>
          <ConditionEdit.Email />
        </RuleEditor.Conditions>
        <RuleEditor.Actions>
          <ActionEdit.Registration />
        </RuleEditor.Actions>
      </Card>
      <RuleEditor.Footer onCancel={handleCancel} onSaveSuccess={handleSaveSuccess} />
    </RuleEditor.Root>
  </PolicyRulesProvider>
</QueryClientProvider>
\`\`\`

When \`ruleId\` is \`null\`, the editor starts from the descriptor's \`defaultRule\` seed. When \`ruleId\` is set, the root fetches the rule by ID and gates on loading/error before mounting the form. The provider's \`key={ruleId}\` resets draft state when navigating between rules.`,
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ────────────────────────────────────────────────────────────────────

export const NewRule: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "New rule — the editor starts with an empty name field and default condition/action selections from `descriptor.defaultRule`. Clicking Save triggers a `createRule` call; validation prevents saving a blank name.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService([SYSTEM_CATCH_ALL]),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RuleEditor.Root ruleId={null}>
            <RuleEditor.ErrorBanner />
            <Card>
              <RuleEditor.NameField />
              <RuleEditor.Conditions>
                <ConditionEdit.Email />
              </RuleEditor.Conditions>
              <RuleEditor.Actions>
                <ActionEdit.Registration />
              </RuleEditor.Actions>
            </Card>
            <RuleEditor.Footer
              onCancel={action("cancel")}
              onSaveSuccess={action("save-success")}
            />
          </RuleEditor.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const EditRule: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Edit — the editor fetches the rule and pre-populates the form. A 300 ms simulated delay shows the loading spinner before the form appears. Saving fires an `updateRule` call.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService([EXISTING_USER_RULE, SYSTEM_CATCH_ALL]),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RuleEditor.Root ruleId={EXISTING_USER_RULE.id}>
            <RuleEditor.ErrorBanner />
            <Card>
              <RuleEditor.NameField />
              <RuleEditor.Conditions>
                <ConditionEdit.Email />
              </RuleEditor.Conditions>
              <RuleEditor.Actions>
                <ActionEdit.Registration />
              </RuleEditor.Actions>
            </Card>
            <RuleEditor.Footer
              onCancel={action("cancel")}
              onSaveSuccess={action("save-success")}
            />
          </RuleEditor.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const SystemRule: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Editing a system rule (`system: true`). The rule name field is read-only. Conditions are locked but the registration action can still be edited — the V2 policy framework allows action changes on the catch-all.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService([EXISTING_USER_RULE, SYSTEM_CATCH_ALL]),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RuleEditor.Root ruleId={SYSTEM_CATCH_ALL.id}>
            <RuleEditor.ErrorBanner />
            <Card>
              <RuleEditor.NameField />
              <RuleEditor.Conditions>
                <ConditionEdit.Email />
              </RuleEditor.Conditions>
              <RuleEditor.Actions>
                <ActionEdit.Registration />
              </RuleEditor.Actions>
            </Card>
            <RuleEditor.Footer
              onCancel={action("cancel")}
              onSaveSuccess={action("save-success")}
            />
          </RuleEditor.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};
