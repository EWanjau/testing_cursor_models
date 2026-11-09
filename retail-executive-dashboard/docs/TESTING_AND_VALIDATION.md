# Testing and validation summary

Dashboard served from `python3 -m http.server 8080` in `retail-executive-dashboard/` and exercised in a Chromium tab on 9 November 2026.

## Calculation checks (Python, independent of the UI)

Completed-only sales KPIs from the 24 source rows:

| Check | Expected | Result |
|---|---|---|
| Revenue | 1,558,000 | Verified |
| COGS | 1,064,000 | Verified |
| Gross profit | 494,000 | Verified |
| Margin | 31.71% (494000/1558000) | Verified |
| Completed / returned / cancelled | 21 / 2 / 1 | Verified |
| Units | 50 | Verified |
| AOV | 74,190 (1,558,000 ÷ 21) | Verified |
| ASP | 31,160 | Verified |
| Jan / Feb / Mar revenue | 484,000 / 460,000 / 614,000 | Verified |
| MoM Feb / Mar | −4.96% / +33.48% | Verified |
| Nairobi revenue share | 39.28% (612,000) | Verified |
| Electronics revenue | 1,110,000 (71.25%) | Verified |
| Phone returns | 2 of 6 phone orders | Verified |

The report, KPI reference and dashboard dataset use these same rows and formulas.

## Browser tests actually run

| Test | Result |
|---|---|
| Unfiltered KPI cards | Match the table above (KES 1,558,000; 494,000; 31.71%; 21; 50; 74,190). |
| City ledger | Nairobi 612,000 (39.28%), Mombasa 396,000 (25.42%), Kisumu 290,000 (18.61%), Nakuru 260,000 (16.69%). |
| Chart.js datasets | Monthly revenue [484000, 460000, 614000]; monthly profit [151000, 149000, 194000]; region [612000, 396000, 290000, 260000]; product revenue [525000, 360000, 225000, 168000, 280000]; product profit [140000, 108000, 72000, 70000, 104000]; category [1110000, 448000]; customer [658000, 900000]; status [21, 2, 1]. |
| Exceptions table | Orders 1006 Returned, 1014 Cancelled, 1022 Returned. List values 60,000 / 50,000 / 30,000. Not in revenue. |
| Light/dark toggle | Worked. Button label and `aria-pressed` swap. Choice stored in `localStorage` (`branch-ledger-theme`) and restored on reload. Chart colours follow the theme. |
| Region = Nairobi | 8 completed of 9 matching; revenue 612,000; profit 192,000; margin 31.37%; units 20; AOV 76,500; 1 returned (1006). |
| Nairobi + January | 2 completed of 3; revenue 198,000; profit 60,000; units 6; AOV 99,000. Chart monthly [198000, 0, 0]. |
| Nairobi + January + Electronics | 1 completed of 2 (laptop 1001); revenue 150,000; profit 40,000; margin 26.67%. Product list narrowed to Laptop / Phone / Tablet. Returned phone 1006 still in exceptions. |
| Category = Furniture | Revenue 448,000; profit 174,000; margin 38.84%; 8 orders; 22 units; AOV 56,000. Product list Office Chair / Desk. No exceptions. Monthly [119000, 130000, 199000]. |
| Nakuru + Office Chair | 0 matching orders. KPIs 0 / — . Empty-state copy on all charts. |
| Clear filters | Restored unfiltered KPIs and full product list. |
| Combined AND filters | Month, region, category and product stacked; summary text lists every active filter. |
| Insights | Six observations, numbers match the current filter (not forecasts). |
| Recommendations | Remain the five Q1 actions; they do not change with filters. |
| Responsive | At ~687px width, header, filters and city ledger stack; KPI cards go to one column. Desktop (~1280px) uses the three-column KPI grid and two/three-column charts. |
| Chart empty overlay | First load hid charts behind “No completed orders” because `.chart-empty { display: grid }` overrode `[hidden]`. Fixed and re-tested: charts render; empty copy only on zero-row filters. |

## Chart tooltips

Chart.js tooltip callbacks format values as `KES …`. Hover was not separately captured in screenshots; configuration is present on every chart (`plugins.tooltip.callbacks`).

## Limitations noted in testing

- Chart.js and Google Fonts load from CDNs. Charts need network access.
- March is observed through 25 March 2026 only.
- Sample is 24 orders. Filtered views can rest on a single ticket (the Nairobi–January–Electronics view is one laptop).
- Customer type is an order label. Retention and LTV are not calculated.
- Device-emulation screenshot of a 390px phone was letterboxed by the browser tool; stacking behaviour was confirmed at 687px width instead.

## Outstanding issues

None that affect KPI accuracy or filter logic after the empty-state CSS fix.
