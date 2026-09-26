# Procure Sherpa — Practical Procurement Decision Tools

> Compare. Calculate. Negotiate. Decide.

A single-file, offline-first procurement toolkit with 18 decision-support calculators. No login, no upload, no backend — runs entirely in your browser.

**Live:** [DigiTracks/Sherpa_ToolKit](https://github.com/DigiTracks/Sherpa_ToolKit)

---

## What is Procure Sherpa?

SAP manages the transaction. **Procure Sherpa helps the buyer make the decision.**

Every tool follows the same pattern: **Input → Calculation → Result → Interpretation → Expert's Advice**. You get a number, a procurement meaning, and expert context — in under 2 minutes.

---

## Tools

### Price & Quotes
| Tool | What it does |
|------|-------------|
| **Compare Quotes** | Normalize 3+ supplier quotations to find the true lowest cost |
| **Landed Cost** | Real delivered cost with freight, duty, insurance, and all charges |
| **Should Cost** | Estimate a reasonable supplier price from material, labour, and overhead inputs |
| **TCO** | Total cost of ownership across acquisition, operations, and end-of-life |

### Negotiation
| Tool | What it does |
|------|-------------|
| **Negotiation Savings** | Quantify negotiation impact on annual spend in rupee terms |
| **Price Increase** | Calculate supplier increase impact with scenario analysis |
| **Price Escalation** | Fixed percentage and index-based escalation models over multi-year contracts |
| **Payment Terms** | Financial value of extended credit vs early payment discounts |

### Buying Decisions
| Tool | What it does |
|------|-------------|
| **PO Value Check** | Verify purchase order value against quotes and contract terms |
| **MOQ / Order Qty** | Optimize order quantity — EOQ vs MOQ vs discount scenarios |
| **Make vs Buy** | Total cost comparison for in-house manufacturing vs supplier purchase |

### Supplier & Risk
| Tool | What it does |
|------|-------------|
| **Supplier Scorecard** | 8-criteria weighted performance evaluation |
| **Supplier Concentration** | HHI index and dependency risk analysis |

### Procurement Review
| Tool | What it does |
|------|-------------|
| **Budget vs Actual** | Variance analysis with price vs volume decomposition |
| **Savings Analysis** | Hard savings and soft savings breakdown |
| **Multi-Year Contract Cost** | Year-by-year contract projection with escalation |
| **GST / Tax** | CGST, SGST, IGST, TDS, TCS calculator |
| **Currency / FX** | Foreign exchange impact with hedging scenarios |

---

## Which tool when? (Quick Selector)

The most common buyer question: *18 tools — which one do I open right now?* Start from your situation:

| Your situation | Open this tool | Then this |
|----------------|----------------|-----------|
| 3 quotes on the table, all look similar | **Compare Quotes** | **Supplier Scorecard** — cheapest isn't always best |
| "Final price ₹1,240/unit, delivered" — verify it | **Landed Cost** | Compare freight/duty lines against the quote |
| Supplier asks for a 6% increase on raw material basis | **Price Increase** | **Should Cost** — check if the material claim holds up |
| Contract has an escalation clause tied to WPI/CPI | **Price Escalation** | **Multi-Year Contract Cost** — see 3-year impact |
| Supplier offers 2/10 net 45 — take the discount? | **Payment Terms** | Weigh discount value vs your working capital |
| Build the fixture in-house, or give it to the supplier? | **Make vs Buy** | Run **TCO** on the winner for the full life cycle |
| One supplier is ~70% of category spend | **Supplier Concentration** | Start dual-sourcing qualification |
| Quarterly review: spend is 8% over budget | **Budget vs Actual** | **Savings Analysis** — split price vs volume effect |
| PO value doesn't match the approved quote | **PO Value Check** | Flag before release, not after invoice |
| Need 500 units, discount starts at 1,000 | **MOQ / Order Qty** | Check if carrying cost justifies the bigger order |
| EUR-denominated contract, INR books | **Currency / FX** | Decide on hedging vs pass-through clause |
| GST/TDS/TCS lines on the supplier invoice | **GST / Tax** | Verify before payment release |

### Common procurement chains

Real buying work is never one calculation — chain the tools the way the year actually flows:

- **Annual negotiation prep:** Should Cost → Negotiation Savings → Payment Terms → walk into the meeting with numbers, not opinions
- **New supplier award:** Compare Quotes → Supplier Scorecard → Supplier Concentration → award with risk visibility
- **Contract renewal:** Multi-Year Contract Cost → Price Escalation → renegotiate the escalation clause with data
- **Quarterly business review:** Budget vs Actual → Savings Analysis → report hard vs soft savings separately
- **Capex decision:** Make vs Buy → TCO → present full-life cost, not purchase price

---

## Features

- **18 tools** covering the full procurement decision lifecycle
- **Load Example** on every tool — see pre-filled data instantly
- **Expert's Advice** on every result — expert procurement context
- **Cross-tool handoffs** — send Quote results to Negotiation or TCO
- **Savings Dashboard** — all saved comparisons in one place: who is cheapest, how much you save
- **Backup & Restore** — one-click JSON download from Saved Work; move machines without losing data
- **Share links** — copy-link on any result; anyone opening it sees that comparison
- **Audit trail** — every save/delete/export recorded locally (last 100 events)
- **Print-friendly** — Ctrl+P on any page for a clean report
- **Dark mode** — toggle from sidebar, preference saved
- **Sortable tables** — click any column header
- **Zero dependencies** — single HTML file, works offline
- **Private** — all data stays in your browser (localStorage)
- **Indian context** — ₹, GST (CGST/SGST/IGST), INR throughout

---

## Files (single source of truth)

| File | Description |
|------|-------------|
| `index.html` | The toolkit — calculators, dashboard, dark mode, all features (Vercel entry point). **Edit only this file.** |
| `Tool Kit 1/Procure_Sherpa_Basic Toolkit.html` | Separate legacy app: RFQ workflow manager (creation, evaluation, savings tracker, contracts). Not a copy of `index.html`. |
| `manifest.json` / `sw.js` | PWA shell — installable, offline-first caching for `index.html`. |
| `tests/run.mjs` | Regression suite — `node tests/run.mjs` (no dependencies). |

---

## Getting Started

1. Open `index.html` in any modern browser
2. Click any tool from the sidebar or homepage
3. Click **Load Example** to see it in action
4. Replace with your actual data
5. Click **Calculate** — review results, KPIs, and Expert's Advice

---

## Install as an app (PWA)

Procure Sherpa is installable — it gets its own window and icon, and keeps working without internet:

**Desktop (Chrome / Edge):**
1. Open the live URL
2. Click the **install icon** in the address bar (or menu → *Install Procure Sherpa*)
3. Launch it from your taskbar/start menu like any desktop app

**Mobile (Android / iOS):**
1. Open the live URL in Chrome (Android) or Safari (iOS)
2. Menu → **Add to Home Screen**
3. Open it from the home screen — full-screen, no browser bar

**Offline:** after first load, the service worker (`sw.js`) caches the app — quotes, calculators, and saved work all work on flights or at plants with poor connectivity. Your data stays on that device.

---

## How to Use

Click **How to Use** in the sidebar for a comprehensive guide covering:
- What each tool does and when to use it
- What data to enter and how to interpret results
- Common procurement workflows
- Key concepts glossary

---

## Hosting on Vercel

1. Push to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Deploy — no build step needed (static HTML)

---

## Browser Support

Works on all modern browsers:
- Chrome / Edge
- Firefox
- Safari

---

## Data Policy

- All calculations run locally in your browser
- No data is sent to any server
- Saved comparisons stored in browser localStorage
- **Backup** any time from Saved Work — restores with validation (bad files rejected, evil input sanitized)
- Clear browser data = local copy deleted (keep a backup)

---

## Appendix: Key formulas & benchmarks

The formulas behind the tools — handy when you need to defend a number in a negotiation or review meeting:

| Formula / benchmark | Where it applies | How to read it |
|---------------------|------------------|----------------|
| **EOQ = √(2DS ÷ H)** | MOQ / Order Qty | D = annual demand, S = order/setup cost, H = holding cost per unit/year. Order quantity above EOQ only makes sense with a price break — check the discount vs added carrying cost |
| **HHI = Σ(market share %)²** | Supplier Concentration | HHI < 1,500 = unconcentrated; 1,500–2,500 = moderate; > 2,500 = highly concentrated. A single supplier above ~40% share is a dual-sourcing trigger regardless of HHI |
| **Landed cost = FOB + freight + duty + insurance + clearance + inland** | Landed Cost | Always compare quotes on landed, not FOB — a 3% cheaper FOB quote loses to a 1% cheaper all-in quote |
| **Should-cost = material + labour + overhead + margin** | Should Cost | Build it bottom-up from BOM weight × commodity rates. If the quote exceeds should-cost by > 15%, demand a cost breakdown |
| **TCO = acquisition + operations (energy, spares, maintenance) + downtime + disposal − residual** | TCO | For equipment, operations typically dominate — a machine 20% cheaper to buy is often 40% costlier to own over 5 years |
| **Savings % = (baseline − actual) ÷ baseline × 100** | Savings Analysis | Fix the baseline definition *before* the quarter starts — hard savings hit the P&L, soft savings (avoided cost, cost avoidance) don't. Report them separately |
| **Price-variance = (new price − old price) × actual volume; volume-variance = (actual volume − budgeted volume) × old price** | Budget vs Actual | Separates "we paid more" from "we bought more" — the first is a negotiation issue, the second is a planning issue |
| **2/10 net 45 → annualized ≈ 37%** | Payment Terms | Discount % ÷ (100 − discount %) × 365 ÷ (net days − discount days). Early-payment discounts beat almost any credit line — take them if cash allows |
| **TDS under IT Act: 194C (works) 1%/2%, 194J (professional) 10%, 194I (rent) 10%** | GST / Tax | Verify TDS section and rate on every vendor invoice before payment release — wrong section = notice later |
| **Safety stock = Z × σd × √LT** | MOQ / Order Qty | Z = service level factor (90% → 1.28, 95% → 1.65, 99% → 2.33), σd = demand variability, LT = lead time in matching units. Higher service levels cost superlinearly — 99% is rarely worth it for C-class items |
| **Reorder point = (avg demand × lead time) + safety stock** | MOQ / Order Qty | The trigger line for replenishment. If you reorder after stock-out instead of at ROP, you're paying for expediting twice |
| **Capacity utilization = actual output ÷ designed capacity × 100** | Make vs Buy | Below ~70% in-house utilization usually means make-vs-buy tilts to buy — fixed overhead spreads over too few units |

### Incoterms quick reference (quote comparisons depend on them)

| Incoterm | Buyer pays for | Quote comparison note |
|----------|----------------|----------------------|
| **EXW** | Everything from supplier's dock | Lowest headline price, highest hidden cost — always convert to landed before comparing |
| **FOB** | Ocean freight + insurance + import clearance | The standard comparison basis for imports |
| **CIF** | Only import clearance + inland | Supplier-chosen freight can be padded — request the freight invoice copy |
| **DDP** | Nothing until delivery | Highest headline price, lowest risk — best for comparing true total cost |

**Rule of thumb:** never compare quotes across different Incoterms on price — normalize to landed cost first (use the Landed Cost tool).

---

## FAQ

**Do I need an account or login?**
No. No login, no signup, no email. Open the page and start calculating.

**Can I use it for company-confidential data?**
Yes — nothing leaves your device. All calculations and storage are local (browser localStorage). For shared machines, use Backup & Restore and keep the JSON file secure.

**Does it work without internet?**
Yes, once loaded. The service worker caches the app for offline use — ideal for plant visits and travel.

**Is the data really not uploaded anywhere?**
Correct. There is no backend — no server receives anything. Share links encode the comparison in the URL itself.

**Can I move my saved work to another computer?**
Yes. Saved Work → Backup & Restore → download the JSON, restore it on the new machine.

---

## Disclaimer

Procure Sherpa provides calculation and decision-support tools. Results depend on the assumptions and data entered by the user and should be reviewed against applicable commercial, tax, accounting, contractual and organizational requirements before making a procurement decision.

---

Built by [DigiTracks](https://github.com/DigiTracks)
