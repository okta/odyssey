/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  TreeView,
  type TreeViewNode,
  type TreeViewPage,
  useTreeViewController,
} from "@okta/odyssey-contributions-opa-components";
import {
  Button,
  Surface,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import {
  AppsIcon,
  DirectoryIcon,
  GlobeIcon,
  GridIcon,
  LinkIcon,
  LockIcon,
  ServerIcon,
} from "@okta/odyssey-react-mui/icons";
import { useState } from "react";
import { userEvent, within } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../tools/OdysseyStorybookThemeDecorator.js";
import { OpaComponentsOdysseyStorybookThemeDecorator } from "../tools/OpaComponentsOdysseyStorybookThemeDecorator.js";

const SAMPLE_NODES: TreeViewNode[] = [
  {
    id: "infra",
    label: "Infrastructure",
    description: "Cloud and on-premise server credentials",
    children: [
      {
        id: "infra-cloud",
        label: "Cloud Platforms",
        description: "AWS, GCP, and Azure credentials",
        children: [
          {
            id: "infra-cloud-aws",
            label: "AWS Credentials",
            description: "IAM users and access keys",
          },
          {
            id: "infra-cloud-gcp",
            label: "GCP Service Accounts",
            description: "Google Cloud service accounts",
          },
        ],
      },
      {
        id: "infra-linux",
        label: "Linux Servers",
        description: "SSH keys and service accounts",
      },
      {
        id: "infra-windows",
        label: "Windows Servers",
        description: "RDP and Active Directory credentials",
        isLocked: true,
        children: [
          {
            id: "infra-windows-dc",
            label: "Domain Controllers",
            description: "Active Directory admin accounts",
          },
        ],
      },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Database access credentials",
    children: [
      {
        id: "databases-prod",
        label: "Production",
        description: "Production database credentials",
      },
      {
        id: "databases-staging",
        label: "Staging",
        description: "Staging database credentials",
      },
    ],
  },
  {
    id: "api-keys",
    label: "API Keys",
    description: "Third-party service API keys and tokens",
    children: [
      {
        id: "api-payment",
        label: "Payment Services",
        description: "Stripe, PayPal credentials",
        isLocked: true,
      },
      {
        id: "api-communication",
        label: "Communication APIs",
        description: "SendGrid, Twilio credentials",
      },
    ],
  },
];

const LAZY_ROOT_NODES: TreeViewNode[] = [
  {
    id: "infra",
    label: "Infrastructure",
    description: "Cloud and on-premise server credentials",
    children: [],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Database access credentials",
    children: [],
  },
  {
    id: "api-keys",
    label: "API Keys",
    description: "Third-party service API keys and tokens",
    children: [],
  },
];

const LAZY_CHILDREN_BY_ID: Record<string, TreeViewNode[]> = {
  infra: [
    {
      id: "infra-cloud",
      label: "Cloud Platforms",
      description: "AWS, GCP, and Azure credentials",
      children: [],
    },
    {
      id: "infra-linux",
      label: "Linux Servers",
      description: "SSH keys and service accounts",
    },
  ],
  "infra-cloud": [
    {
      id: "infra-cloud-aws",
      label: "AWS Credentials",
      description: "IAM users and access keys",
    },
    {
      id: "infra-cloud-gcp",
      label: "GCP Service Accounts",
      description: "Google Cloud service accounts",
    },
  ],
  databases: [
    {
      id: "databases-prod",
      label: "Production",
      description: "Production database credentials",
    },
    {
      id: "databases-staging",
      label: "Staging",
      description: "Staging database credentials",
    },
  ],
  "api-keys": [
    {
      id: "api-communication",
      label: "Communication APIs",
      description: "SendGrid, Twilio credentials",
    },
  ],
};

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const fetchSimulatedChildren = async (
  nodeId: string,
): Promise<TreeViewNode[]> => {
  await delay(1500);
  return LAZY_CHILDREN_BY_ID[nodeId] ?? [];
};

const RECOMMENDED_USAGE_SNIPPET = `import {
  TreeView,
  useTreeViewController,
  type TreeViewNode,
} from "@okta/odyssey-contributions-opa-components";

const fetchChildren = async (nodeId: string): Promise<TreeViewNode[]> => {
  // Replace with your real API call. Sync returns are also supported —
  // the hook will skip the loading flag and merge children synchronously.
  const response = await fetch(\`/api/folders/\${nodeId}/children\`);
  return response.json();
};

const FolderPicker = () => {
  const treeProps = useTreeViewController({
    initialNodes: [], // or omit and pass \`fetchRootNodes\` for a lazy root
    fetchChildren,
  });

  return <TreeView {...treeProps} ref={treeProps.treeViewRef} />;
};`;

const STATIC_USAGE_SNIPPET = `import {
  TreeView,
  useTreeViewController,
  type TreeViewNode,
} from "@okta/odyssey-contributions-opa-components";

const INITIAL_NODES: TreeViewNode[] = [
  {
    id: "infra",
    label: "Infrastructure",
    description: "Cloud and on-premise server credentials",
    children: [
      {
        id: "infra-cloud",
        label: "Cloud Platforms",
        children: [
          { id: "infra-cloud-aws", label: "AWS Credentials" },
          { id: "infra-cloud-gcp", label: "GCP Service Accounts" },
        ],
      },
      { id: "infra-linux", label: "Linux Servers" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    children: [
      { id: "databases-prod", label: "Production" },
      { id: "databases-staging", label: "Staging" },
    ],
  },
];

const FolderPicker = () => {
  const treeProps = useTreeViewController({
    initialNodes: INITIAL_NODES,
    onSelectNode: (nodeId) => console.log("selected", nodeId),
  });

  return <TreeView {...treeProps} ref={treeProps.treeViewRef} />;
};`;

const meta = {
  component: TreeView,
  decorators: [
    OdysseyStorybookThemeDecorator,
    OpaComponentsOdysseyStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `\`TreeView\` is a presentational tree component for picking a destination folder. It renders the hierarchy, manages expand/collapse state, and surfaces per-node loading and error rows — but it deliberately does not own your data, selection, or async fetching.

**The recommended way to use it is via \`useTreeViewController\`.** The hook owns the node list, selection, in-flight fetches, error tracking, and exposes a ref handle for cache invalidation. Spread the result onto \`<TreeView />\` and you're done:

\`\`\`tsx
${RECOMMENDED_USAGE_SNIPPET}
\`\`\`

\`fetchChildren\` may return either \`TreeViewNode[]\` or \`Promise<TreeViewNode[]>\` — sync returns merge immediately and skip the skeleton flash. Pass \`refetchOnOpen: true\` to re-run \`fetchChildren\` on every expand instead of caching by default. See the \`WithController\` story for a runnable version of this pattern.

If you already have the full hierarchy in memory, pass it as \`initialNodes\` and skip \`fetchChildren\` entirely — the hook still owns selection and exposes \`onSelectNode\` for parent state:

\`\`\`tsx
${STATIC_USAGE_SNIPPET}
\`\`\`

Driving the component manually with \`nodes\` / \`isNodeLoading\` / \`onToggleNodeExpanded\` props is supported (see \`Default\`, \`Loading\`, \`WithCurrentFolder\`) but means you reimplement the merge-children-into-tree, in-flight gating, and error-tracking logic the hook already handles. Prefer the hook unless you have a specific reason not to.`,
      },
    },
  },
  argTypes: {
    nodes: {
      control: false,
      description:
        "The folder hierarchy to render. Each node may include nested `children`.",
      table: { type: { summary: "TreeViewNode[]" } },
    },
    currentFolderId: {
      control: "text",
      description:
        "Identifies the folder the user is currently inside. The matching node renders a 'Current folder' pill and cannot be selected.",
      table: { type: { summary: "string" } },
    },
    selectedNodeId: {
      control: "text",
      description: "Controlled id of the currently selected destination node.",
      table: { type: { summary: "string | null" } },
    },
    onSelectNode: {
      action: "onSelectNode",
      description: "Called when the user picks a selectable folder.",
      table: { type: { summary: "(nodeId: string) => void" } },
    },
    isLoading: {
      control: "boolean",
      description:
        "When true, the tree renders skeleton placeholders instead of the actual hierarchy.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    initialSkeletonRowCount: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of skeleton rows shown when `isLoading` is true.",
      table: { type: { summary: "number" }, defaultValue: { summary: "5" } },
    },
    isNodeLoading: {
      control: false,
      description:
        "Optional callback that returns `true` for any node whose children are still being fetched. Skeleton rows render in place of its children until you return `false`.",
      table: { type: { summary: "(nodeId: string) => boolean" } },
    },
    isNodeErrored: {
      control: false,
      description:
        "Optional callback returning a non-null error message for any node whose last children-fetch failed. When non-null, an error row renders in place of the node's children with the message and a Reload link.",
      table: { type: { summary: "(nodeId: string) => string | null" } },
    },
    onToggleNodeExpanded: {
      action: "onToggleNodeExpanded",
      description:
        "Called whenever a node is expanded or collapsed. Gated by `refetchOnOpen` for the expand case.",
      table: {
        type: { summary: "(nodeId: string, isExpanded: boolean) => void" },
      },
    },
    onRetryFetchNode: {
      action: "onRetryFetchNode",
      description:
        "Called when the user clicks Reload on the error row of a node.",
      table: { type: { summary: "(nodeId: string) => void" } },
    },
    refetchOnOpen: {
      control: "boolean",
      description:
        "When false (default), `onToggleNodeExpanded(nodeId, true)` fires only the FIRST time a given node is expanded. When true, the callback fires on every open.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    nodes: SAMPLE_NODES,
    onSelectNode: (nodeId: string) => void nodeId,
  },
} satisfies Meta<typeof TreeView>;

export default meta;

type Story = StoryObj<typeof meta>;

// Simulated data for the pagination ("Show more") stories: pages of
// SHOW_MORE_PAGE_SIZE items sliced from a fixed list by an opaque numeric
// cursor. Shared by the Default, WithMultiLevelPagination, and
// WithShowMoreLoading stories.
const SHOW_MORE_PAGE_SIZE = 3;
const ALL_CHILD_ITEMS: Record<string, TreeViewNode[]> = {
  infra: [
    { id: "infra-1", label: "Compute", hasChildren: true },
    { id: "infra-2", label: "Storage", hasChildren: true },
    { id: "infra-3", label: "Networking" },
    { id: "infra-4", label: "Load Balancers" },
    { id: "infra-5", label: "DNS" },
    { id: "infra-6", label: "CDN" },
    { id: "infra-7", label: "Monitoring" },
  ],
  "infra-1": [
    { id: "infra-1-vm", label: "Virtual Machines" },
    { id: "infra-1-containers", label: "Containers" },
    { id: "infra-1-serverless", label: "Serverless" },
    { id: "infra-1-gpu", label: "GPU Instances" },
    { id: "infra-1-spot", label: "Spot Instances" },
  ],
  "infra-2": [
    { id: "infra-2-block", label: "Block Storage" },
    { id: "infra-2-object", label: "Object Storage" },
    { id: "infra-2-file", label: "File Storage" },
    { id: "infra-2-archive", label: "Archive" },
  ],
};
const ALL_ROOT_ITEMS: TreeViewNode[] = [
  { id: "infra", label: "Infrastructure", hasChildren: true },
  { id: "apps", label: "Applications", hasChildren: true },
  { id: "data", label: "Data", hasChildren: true },
  { id: "security", label: "Security" },
  { id: "identity", label: "Identity" },
  { id: "platform", label: "Platform" },
  { id: "tooling", label: "Tooling" },
];

const buildPage = (
  allItems: TreeViewNode[],
  cursor: string | null,
): TreeViewPage => {
  const startIndex = cursor ? Number(cursor) : 0;
  const pageItems = allItems.slice(
    startIndex,
    startIndex + SHOW_MORE_PAGE_SIZE,
  );
  const nextStart = startIndex + SHOW_MORE_PAGE_SIZE;
  const nextCursor = nextStart < allItems.length ? String(nextStart) : null;
  return { nodes: pageItems, nextCursor };
};

const DEFAULT_INITIAL_NODES: TreeViewNode[] = [
  {
    id: "loads-on-expand",
    label: "Loads on expand",
    description: "Async fetch with a 1.5s delay, then nested subfolders",
    icon: ServerIcon,
    hasChildren: true,
  },
  {
    id: "long-description",
    label: "Long description",
    description:
      "This description runs well past 70 characters, so it truncates to a single line and reveals the full text in a cursor-following tooltip on hover.",
    icon: DirectoryIcon,
  },
  {
    id: "loads-synchronously",
    label: "Loads synchronously",
    description: "Children resolve immediately — no skeleton flash",
    icon: AppsIcon,
    hasChildren: true,
  },
  {
    id: "fails-to-load",
    label: "Fails to load",
    description: "fetchChildren rejects — surfaces an inline reload row",
    icon: GridIcon,
    hasChildren: true,
  },
  {
    id: "has-locked-children",
    label: "Has locked folders",
    description: "Expand to see disabled folders that cannot be selected",
    icon: LockIcon,
    hasChildren: true,
  },
  {
    id: "paginates",
    label: "Paginates on show more",
    description:
      'Children arrive one page at a time — click "Show more" to append the next page',
    icon: LinkIcon,
    hasChildren: true,
  },
];

const DEFAULT_FETCHABLE_BY_ID: Record<string, TreeViewNode[]> = {
  "loads-on-expand": [
    {
      id: "loads-on-expand-east",
      label: "us-east-1",
      description: "Primary region",
      icon: GlobeIcon,
      hasChildren: true,
    },
    {
      id: "loads-on-expand-west",
      label: "us-west-2",
      description: "DR region",
      icon: GlobeIcon,
      hasChildren: true,
    },
  ],
  "loads-on-expand-east": [
    { id: "loads-on-expand-east-1", label: "web-01", icon: LockIcon },
    { id: "loads-on-expand-east-2", label: "web-02", icon: LockIcon },
    { id: "loads-on-expand-east-3", label: "worker-01", icon: LockIcon },
  ],
  "loads-on-expand-west": [
    { id: "loads-on-expand-west-1", label: "web-01", icon: LockIcon },
    { id: "loads-on-expand-west-2", label: "web-02", icon: LockIcon },
    { id: "loads-on-expand-west-3", label: "worker-01", icon: LockIcon },
  ],
  "loads-synchronously": [
    { id: "sync-key-1", label: "Live API key", icon: LockIcon },
    { id: "sync-key-2", label: "Webhook secret", icon: LockIcon },
    { id: "sync-key-3", label: "Service account", icon: LockIcon },
  ],
  "has-locked-children": [
    {
      id: "locked-prod",
      label: "Production secrets",
      description: "Admin-only — cannot be selected",
      isLocked: true,
    },
    {
      id: "locked-billing",
      label: "Billing credentials",
      description: "Restricted access — cannot be selected",
      isLocked: true,
    },
    {
      id: "locked-audit",
      label: "Audit logs",
      description: "Read-only — cannot be selected",
      isLocked: true,
    },
  ],
};

const fetchDefaultChildrenAsync = async (
  nodeId: string,
): Promise<TreeViewNode[]> => {
  await delay(1500);
  if (nodeId === "fails-to-load") {
    throw new Error("Network unavailable. Please try again.");
  }
  return DEFAULT_FETCHABLE_BY_ID[nodeId] ?? [];
};

const DEFAULT_PAGINATED_ITEMS: TreeViewNode[] = [
  { id: "paginates-1", label: "us-east-1", icon: GlobeIcon },
  { id: "paginates-2", label: "us-east-2", icon: GlobeIcon },
  { id: "paginates-3", label: "us-west-1", icon: GlobeIcon },
  { id: "paginates-4", label: "us-west-2", icon: GlobeIcon },
  { id: "paginates-5", label: "eu-west-1", icon: GlobeIcon },
  { id: "paginates-6", label: "eu-central-1", icon: GlobeIcon },
  { id: "paginates-7", label: "ap-south-1", icon: GlobeIcon },
];

const fetchDefaultPaginatedChildren = async (
  cursor: string | null,
): Promise<TreeViewPage> => {
  await delay(800);
  return buildPage(DEFAULT_PAGINATED_ITEMS, cursor);
};

const fetchDefaultChildren = (
  nodeId: string,
  context?: { cursor?: string | null },
) => {
  if (nodeId === "loads-synchronously") {
    return DEFAULT_FETCHABLE_BY_ID[nodeId] ?? [];
  }
  if (nodeId === "paginates") {
    return fetchDefaultPaginatedChildren(context?.cursor ?? null);
  }
  return fetchDefaultChildrenAsync(nodeId);
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Top-level folders demonstrating the main behaviors in one view. Each folder's label names the behavior it exercises: an async fetch with a skeleton (and nested subfolders that load on demand), a synchronous fetch that resolves immediately, a fetch that rejects so the inline reload row appears, and a paginated folder whose children arrive a page at a time behind a \"Show more\" affordance. The 'Long description' row carries a description past 70 characters, so it truncates to a single line and reveals the full text in a cursor-following tooltip on hover.",
      },
    },
  },
  render: function C() {
    const tokens = useOdysseyDesignTokens();
    const treeProps = useTreeViewController({
      initialNodes: DEFAULT_INITIAL_NODES,
      fetchChildren: fetchDefaultChildren,
    });
    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView {...treeProps} ref={treeProps.treeViewRef} />
        </div>
      </Surface>
    );
  },
};

