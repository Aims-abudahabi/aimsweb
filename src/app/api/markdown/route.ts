import { NextRequest, NextResponse } from "next/server";
import { renderPageMarkdown, SITE_URL } from "@/lib/agentContent";

export async function GET(request: NextRequest) {
  const pathParam = request.nextUrl.searchParams.get("path") || "/";
  const { markdown, status, canonicalPath } = renderPageMarkdown(pathParam);

  // Approximate token count (~4 chars/token)
  const approxTokens = Math.max(1, Math.ceil(markdown.length / 4));

  const linkHeader = [
    `<${SITE_URL}${canonicalPath}>; rel="canonical"`,
    `</llms.txt>; rel="describedby"; type="text/plain"`,
    `</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"`,
  ].join(", ");

  return new NextResponse(markdown, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "Link": linkHeader,
      "X-Markdown-Tokens": String(approxTokens),
      "Content-Signal": "search=yes, ai-input=yes, ai-train=no",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
