# KPI calculation reference

Percentages are shown to two decimal places, the same rounding the dashboard uses (`Number.toFixed(2)`). Money that lands on a whole shilling is shown without decimals. Averages keep two decimals when they need them. Shares can fail to add to 100.00 after rounding. Where that happens, it is noted.

The population for every unfiltered figure is the 24-order file. Recognised figures use the 21 completed orders only.

## Formulas

| Measure | Formula | Unfiltered result |
|---|---|---|
| Recognised revenue | Σ units × unit price, status = Completed | KES 1,558,000 |
| Cost of goods sold | Σ units × unit cost, status = Completed | KES 1,064,000 |
| Gross profit | Revenue − cost of goods sold | KES 494,000 |
| Gross profit margin | Gross profit / revenue | 31.71% |
| Completed orders | Count of status = Completed | 21 |
| Total orders | Count of all statuses in the view | 24 |
| Units sold | Σ units, status = Completed | 50 |
| Units on all rows | Σ units, every status | 55 |
| Average order value | Revenue / completed orders | KES 74,190.48 |
| Average selling price | Revenue / units sold | KES 31,160 |
| Returned orders | Count of status = Returned | 2 |
| Cancelled orders | Count of status = Cancelled | 1 |
| Return rate | Returned / (completed + returned) | 2 / 23 = 8.70% |
| Returns as a share of all rows | Returned / all rows | 2 / 24 = 8.33% |
| Cancellation rate | Cancelled / all rows | 1 / 24 = 4.17% |
| Orders that are not sales | (Returned + cancelled) / all rows | 3 / 24 = 12.50% |
| Excluded list value | Σ units × price on returned and cancelled | KES 140,000 |
| Excluded gross profit | Σ units × (price − cost) on those rows | KES 43,000 |
| List value of every row | Σ units × price, all statuses | KES 1,698,000 |

Reconciliation: 1,698,000 − 1,558,000 = 140,000. The ledger total for list value minus recognised revenue is the excluded strip.

Gross margin arithmetic: 494,000 / 1,558,000 = 0.31707317 = 31.71%.

Average order value: 1,558,000 / 21 = 74,190.476… = KES 74,190.48.

Average selling price: 1,558,000 / 50 = KES 31,160 exactly.

Units per completed order: 50 / 21 = 2.38.

## Month

| Month | Completed | Returned | Cancelled | Units sold | Revenue | Cost | Profit | Margin | Versus prior month |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| January | 7 | 1 | 0 | 16 | 484,000 | 333,000 | 151,000 | 31.20% | — |
| February | 6 | 0 | 1 | 17 | 460,000 | 311,000 | 149,000 | 32.39% | −4.96% |
| March | 8 | 1 | 0 | 17 | 614,000 | 420,000 | 194,000 | 31.60% | +33.48% |
| Quarter | 21 | 2 | 1 | 50 | 1,558,000 | 1,064,000 | 494,000 | 31.71% | — |

Month-on-month revenue uses the prior calendar month, and only when that month is in the view.

- February: (460,000 − 484,000) / 484,000 = −4.9587% = −4.96%.
- March: (614,000 − 460,000) / 460,000 = 33.4783% = +33.48%.

January is the base month in this file, so it has no prior-month figure. There is no 2025 comparison, and none is implied.

Average order value by month: January 484,000 / 7 = KES 69,142.86. February 460,000 / 6 = KES 76,666.67. March 614,000 / 8 = KES 76,750.

## Region

Completed orders only, except the returned and cancelled counts.

| Region | Completed | Returned | Cancelled | Units | Revenue | Revenue share | Profit | Profit share | Margin | AOV |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Nairobi | 8 | 1 | 0 | 20 | 612,000 | 39.28% | 192,000 | 38.87% | 31.37% | 76,500 |
| Mombasa | 5 | 0 | 0 | 12 | 396,000 | 25.42% | 124,000 | 25.10% | 31.31% | 79,200 |
| Kisumu | 4 | 1 | 0 | 11 | 290,000 | 18.61% | 100,000 | 20.24% | 34.48% | 72,500 |
| Nakuru | 4 | 0 | 1 | 7 | 260,000 | 16.69% | 78,000 | 15.79% | 30.00% | 65,000 |
| Total | 21 | 2 | 1 | 50 | 1,558,000 | 100.00% | 494,000 | 100.00% | 31.71% | 74,190.48 |

Revenue shares: 612 / 1,558, 396 / 1,558, 290 / 1,558, 260 / 1,558.

Nairobi recognised revenue splits into electronics KES 470,000 and furniture KES 142,000. 470,000 + 142,000 = 612,000.

Mombasa’s five completed orders are one of each product: phone, office chair, desk, laptop, tablet.

## Product

