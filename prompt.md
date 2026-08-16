You are an expert Senior Full-Stack Developer specializing in secure, offline-first, zero-dependency web applications with a keen eye for premium UI/UX design.

**TASK**: Generate a COMPLETE, PRODUCTION-READY, SINGLE HTML FILE named `index.html` for a procurement toolkit called "PROCURE SHERPA". Do NOT ask for clarifications. Do NOT provide partial code. Output the entire fully functional file in one code block.

---

## 1. CORE ARCHITECTURE (STRICT RULES)
- **Zero Dependencies**: No Node.js, no npm, no build tools, no React, no Vue, no Angular. Use vanilla HTML5, CSS3, and ES6 JavaScript.
- **Zero Backend**: No `fetch()`, no `XMLHttpRequest`, no `axios`, no WebSockets. The app must work entirely offline after the first load.
- **Zero Data Transmission**: The app must NEVER send user data to any server (including Vercel, the hosting provider). Use `localStorage` exclusively for persistent data storage.
- **Single File**: All CSS (inside `<style>`) and all JavaScript (inside `<script>`) must be embedded within the single `index.html`.
- **Security**: Absolutely NO `eval()`, NO `new Function()`, NO `innerHTML` with user-supplied data (use `textContent` and safe DOM methods). Sanitize all user inputs. Validate JSON imports strictly to prevent prototype pollution (reject `__proto__`, `constructor`, `prototype` keys).
- **Privacy Notice**: In the Settings page, display this exact notice: "🔒 Your procurement data is stored locally on this device. Procure Sherpa does not require a cloud account, and no data is ever transmitted to any server."

---

## 2. VISUALLY IMPRESSIVE & AWESOME DESIGN (NEW - MANDATORY)
This is NOT a basic Bootstrap-style app. It must feel **premium, modern, and delightful** to use.

