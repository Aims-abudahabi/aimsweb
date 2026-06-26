import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, contact, course, location } = data;

    // Create a transporter using Hostinger SMTP (or specified provider)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      family: 4 // Force IPv4 to avoid ENETUNREACH errors
    } as any);

    // Email content for the business
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Inquiry from ${name} - ${course || 'General'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Inquiry Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b; width: 150px;">Name:</td>
              <td style="padding: 10px; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Email:</td>
              <td style="padding: 10px; color: #1e293b;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Contact:</td>
              <td style="padding: 10px; color: #1e293b;">${contact}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Course/Program:</td>
              <td style="padding: 10px; color: #1e293b;">${course || 'Not Specified'}</td>
            </tr>
            ${location ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Location:</td>
              <td style="padding: 10px; color: #1e293b;">${location}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
            This email was sent from the AIMS Training Center website contact form.
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { message: 'Error sending email', error: error.message },
      { status: 500 }
    );
  }
}
