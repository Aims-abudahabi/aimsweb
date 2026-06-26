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

    if (
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.error("Missing SMTP environment variables.");

      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      family: 4,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
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
  } catch (error) {
    console.error("Mail Error:", error);

    return NextResponse.json(
      { message: "Unable to process your request." },
      { status: 500 }
    );
  }
}