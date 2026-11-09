# AI model benchmark — Kenya retail analytics (Q1 2026)

Three models ran the same end-to-end assignment: analyse a 24-order multi-region retail file, write the required documentation, and build a vanilla HTML/CSS/JS executive dashboard with Chart.js, combined filters, and light/dark mode.

| Model | Folder or artifact in this repo |
|-------|----------------------------------|
| Composer 2.5 | Browser snapshot: `Retail Executive Analytics _ Q1 2026.mhtml` |
| Grok 4.6 | `retail-executive-dashboard/` (+ snapshot `Retail Executive Analytics · Q1 2026_model_2.mhtml`) |
| Grok 4.7 | `model3_grok4.7/` (+ snapshot `Four-city retail performance · Q1 2026_model3_4.7.mhtml`) |

Formal scoring and narrative: [`AI Model Benchmark Evaluation Report.pdf`](./AI%20Model%20Benchmark%20Evaluation%20Report.pdf) (9 November 2026).

## Assignment (summary)

- **Period:** 5 January 2026 – 25 March 2026  
- **Regions:** Nairobi, Mombasa, Kisumu, Nakuru  
- **Deliverables:** business analytics report, data-quality note, KPI reference, interactive dashboard (`index.html`, `styles.css`, `script.js`), run instructions, testing summary  

Revenue, cost, gross profit, units sold, and average order value use **Completed** orders only. Returned and cancelled rows are reported separately and excluded from those sales KPIs.

## Shared analytical results

All three models matched the same recognised sales totals for the full file:

| Metric | Value |
|--------|------:|
| Recognised revenue | KES 1,558,000 |
| Cost of goods sold | KES 1,064,000 |
| Gross profit | KES 494,000 |
| Gross profit margin | 31.71% |
| Completed orders | 21 |
| Units sold | 50 |
| Average order value | KES 74,190.48 |
| Returned orders | 2 (phones: 1006, 1022) |
| Cancelled orders | 1 (tablet: 1014, Nakuru) |
| Excluded list value (returns + cancellation) | KES 140,000 |

**Interpretation (consistent across reports):** Nairobi leads revenue share (~39%). March is the strongest month (KES 614,000); February is weakest (KES 460,000). Electronics dominate revenue; furniture shows higher margin. Operational issues cluster on **phone returns** and the **Nakuru tablet cancellation**.

Because the computational baseline was identical, the benchmark differentiated on documentation quality, dashboard UX, validation, and BI presentation—not on core arithmetic.

## Overall scores

Weights: math accuracy 35%, audit and data prep 20%, frontend and UX 25%, BI rigor 20%.

| Model | Math | Audit & data prep | Frontend & UX | BI rigor | **Overall** |
|-------|-----:|------------------:|--------------:|---------:|------------:|
| Composer 2.5 | 35.0 / 35 | 15.0 / 20 | 18.0 / 25 | 15.5 / 20 | **83.5 / 100** |
| Grok 4.6 | 35.0 / 35 | 18.0 / 20 | 20.0 / 25 | 16.0 / 20 | **89.0 / 100** |
| Grok 4.7 | 35.0 / 35 | 20.0 / 20 | 24.5 / 25 | 17.0 / 20 | **96.5 / 100** |

**Ranking:** Grok 4.7 → Grok 4.6 → Composer 2.5.

## Findings by model

### Composer 2.5 — functional baseline (83.5)

- Delivered the required dashboard sections: header, six KPI cards, revenue and performance charts, insights, recommendations, dropdown filters, and theme toggle.
- Correct unfiltered KPIs on the preserved page snapshot (e.g. KES 1,558,000 revenue, KES 494,000 profit, 31.71% margin, 21 orders, 50 units, KES 74,190 AOV).
- Assessment emphasis: competent but standard layout and typography; less executive polish and weaker audit/validation story than the Grok runs.

### Grok 4.6 — executive ledger style (89.0)

- **`retail-executive-dashboard/`** — “Branch ledger” design (Sora, Source Sans 3, IBM Plex Mono).
- **City cash position** — regional revenue share with bar-style city meters.
- **Finding / Do** blocks in recommendations; dedicated **Exceptions** table for returns and cancellations.
- Full **`docs/`** set plus **`docs/TESTING_AND_VALIDATION.md`** with browser checks (filters, theme, responsive layout, chart datasets vs cards).
- Chart.js 4.4.1 via CDN; combined AND filters on month, region, category, and product.

### Grok 4.7 — interactive enterprise close (96.5)

- **`model3_grok4.7/`** — “Four-city retail performance” with chip filters (month, region), category/product selects, sticky table of contents, recognition strip with excluded list value.
- **Order ledger** — all 24 rows with footer reconciliation to list value and recognised totals.
- **`audit.py`** — independent Python check of the same rules (`python3 audit.py` prints `PASS` and control totals).
- **Vendored Chart.js** (`vendor/chart.umd.min.js`) so charts run without CDN access; in-page check banner if unfiltered totals drift from audited controls.
- **`docs/TESTING_AND_VALIDATION.md`** documents filter matrix, theme toggle, and chart cross-checks in the browser.

## How to run the dashboards

### Grok 4.6

```bash
cd retail-executive-dashboard
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`. Charts need network access for Chart.js and fonts on first load unless you mirror the CDN locally.

### Grok 4.7

```bash
cd model3_grok4.7
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/`. Chart.js is local under `vendor/`. Google Fonts load from the network with system fallbacks.

### Composer 2.5 snapshot

Open `Retail Executive Analytics _ Q1 2026.mhtml` in a browser that supports MHTML (saved page export of the dashboard at completion).

## Documentation map

| Path | Contents |
|------|-----------|
| `retail-executive-dashboard/docs/BUSINESS_ANALYTICS_REPORT.md` | Grok 4.6 full report |
| `retail-executive-dashboard/docs/KPI_CALCULATION_REFERENCE.md` | Grok 4.6 formulas and totals |
| `model3_grok4.7/docs/BUSINESS_ANALYTICS_REPORT.md` | Grok 4.7 full report |
| `model3_grok4.7/docs/KPI_CALCULATION_REFERENCE.md` | Grok 4.7 formulas, filtered examples |
| `model3_grok4.7/audit.py` | Grok 4.7 standalone arithmetic audit |

## Takeaways

1. **Math was not the differentiator** — all models earned full marks on accuracy for the shared recognition rules.
2. **Grok 4.7 won on execution depth** — offline Chart.js, dual audit (`audit.py` + on-load control check), richer navigation and ledger, and the strongest documented browser validation.
3. **Grok 4.6 won on editorial BI design** — city cash meters, structured recommendations, and exceptions surfaced for management without reaching 4.7’s interaction and audit bar.
4. **Composer 2.5 met the functional bar** — correct KPIs and a complete chart set on the preserved snapshot, but scored lowest on UX refinement and audit/preparation depth per the evaluation report.

For the full scoring matrix and architectural commentary, use [`AI Model Benchmark Evaluation Report.pdf`](./AI%20Model%20Benchmark%20Evaluation%20Report.pdf).
