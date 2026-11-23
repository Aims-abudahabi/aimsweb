"use client";

import { useEffect } from "react";
import type { WebMCPToolDefinition } from "@/types/webmcp";

async function callMcpTool(name: string, args: Record<string, unknown> = {}) {
  const res = await fetch("/api/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  const data = await res.json();
  if (data?.error) {
    throw new Error(data.error.message || "MCP tool execution failed");
  }
  const text = data?.result?.content?.[0]?.text;
  try {
    return text ? JSON.parse(text) : data?.result;
  } catch {
    return text ?? data?.result;
  }
}

const WEBMCP_TOOLS: WebMCPToolDefinition[] = [
  {
    name: "search_courses",
    description:
      "Search AIMS Training Center's 50+ ACTVET-approved courses in Abu Dhabi by keyword or category.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search keyword such as AutoCAD, Revit, IELTS, OET, Excel, Tally, or CCNA.",
        },
        category: {
          type: "string",
          description:
            "Optional category filter (e.g. Engineering and CAD, Finance & Accounting, IT & Networking, Language Courses).",
        },
        limit: {
          type: "integer",
          description: "Maximum number of courses to return (default 10).",
        },
      },
    },
    execute: (args) => callMcpTool("search_courses", args),
  },
  {
    name: "get_course_details",
    description:
      "Retrieve full syllabus, overview, duration, level, highlights, and prerequisites for a specific course at AIMS Training Center Abu Dhabi.",
    inputSchema: {
      type: "object",
      properties: {
        courseId: {
          type: "string",
          description:
            "Course slug/ID (e.g. tally, engineering-cad, language-courses).",
        },
      },
      required: ["courseId"],
    },
    execute: (args) => callMcpTool("get_course_details", args),
  },
  {
    name: "get_active_offers",
    description:
      "List current active course discounts, early-bird savings, and promotions at AIMS Training Center Abu Dhabi.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    execute: () => callMcpTool("get_active_offers"),
  },
  {
    name: "get_center_info",
    description:
      "Get AIMS Training Center Abu Dhabi's official location, phone, email, ACTVET accreditation, and links.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    execute: () => callMcpTool("get_center_info"),
  },
  {
    name: "submit_course_enquiry",
    description:
      "Submit a course enquiry or admission request to AIMS Training Center Abu Dhabi.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Applicant full name." },
        email: { type: "string", description: "Applicant email address." },
        contact: {
          type: "string",
          description: "Applicant phone or WhatsApp number (e.g. +971 50 000 0000).",
        },
        course: {
          type: "string",
          description: "Name of the course the applicant is interested in.",
        },
        location: {
          type: "string",
          description: "Optional applicant city or location (e.g. Abu Dhabi, UAE).",
        },
      },
      required: ["name", "email", "contact", "course"],
    },
    execute: async (args) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: args.name,
          email: args.email,
          contact: args.contact,
          course: args.course,
          location: args.location || "",
        }),
      });
      const payload = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, ...payload };
    },
  },
];

export default function WebMCPTools() {
  useEffect(() => {
    // Also attach lightweight ChunkLoadError recovery on client without inline <head> script bloat
    const onChunkError = (e: Event) => {
      const target = e.target as (HTMLElement & { src?: string; href?: string }) | null;
      if (target && (target.tagName === "SCRIPT" || target.tagName === "LINK")) {
        const src = target.src || target.href;
        if (src && src.includes("/_next/static/")) {
          const storageKey = `chunk_reload_${encodeURIComponent(src)}`;
          if (!sessionStorage.getItem(storageKey)) {
            sessionStorage.setItem(storageKey, "true");
            window.location.reload();
          }
        }
      }
    };
    window.addEventListener("error", onChunkError, true);

    const registeredOn: Array<{
      ctx: NonNullable<Navigator["modelContext"]>;
      names: string[];
    }> = [];

    const contexts = [
      typeof navigator !== "undefined" ? navigator.modelContext : undefined,
      typeof document !== "undefined" ? document.modelContext : undefined,
    ].filter(
      (ctx, idx, arr): ctx is NonNullable<Navigator["modelContext"]> =>
        Boolean(ctx && typeof ctx.registerTool === "function") &&
        arr.indexOf(ctx) === idx
    );

    for (const ctx of contexts) {
      const names: string[] = [];
      for (const tool of WEBMCP_TOOLS) {
        try {
          ctx.registerTool(tool);
          names.push(tool.name);
        } catch {
          // Ignore duplicate registration or browser policy rejections
        }
      }
      registeredOn.push({ ctx, names });
    }

    return () => {
      window.removeEventListener("error", onChunkError, true);
      for (const { ctx, names } of registeredOn) {
        if (typeof ctx.unregisterTool === "function") {
          for (const name of names) {
            try {
              ctx.unregisterTool(name);
            } catch {
              // Ignore cleanup errors
            }
          }
        }
      }
    };
  }, []);

  return null;
}
