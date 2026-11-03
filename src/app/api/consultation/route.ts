import { NextResponse } from "next/server";
import {
  CONSULTATION_TO,
  formatConsultationEmail,
  parseConsultation,
} from "@/lib/consultation";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = parseConsultation(body);
  if (!data) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    await sendConsultationEmail(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Consultation email failed", error);
    return NextResponse.json(
      { error: "We couldn’t send your request. Please try again or email us directly." },
      { status: 502 },
    );
  }
}

async function sendConsultationEmail(
  data: NonNullable<ReturnType<typeof parseConsultation>["data"]>,
) {
  const subject = `Consultation request from ${data.firstName} ${data.lastName}`;
  const text = formatConsultationEmail(data);
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "New England Haven <onboarding@resend.dev>",
        to: [CONSULTATION_TO],
        reply_to: data.email || undefined,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${CONSULTATION_TO}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "box",
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      state: data.state,
      zip: data.zip,
      phone: data.phone || "—",
      email: data.email || "—",
      notes: data.notes || "—",
      message: text,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}
