import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return map[char];
  });

const sanitizeHeaderValue = (str: string) =>
  str.replace(/[\r\n\0]+/g, " ").trim();

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const contact = typeof body.contact === "string" ? body.contact.trim() : "";
    const course = typeof body.course === "string" ? body.course.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const offer = typeof body.offer === "string" ? body.offer.trim() : "";

    if (!name || !email || !contact) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { message: "Invalid name." },
        { status: 400 }
      );
    }

    if (contact.length > 20 || !/^[0-9+\s()-]{7,20}$/.test(contact)) {
      return NextResponse.json(
        { message: "Invalid contact number." },
        { status: 400 }
      );
    }

    if (course.length > 150 || location.length > 150 || offer.length > 200) {
      return NextResponse.json(
        { message: "Input exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (email.length > 254 || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 }
      );
    }

    const emailHost = process.env.EMAIL_HOST?.replace(/^["']|["']$/g, "");
    const emailUser = process.env.EMAIL_USER?.replace(/^["']|["']$/g, "");
    const emailPass = process.env.EMAIL_PASS?.replace(/^["']|["']$/g, "");
    const emailPortStr = process.env.EMAIL_PORT?.replace(/^["']|["']$/g, "");
    const emailTo = process.env.EMAIL_TO?.replace(/^["']|["']$/g, "");

    if (!emailHost || !emailUser || !emailPass) {
      console.error("Missing SMTP environment variables.");

      return NextResponse.json(
        { message: "Unable to process your request right now." },
        { status: 500 }
      );
    }

    const emailPort = emailPortStr ? parseInt(emailPortStr, 10) : 465;
    const isSecure = emailPort === 465;

    const transporter =
      emailHost.toLowerCase() === "sendmail"
        ? nodemailer.createTransport({
            sendmail: true,
            newline: "unix",
            path: "/usr/sbin/sendmail",
          })
        : nodemailer.createTransport({
            host: emailHost,
            port: emailPort,
            secure: isSecure,
            auth: {
              user: emailUser,
              pass: emailPass,
            },
            tls: {
              minVersion: "TLSv1.2",
              rejectUnauthorized: true,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
          });

    const isOfferInquiry = offer.length > 0;
    const safeSubjectTarget = sanitizeHeaderValue(
      isOfferInquiry ? offer : course || "General"
    );

    await transporter.sendMail({
      from: isOfferInquiry
        ? `"Offer Inquiry - AIMS" <${emailUser}>`
        : `"Website Contact" <${emailUser}>`,
      to: emailTo ?? emailUser,
      replyTo: sanitizeHeaderValue(email),
      subject: isOfferInquiry
        ? `Offer Inquiry - ${safeSubjectTarget}`
        : `New Inquiry - ${safeSubjectTarget}`,
      html: isOfferInquiry
        ? `
        <h2>Offer Inquiry: ${escapeHtml(offer)}</h2>
        <p><strong>Selected Offer:</strong> ${escapeHtml(offer)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Mobile Number:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      `
        : `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Course:</strong> ${escapeHtml(course || "Not specified")}</p>
        <p><strong>Location:</strong> ${escapeHtml(location || "Not specified")}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Mail Error:", error);

    return NextResponse.json(
      { message: "Unable to process your request." },
      { status: 500 }
    );
  }
}
