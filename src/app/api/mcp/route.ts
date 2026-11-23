import { NextRequest, NextResponse } from "next/server";
import { coursesData } from "@/data/courses";
import { blogPosts } from "@/data/blogs";
import { getActiveOffers } from "@/data/offer";
import { ORGANIZATION_INFO, SITE_URL } from "@/lib/agentContent";

const PROTOCOL_VERSION = "2025-03-26";

const SERVER_INFO = {
  name: "aims-training-center",
  title: "AIMS Training Center Abu Dhabi MCP Server",
  version: "1.0.0",
};

const MCP_TOOLS = [
  {
    name: "search_courses",
    description:
      "Search AIMS Training Center's 50+ ACTVET-approved courses in Abu Dhabi by keyword, category, or level.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Keyword to match against course title, category, or description (e.g. AutoCAD, IELTS, Excel, Tally).",
        },
        category: {
          type: "string",
          description:
            "Optional category filter (e.g. Engineering and CAD, Finance & Accounting, IT & Networking, Language Courses).",
        },
        limit: {
          type: "integer",
          description: "Maximum number of courses to return (default 10, max 50).",
        },
      },
    },
  },
  {
    name: "get_course_details",
    description:
      "Get full curriculum, overview, duration, level, highlights, and prerequisites for a specific AIMS course by its ID.",
    inputSchema: {
      type: "object",
      properties: {
        courseId: {
          type: "string",
          description:
            "The course slug/ID (e.g. tally, engineering-cad, language-courses).",
        },
      },
      required: ["courseId"],
    },
  },
  {
    name: "get_active_offers",
    description:
      "List all currently active course discounts, bundles, and promotions at AIMS Training Center Abu Dhabi.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_blogs",
    description:
      "List published exam-prep and career development articles from the AIMS Training Center blog.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description:
            "Optional blog category filter (e.g. IELTS, Exam Prep, Education, Career).",
        },
      },
    },
  },
  {
    name: "get_center_info",
    description:
      "Retrieve AIMS Training Center Abu Dhabi's official address, phone, email, ACTVET accreditation, hours, and social profiles.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

const MCP_RESOURCES = [
  {
    uri: "aims://llms.txt",
    name: "AIMS Training Center Overview (llms.txt)",
    description: "Concise site overview and directory of key AIMS Training Center pages.",
    mimeType: "text/plain",
  },
  {
    uri: "aims://courses",
    name: "Complete AIMS Course Catalog",
    description: "Structured JSON list of all AIMS Training Center courses.",
    mimeType: "application/json",
  },
  {
    uri: "aims://offers",
    name: "Active Special Offers",
    description: "Structured JSON list of active course offers and discounts.",
    mimeType: "application/json",
  },
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version",
};

function jsonRpcResult(id: unknown, result: unknown) {
  return NextResponse.json(
    { jsonrpc: "2.0", id: id ?? null, result },
    { status: 200, headers: CORS_HEADERS }
  );
}

function jsonRpcError(id: unknown, code: number, message: string, httpStatus = 200) {
  return NextResponse.json(
    { jsonrpc: "2.0", id: id ?? null, error: { code, message } },
    { status: httpStatus, headers: CORS_HEADERS }
  );
}

function executeTool(name: string, args: Record<string, unknown> = {}) {
  switch (name) {
    case "search_courses": {
      const query = typeof args.query === "string" ? args.query.trim().toLowerCase() : "";
      const category =
        typeof args.category === "string" ? args.category.trim().toLowerCase() : "";
      const limitRaw = typeof args.limit === "number" ? args.limit : 10;
      const limit = Math.min(Math.max(1, Math.floor(limitRaw)), 50);

      const matches = Object.values(coursesData)
        .filter((c) => {
          const matchesQuery =
            !query ||
            c.title.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query) ||
            c.description.toLowerCase().includes(query);
          const matchesCategory =
            !category || c.category.toLowerCase().includes(category);
          return matchesQuery && matchesCategory;
        })
        .slice(0, limit)
        .map((c) => ({
          id: c.id,
          title: c.title,
          category: c.category,
          duration: c.duration,
          level: c.level,
          description: c.description,
          url: `${SITE_URL}/courses/${c.id}/`,
        }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ totalReturned: matches.length, courses: matches }, null, 2),
          },
        ],
      };
    }

    case "get_course_details": {
      const courseId = typeof args.courseId === "string" ? args.courseId.trim() : "";
      if (!courseId) {
        return {
          isError: true,
          content: [{ type: "text", text: "Missing required argument: courseId" }],
        };
      }
      const course = coursesData[courseId];
      if (!course) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Course "${courseId}" not found. Call search_courses to discover valid course IDs.`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { ...course, url: `${SITE_URL}/courses/${course.id}/` },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_active_offers": {
      const offers = getActiveOffers().map((o) => ({
        id: o.id,
        title: o.title,
        subtitle: o.subtitle,
        badge: o.badge,
        validUntil: o.validUntil,
        description: o.description,
        url: `${SITE_URL}${o.ctaLink || "/offers/"}`,
      }));
      return {
        content: [{ type: "text", text: JSON.stringify({ offers }, null, 2) }],
      };
    }

    case "list_blogs": {
      const category =
        typeof args.category === "string" ? args.category.trim().toLowerCase() : "";
      const posts = blogPosts
        .filter((p) => !category || p.category.toLowerCase().includes(category))
        .map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          date: p.date,
          author: p.author.name,
          excerpt: p.excerpt,
          url: `${SITE_URL}/blogs/${p.id}/`,
        }));
      return {
        content: [{ type: "text", text: JSON.stringify({ articles: posts }, null, 2) }],
      };
    }

    case "get_center_info": {
      return {
        content: [{ type: "text", text: JSON.stringify(ORGANIZATION_INFO, null, 2) }],
      };
    }

    default:
      return null;
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      name: "com.aimstrainingcenter/aims-mcp",
      serverInfo: SERVER_INFO,
      protocolVersion: PROTOCOL_VERSION,
      transport: "streamable-http",
      serverCard: `${SITE_URL}/.well-known/mcp/server-card.json`,
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
      },
      tools: MCP_TOOLS.map((t) => t.name),
      resources: MCP_RESOURCES.map((r) => r.uri),
    },
    { status: 200, headers: CORS_HEADERS }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return jsonRpcError(null, -32700, "Parse error: expected JSON-RPC 2.0 object", 400);
  }

  const { id, method, params } = body as {
    jsonrpc?: string;
    id?: unknown;
    method?: string;
    params?: Record<string, unknown>;
  };

  if (!method || typeof method !== "string") {
    return jsonRpcError(id, -32600, "Invalid Request: missing method", 400);
  }

  switch (method) {
    case "initialize":
      return jsonRpcResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {
          tools: { listChanged: false },
          resources: { subscribe: false, listChanged: false },
        },
        serverInfo: SERVER_INFO,
      });

    case "notifications/initialized":
      return new NextResponse(null, { status: 202, headers: CORS_HEADERS });

    case "ping":
      return jsonRpcResult(id, {});

    case "tools/list":
      return jsonRpcResult(id, { tools: MCP_TOOLS });

    case "tools/call": {
      const toolName = typeof params?.name === "string" ? params.name : "";
      const toolArgs =
        params?.arguments && typeof params.arguments === "object"
          ? (params.arguments as Record<string, unknown>)
          : {};
      const result = executeTool(toolName, toolArgs);
      if (!result) {
        return jsonRpcError(id, -32602, `Unknown tool: ${toolName}`);
      }
      return jsonRpcResult(id, result);
    }

    case "resources/list":
      return jsonRpcResult(id, { resources: MCP_RESOURCES });

    case "resources/read": {
      const uri = typeof params?.uri === "string" ? params.uri : "";
      if (uri === "aims://courses") {
        return jsonRpcResult(id, {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(Object.values(coursesData)),
            },
          ],
        });
      }
      if (uri === "aims://offers") {
        return jsonRpcResult(id, {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(getActiveOffers()),
            },
          ],
        });
      }
      if (uri === "aims://llms.txt") {
        return jsonRpcResult(id, {
          contents: [
            {
              uri,
              mimeType: "text/plain",
              text: `AIMS Training Center (${SITE_URL}/) — ACTVET-licensed professional training center in Abu Dhabi, UAE. See ${SITE_URL}/llms.txt for full directory.`,
            },
          ],
        });
      }
      return jsonRpcError(id, -32602, `Unknown resource URI: ${uri}`);
    }

    default:
      return jsonRpcError(id, -32601, `Method not found: ${method}`);
  }
}