| Product | Completed orders | Returned | Cancelled | Units sold | Revenue | Revenue share | Profit | Profit share | Margin |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Laptop | 5 | 0 | 0 | 7 | 525,000 | 33.70% | 140,000 | 28.34% | 26.67% |
| Phone | 4 | 2 | 0 | 12 | 360,000 | 23.11% | 108,000 | 21.86% | 30.00% |
| Desk | 4 | 0 | 0 | 8 | 280,000 | 17.97% | 104,000 | 21.05% | 37.14% |
| Tablet | 4 | 0 | 1 | 9 | 225,000 | 14.44% | 72,000 | 14.57% | 32.00% |
| Office Chair | 4 | 0 | 0 | 14 | 168,000 | 10.78% | 70,000 | 14.17% | 41.67% |
| Total | 21 | 2 | 1 | 50 | 1,558,000 | 100.00% | 494,000 | 99.99% | 31.71% |

Profit shares round to 99.99% rather than 100.00%. The shilling totals add exactly: 140,000 + 108,000 + 104,000 + 72,000 + 70,000 = 494,000.

Phone orders in the file: 6. Completed phone revenue is KES 360,000 on 12 units. Returned phone list value is KES 90,000 on 3 units. Of the 4 phone orders flagged Returning, 2 were returned. Both phone orders flagged New were completed.

## Category

| Category | Completed | Units | Revenue | Revenue share | Profit | Profit share | Margin |
|---|---:|---:|---:|---:|---:|---:|---:|
| Electronics | 13 | 28 | 1,110,000 | 71.25% | 320,000 | 64.78% | 28.83% |
| Furniture | 8 | 22 | 448,000 | 28.75% | 174,000 | 35.22% | 38.84% |
| Total | 21 | 50 | 1,558,000 | 100.00% | 494,000 | 100.00% | 31.71% |

Margin gap, furniture minus electronics: 38.8393% − 28.8288% = 10.0105 percentage points.

Scenario, not a result. Shifting KES 100,000 of revenue from the electronics margin to the furniture margin would change gross profit by 100,000 × (174,000 / 448,000 − 320,000 / 1,110,000) = KES 10,010.46. The file does not show that customers would accept the shift.

## Customer type

Completed orders only.

| Type | Orders | Units | Units per order | Revenue | Revenue share | Profit | Margin | AOV | ASP |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| New | 10 | 21 | 2.10 | 658,000 | 42.23% | 215,000 | 32.67% | 65,800 | 31,333.33 |
| Returning | 11 | 29 | 2.64 | 900,000 | 57.77% | 279,000 | 31.00% | 81,818.18 | 31,034.48 |
| Total | 21 | 50 | 2.38 | 1,558,000 | 100.00% | 494,000 | 31.71% | 74,190.48 | 31,160 |

Returning average selling price: 900,000 / 29 = KES 31,034.48. New: 658,000 / 21 = KES 31,333.33. The prices are close. The order-value gap is the units, 2.64 against 2.10.

These are not retention rates. There is no customer key.

## Worked filters

These are the checks used against the dashboard. Each one applies the same formulas to a subset.

**January only.** Completed revenue KES 484,000, profit KES 151,000, margin 31.20%, 8 orders in view, 7 completed, 1 returned, units sold 16, AOV KES 69,142.86, excluded list value KES 60,000, return rate 1 / 8 = 12.50%.

**January and Nairobi.** Orders 1001, 1003 and 1006. 1006 is returned, so recognised revenue is 150,000 + 48,000 = KES 198,000. Profit is 40,000 + 20,000 = KES 60,000. Margin 30.30%. Units sold 6. AOV KES 99,000. Recorded orders 3. Return rate 1 / 2 = 50.00%.

**February and Furniture.** Orders 1011 and 1013, both completed. Revenue 70,000 + 60,000 = KES 130,000. Profit 26,000 + 25,000 = KES 51,000. Margin 39.23%. Units 7. AOV KES 65,000. Recorded orders 2.

**Phone.** Completed revenue KES 360,000, profit KES 108,000, margin 30.00%, units sold 12, completed orders 4, recorded orders 6, returned 2, AOV KES 90,000, return rate 2 / 6 = 33.33%.

**March, Returning, Laptop.** Orders 1016 and 1023. Revenue KES 225,000. Profit KES 60,000. Margin 26.67%. Units 3. AOV KES 112,500. Recorded orders 2.

**February, Nakuru, Tablet.** Order 1014 only. Recorded orders 1, completed 0, revenue KES 0, profit KES 0, units sold 0, margin not defined, AOV not defined, excluded list value KES 50,000.

`audit.py` asserts the unfiltered totals, the monthly and regional blocks, the product and category blocks, and the customer blocks. The filtered examples above are asserted by reading the dashboard after each filter is applied.
