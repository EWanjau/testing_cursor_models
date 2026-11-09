# Retail Executive Analytics — Q1 2026

Interactive executive dashboard and supporting analysis for a Kenyan multi-region retailer (Nairobi, Mombasa, Kisumu, Nakuru).

Reporting window in the source file: **5 January 2026 – 25 March 2026**.

## Run the dashboard locally

The dashboard is static HTML, CSS and JavaScript. Chart.js is loaded from a CDN, so a browser with network access is required for charts.

**Option A — local web server (recommended)**

```bash
cd retail-executive-dashboard
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

**Option B — open the file**

Open `index.html` in a browser. Charts still need network access to `cdn.jsdelivr.net`.

No build step, backend, or database is used. Metrics are calculated in `script.js` from the embedded dataset.

## Project layout

```
retail-executive-dashboard/
├── index.html
├── styles.css
├── script.js
├── README.md
└── docs/
    ├── DATA_QUALITY_AND_PREPARATION.md
    ├── KPI_CALCULATION_REFERENCE.md
    ├── BUSINESS_ANALYTICS_REPORT.md
    └── TESTING_AND_VALIDATION.md
```

## How numbers are calculated

- Recognised revenue and gross profit use **Completed** orders only.
- Returned and cancelled orders are excluded from sales KPIs and shown in operational views.
- Filters (month, region, category, product) combine with AND and refresh KPIs and charts together.
- Full formulas and the unfiltered Q1 totals are in `docs/KPI_CALCULATION_REFERENCE.md`.