const LOADING_NODES: TreeViewNode[] = [
  {
    id: "infra",
    label: "Infrastructure",
    description: "Cloud and on-premise server credentials",
    // Placeholder child so the chevron renders. `isNodeLoading("infra")`
    // returns true, which replaces these children with skeleton rows.
    children: [
      {
        id: "infra-placeholder",
        label: "Placeholder",
      },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Database access credentials",
  },
];

export const Loading: Story = {
  args: {
    nodes: LOADING_NODES,
    isNodeLoading: (nodeId: string) => nodeId === "infra",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const expandButtons = canvas.queryAllByRole("button");
    const firstExpandButton = expandButtons[0];
    if (firstExpandButton) {
      await userEvent.click(firstExpandButton);
    }
  },
  render: function C(args) {
    const tokens = useOdysseyDesignTokens();
    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView {...args} onSelectNode={() => undefined} />
        </div>
      </Surface>
    );
  },
};

const DEEP_CHAIN_LABELS = [
  "Production",
  "AWS",
  "us-east-1",
  "EKS Cluster",
  "Payments Namespace",
  "Stripe Integration",
  "Live API Key",
  "Key Versions",
  "v2026-04-01",
  "Metadata",
  "Audit Trail",
  "Access Events",
  "Read Operations",
  "By Service Account",
  "ci-runner",
  "Recent Activity",
  "Last 24 hours",
  "Successful Reads",
  "Entry #4218",
  "Raw Payload",
  "Headers",
  "Authorization",
  "Bearer Token",
  "Token Claims",
  "JWT",
  "Header Section",
  "Algorithm",
  "RS256",
  "Verification",
  "Public Key Cache",
  "Cache Entry",
  "Created At",
  "Timestamp",
  "Unix Epoch",
  "Microseconds",
  "Nanoseconds",
  "Source Clock",
  "NTP Sync",
  "Stratum",
  "Reference Time",
  "Origin Server",
  "ntp1.example.com",
  "Network Path",
  "Hop 7",
  "Latency",
  "Jitter",
  "Packet Loss",
  "Quality Score",
  "Confidence",
  "Final Verdict",
];

