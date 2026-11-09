# Testing and validation

Tested on 9 November 2026 against `http://127.0.0.1:8765/`, served with `python3 -m http.server` from this folder. The page under test was the dashboard in `model3_grok4.7`. Chart.js loaded from `vendor/chart.umd.min.js`. No calculation-check banner appeared, which means the in-page control totals matched.

`python3 audit.py` was run separately and printed `PASS` with revenue KES 1,558,000, cost KES 1,064,000, profit KES 494,000, margin 31.71%, 21 completed orders, 50 units, AOV KES 74,190.48, ASP KES 31,160, return rate 8.70%, excluded list value KES 140,000.

## What was checked in the browser

The unfiltered page showed:

| Figure | On screen |
|---|---|
| Revenue | KES 1,558,000 |
| Gross profit | KES 494,000 |
| Cost of goods | KES 1,064,000 |
| Margin | 31.71% |
| Total orders | 24, of which 21 completed, 2 returned, 1 cancelled |
| Units sold | 50, average selling price KES 31,160 |
| Average order value | KES 74,190.48 |
| Excluded list value | KES 140,000 |
| Return rate | 8.70% of orders that were not cancelled |
| Ledger list value | KES 1,698,000 |
| Ledger recognised revenue | KES 1,558,000 |
| Ledger recognised profit | KES 494,000 |
| Ledger units total | 55, which is every row, not units sold |

Seven charts were created and each canvas had a non-zero size. Category text read Electronics KES 1,110,000 (71.25%) and Furniture KES 448,000 (28.75%). Status text read 21 completed, 2 returned, 1 cancelled.

### Filters

Filters were applied through the page’s own buttons and select controls. Cards, the excluded strip, the status chart and the monthly chart were read after each change.

| Filter | Revenue | Profit | Margin | Orders | Units | AOV | Other result |
|---|---:|---:|---:|---|---:|---:|---|
| January | 484,000 | 151,000 | 31.20% | 8 recorded, 7 completed, 1 returned | 16 | 69,142.86 | Excluded KES 60,000. Return rate 12.50%. |
| January and Nairobi | 198,000 | 60,000 | 30.30% | 3 recorded, 2 completed, 1 returned | 6 | 99,000 | Chart showed January only, Nairobi only, status 2 completed and 1 returned. |
| February and Furniture | 130,000 | 51,000 | 39.23% | 2 completed | 7 | 65,000 | Product list narrowed to Office Chair and Desk. February chart: revenue 130,000, profit 51,000. |
| Phone | 360,000 | 108,000 | 30.00% | 6 recorded, 4 completed, 2 returned | 12 | 90,000 | Excluded KES 90,000. Return rate 33.33%. Monthly chart 90,000 / 180,000 / 90,000. |
| March and Laptop | 225,000 | 60,000 | 26.67% | 2 completed | 3 | 112,500 | Both March laptop orders are returning customers, so this is also the March + returning + laptop slice. |
| February, Nakuru and Tablet | 0 | 0 | — | 1 cancelled | 0 | — | Excluded KES 50,000. Return rate not shown, because nothing was fulfilled. Status chart: one cancelled order. A note said recognised revenue is KES 0. |
| No month selected | 0 | 0 | — | 0 | 0 | — | Empty-state message shown. No charts drawn. |
| Reset | 1,558,000 | 494,000 | 31.71% | 24 | 50 | 74,190.48 | All-months and all-regions chips pressed again. |

Choosing Electronics removed Desk and Office Chair from the product list. Insights switched between “Full quarter” and “This view”. The five recommendations kept the full-quarter figures while a filter was on.

January combined with Nairobi was also checked on the chart objects, not only the cards: the month chart was `[198000]` revenue and `[60000]` profit, the region chart was Nairobi `198000`, and product revenue was Laptop 150,000, Phone 0, Tablet 0, Office Chair 48,000, Desk 0.

### Theme

The theme button was clicked in both directions. In light mode the document theme was `light`, the page background computed to `rgb(228, 235, 240)`, and the button read “Use dark mode”. Light and dark screenshots of the finished header both show the recognition strip with the excluded amount on the right, the filter chips, and the six KPI cards. An earlier dark screenshot also showed the monthly revenue and profit chart and the regional bars. Figures stayed readable in both themes. The choice is stored in `localStorage` under `retail-close-theme`.

### Layout seen

Desktop width, light and dark: header, recognition strip, filter bar, six KPI cards, and the monthly plus regional charts. The strip places the excluded amount on the right of the rule. Charts use distinct colours per region. No overlapping text was seen in those views. The filter bar stays on screen while scrolling on a wide window.

## What was not confirmed visually

- A pointer was not hovered over a chart bar, so the tooltip popup itself was not seen. The charts do carry Chart.js tooltips formatted as shillings for money charts and as order counts for the status chart, and the underlying series were read back and matched the cards.
- A phone-sized viewport was not captured. An attempt to emulate a 390px device was blocked in this browser session. The stylesheet does stack the header, the KPI cards, the charts and the recognition strip below 720px, and it stacks the chart grids below 980px. Those rules were not watched at those widths.
- Keyboard-only use of every chip was not walked. The controls are native buttons and selects, with a visible focus outline in the stylesheet.

## Known limits of the analysis, not of the page

These are properties of the file, and the dashboard states them rather than papering over them.

- 24 orders. A percentage can move on a single row.
- No customer identifier, so there is no retention rate and no lifetime value.
- No return reason, so the phone finding stops at the two order IDs.
- No year before 2026, so there is no year-on-year figure.
- Gross profit ignores tax, freight and overhead.
- Currency is assumed to be KES.
