import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID" },
      { status: 500 }
    );
  }

  let address = "";
  try {
    const body = (await request.json()) as { address?: string };
    address = body.address ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  const message = `Wallet connected: ${address}`;

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json(
      { error: "Telegram API error", detail: text },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