// Build the chain from the deepest layer up so each ancestor can wrap the
// already-built subtree in its `children` array. Icons cycle through a
// fixed list of 7 so a 50-layer tree looks varied without importing
// 50 distinct icons.
const DEEPLY_NESTED_NODES: TreeViewNode[] = [
  DEEP_CHAIN_LABELS.reduceRight<TreeViewNode | undefined>(
    (deepestSoFar, label, layerIndex) => {
      const iconCycle = [
        ServerIcon,
        AppsIcon,
        GlobeIcon,
        GridIcon,
        DirectoryIcon,
        LinkIcon,
        LockIcon,
      ];
      return {
        id: `deep-${layerIndex}`,
        label,
        description: `Layer ${layerIndex + 1} of ${DEEP_CHAIN_LABELS.length}`,
        icon: iconCycle[layerIndex % iconCycle.length] ?? ServerIcon,
        children: deepestSoFar ? [deepestSoFar] : undefined,
      };
    },
    undefined,
  )!,
];

export const DeeplyNested: Story = {
  args: {
    nodes: DEEPLY_NESTED_NODES,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single chain, 50 layers deep, synchronously loaded. Container uses `width: fit-content` so it grows as deeper rows render — `TreeView` itself sets `min-width` per row based on depth, so the same pattern handles lazy fetches that reveal deeper trees after mount. The play function expands every level so the full chain is visible — useful for eyeballing indentation, ancestor selection-dot positioning, and deep-tree styling.",
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // Single-child chain: after each expand, the next chevron appears as the
    // last button in document order. Click N-1 times (one per parent layer)
    // to reveal every descendant.
    const expansionsNeeded = DEEP_CHAIN_LABELS.length - 1;
    for (
      let expansionStep = 0;
      expansionStep < expansionsNeeded;
      expansionStep += 1
    ) {
      const chevronButtons = canvas.queryAllByRole("button");
      const deepestChevron = chevronButtons[chevronButtons.length - 1];
      if (deepestChevron) {
        await userEvent.click(deepestChevron);
      }
    }
  },
  render: function C(args) {
    const tokens = useOdysseyDesignTokens();
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    return (
      <Surface>
        <div
          style={{
            // The wrapper grows with the content (rows carry a depth-aware
            // min-width via TreeView itself) but never beyond `maxWidth`.
            // Past that point, `overflowX: auto` exposes a horizontal
            // scrollbar so the deepest rows stay reachable.
            width: "fit-content",
            minWidth: "640px",
            maxWidth: "960px",
            overflowX: "auto",
            padding: tokens.Spacing2,
          }}
        >
          <TreeView
            {...args}
            onSelectNode={(nodeId) => {
              setSelectedNodeId(nodeId);
              args.onSelectNode?.(nodeId);
            }}
            selectedNodeId={selectedNodeId}
          />
        </div>
      </Surface>
    );
  },
};

