# Conecto for Cursor

The CRM, email inboxes, invoicing and bookkeeping, help desk, booking calendar, e-signatures, purchasing and HR of a small business, as tools your Cursor agent can use. You sign in with Conecto, so there is no key to copy, and each call is paid from the business's prepaid balance.

[Conecto](https://conecto.chat) is business software built for AI agents. It hosts the business's systems on its own servers and gives the agent one tool per action: 52 areas, from CRM and invoices to HR and website analytics.

## What's in the plugin

| Part | File | What it does |
| --- | --- | --- |
| MCP server | [`mcp.json`](mcp.json) | Conecto's remote MCP server, `https://api.conecto.chat/v1/mcp` (Streamable HTTP), with OAuth sign-in |
| Skill | [`skills/conecto/SKILL.md`](skills/conecto/SKILL.md) | How the agent connects, what costs money, when it asks you first, and what to do when a call is refused |

The plugin has no rules, hooks, commands or scripts, and nothing in it runs on your computer.

## Install

From the Cursor Marketplace: open **Customize**, search for Conecto and select **Install**.

To try this repository before that, clone it into Cursor's local plugin folder, then run **Developer: Reload Window**:

```bash
git clone https://github.com/Conecto-Market/conecto-plugin-cursor.git ~/.cursor/plugins/local/conecto
```

## Connect

1. Open **Customize**, find Conecto's MCP server and sign in. Cursor opens Conecto's sign-in page in your browser.
2. Sign in. If your business is new to Conecto, make its account on that page: it's free and starts with $1.00 of credit.
3. Choose the account, tick the areas Cursor may use, and select **Allow**.

Tick only the areas you need, since each one adds tools to the agent's list. To change them later, sign out of Conecto in Customize and connect again. The connection acts as you, within the areas you ticked. To end it, select **Disconnect** next to Cursor under **AI apps** on Conecto's account page.

## Try it

- "Which invoices are overdue, and who should I chase first?"
- "Show me the profit and loss for this year so far."
- "Summarize the open support tickets and draft a reply to the oldest one."
- "Which open deals are worth more than $5,000, and what's the next step on each?"
- "Find a free hour next Tuesday afternoon and book a call with Dana Kim."

The skill tells the agent to ask you before anything that reaches people outside the business, like an email to a customer or an invoice sent, unless you asked for exactly that.

## Pricing

- Conecto has no plans or seats. Each tool has a published price, listed at [conecto.chat/tools](https://conecto.chat/tools): for example $0.01 for a CRM change, $0.10 for an invoice sent and $0.01 for a meeting booked.
- Reading the business's own data is free up to 1,000,000 reads a month, and a call that fails costs nothing.
- A new account starts with $1.00 of free credit. You add more on the [account page](https://conecto.chat/account), from $5.00 plus a 7% + $0.35 fee.
- The plugin itself is free.

## Data and privacy

- Cursor sends Conecto the tool calls and their arguments only, never the rest of the conversation.
- Conecto deletes a call's input and output after 30 days. The [privacy notice](https://conecto.chat/privacy) has the details, and the [terms](https://conecto.chat/terms) apply.

## Troubleshooting

| What you see | What to do |
| --- | --- |
| Conecto's tools don't appear | Sign in from **Customize**. If it still fails, open the Output panel, choose **MCP Logs**, and look for Conecto's server. |
| A tool is missing, or a call says `key_scope` | Its area wasn't ticked. Sign out of Conecto in Customize and connect again, ticking it. |
| The sign-in says the app is not registered or asked to come back somewhere it did not register | Sign out of Conecto in Customize and sign in again, so Cursor registers again. |
| Your account only lets chosen AI apps connect | On the account page, under **Settings**, **AI apps people may connect**, add `cursor.com, localhost`. Cursor's desktop app signs in from both. |
| Conecto shows up twice | You added Conecto to `mcp.json` by hand before. Remove that entry, or turn one of them off in Customize. |
| Cursor asks you to sign in again | A sign-in lasts while it's used at least every 30 days. Sign in again from Customize. |
| Cloud Agents can't reach Conecto | Cloud Agents keep their own sign-in. In Customize, sign in on the server's **Cloud** row. |
| Your company blocks the server | On Enterprise plans, an admin allows `https://api.conecto.chat/v1/mcp` in the MCP allowlist. |
| A call answers `insufficient_balance` or another `402` | Add credit on the account page, then ask again. |
| A call answers `approval_required` | Your account holds that tool for a person's approval. Once they approve, ask again: the agent calls again with the same arguments, and that one call runs. |

Every error code and its fix: [conecto.chat/docs/errors.md](https://conecto.chat/docs/errors.md).

## Support

- Email [hello@conecto.chat](mailto:hello@conecto.chat), also for security reports ([security.txt](https://conecto.chat/.well-known/security.txt)).
- Docs: [conecto.chat/docs](https://conecto.chat/docs)

## License

[MIT](LICENSE)
