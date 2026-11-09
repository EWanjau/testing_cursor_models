# Data quality and preparation

**Dataset:** 24 retail order records, 5 January 2026 – 25 March 2026  
**Markets:** Nairobi, Mombasa, Kisumu, Nakuru  
**Currency:** Kenyan shillings (KES)

No values in the source table were altered. Derived fields used for analysis are documented below.

---

## 1. Structure and available fields

| Field | Type in source | Role |
|---|---|---|
| Order ID | Integer (1001–1024) | Unique transaction identifier |
| Date | ISO date (`YYYY-MM-DD`) | Transaction date; month derived as `YYYY-MM` |
| Region | Text | Branch / city |
| Product | Text | SKU name |
| Category | Text | Product family |
| Customer Type | Text | `New` or `Returning` (order-level label, not a customer ID) |
| Units | Integer | Quantity |
| Unit Price | Integer (KES) | Selling price per unit |
| Unit Cost | Integer (KES) | Cost of goods per unit |
| Status | Text | `Completed`, `Returned`, or `Cancelled` |

**Derived fields (computed, not stored in the source):**

- `Revenue` = Units × Unit Price
- `COGS` = Units × Unit Cost
- `Gross profit` = Revenue − COGS
- `Gross profit margin` = Gross profit ÷ Revenue
- `Month` = first seven characters of Date (`2026-01`, `2026-02`, `2026-03`)

---

## 2. Completeness, duplicates, and consistency

| Check | Result |
|---|---|
| Row count | 24 |
| Missing values | None. Every cell is populated. |
| Duplicate Order IDs | None. IDs 1001–1024 are unique and sequential. |
| Duplicate full-row records | None. |
| Date validity | All dates parse as calendar dates in Q1 2026. Range: 2026-01-05 to 2026-03-25. Chronological order matches Order ID order. |
| Region values | Only the four expected cities. No spelling variants (e.g. “Nrb”, “Msa”). |
| Product values | Laptop, Phone, Tablet, Office Chair, Desk. No aliases. |
| Category values | Electronics, Furniture. |
| Product–category mapping | Stable: Laptop/Phone/Tablet → Electronics; Office Chair/Desk → Furniture. No conflicting mappings. |
| Customer Type | Only `New` and `Returning`. |
| Status | Only `Completed` (21), `Returned` (2), `Cancelled` (1). |
| Units | All positive integers (1–5). No zeros or negatives. |
| Unit Price and Unit Cost | All positive. Price > Cost on every row. Each SKU has a single price and a single cost across all rows. |
| Price list (constant per SKU) | Laptop 75,000 / 55,000; Phone 30,000 / 21,000; Tablet 25,000 / 17,000; Office Chair 12,000 / 7,000; Desk 35,000 / 22,000. |

No invalid, out-of-range, or structurally unusual values were found.

---

## 3. Evaluation of the Status field

Status is the control field for revenue recognition.

| Status | Count | Order IDs | Meaning used in this analysis |
|---|---:|---|---|
| Completed | 21 | All except 1006, 1014, 1022 | Order fulfilled. Revenue and COGS recognised. |
| Returned | 2 | 1006 (Nairobi Phone, 2 units), 1022 (Kisumu Phone, 1 unit) | Order was placed and later reversed. Not recognised as sales revenue. |
| Cancelled | 1 | 1014 (Nakuru Tablet, 2 units) | Order did not complete. Not recognised as sales revenue. |

The dataset does not say whether a returned order was refunded, restocked, damaged, or exchanged. It also does not say whether a cancelled order failed before payment or after reservation of stock.

---

## 4. Treatment of returned and cancelled orders

**Rule used for recognised sales:** only `Completed` orders enter total revenue, COGS, gross profit, units sold, average order value, and average selling price.

**Returned orders**

- Excluded from recognised revenue and profit.
- Counted in operational metrics: returned-order count and return rate.
- Listed in the dashboard exceptions table.
- Not treated as negative revenue (no “returns provision” line exists in the source).
- Not treated as completed-then-reversed in the P&L, because the source gives a single status, not a two-step history.

**Cancelled orders**

- Excluded from recognised revenue and profit.
- Counted separately from returns (cancellation is not a return).
- The cancelled tablet in Nakuru (order 1014, KES 50,000 list value) is treated as unrealised demand, not as a sale.

**Why this treatment**

Completed is the only status that indicates a finished commercial transaction. Including returns or cancellations in revenue would overstate performance. Subtracting them as negative sales would require a refund/restocking ledger that is not in the file.

**Return rate definition**

- Primary: Returned orders ÷ All orders = 2 ÷ 24 = **8.33%**.
- Alternative (shipped-only): Returned ÷ (Completed + Returned) = 2 ÷ 23 = **8.70%**. This treats cancelled orders as never shipped.
- SKU-specific (phones): 2 ÷ 6 phone orders = **33.33%**.

The dashboard and report use 8.33% as the headline order return rate and state the denominator. They also report the phone-specific rate because both returns are phones.

---

## 5. Assumptions

1. Currency is KES. The source does not name a currency; the business scenario is Kenyan retail.
2. Unit Price and Unit Cost are exclusive of VAT, shipping, discounts, and operating expenses. Profit in this pack is **gross profit on product**, not operating profit or net profit.
3. One row = one order. There are no multi-line baskets.
4. `Customer Type` is an attribute of the order, not a unique person. The same human could appear more than once, or never. Retention rate and customer lifetime value are therefore **not** calculated.
5. Status is mutually exclusive and final. The file does not contain partial fulfilments.
6. Constant SKU prices mean the file cannot reveal promotions, markdowns, or regional price differences.
7. The last observed date is 25 March 2026. Activity after that date is unknown. March figures are “month-to-25 March”, not a proven full calendar month.
8. No inflation, FX, or seasonality adjustments. Prior-year data is not supplied, so no year-on-year comparison is made.
9. Dashboard filters apply to the 24 source rows first; revenue KPIs are then computed on the Completed subset of that filtered set. Status charts include returned and cancelled rows that still match the filters.

---

## 6. What was not changed

- No rows were dropped.
- No values were imputed.
- No outliers were winsorised. The largest line (order 1001 / 1016, KES 150,000) is a two-unit laptop sale at the standard list price.
- Region, product, and status labels were not recoded.

Cleaning, in this case, is **classification and derived-field creation**, not repair of defective data.