export const WithCurrentFolder: Story = {
  args: {
    currentFolderId: "infra-linux",
  },
  render: function C(args) {
    const tokens = useOdysseyDesignTokens();
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView
            {...args}
            onSelectNode={(nodeId) => {
              setSelectedNodeId(nodeId);
              args.onSelectNode?.(nodeId);
            }}
            selectedNodeId={selectedNodeId}
          />
        </div>
      </Surface>
    );
  },
};

export const WithController: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**Recommended usage.** Drives the component via `useTreeViewController` — the hook owns nodes, selection, in-flight fetches, and errors. Initial nodes are seeded synchronously; expanding a node fires `fetchChildren` with a simulated 1.5s delay. With `refetchOnOpen: false` (default), re-expanding a previously-loaded node skips the fetch. Click **Invalidate Infrastructure** to clear the cache for that node so the next open re-fetches.",
      },
      source: {
        code: RECOMMENDED_USAGE_SNIPPET,
      },
    },
  },
  render: function C() {
    const tokens = useOdysseyDesignTokens();
    const treeProps = useTreeViewController({
      initialNodes: LAZY_ROOT_NODES,
      fetchChildren: fetchSimulatedChildren,
    });

    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView {...treeProps} ref={treeProps.treeViewRef} />
          <div style={{ marginTop: tokens.Spacing2 }}>
            <Button
              label="Invalidate Infrastructure"
              onClick={() => treeProps.invalidateNode("infra")}
              variant="secondary"
            />
          </div>
        </div>
      </Surface>
    );
  },
};

