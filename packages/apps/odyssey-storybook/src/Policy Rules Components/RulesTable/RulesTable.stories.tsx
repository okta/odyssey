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
  type BaseRule,
  type PolicyDescriptor,
  PolicyRulesProvider,
  type PolicyRulesService,
  RulesTable,
  RulesTableColumn,
  RulesTableRowAction,
} from "@okta/odyssey-contributions-policy-rules-components";
import { Box, MenuItem, Status, Typography } from "@okta/odyssey-react-mui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { action } from "storybook/actions";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { PolicyRulesComponentsStorybookThemeDecorator } from "../../tools/PolicyRulesComponentsStorybookThemeDecorator.js";

// ── Shared mock helpers ────────────────────────────────────────────────────────

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const MOCK_POLICY_ID = "policy-story-001";

const MOCK_DESCRIPTOR: PolicyDescriptor<BaseRule> = {
  policyType: "MFA_ENROLL",
};

// In-memory mock service — simulates the Okta Rules API without network calls.
class MockPolicyRulesService implements PolicyRulesService<BaseRule> {
  private rules: BaseRule[];

  constructor(initialRules: BaseRule[]) {
    this.rules = [...initialRules];
  }

  async listRules(): Promise<BaseRule[]> {
    await delay(400);
    return [...this.rules];
  }

  async getRule(_policyId: string, ruleId: string): Promise<BaseRule> {
    await delay(300);
    const rule = this.rules.find((r) => r.id === ruleId);
    if (!rule) throw new Error(`Rule ${ruleId} not found`);
    return { ...rule };
  }

  createRule(): Promise<BaseRule> {
    return Promise.reject(
      new Error("createRule is not implemented in the story mock"),
    );
  }

  async updateRule(_policyId: string, rule: BaseRule): Promise<BaseRule> {
    await delay(300);
    this.rules = this.rules.map((existingRule) =>
      existingRule.id === rule.id ? rule : existingRule,
    );
    return rule;
  }

  async updateRulePriority(
    _policyId: string,
    rule: BaseRule,
    newPriority: number,
  ): Promise<BaseRule> {
    await delay(300);
    const updatedRule = { ...rule, priority: newPriority };
    this.rules = this.rules.map((existingRule) =>
      existingRule.id === rule.id ? updatedRule : existingRule,
    );
    return updatedRule;
  }

  async activateRule(_policyId: string, ruleId: string): Promise<void> {
    await delay(300);
    this.rules = this.rules.map((existingRule) =>
      existingRule.id === ruleId
        ? { ...existingRule, status: "ACTIVE" as const }
        : existingRule,
    );
  }

  async deactivateRule(_policyId: string, ruleId: string): Promise<void> {
    await delay(300);
    this.rules = this.rules.map((existingRule) =>
      existingRule.id === ruleId
        ? { ...existingRule, status: "INACTIVE" as const }
        : existingRule,
    );
  }

  async deleteRule(_policyId: string, ruleId: string): Promise<void> {
    await delay(300);
    this.rules = this.rules.filter(
      (existingRule) => existingRule.id !== ruleId,
    );
  }
}

// ── Mock rule sets ─────────────────────────────────────────────────────────────

const THREE_USER_RULES: BaseRule[] = [
  {
    id: "rule-1",
    type: "MFA_ENROLL",
    name: "Require MFA for admins",
    priority: 1,
    status: "ACTIVE",
    system: false,
  },
  {
    id: "rule-2",
    type: "MFA_ENROLL",
    name: "Allow MFA for contractors",
    priority: 2,
    status: "ACTIVE",
    system: false,
  },
  {
    id: "rule-3",
    type: "MFA_ENROLL",
    name: "Enforce MFA outside office network",
    priority: 3,
    status: "ACTIVE",
    system: false,
  },
  {
    id: "rule-catch-all",
    type: "MFA_ENROLL",
    name: "Catch-all rule",
    priority: 99,
    status: "ACTIVE",
    system: true,
  },
];

const MIXED_STATUS_RULES: BaseRule[] = [
  {
    id: "rule-1",
    type: "MFA_ENROLL",
    name: "Require MFA for admins",
    priority: 1,
    status: "ACTIVE",
    system: false,
  },
  {
    id: "rule-2",
    type: "MFA_ENROLL",
    name: "Allow MFA for contractors",
    priority: 2,
    status: "INACTIVE",
    system: false,
  },
  {
    id: "rule-3",
    type: "MFA_ENROLL",
    name: "Enforce MFA outside office network",
    priority: 3,
    status: "INACTIVE",
    system: false,
  },
  {
    id: "rule-catch-all",
    type: "MFA_ENROLL",
    name: "Catch-all rule",
    priority: 99,
    status: "ACTIVE",
    system: true,
  },
];

const SINGLE_USER_RULE: BaseRule[] = [
  {
    id: "rule-1",
    type: "MFA_ENROLL",
    name: "Require MFA for admins",
    priority: 1,
    status: "ACTIVE",
    system: false,
  },
  {
    id: "rule-catch-all",
    type: "MFA_ENROLL",
    name: "Catch-all rule",
    priority: 99,
    status: "ACTIVE",
    system: true,
  },
];

