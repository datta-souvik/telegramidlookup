export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const username = (url.searchParams.get("username") || "").replace(/^@/, "");
  if (!/^[A-Za-z0-9_]{5,32}$/.test(username)) {
    return Response.json({ error: "Invalid Telegram username." }, { status: 400 });
  }
  if (!env.TELEGRAM_BOT_TOKEN) {
    return Response.json({ error: "Server is not configured. Add TELEGRAM_BOT_TOKEN as a Cloudflare Pages secret." }, { status: 503 });
  }
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getChat?chat_id=${encodeURIComponent("@" + username)}`);
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      return Response.json({ error: payload.description || "Telegram could not resolve this chat. The bot may not have access." }, { status: 404 });
    }
    const c = payload.result;
    return Response.json({
      chat: {
        id: c.id,
        type: c.type,
        title: c.title || null,
        username: c.username || null,
        first_name: c.first_name || null,
        last_name: c.last_name || null,
        description: c.description || null
      }
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Unable to contact Telegram. Please try again." }, { status: 502 });
  }
}