export const WithControllerRefetchOnOpen: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Same as `WithController` but with `refetchOnOpen: true` — **every** expansion re-runs `fetchChildren`, even for previously-loaded nodes. To see the difference, expand a folder, collapse it, then expand it again: in `WithController` the second open is instant (cache hit, no fetch). Here, the skeleton flashes again because `fetchChildren` re-runs. The counter on the right ticks up each time a fetch fires so you can confirm without timing it by eye.",
      },
    },
  },
  render: function C() {
    const tokens = useOdysseyDesignTokens();
    const [fetchCountByNodeId, setFetchCountByNodeId] = useState<
      Record<string, number>
    >({});
    const treeProps = useTreeViewController({
      initialNodes: LAZY_ROOT_NODES,
      fetchChildren: async (nodeId: string) => {
        setFetchCountByNodeId((previousCounts) => ({
          ...previousCounts,
          [nodeId]: (previousCounts[nodeId] ?? 0) + 1,
        }));
        return fetchSimulatedChildren(nodeId);
      },
      refetchOnOpen: true,
    });

    const fetchCountEntries = Object.entries(fetchCountByNodeId);

    return (
      <Surface>
        <div
          style={{
            display: "flex",
            gap: tokens.Spacing4,
            padding: tokens.Spacing2,
          }}
        >
          <div style={{ width: "480px" }}>
            <TreeView {...treeProps} ref={treeProps.treeViewRef} />
          </div>
          <div
            style={{
              minWidth: "220px",
              padding: tokens.Spacing3,
              backgroundColor: tokens.HueNeutral50,
              borderRadius: tokens.BorderRadiusMain,
              fontFamily: tokens.TypographyFamilyMono,
              fontSize: tokens.TypographySizeSubordinate,
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                fontFamily: tokens.TypographyFamilyHeading,
                fontWeight: tokens.TypographyWeightHeadingBold,
                marginBottom: tokens.Spacing2,
              }}
            >
              fetchChildren calls
            </div>
            {fetchCountEntries.length === 0 ? (
              <div style={{ color: tokens.TypographyColorSubordinate }}>
                Expand a folder to start tracking…
              </div>
            ) : (
              fetchCountEntries.map(([nodeId, count]) => (
                <div key={nodeId}>
                  {nodeId}: {count}
                </div>
              ))
            )}
          </div>
        </div>
      </Surface>
    );
  },
};

