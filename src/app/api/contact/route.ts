import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, childName, childAge, message, camp } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Fussballschule Website <onboarding@resend.dev>',
      to: ['jonas.stoeckler@gmx.at'],
      replyTo: email,
      subject: `Neue Anmeldung: ${childName} - ${camp || 'Allgemeine Anfrage'}`,
      html: `
        <h2>Neue Anfrage von der Website</h2>
        <hr />
        <p><strong>Elternteil:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
        <hr />
        <p><strong>Kind Name:</strong> ${childName}</p>
        <p><strong>Kind Alter:</strong> ${childAge} Jahre</p>
        <p><strong>Gewünschtes Camp:</strong> ${camp || 'Nicht angegeben'}</p>
        <hr />
        <p><strong>Nachricht:</strong></p>
        <p>${message || 'Keine Nachricht'}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
