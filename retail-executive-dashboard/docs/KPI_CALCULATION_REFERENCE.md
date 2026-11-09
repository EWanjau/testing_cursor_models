# KPI calculation reference

All figures below are from the 24-row source file. Revenue, COGS, profit, units, AOV and ASP use **Completed** orders only (n = 21) unless a formula says otherwise.

Currency: KES. Rounding: money to the nearest shilling in displays; percentages to two decimal places. Exact ratios are shown where a display value is rounded.

---

## 1. Core formulas

| KPI | Formula | Unfiltered Q1 result |
|---|---|---|
| Line revenue | Units × Unit Price | Per order |
| Line COGS | Units × Unit Cost | Per order |
| Line gross profit | Line revenue − Line COGS | Per order |
| Total revenue | Σ line revenue on Completed orders | 1,558,000 |
| Total COGS | Σ line COGS on Completed orders | 1,064,000 |
| Gross profit | Total revenue − Total COGS | 494,000 |
| Gross profit margin | Gross profit ÷ Total revenue | 494,000 ÷ 1,558,000 = 31.7073…% → **31.71%** |
| Completed orders | Count of Status = Completed | 21 |
| Units sold | Σ Units on Completed orders | 50 |
| Average order value (AOV) | Total revenue ÷ Completed orders | 1,558,000 ÷ 21 = 74,190.476… → **74,190** |
| Average selling price per unit (ASP) | Total revenue ÷ Units sold | 1,558,000 ÷ 50 = **31,160** |
| Returned orders | Count of Status = Returned | 2 |
| Cancelled orders | Count of Status = Cancelled | 1 |
| Order return rate | Returned orders ÷ All orders | 2 ÷ 24 = **8.33%** |
| Completion rate | Completed orders ÷ All orders | 21 ÷ 24 = **87.50%** |

Month-over-month revenue growth (month t vs month t−1):

`(Revenue_t − Revenue_t−1) ÷ Revenue_t−1`

- Jan → Feb: (460,000 − 484,000) ÷ 484,000 = **−4.96%**
- Feb → Mar: (614,000 − 460,000) ÷ 460,000 = **33.48%**

January has no prior month in this file, so no MoM figure is reported for January.

Regional contribution:

`Region revenue ÷ Total revenue`

---

## 2. Overall performance (Completed)

| Metric | Value |
|---|---:|
| Total revenue | KES 1,558,000 |
| Total COGS | KES 1,064,000 |
| Gross profit | KES 494,000 |
| Gross profit margin | 31.71% |
| Completed orders | 21 |
| Units sold | 50 |
| AOV | KES 74,190 |
| ASP per unit | KES 31,160 |
| Returned orders | 2 |
| Cancelled orders | 1 |
| Order return rate | 8.33% |

Returned list value (not in revenue): order 1006 KES 60,000 + order 1022 KES 30,000 = KES 90,000.  
Cancelled list value (not in revenue): order 1014 KES 50,000.

---

## 3. Time-based (Completed)

| Month | Revenue | COGS | Gross profit | Margin | Orders | Units | MoM revenue |
|---|---:|---:|---:|---:|---:|---:|---:|
| January 2026 | 484,000 | 333,000 | 151,000 | 31.20% | 7 | 16 | — |
| February 2026 | 460,000 | 311,000 | 149,000 | 32.39% | 6 | 17 | −4.96% |
| March 2026 (to 25th) | 614,000 | 420,000 | 194,000 | 31.60% | 8 | 17 | +33.48% |
| **Q1 observed** | **1,558,000** | **1,064,000** | **494,000** | **31.71%** | **21** | **50** | — |

Best month by revenue and profit: March.  
Worst month by revenue and profit: February.

January also contains returned order 1006. February contains cancelled order 1014. March contains returned order 1022. Those rows are excluded from the table above.

---

## 4. Regional (Completed)

| Region | Revenue | Profit | Margin | Orders | Units | Share of revenue | AOV |
|---|---:|---:|---:|---:|---:|---:|---:|
| Nairobi | 612,000 | 192,000 | 31.37% | 8 | 20 | 39.28% | 76,500 |
| Mombasa | 396,000 | 124,000 | 31.31% | 5 | 12 | 25.42% | 79,200 |
| Kisumu | 290,000 | 100,000 | 34.48% | 4 | 11 | 18.61% | 72,500 |
| Nakuru | 260,000 | 78,000 | 30.00% | 4 | 7 | 16.69% | 65,000 |

Highest revenue, profit, orders and units: Nairobi.  
Lowest revenue, profit and AOV: Nakuru.  
Highest margin: Kisumu.

Non-completed: Nairobi has 1 return; Kisumu has 1 return; Nakuru has 1 cancellation; Mombasa has none.

---

## 5. Product and category (Completed)

Unit economics are identical on every row of a SKU.

| Product | Unit price | Unit cost | Unit profit | Unit margin | Units | Revenue | Profit | Orders | Revenue share |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Laptop | 75,000 | 55,000 | 20,000 | 26.67% | 7 | 525,000 | 140,000 | 5 | 33.70% |
| Phone | 30,000 | 21,000 | 9,000 | 30.00% | 12 | 360,000 | 108,000 | 4 | 23.11% |
| Desk | 35,000 | 22,000 | 13,000 | 37.14% | 8 | 280,000 | 104,000 | 4 | 17.97% |
| Tablet | 25,000 | 17,000 | 8,000 | 32.00% | 9 | 225,000 | 72,000 | 4 | 14.44% |
| Office Chair | 12,000 | 7,000 | 5,000 | 41.67% | 14 | 168,000 | 70,000 | 4 | 10.78% |

| Category | Revenue | Profit | Margin | Orders | Units | Revenue share |
|---|---:|---:|---:|---:|---:|---:|
| Electronics | 1,110,000 | 320,000 | 28.83% | 13 | 28 | 71.25% |
| Furniture | 448,000 | 174,000 | 38.84% | 8 | 22 | 28.75% |

Most profitable product by gross profit: **Laptop** (KES 140,000).  
Highest-selling product by units: **Office Chair** (14).  
Highest-selling product by revenue: **Laptop** (KES 525,000).  
Highest unit margin: **Office Chair** (41.67%).  
Thinnest unit margin: **Laptop** (26.67%).

Phones: 6 orders in the source, 4 completed, 2 returned (33.33% of phone orders).  
Tablets: 5 orders, 4 completed, 1 cancelled.

---

## 6. Customer type (Completed)

`Customer Type` is not a unique customer identifier. These are order-mix statistics, not retention or LTV.

| Segment | Completed orders | Revenue | Profit | Margin | AOV | Units | Share of revenue |
|---|---:|---:|---:|---:|---:|---:|---:|
| New | 10 | 658,000 | 215,000 | 32.67% | 65,800 | 21 | 42.23% |
| Returning | 11 | 900,000 | 279,000 | 31.00% | 81,818 | 29 | 57.77% |

All-status counts: New 11 (including cancelled 1014); Returning 13 (including returned 1006 and 1022).

---

## 7. Dashboard filter behaviour

Filters (month, region, category, product) are combined with AND.

1. Restrict the 24 source rows to those matching every selected filter.
2. Compute revenue, COGS, profit, units, AOV, ASP from the Completed rows inside that set.
3. Compute return/cancel counts and the status chart from all matching rows.
4. Charts use the same filtered set as the KPI cards.
5. Reset restores all filters to “all”.

Empty intersection example: Nakuru + Office Chair → 0 completed orders → KPIs show zero, charts empty, empty-state message shown.