const AT_MAX_RULES: BaseRule[] = [
  ...Array.from({ length: 9 }, (_, index) => ({
    id: `rule-${index + 1}`,
    type: "MFA_ENROLL",
    name: `User rule ${index + 1}`,
    priority: index + 1,
    status: "ACTIVE" as const,
    system: false,
  })),
  {
    id: "rule-catch-all",
    type: "MFA_ENROLL",
    name: "Catch-all rule",
    priority: 99,
    status: "ACTIVE",
    system: true,
  },
];

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
        component: `\`RulesTable\` is a compound component for displaying and managing policy rules. It must be composed inside a \`PolicyRulesProvider\` that supplies the policy descriptor, labels, and service layer, and a \`QueryClientProvider\` from React Query.

\`\`\`tsx
<QueryClientProvider client={queryClient}>
  <PolicyRulesProvider policyId="policy-001" descriptor={descriptor} service={service}>
    <RulesTable.Root>
      <RulesTable.AddButton onClick={handleAdd} />
      <RulesTable.Table onEditRule={handleEdit} />
      <RulesTable.DeleteDialog />
    </RulesTable.Root>
  </PolicyRulesProvider>
</QueryClientProvider>
\`\`\`

Rules are fetched and cached via React Query. Drag-to-reorder is enabled when there are two or more user-authored rules; the system catch-all rule always sits last and cannot be displaced.`,
      },
    },
  },
} satisfies Meta<typeof RulesTable.Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Three user rules plus the system catch-all. Drag the handle on the left to reorder — dropping onto the catch-all snaps back without firing a mutation. Activate/deactivate and delete are available from each row's action menu.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(THREE_USER_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table onEditRule={action("edit-rule")} />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const WithInactiveRules: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "One active rule and two inactive rules. Inactive rows show Activate in their menu and also expose the Delete action — active rules cannot be deleted without deactivating first.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(MIXED_STATUS_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table onEditRule={action("edit-rule")} />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const SingleRule: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With fewer than two user rules, drag-to-reorder is disabled (there's nothing to swap with). The Priority column still shows so the rule's order is visible; only the drag handle disappears. To hide the Priority column entirely, omit it from `descriptor.table.columns`.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(SINGLE_USER_RULE),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table onEditRule={action("edit-rule")} />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "No rules exist yet. The table renders the empty-state placeholder with the title and description from the descriptor labels.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(() => new MockPolicyRulesService([]), []);
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table onEditRule={action("edit-rule")} />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const AtMaxRules: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Nine user rules plus the catch-all reach the `maxTotalRules` limit of 10 passed on `<RulesTable.Root>`. The Add rule button is disabled and a callout alerts the admin that no further rules can be created.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(() => new MockPolicyRulesService(AT_MAX_RULES), []);
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root maxTotalRules={10}>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table onEditRule={action("edit-rule")} />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const WithColumnsReordered: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`<RulesTable.Table columns={...}>` accepts an ordered list of entries. Referenced built-ins render in the order given; any built-in omitted from the list is hidden. Here Status is dropped and Priority moves after Rule.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(THREE_USER_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table
              columns={[
                { accessorKey: RulesTableColumn.Rule },
                { accessorKey: RulesTableColumn.Priority },
                { accessorKey: RulesTableColumn.Actions },
              ]}
              onEditRule={action("edit-rule")}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const WithColumnOverride: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "An entry whose `accessorKey` matches a built-in can override any field. Fields you omit fall through to the built-in defaults (shallow merge). Here the Rule column is resized from 550 to 700, gets a custom `Cell` that renders name + a simulated conditions summary, and Priority gets a wider size — both the built-in `header` and `enableColumnFilter` are preserved.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(THREE_USER_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table<BaseRule>
              columns={[
                { accessorKey: RulesTableColumn.Priority, size: 120 },
                {
                  accessorKey: RulesTableColumn.Rule,
                  size: 700,
                  Cell: ({ row }) => (
                    <Box>
                      <Typography component="p" variant="h6">
                        {row.original.name}
                      </Typography>
                      {!row.original.system && (
                        <Typography component="p" variant="body">
                          If user is in group "Engineering" — Allow access
                        </Typography>
                      )}
                    </Box>
                  ),
                },
                { accessorKey: RulesTableColumn.Status },
                { accessorKey: RulesTableColumn.Actions },
              ]}
              onEditRule={action("edit-rule")}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const WithCustomColumn: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Any entry with an `accessorKey` that doesn't match a built-in is treated as a custom column and must supply both `header` and `Cell` (a runtime error is thrown otherwise). Here a policy-specific `factors` column is inserted between Rule and Status.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(THREE_USER_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table<BaseRule>
              columns={[
                { accessorKey: RulesTableColumn.Priority },
                { accessorKey: RulesTableColumn.Rule },
                {
                  accessorKey: "factors",
                  header: "Factors",
                  size: 220,
                  enableColumnFilter: false,
                  enableSorting: false,
                  Cell: ({ row }) => (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Status label="TOTP" severity="info" />
                      {!row.original.system && (
                        <Status label="WebAuthn" severity="info" />
                      )}
                    </Box>
                  ),
                },
                { accessorKey: RulesTableColumn.Status },
                { accessorKey: RulesTableColumn.Actions },
              ]}
              onEditRule={action("edit-rule")}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const WithoutActionsColumn: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Actions column visibility is consumer-controlled. Omit `RulesTableColumn.Actions` from `<RulesTable.Table columns={...}>` and the column disappears entirely — header included, no dead space. Rows keep Priority, Rule, and Status. Use this when the table is view-only or when all row actions live outside the table (e.g. a bulk-actions toolbar).",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(THREE_USER_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table
              columns={[
                { accessorKey: RulesTableColumn.Priority },
                { accessorKey: RulesTableColumn.Rule },
                { accessorKey: RulesTableColumn.Status },
              ]}
              onEditRule={action("edit-rule")}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const WithReadOnlyPermissions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`<RulesTable.Root permissions={{ canManage: false }}>` switches the table to read-only mode. The Add button is hidden, drag is disabled and the drag handle is hidden (Priority column remains display-only), and all row-action menu items (Edit, Activate/Deactivate, Delete) are hidden. The Actions column remains visible but every cell is blank. Consumers who want the column gone entirely can omit it from the `columns` prop on `<RulesTable.Table>` (see `WithoutActionsColumn`).",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(MIXED_STATUS_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root permissions={{ canManage: false }}>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table onEditRule={action("edit-rule")} />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const WithDeclarativeRowActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The declarative path for row actions. Pass `rowActions` on `<RulesTable.Table>` as an ordered list — enum keys resolve to the framework's built-in menu items (fully permission-gated), object entries render `renderMenuItem(rule)` in place. This is the preferred way to add extras like Duplicate: the framework keeps ownership of the built-in handlers (delete-dialog, activate/deactivate mutations); you just declare where in the menu your item belongs. Compare with `WithCustomRowAction`, which overrides the Actions column entirely.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(THREE_USER_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table<BaseRule>
              onEditRule={action("edit-rule")}
              rowActions={[
                { actionKey: RulesTableRowAction.Edit },
                {
                  actionKey: "duplicate",
                  renderMenuItem: (rule) => (
                    <MenuItem
                      onClick={() => {
                        action("duplicate-rule")(rule);
                      }}
                    >
                      Duplicate rule
                    </MenuItem>
                  ),
                },
                { actionKey: RulesTableRowAction.ToggleStatus },
                { actionKey: RulesTableRowAction.Delete },
              ]}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};

