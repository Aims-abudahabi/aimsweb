import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.warn("BREVO_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Newsletter subscription is currently disabled (API key not configured)" },
        { status: 500 }
      );
    }

    const listId = process.env.BREVO_LIST_ID;
    const body: Record<string, any> = {
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
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Brevo API error:", errorData);
      return NextResponse.json(
        { error: errorData.message || "Failed to subscribe" },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 200 });
  } catch (error) {
    console.error("Subscription route error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