export const WithLazyRoot: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Initial nodes are not provided; the hook calls `fetchRootNodes` on mount and shows the top-level skeleton until it resolves.",
      },
    },
  },
  render: function C() {
    const tokens = useOdysseyDesignTokens();
    const treeProps = useTreeViewController({
      fetchRootNodes: async () => {
        await delay(1500);
        return LAZY_ROOT_NODES;
      },
      fetchChildren: fetchSimulatedChildren,
    });

    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView {...treeProps} ref={treeProps.treeViewRef} />
        </div>
      </Surface>
    );
  },
};

export const WithSyncFetcher: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`fetchChildren` returns a synchronous `TreeViewNode[]` (no Promise). Children appear immediately on expand, with no skeleton.",
      },
    },
  },
  render: function C() {
    const tokens = useOdysseyDesignTokens();
    const treeProps = useTreeViewController({
      initialNodes: LAZY_ROOT_NODES,
      fetchChildren: (nodeId: string) => LAZY_CHILDREN_BY_ID[nodeId] ?? [],
    });

    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView {...treeProps} ref={treeProps.treeViewRef} />
        </div>
      </Surface>
    );
  },
};

export const WithFetchError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`fetchChildren` rejects when expanding the Databases node, surfacing the inline error message and Reload link on the parent row. Reload re-runs the same fetch.",
      },
    },
  },
  render: function C() {
    const tokens = useOdysseyDesignTokens();
    const treeProps = useTreeViewController({
      initialNodes: LAZY_ROOT_NODES,
      fetchChildren: async (nodeId) => {
        await delay(800);
        if (nodeId === "databases") {
          throw new Error("Network unavailable. Please try again.");
        }
        return LAZY_CHILDREN_BY_ID[nodeId] ?? [];
      },
    });

    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView {...treeProps} ref={treeProps.treeViewRef} />
        </div>
      </Surface>
    );
  },
};

