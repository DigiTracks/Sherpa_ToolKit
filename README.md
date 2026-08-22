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

## Features

- **18 tools** covering the full procurement decision lifecycle
- **Load Example** on every tool — see pre-filled data instantly
- **Expert's Advice** on every result — expert procurement context
- **Cross-tool handoffs** — send Quote results to Negotiation or TCO
- **Print-friendly** — Ctrl+P on any page for a clean report
- **Dark mode** — toggle from sidebar, preference saved
- **Sortable tables** — click any column header
- **Zero dependencies** — single HTML file, works offline
- **Private** — all data stays in your browser (localStorage)
- **Indian context** — ₹, GST (CGST/SGST/IGST), INR throughout

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Full toolkit — 18 tools, dark mode, all features (Vercel entry point) |
| `Tool Kit 1/Procure_Sherpa_ToolKit.HTML` | Full toolkit — 18 tools, dark mode, all features |
| `Tool Kit 1/Procure_Sherpa_Basic Toolkit.html` | RFQ workflow manager — RFQ creation, supplier evaluation, savings tracker, contracts, negotiation & dashboard |
| `ProcureSherpaBasictoolkiit.html` | Legacy basic toolkit file (mirrors RFQ workflow version) |

---

## Getting Started

1. Open `Procure_Sherpa_ToolKit.HTML` in any modern browser
2. Click any tool from the sidebar or homepage
3. Click **Load Example** to see it in action
4. Replace with your actual data
5. Click **Calculate** — review results, KPIs, and Expert's Advice

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
- Clear browser data = all saved work is deleted

---

## Disclaimer

Procure Sherpa provides calculation and decision-support tools. Results depend on the assumptions and data entered by the user and should be reviewed against applicable commercial, tax, accounting, contractual and organizational requirements before making a procurement decision.

---

Built by [DigiTracks](https://github.com/DigiTracks)
