# Testing Conecto

How to review the plugin in Grok Bot or Cursor. It connects your agent to Conecto's MCP server, `https://api.conecto.chat/v1/mcp`, and adds the Conecto skill.

Signing in takes a Conecto account. Reviewers use a sample business instead of making one: the review code in the submission opens it.

## 1. Install

- **Grok Bot:** choose **Connect apps** in the sidebar, find Conecto and add it.
- **Cursor:** open **Customize**, find Conecto and select **Install**.
- **Cursor, before the plugin is listed:** clone this repository into Cursor's local plugin folder, then run **Developer: Reload Window**:

  ```bash
  git clone https://github.com/Conecto-Market/conecto-plugin-cursor.git ~/.cursor/plugins/local/conecto
  ```

## 2. Sign in with the review code

1. Start the sign-in:
   - **Grok Bot:** open Conecto in **Connect apps** and choose **Authenticate**.
   - **Cursor:** in **Customize**, find Conecto's MCP server and sign in.
2. Conecto's sign-in page opens in your browser. At the bottom, under **Reviewing Conecto for the Cursor Marketplace or Grok Bot?**, type the review code from the submission in the **Review code** box and press **Sign in with the review code**.
3. It opens Halverson Cycle & Repair, a sample bike shop with customers, deals, invoices, books, suppliers and their bills, staff and their time off, bookings, support tickets, help articles, forms, files, projects and stock. The account has prepaid credit, so paid tools run.
4. Keep the ticked areas, or choose **Select all**, then **Allow**.

The review code box shows only when the app signs in through Cursor, as Grok Bot does too. If you're already signed in to conecto.chat in that browser, the page skips to the account choice: sign out at conecto.chat/account first, or use a private window.

## 3. Try it

| Ask the agent | What happens |
| --- | --- |
| "Which open deals are worth more than $5,000, and what's the next step on each?" | Reads the CRM's deals. Free. |
| "Which invoices are overdue, and who should I chase first?" | Reads the invoices. Free. |
| "Invoice the Willamette Valley Cycling Club for 12 tune-ups at $85 each, due in 14 days, and send it." | Creates the invoice for $0.01, then asks you before sending it for $0.10. The sample customers' addresses are on a domain Conecto owns, which drops the mail. |
| "Find a free time next Tuesday afternoon and book a bike fitting for Dana Kim." | Finds free times, then books one for $0.01. |
| "Summarize the open support tickets and draft a reply to the oldest one." | Reads the tickets for free, and asks before a reply goes to the customer. |
| "Show me the profit and loss for this year so far." | Runs the books report. Free. |
| "Which supplier bills are unpaid, and which ones are overdue?" | Reads the bills. Free. |

Every reply carries `cost_usd` and `balance_usd`. The skill has the agent ask before anything that reaches people outside the business, starts a monthly rental, or costs more than $1.00.

## 4. Disconnect

Remove Conecto in **Connect apps** (Grok Bot) or **Customize** (Cursor).

## Questions

Email [hello@conecto.chat](mailto:hello@conecto.chat).
