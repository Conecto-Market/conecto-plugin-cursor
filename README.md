# Conecto

Conecto's plugin for Cursor and Grok Bot: the CRM, email inboxes, invoicing and bookkeeping, help desk, booking calendar, e-signatures, purchasing and HR of a small business, as tools your agent can use. You sign in with Conecto, so there is no key to copy, and each call is paid from the business's prepaid balance.

[Conecto](https://conecto.chat) is business software built for AI agents. It hosts the business's systems on its own servers and gives the agent one tool per action: 52 areas, from CRM and invoices to HR and website analytics.

## What's in the plugin

| Part | File | What it does |
| --- | --- | --- |
| MCP server | [`mcp.json`](mcp.json) | Conecto's remote MCP server, `https://api.conecto.chat/v1/mcp` (Streamable HTTP), with OAuth sign-in |
| Skill | [`skills/conecto/SKILL.md`](skills/conecto/SKILL.md) | How the agent connects, what costs money, when it asks you first, and what to do when a call is refused |

The plugin has no rules, hooks, commands or scripts, and nothing in it runs on your computer.

## Install

- **Cursor:** open **Customize**, search for Conecto and select **Install**.
- **Grok Bot:** choose **Connect apps** in the sidebar, search for Conecto and add it.

To try this repository in Cursor before that, clone it into Cursor's local plugin folder, then run **Developer: Reload Window**:

```bash
git clone https://github.com/Conecto-Market/conecto-plugin-cursor.git ~/.cursor/plugins/local/conecto
```

## Connect

1. Start the sign-in:
   - **Cursor:** in **Customize**, find Conecto's MCP server and sign in.
   - **Grok Bot:** in **Connect apps**, open Conecto and choose **Authenticate** (**Authorize** on the phone).
2. Conecto's sign-in page opens in your browser. Sign in. If your business is new to Conecto, make its account on that page: it's free and starts with $1.00 of credit.
3. Choose the account, tick the areas your agent may use, and select **Allow**.

Tick only the areas you need, since each one adds tools to the agent's list. The connection acts as you, within the areas you ticked. To change the areas, connect again: in Cursor, sign out of Conecto in Customize and sign in. In Grok Bot, open Conecto in **Connect apps**, choose **Remove**, add it again and sign in. To end a connection, select **Disconnect** next to the app under **AI apps** on Conecto's account page.

In Grok Bot, every Bot on your account can use Conecto once it's connected. Grok Bot's Auto-review can also ask you before a Conecto call: add an **Ask first** rule under **Custom Rules**, such as "send email or invoices through Conecto".

## Try it

- "Which invoices are overdue, and who should I chase first?"
- "Show me the profit and loss for this year so far."
- "Summarize the open support tickets and draft a reply to the oldest one."
- "Which open deals are worth more than $5,000, and what's the next step on each?"
- "Find a free hour next Tuesday afternoon and book a call with Dana Kim."

The skill tells the agent to ask you before anything that reaches people outside the business, like an email to a customer or an invoice sent, unless you asked for exactly that.

## Pricing

- The plugin is free. Conecto, the service it connects to, has its own prices.
- Conecto has no plans or seats. Each tool has a published price, listed at [conecto.chat/tools](https://conecto.chat/tools): for example $0.01 for a CRM change, $0.10 for an invoice sent and $0.01 for a meeting booked.
- Reading the business's own data is free up to 1,000,000 reads a month, and a call that fails costs nothing.
- A new account starts with $1.00 of free credit. You add more on the [account page](https://conecto.chat/account), from $5.00 plus a 7% + $0.35 fee.

## Data and privacy

- Cursor and Grok Bot send Conecto the tool calls and their arguments only, never the rest of the conversation.
- Grok Bot calls Conecto from Cursor's servers and keeps the sign-in's tokens there, out of the Bot's reach.
- Conecto deletes a call's input and output after 30 days. It doesn't sell your data, use it for advertising, or use it to train AI models. The [privacy notice](https://conecto.chat/privacy) has the details, and the [terms](https://conecto.chat/terms) apply.

## Troubleshooting

| What you see | What to do |
| --- | --- |
| Conecto's tools don't appear in Cursor | Sign in from **Customize**. If it still fails, open the Output panel, choose **MCP Logs**, and look for Conecto's server. |
| Grok Bot says Conecto is missing, or shows **Needs auth** | **Added** doesn't mean signed in. Open Conecto in **Connect apps** and choose **Authenticate**. |
| Grok Bot's sign-in didn't finish | Choose **Reopen** or **Retry** on the card, and finish the sign-in in your browser within about 10 minutes. |
| A tool is missing, or a call says `key_scope` | Its area wasn't ticked. Connect again, as in [Connect](#connect), and tick it. |
| The sign-in says the app is not registered or asked to come back somewhere it did not register | Connect again, so the app registers again. |
| Your account only lets chosen AI apps connect | On the account page, under **Settings**, **AI apps people may connect**, add `cursor.com, localhost`. Cursor and Grok Bot sign in through cursor.com, and Cursor's desktop app also through your own computer. |
| Conecto shows up twice in Cursor | You added Conecto to `mcp.json` by hand before. Remove that entry, or turn one of them off in Customize. |
| You're asked to sign in again | A sign-in lasts while it's used at least every 30 days. Sign in again as in [Connect](#connect). |
| Cursor's Cloud Agents can't reach Conecto | Cloud Agents keep their own sign-in. In Customize, sign in on the server's **Cloud** row. |
| Conecto says **Disabled by team admin** in Grok Bot | Your Cursor team admin allows Conecto in the team's connector policy, on the dashboard's **Plugins & MCPs** page. |
| Your company blocks the server | An admin allows `https://api.conecto.chat/v1/mcp` in the MCP allowlist. If Grok Bot's network policy applies to MCP servers, the admin also adds `api.conecto.chat` to **Allowed destinations**. |
| A call answers `insufficient_balance` or another `402` | Add credit on the account page, then ask again. |
| A call answers `approval_required` | Your account holds that tool for a person's approval. Once they approve, ask again: the agent calls again with the same arguments, and that one call runs. |

Every error code and its fix: [conecto.chat/docs/errors.md](https://conecto.chat/docs/errors.md).

## Support

- Email [hello@conecto.chat](mailto:hello@conecto.chat), also for security reports ([security.txt](https://conecto.chat/.well-known/security.txt)).
- Docs: [conecto.chat/docs](https://conecto.chat/docs)
- Reviewing the plugin: [TESTING.md](TESTING.md)

## License

[MIT](LICENSE)
