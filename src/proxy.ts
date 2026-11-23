import { NextRequest, NextResponse } from "next/server";

/**
 * Checks whether the client's Accept header explicitly requests text/markdown
 * with equal or higher priority than text/html.
 */
function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;
  const lower = acceptHeader.toLowerCase();
  if (!lower.includes("text/markdown")) return false;

  const parseQ = (mime: string): number => {
    const parts = lower.split(",");
    for (const raw of parts) {
      const [typePart, ...params] = raw.trim().split(";");
      if (typePart.trim() === mime) {
        const qParam = params.find((p) => p.trim().startsWith("q="));
        if (!qParam) return 1;
        const val = parseFloat(qParam.trim().slice(2));
        return Number.isNaN(val) ? 1 : val;
      }
    }
    return 0;
  };

  const mdQ = parseQ("text/markdown");
  const htmlQ = parseQ("text/html");
  return mdQ > 0 && mdQ >= htmlQ;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Serve clean Markdown when an agent requests Accept: text/markdown
  if (prefersMarkdown(request.headers.get("accept"))) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = "/api/markdown";
    rewriteUrl.search = `?path=${encodeURIComponent(pathname)}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  // Emit RFC 8288 Link headers + Vary: Accept on HTML page responses
  const response = NextResponse.next();
  const encodedPath = encodeURIComponent(pathname || "/");
  const linkHeader = [
    `</llms.txt>; rel="describedby"; type="text/plain"`,
    `</api/markdown?path=${encodedPath}>; rel="alternate"; type="text/markdown"`,
    `</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"`,
    `</sitemap.xml>; rel="sitemap"; type="application/xml"`,
  ].join(", ");

  response.headers.set("Link", linkHeader);
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match HTML pages while skipping:
     * - /api/*
     * - /_next/*
     * - /.well-known/*
     * - static files with extensions (robots.txt, llms.txt, sitemap.xml, images, fonts, pdfs, etc.)
     */
    "/((?!api|_next|\\.well-known|.*\\..*).*)",
  ],
};