export const WithMultiLevelPagination: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pagination works at every depth independently. Expand Infrastructure to page through its direct children. Then expand Compute or Storage to page through their children at depth 2. Root-level pagination appears at the bottom of the tree.",
      },
    },
  },
  render: function C() {
    const tokens = useOdysseyDesignTokens();
    const treeProps = useTreeViewController({
      fetchRootNodes: async (context): Promise<TreeViewPage> => {
        await delay(600);
        return buildPage(ALL_ROOT_ITEMS, context?.cursor ?? null);
      },
      fetchChildren: async (nodeId, context): Promise<TreeViewPage> => {
        await delay(800);
        const allItems = ALL_CHILD_ITEMS[nodeId] ?? [
          { id: `${nodeId}-child-1`, label: `${nodeId} Item 1` },
          { id: `${nodeId}-child-2`, label: `${nodeId} Item 2` },
          { id: `${nodeId}-child-3`, label: `${nodeId} Item 3` },
          { id: `${nodeId}-child-4`, label: `${nodeId} Item 4` },
        ];
        return buildPage(allItems, context?.cursor ?? null);
      },
    });

    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView {...treeProps} ref={treeProps.treeViewRef} />
        </div>
      </Surface>
    );
  },
};

export const WithShowMoreLoading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Captures the loading state of the "Show more" affordance. The first page of root items loads on mount; the play function clicks "Show more", whose fetch never resolves, so the button is replaced by appended skeleton rows for the visual regression snapshot.',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const showMoreButton = await canvas.findByRole("button", {
      name: "Show more",
    });
    await userEvent.click(showMoreButton);
  },
  render: function C() {
    const tokens = useOdysseyDesignTokens();
    const treeProps = useTreeViewController({
      fetchRootNodes: async (context): Promise<TreeViewPage> => {
        const cursor = context?.cursor ?? null;
        if (cursor !== null) {
          // Never resolves — keeps "Show more" in its loading (disabled +
          // spinner) state for the Applitools snapshot taken after the play
          // function clicks the button.
          return new Promise<TreeViewPage>(() => undefined);
        }
        await delay(300);
        return buildPage(ALL_ROOT_ITEMS, null);
      },
    });

    return (
      <Surface>
        <div style={{ width: "640px", padding: tokens.Spacing2 }}>
          <TreeView {...treeProps} ref={treeProps.treeViewRef} />
        </div>
      </Surface>
    );
  },
};
