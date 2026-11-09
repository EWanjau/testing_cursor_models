# Four-city retail performance

Executive close for a Kenyan retail company covering Nairobi, Mombasa, Kisumu and Nakuru, 5 January 2026 to 25 March 2026. The page calculates every figure in the browser from the 24 orders in the file. Nothing is fetched from a server.

## Run it

From this folder:

```bash
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/`.

Opening `index.html` directly also works. Chart.js is stored in `vendor/chart.umd.min.js` (version 4.4.6, MIT), so the charts do not need a network connection. The typefaces are loaded from Google Fonts. If those are blocked, the page falls back to a system sans and a system monospace and the figures stay intact.

## What is in the folder

| File | Role |
|---|---|
| `index.html` | Dashboard structure |
| `styles.css` | Light and dark themes |
| `script.js` | Data, calculations, filters, charts |
| `vendor/chart.umd.min.js` | Chart.js 4.4.6 |
| `audit.py` | Second, independent calculation of the same rules |
| `docs/BUSINESS_ANALYTICS_REPORT.md` | Written close for management |
| `docs/DATA_QUALITY_AND_PREPARATION.md` | What was checked before any total was used |
| `docs/KPI_CALCULATION_REFERENCE.md` | Formulas and worked figures |
| `docs/TESTING_AND_VALIDATION.md` | What was run, and what was not |

Check the arithmetic without opening the page:

```bash
python3 audit.py
```

A passing run prints `PASS` and the control totals. The dashboard runs the same check on load. If the unfiltered totals ever drift from revenue KES 1,558,000, cost KES 1,064,000, profit KES 494,000, 50 completed units, 21 completed orders, 2 returns and 1 cancellation, a banner replaces the silent failure.

## How to read the page

Revenue, cost, gross profit, units sold and average order value use **completed** orders only. Returned and cancelled orders stay in the order count, the status chart and the ledger, and their list value is shown in the strip under the title. Filters combine: month and region and category and product. Reset filters returns to the full quarter. The five recommendations are written for the full quarter and do not change when the view is filtered.

Amounts are labelled KES. The file has no currency field. KES is an assumption, recorded in the data-quality note.