export const WithCustomRowAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "To insert a custom menu item, override the Actions column with your own `Cell` that renders `RulesTable.RowActions` with a bespoke `actions` array. Every entry is an object with `actionKey`: built-in keys render the framework's own menu items wired to their handlers, and setting `menuItem` renders a custom node verbatim so you can drop a MenuItem, a divider, or any other node at any position. Here a **Duplicate rule** entry is injected between Edit and Delete.",
      },
    },
  },
  render: function C() {
    const queryClient = useMemo(() => new QueryClient(), []);
    const service = useMemo(
      () => new MockPolicyRulesService(THREE_USER_RULES),
      [],
    );
    return (
      <QueryClientProvider client={queryClient}>
        <PolicyRulesProvider
          descriptor={MOCK_DESCRIPTOR}
          policyId={MOCK_POLICY_ID}
          service={service}
        >
          <RulesTable.Root>
            <RulesTable.AddButton onClick={action("add-rule")} />
            <RulesTable.Table<BaseRule>
              columns={[
                { accessorKey: RulesTableColumn.Priority },
                { accessorKey: RulesTableColumn.Rule },
                { accessorKey: RulesTableColumn.Status },
                {
                  accessorKey: RulesTableColumn.Actions,
                  Cell: ({ row }) => (
                    <RulesTable.RowActions
                      actions={[
                        { actionKey: RulesTableRowAction.Edit },
                        {
                          actionKey: "duplicate",
                          menuItem: (
                            <MenuItem
                              onClick={() => {
                                action("duplicate-rule")(row.original);
                              }}
                            >
                              Duplicate rule
                            </MenuItem>
                          ),
                        },
                        { actionKey: RulesTableRowAction.ToggleStatus },
                        { actionKey: RulesTableRowAction.Delete },
                      ]}
                      onEdit={action("edit-rule")}
                      onToggleStatus={action("toggle-status")}
                      rule={row.original}
                    />
                  ),
                },
              ]}
              onEditRule={action("edit-rule")}
            />
            <RulesTable.DeleteDialog />
          </RulesTable.Root>
        </PolicyRulesProvider>
      </QueryClientProvider>
    );
  },
};
