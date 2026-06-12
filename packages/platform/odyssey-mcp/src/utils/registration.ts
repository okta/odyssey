import type {
  McpServer,
  RegisteredTool,
  ResourceMetadata,
  ResourceTemplate,
  ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp";
import type {
  AnySchema,
  ZodRawShapeCompat,
} from "@modelcontextprotocol/sdk/server/zod-compat";
import type {
  CallToolResult,
  ReadResourceResult,
  ToolAnnotations,
} from "@modelcontextprotocol/sdk/types";

type ResponseType = "json" | "markdown";

type ToolInputSchema = undefined | ZodRawShapeCompat | AnySchema;

const formatText = (data: unknown, responseType: ResponseType): string =>
  responseType === "markdown" ? String(data) : JSON.stringify(data, null, 2);

const formatToolContent = (
  data: unknown,
  responseType: ResponseType,
): CallToolResult => ({
  content: [{ type: "text", text: formatText(data, responseType) }],
});

const formatResourceContents = (
  uri: string,
  data: unknown,
  responseType: ResponseType,
): ReadResourceResult => ({
  contents: [
    {
      uri: uri,
      mimeType:
        responseType === "markdown" ? "text/markdown" : "application/json",
      text: formatText(data, responseType),
    },
  ],
});

export type ToolConfig<InputSchema extends ToolInputSchema = undefined> = {
  annotations?: ToolAnnotations;
  description?: string;
  inputSchema?: InputSchema;
  meta?: Record<string, unknown>;
  responseType?: ResponseType;
  title?: string;
};

export type RegisterToolArgs<InputSchema extends ToolInputSchema = undefined> =
  {
    config: ToolConfig<InputSchema>;
    handler: (...params: Parameters<ToolCallback<InputSchema>>) => unknown;
    name: string;
    server: McpServer;
  };

export const registerTool = <InputSchema extends ToolInputSchema = undefined>({
  server,
  name,
  config,
  handler,
}: RegisterToolArgs<InputSchema>): RegisteredTool => {
  const { responseType = "json", ...toolConfig } = config;

  const wrapped = async (...params: Parameters<ToolCallback<InputSchema>>) =>
    formatToolContent(await handler(...params), responseType);

  return server.registerTool(
    name,
    toolConfig,
    wrapped as ToolCallback<InputSchema>,
  );
};

export type StaticRoute = { handler: () => unknown; uri: string };
export type TemplateRoute = {
  handler: (variables: Record<string, string | string[]>) => unknown;
  uri: ResourceTemplate;
};

export type ResourceRoute = StaticRoute | TemplateRoute;

export type RegisterResourceArgs<T extends ResourceRoute> = {
  config: ResourceMetadata;
  name: string;
  route: T;
  server: McpServer;
};

const isStaticRoute = (route: ResourceRoute): route is StaticRoute =>
  typeof route.uri === "string";

export function registerResource<T extends ResourceRoute>({
  server,
  name,
  config,
  route,
}: RegisterResourceArgs<T>) {
  const responseType: ResponseType =
    config.mimeType === "text/markdown" ? "markdown" : "json";

  if (isStaticRoute(route)) {
    return server.registerResource(name, route.uri, config, async () => {
      const data = await route.handler();
      return formatResourceContents(route.uri, data, responseType);
    });
  }

  return server.registerResource(
    name,
    route.uri,
    config,
    async (resourceUri, variables) => {
      const data = await route.handler(variables);
      return formatResourceContents(resourceUri.href, data, responseType);
    },
  );
}
