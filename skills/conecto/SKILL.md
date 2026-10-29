---
name: conecto
description: "Conecto runs a small business's back office as MCP tools paid per call: CRM, email inboxes, invoices and bookkeeping, help desk, booking calendar, e-signatures, purchasing and HR. Use when the person asks to read or change the business's records or to email from the business, or when Conecto's tools are missing or a call to them is refused."
---

# Conecto

Conecto is business software built for AI agents. A business's CRM, email inboxes, invoices and books, help desk, booking calendar, e-signatures, purchasing and HR run on Conecto's servers, and this plugin gives you them as tools on one MCP server, `conecto` (Cursor lists it as `plugin-conecto-conecto`), at `https://api.conecto.chat/v1/mcp`. Each call is paid from the business's prepaid balance.

## Connect

When Conecto's tools are missing from your tool list, the person hasn't signed in yet or turned the server off. Ask them to:

1. Open **Customize** in Cursor, find Conecto's MCP server and sign in. Cursor opens Conecto's sign-in page in the browser.
2. Sign in. Someone new makes the business's account on that page, free, with $1.00 of credit.
3. Choose the account, tick the areas you may use, and select **Allow**.

Connected means a Conecto tool such as `account_balance` answers.

The sign-in is the whole setup: the connection runs on a key of its own that acts as that person, within the areas they ticked, so `mcp.json` needs no API key. Keep one Conecto server: if another was added by hand, use one of them and suggest turning the other off in Customize.

## Calling tools

- Reading the business's data is free up to 1,000,000 reads a month. Every other tool has a published price. Each reply carries `cost_usd` and `balance_usd`, and a refused call costs `$0.00`.
- Ask the person before a call that reaches people outside the business (an email to a customer, an invoice sent, a document for signature), starts a monthly rental (an inbox or a phone number), or costs more than $1.00, unless they asked for exactly that. Reading and searching need no question.
- A tool that takes a while answers with a `call_id`. Call `account_get_call` with it until it succeeds or fails. It's charged only when it succeeds.
- Each tool's page, `https://conecto.chat/tools/<area>/<tool>.md`, has its inputs, an example call, a real reply and its errors. Read it when a tool's inputs are unclear or a call is refused.
- When the person wants to look through an area themselves, such as a long list or the books, `account_dashboard_link` with that area makes a one-time page of it. Make one when they ask.

## Keys for the business's other systems

Connecting HubSpot, Salesforce, Microsoft 365, Google Workspace, a social account or another system's API takes that system's key or password, and it is typed on a Conecto page rather than in this chat. Call the connect tool without it (`connect_add` without `secret`, `hubspot_connect` without `token`): it answers with a one-time link. Give the person the link. The owner or an admin, signed in on conecto.chat, types the key there, and the page runs the tool. Carry on once they say it's done.

The reply's `from_a_terminal` line runs the Conecto CLI, which works only where the CLI already holds a key for this account. For a sign-in connection like this one, the link is the way.

## When a call is refused

The reply's `error` and `message` say why and how to fix it. Every code: `https://conecto.chat/docs/errors.md`. The fixes that differ for a sign-in connection:

- `key_scope`, or a tool missing from your list: its area wasn't ticked. The person signs out of Conecto in Customize and connects again, ticking it.
- `insufficient_balance`, `payment_required`, `payment_required_for_outbound` or `purchased_credit_required`: a person adds credit on the account page, `https://conecto.chat/account` (from $5.00). Then call again.
- `daily_budget_reached` or `monthly_ceiling_reached`: the owner raises the limit on the account page. Otherwise the daily budget starts again at midnight UTC, and the monthly ceiling on the 1st.
- `approval_required`: the owner holds this tool for a person's approval, and the request went to the approvers the reply names. Tell the person and wait. Calling again while it waits returns the same request. Once they say it's approved, call again with exactly the same arguments: that one call runs. An approval lasts 72 hours after the answer.
- `owner_required`: only the owner does this, on the account page.

## Money

- Only a person adds credit, on the account page. A new account starts with $1.00 of free credit.
- Free credit never contacts people outside the business: email and documents to them need one real top-up first. The phone line and AI visibility run only on credit someone bought.
- The connection has a daily budget ($20.00 by default) and the account a monthly ceiling ($100.00). The owner sets both.

## More

- What Conecto is, who runs it and what it costs: https://conecto.chat/ai-questions
- Every area and tool, with its price: https://conecto.chat/tools.md
- Terms: https://conecto.chat/terms. Privacy: https://conecto.chat/privacy