- **Color Palette**: Use a sophisticated, professional palette. Deep navy/charcoal (#0b1a2e) for the brand, a refined accent blue (#2a6df4 or #4f7df3) with subtle indigo/purple gradients for interactive elements. Use soft, warm grays (#f7f9fc, #eef2f7) for backgrounds to reduce eye strain.
- **Typography**: Use Inter (from Google Fonts) with a clean hierarchy. Headings should be bold and tight (letter-spacing: -0.02em). Body text should be highly readable.
- **Micro-interactions**: 
  - Buttons should have a smooth `transform: scale(0.97)` press effect and a subtle box-shadow hover.
  - Cards should lift gently on hover (`transform: translateY(-4px)` + shadow increase) with a smooth `transition: all 0.2s cubic-bezier(0.2, 0, 0, 1)`.
  - Input fields should have a soft focus glow (box-shadow ring) and a smooth border transition.
  - Page transitions (switching tools) should have a subtle fade-in animation (opacity 0 → 1, translateY(4px) → 0) lasting 0.15s.
- **Dashboard Action Cards**: These must be visually striking. Use a subtle gradient background or a light border with a small colored accent bar on the left or top. The icons should be large and crisp. Consider using SVG icons or clean Unicode symbols.
- **KPI Cards**: Large, bold numbers with a subtle background tint and a small trend indicator (like an arrow or badge) to make data pop.
- **Status Badges**: Use soft, pastel backgrounds with strong contrast text (e.g., SAFE = mint green, URGENT = peach/orange, CRITICAL = rose red). Add a small pulsing dot animation next to "CRITICAL" or "EXPIRED" to draw urgent attention.
- **Empty States**: Instead of boring text, use a friendly illustration (via Unicode/emoji) with a clean layout and a prominent call-to-action button.
- **Scrollbars**: Customize scrollbars to be thin and match the color palette (webkit-scrollbar).
- **Consistency**: Every card, button, input, and table must share the same border-radius (8px or 12px), padding, and spacing rhythm (8px grid system).
- **Subtle Gradients**: Use very soft, muted gradients (e.g., from #f8faff to #eef3fe) on cards or headers to add depth without looking flashy.
- **Glassmorphism Restriction**: Do NOT overuse glassmorphism. Use it sparingly (if at all) only on modals or top nav bars with a very light backdrop-blur. The primary aesthetic should be "clean, crisp, and premium" rather than "glassy and trendy".

---

## 3. USER INTERFACE & NAVIGATION
- **Top Navigation Bar**: "PROCURE SHERPA" brand (bold) on the left, with a small tagline "Procurement Toolkit" underneath or beside it in muted text. Navigation buttons: Dashboard, RFQ Comparison, Supplier Evaluation, Savings Analyzer, Contract Renewal, Negotiation Planner. On the right: "Recent" and "Settings" icons/buttons.
- **Dashboard**: Display 5 large, beautifully designed action cards: "Compare an RFQ", "Evaluate Suppliers", "Calculate Savings", "Check Contract Renewal", "Prepare Negotiation". Below that, show a "Recent Work" section listing the last 5 saved items across all modules (with links to open them).
- **Styling**: Professional, clean, compact, procurement-focused. No glassmorphism, no excessive gradients, no game-like UI. Use a clean system font (Inter or system-ui). Desktop-first but fully responsive on tablets and mobile.
- **Empty States**: Every module must show a helpful empty state (e.g., "No RFQ comparisons yet. [Create RFQ]") instead of broken UI or placeholder charts.

---

## 4. TOOL 1: RFQ COMPARISON (FLAGSHIP MODULE)
- **Create RFQ Header**: RFQ Name, RFQ Number, Date, Buyer, Notes.
- **Add Items**: Item Description, Quantity, UOM. Allow unlimited items.
- **Suppliers**: Allow up to 5 suppliers dynamically (Supplier A, B, C, D, E).
- **Per Supplier, Per Item Fields**: Unit Price, Discount (flat amount), Freight (flat amount), Tax (flat amount).
- **Calculations (Pure Functions)**:
  - `Extended Price = Quantity × Unit Price`
  - `Final Cost = Extended Price + Freight + Tax - Discount`
  - Show total cost per supplier.
  - Show lowest total supplier.
  - Show price difference and percentage difference vs lowest.
- **Comparison Table**: Display items as rows, suppliers as columns showing the Final Cost for each item.
- **Best Supplier by Item**: For each item, highlight (or show) which supplier offered the lowest Final Cost.
- **Split Award Analysis**: Calculate `Single Supplier Award` (take the single supplier with the lowest total across all items) versus `Split Award` (take the best supplier per item and sum those costs). Display `Potential Saving = Single Supplier Award - Split Award`. Clearly label this as an analytical result. Do NOT automatically award business.
- **Storage**: Save full RFQ objects to localStorage.

---

## 5. TOOL 2: SUPPLIER EVALUATION
- **Inputs**: Evaluation Name, Supplier Name (up to 5 suppliers per evaluation).
- **Criteria**: Price, Quality, Delivery, Service, Compliance. Each scored 1–5.
- **Weights**: Defaults: Price 30%, Quality 20%, Delivery 20%, Service 15%, Compliance 15%. User can modify weights. **Validation**: Total weight must equal exactly 100%. If not, prevent submission and show an error.
- **Calculation**:
  - `Weighted Score = (Score / 5) × Weight`
  - `Overall Score = Sum of all Weighted Scores` (display as %).
- **Output**: Rank suppliers side-by-side, show category scores, overall score, and clearly identify the highest-ranked supplier. Allow notes per evaluation. Save to localStorage.

---

## 6. TOOL 3: SAVINGS ANALYZER
- **Inputs**: Project/Purchase Name, Supplier, Category, Baseline Cost, Final Cost, Optional Quantity, Optional Previous Unit Price, Optional New Unit Price, Savings Type (Hard Savings / Cost Avoidance).
- **Calculations**:
  - `Savings = Baseline Cost - Final Cost`
  - `Savings % = (Savings / Baseline Cost) × 100` (Handle Zero Baseline safely: display "N/A" or 0).
  - If unit pricing used: `Unit Savings = Previous Unit Price - New Unit Price`, `Annual Savings = Unit Savings × Annual Quantity`.
- **Results Display**: Show large KPI cards for Baseline Cost, Final Cost, Savings (₹), and Savings (%). Save to localStorage.

---

## 7. TOOL 4: CONTRACT RENEWAL
- **Inputs**: Supplier, Contract Name, Contract Number, Start Date, Expiry Date, Annual Contract Value (ACV), Notice Period (days), Current Price, Renewal Price, Notes.
- **Auto-Calculations**:
  - `Days Remaining = Expiry Date - Today`
  - `Notice Deadline = Expiry Date - Notice Period (days)`
  - `Price Increase % = ((Renewal Price - Current Price) / Current Price) × 100`
  - `Renewal Annual Value = ACV × (1 + Price Increase %)`
- **Status Logic** (hardcoded):
  - `> 90 days` → SAFE (green)
  - `60–90 days` → WATCH (yellow)
  - `30–59 days` → URGENT (orange)
  - `< 30 days` → CRITICAL (red with pulsing dot)
  - `Past expiry` → EXPIRED (grey)
- **List View**: Display all contracts in a sortable/filterable table showing Supplier, Contract, Expiry, Days Remaining, Annual Value, Renewal Increase %, and Status badge. Save to localStorage.

---

## 8. TOOL 5: NEGOTIATION PLANNER
- **Header**: Supplier, Negotiation Name, Date.
- **Commercial Position**: Current Price, Target Price, Ideal Price, Walk-Away Price.
- **Objectives**: Allow user to add/remove text-based objectives (e.g., "Reduce price", "Improve payment terms").
- **Negotiation Matrix**: Table with rows for Issues. Columns: Issue, Current Position, Target, Minimum Acceptable, Priority (High/Medium/Low). Pre-populate with examples (Price, Payment Terms, Warranty) but allow edits.
- **Concession Planner**: Two text areas: "I can offer..." and "I want in return...". Allow multiple entries.
- **Notes**: Large text area for freeform negotiation notes.
- **Final Outcome**: Agreed Price, Agreed Terms, Final Savings, Outcome Notes. Save everything to localStorage.

---

## 9. CROSS-MODULE HANDOFFS (Pre-population)
- From **RFQ Comparison** results page: Add buttons "Send to Savings Analyzer" (pre-fill Supplier and Baseline/Final costs) and "Send to Negotiation Planner" (pre-fill Supplier name).
- From **Contract Renewal**: Add button "Prepare Negotiation" that opens Negotiation Planner pre-filled with the Supplier and Current Price.
- From **Supplier Evaluation**: Add button "Create Negotiation Plan" pre-filled with the top-ranked supplier.
- Implementation: When navigating, pass the relevant data via URL hash parameters or a global state object, then populate the target form fields accordingly.

---

## 10. DATA PERSISTENCE (localStorage)
- Use `localStorage` with keys: `procure_sherpa_rfqs`, `procure_sherpa_evals`, `procure_sherpa_savings`, `procure_sherpa_contracts`, `procure_sherpa_negotiations`, `procure_sherpa_recent`.
- Create a `StorageManager` object with `save()`, `load()`, `delete()`, and `getAll()` methods. Do NOT access localStorage directly inside React components (since there are none). Keep all storage logic encapsulated.
- Every Create, Update, Delete operation must immediately persist to localStorage to prevent data loss on refresh.

---

## 11. SETTINGS: BACKUP & RESTORE (MANDATORY)
- **Export Data**: Generate a JSON blob of ALL localStorage keys, download as `procure_sherpa_backup.json`.
- **Import Data**: Allow user to upload a JSON file. 
  - **Validation**: Before merging/replacing, validate the JSON structure. Ensure it is an object. Reject if it contains dangerous keys (`__proto__`, `constructor`, `prototype`). 
  - Give the user two radio options: "Replace existing data" (clear all current keys and write the imported ones) or "Merge imported data" (overwrite matching keys, keep non-matching keys from both).
  - On successful import, reload the current view to reflect the new data.

---

## 12. EXPORTS PER TOOL
- Each major tool (RFQ, Supplier Eval, Savings, Contracts, Negotiation) should have a small "Export CSV" button next to its list header.
- Generate CSV data from the respective list and download it as a `.csv` file (Excel-compatible).
- Additionally, provide a "Print Report" button that triggers `window.print()` with a clean, branded print stylesheet showing the current tool's data and key calculations.

---

## 13. RECENT WORK TRACKING
- Whenever a user creates or updates a record in ANY of the 5 tools, push an entry to the `recent` array in localStorage with the structure: `{ type: 'RFQ' | 'Evaluation' | 'Savings' | 'Contract' | 'Negotiation', name: string, id: string, timestamp: ISOString }`.
- Keep only the last 10 unique entries. Sort by timestamp descending.
- Display these in the Dashboard "Recent Work" section and in the "Recent" view (accessible via the top nav). Clicking an item should navigate to that specific tool and load that record.

---

## 14. VALIDATION (Critical Edge Cases)
- Quantity must be > 0.
- Prices cannot be negative.
- Supplier Evaluation weights must sum to 100% (show a clear validation error if not).
- Contract Expiry cannot precede Start Date.
- Notice Period cannot be negative.
- Savings Baseline must not be zero (handle gracefully).
- Walk-away Price should show a warning if it is above the Current Price or below the Ideal Price (but allow it).
- Use HTML5 `type="number"` and `step="any"` for decimals, plus robust JavaScript validation before saving.

---

## 15. CALCULATION ENGINE (Pure Functions)
Extract all logic into pure JavaScript functions before using them in the UI. For example:

```javascript
function calculateWeightedScore(score, weight) { return (score / 5) * weight; }
function calculateRFQFinalCost(qty, unitPrice, discount, freight, tax) { return (qty * unitPrice) + freight + tax - discount; }
function calculateSavings(baseline, final) { return baseline - final; }
function calculateSavingsPercent(baseline, final) { if (baseline === 0) return 0; return ((baseline - final) / baseline) * 100; }
function getContractStatus(daysRemaining) { if (daysRemaining > 90) return 'SAFE'; ... }
No calculation logic should be written directly inside event listeners. Keep logic testable and separate from DOM manipulation.

16. OUTPUT REQUIREMENT
Provide the complete index.html file.

Ensure the code is highly polished, free of syntax errors, and opens immediately in any modern browser (Chrome, Edge, Firefox, Safari).

Add comments in the JavaScript to delineate sections (e.g., // ----- STORAGE MANAGER -----, // ----- RFQ MODULE -----).

Include a tiny inline CSS reset and set the base font to Inter (fallback to system-ui). Load Inter from Google Fonts via <link> (this is the ONLY external request, and it's just for fonts—the app still works without it).