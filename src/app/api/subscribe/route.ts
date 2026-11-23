import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(`subscribe:${ip}`, 5, 10 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        }
      );
    }

    const payload = await req.json().catch(() => null);
    const email = typeof payload?.email === "string" ? payload.email.trim() : "";

    if (!email || email.length > 254) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.warn("BREVO_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Newsletter subscription is temporarily unavailable." },
        { status: 503 }
      );
    }

    const listId = process.env.BREVO_LIST_ID;
    const body: { email: string; updateEnabled: boolean; listIds?: number[] } = {
      email,
      updateEnabled: true,
    };

    if (listId) {
      const parsedId = parseInt(listId, 10);
      if (!isNaN(parsedId)) {
        body.listIds = [parsedId];
      }
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Brevo API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Unable to complete subscription. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 200 });
  } catch (error) {
    console.error("Subscription route error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
