import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const contact = body.contact?.trim();
    const course = body.course?.trim();
    const location = body.location?.trim();

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

    if (contact.length > 20) {
      return NextResponse.json(
        { message: "Invalid contact number." },
        { status: 400 }
      );
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 }
      );
    }

    const emailHost = process.env.EMAIL_HOST?.replace(/^["']|["']$/g, '');
    const emailUser = process.env.EMAIL_USER?.replace(/^["']|["']$/g, '');
    const emailPass = process.env.EMAIL_PASS?.replace(/^["']|["']$/g, '');
    const emailPortStr = process.env.EMAIL_PORT?.replace(/^["']|["']$/g, '');
    const emailTo = process.env.EMAIL_TO?.replace(/^["']|["']$/g, '');

    if (!emailHost || !emailUser || !emailPass) {
      console.error("Missing SMTP environment variables.");

      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      );
    }

    const emailPort = emailPortStr ? parseInt(emailPortStr, 10) : 465;
    const isSecure = emailPort === 465;

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: isSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      family: 4,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    } as any);

    await transporter.sendMail({
      from: `"Website Contact" <${emailUser}>`,
      to: emailTo ?? emailUser,
      replyTo: email,
      subject: `New Inquiry - ${escapeHtml(course || "General")}`,
      html: `
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
  } catch (error: any) {
    console.error("Mail Error:", error);

    return NextResponse.json(
      { 
        message: "Unable to process your request.",
        error: error.message || String(error),
        code: error.code,
        debug: {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
        }
      },
      { status: 500 }
    );
  }
}