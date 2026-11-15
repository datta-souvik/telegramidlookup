# TraceID — Telegram public chat ID lookup

A Cloudflare Pages site with a Pages Function. It uses Telegram Bot API `getChat` to resolve a public chat/channel/group that the configured bot is allowed to access.

## Important limitation
This is **not** an arbitrary Telegram user-ID finder. Bot API `getChat` does not enumerate Telegram users or reveal hidden user identities. For ordinary users, a bot generally needs an interaction/update containing that user's ID. Public usernames alone do not make every personal account resolvable by a bot.

## Deploy to Cloudflare Pages
1. Create a GitHub repository and upload these files, preserving `functions/api/lookup.js`.
2. In Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Choose the repository. Framework preset: **None**. Build command: leave blank. Build output directory: `/`.
4. Deploy the project.
5. In Pages → your project → Settings → Variables and Secrets, add `TELEGRAM_BOT_TOKEN` as an encrypted secret. Do not put the token in frontend files.
6. Redeploy.

Your site will be available at `https://<project-name>.pages.dev`.

## Bot access
Create a bot with BotFather and configure its token as the Pages secret. Add the bot to the relevant group/channel with suitable access. Telegram may not return chats the bot cannot access.

## Local testing
Use Wrangler Pages dev from the project directory:
`npx wrangler pages dev .`
Set `TELEGRAM_BOT_TOKEN` as a local secret using a `.dev.vars` file (do not commit it).
