export interface WebMCPToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
}

export interface WebModelContext {
  registerTool: (tool: WebMCPToolDefinition) => void | Promise<void>;
  unregisterTool?: (name: string) => void | Promise<void>;
}

declare global {
  interface Navigator {
    modelContext?: WebModelContext;
  }

  interface Document {
    modelContext?: WebModelContext;
  }
}

declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean;
  }
}

export {};
