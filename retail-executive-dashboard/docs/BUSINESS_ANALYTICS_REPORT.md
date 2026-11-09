# Business analytics report

**Company:** Kenyan multi-region retail (Nairobi, Mombasa, Kisumu, Nakuru)  
**Period:** 5 January 2026 – 25 March 2026  
**Source:** 24 order records (Order IDs 1001–1024)  
**Audience:** Executive management  

Throughout this report:

- **Observation** is a fact taken from the file.
- **Interpretation** is judgement about what that fact may mean. It is not additional data.
- **Recommendation** is an action. Each recommendation in section 10 cites a finding.

Recognised sales use **Completed** orders only. See `DATA_QUALITY_AND_PREPARATION.md` for treatment of returns and cancellations.

---

## 1. Executive summary

**Observation.** Twenty-one completed orders produced **KES 1,558,000** revenue, **KES 1,064,000** cost of goods, and **KES 494,000** gross profit (**31.71%** margin). Fifty units were sold. Average order value is **KES 74,190**. Two orders were returned (both phones) and one was cancelled (Nakuru tablets). Nairobi accounts for **39.28%** of recognised revenue. Electronics account for **71.25%**. March is the strongest month (**KES 614,000**); February is the weakest (**KES 460,000**, **−4.96%** versus January).

**Interpretation.** The business is gross-profitable on the observed sample, but results are concentrated in one city and one category. The February dip is a mix issue (laptop revenue fell from KES 225,000 to KES 75,000), not a collapse in unit volume (units rose from 16 to 17). Phone returns are the only reverse-logistics events in the file and they sit on returning-customer orders.

**Headline for management.** Protect phone quality, recover Nakuru conversion, and use furniture’s higher margin to offset laptop’s thin 26.67% unit margin — without starving the electronics volume that currently carries the top line.

---

## 2. Data quality findings

The source file is complete, internally consistent, and small.

**Observation.** No missing values, no duplicate Order IDs, no conflicting product–category pairs, no negative quantities or costs. Each SKU has a single list price and a single unit cost in every city and month. Status has three clean values.

**Interpretation.** There is nothing to “clean” in the usual sense. The analytical risk is not dirty data; it is **thin data**. Twenty-four rows cannot support seasonality claims, promotional lift, or true customer retention. `Customer Type` is a label on an order, not a person ID.

**Assumptions that affect the numbers**

1. Only Completed orders are recognised sales.
2. Returned and cancelled list values are not booked as revenue or as negative revenue.
3. Profit is product gross profit (price − cost). Operating costs are absent.
4. March is observed through 25 March 2026 only.

Detail: `DATA_QUALITY_AND_PREPARATION.md`.

---

## 3. Key performance indicators

| KPI | Value | Notes |
|---|---:|---|
| Total revenue | KES 1,558,000 | Completed only |
| Total COGS | KES 1,064,000 | Completed only |
| Gross profit | KES 494,000 | Revenue − COGS |
| Gross profit margin | 31.71% | 494,000 ÷ 1,558,000 |
| Completed orders | 21 | Of 24 total |
| Units sold | 50 | Completed only |
| Average order value | KES 74,190 | 1,558,000 ÷ 21 |
| Average selling price / unit | KES 31,160 | 1,558,000 ÷ 50 |
| Returned orders | 2 | IDs 1006, 1022 |
| Cancelled orders | 1 | ID 1014 |
| Order return rate | 8.33% | 2 ÷ 24 |
| Completion rate | 87.50% | 21 ÷ 24 |

Supporting indicators that are **not** historical comparisons: furniture margin 38.84% versus electronics 28.83%; returning-labelled orders contribute 57.77% of revenue.

Formulas: `KPI_CALCULATION_REFERENCE.md`.

---

## 4. Sales performance findings

### 4.1 Overall

**Observation.** Gross margin on completed sales is 31.71%. Every SKU sells above cost, so there is no loss-making product in the file. Spread between SKUs is wide: office chairs 41.67% unit margin, laptops 26.67%.

**Interpretation.** The company makes money on the basket, but the mix that produces revenue (laptops and phones) is not the mix that produces the best percentage margin (chairs and desks).

### 4.2 Time

| Month | Revenue | Profit | Completed orders | Units | MoM revenue |
|---|---:|---:|---:|---:|---:|
| January | 484,000 | 151,000 | 7 | 16 | — (no prior month) |
| February | 460,000 | 149,000 | 6 | 17 | −4.96% |
| March (to 25th) | 614,000 | 194,000 | 8 | 17 | +33.48% |

**Observation.** February is the worst month on revenue and profit. March is the best. Unit volume did not fall in February.

**Observation.** Laptop revenue by month: January KES 225,000 (3 units) → February KES 75,000 (1 unit) → March KES 225,000 (3 units). Phone revenue moved the other way: 90,000 → 180,000 → 90,000.

**Interpretation.** The February revenue dip is explained by a lighter laptop mix, not by fewer units overall. If the cancelled Nakuru tablet (order 1014, list value KES 50,000) had completed, February recognised revenue would have been KES 510,000, which would have been **higher** than January. That counterfactual is not a result; it only shows that one cancellation is large relative to a six-order month.

**Observation.** Monthly gross margin: January 31.20%, February 32.39%, March 31.60%. February’s mix was slightly richer on percentage margin while poorer on shillings.

No year-on-year or prior-quarter growth is reported. Those periods are not in the file.

### 4.3 Order status

**Observation.** 21 completed, 2 returned, 1 cancelled. Both returns are phones sold to returning customers (Nairobi 18 January, 2 units, list KES 60,000; Kisumu 19 March, 1 unit, list KES 30,000). The cancellation is a new-customer tablet in Nakuru (17 February, 2 units, list KES 50,000).

**Interpretation.** Reverse logistics in this sample is a phone problem, not a general quality problem. Cancellation is a Nakuru conversion problem on a single ticket that equals 19% of Nakuru’s recognised revenue.

---

## 5. Regional performance

| Region | Revenue | Profit | Margin | Orders | Units | Revenue share | AOV | Exceptions |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Nairobi | 612,000 | 192,000 | 31.37% | 8 | 20 | 39.28% | 76,500 | 1 return (phone) |
| Mombasa | 396,000 | 124,000 | 31.31% | 5 | 12 | 25.42% | 79,200 | None |
| Kisumu | 290,000 | 100,000 | 34.48% | 4 | 11 | 18.61% | 72,500 | 1 return (phone) |
| Nakuru | 260,000 | 78,000 | 30.00% | 4 | 7 | 16.69% | 65,000 | 1 cancellation (tablet) |

**Observation.** Nairobi is the largest region on revenue, profit, orders and units. Nakuru is the smallest on revenue, profit, units and AOV. Kisumu has the highest margin. Mombasa has the highest AOV and a 5/5 completion record.

**Observation.** Completed product mix is not the same in every city:

- Nairobi: all five SKUs, led by laptops (KES 225,000).
- Mombasa: all five SKUs.
- Kisumu: no completed phones (the only Kisumu phone order was returned); desks are the revenue lead (KES 105,000).
- Nakuru: no completed tablets (cancelled) and no office chairs at all.

**Interpretation.** Kisumu’s margin lead is consistent with a heavier furniture mix (desk + chair = KES 165,000 of KES 290,000, or 56.9%). Nairobi’s scale comes from electronics, especially laptops. Nakuru’s assortment in this quarter is narrow.

**Interpretation.** With four to eight completed orders per city, rank order can move on a single laptop sale. Regional “winners” should be read as a description of this sample, not as a proven run-rate.

---

## 6. Product and category performance

### 6.1 Category

**Observation.** Electronics: KES 1,110,000 revenue (71.25%), KES 320,000 profit, 28.83% margin, 13 orders, 28 units. Furniture: KES 448,000 revenue (28.75%), KES 174,000 profit, 38.84% margin, 8 orders, 22 units.

**Interpretation.** Electronics fund the top line. Furniture funds the percentage margin. A shilling of furniture gross profit is “cheaper” in revenue terms than a shilling of electronics gross profit.

### 6.2 Product

**Observation.** Laptops are first on revenue (KES 525,000, 33.70%) and first on gross profit shillings (KES 140,000) but last on unit margin (26.67%). Office chairs are first on units (14) and first on unit margin (41.67%) but last on revenue (KES 168,000). Phones are second on revenue (KES 360,000) and the only SKU with returns. Desks combine solid revenue (KES 280,000) with 37.14% unit margin. Tablets are mid-pack and include the only cancellation.

**Products requiring management attention**

1. **Phone** — 2 of 6 orders returned (33.33%). Only returned SKU in the file.
2. **Laptop** — revenue concentration with the thinnest margin.
3. **Tablet in Nakuru** — the cancelled order is the entire Nakuru tablet story in Q1.
4. **Office Chair in Nakuru** — zero orders. Highest-margin SKU is absent from the weakest region.

---

## 7. Customer behaviour

Unique customers are not identifiable. No retention rate and no lifetime value are stated.

**Observation.** Completed orders labelled Returning: 11 orders, KES 900,000 (57.77% of revenue), AOV KES 81,818. Completed orders labelled New: 10 orders, KES 658,000 (42.23%), AOV KES 65,800.

**Observation.** Both returned orders are Returning. The cancelled order is New.

**Observation.** Returning AOV is higher in every month in this file (January 78,667 vs 62,000; February 81,250 vs 67,500; March 84,750 vs 68,750).

**Interpretation.** Orders tagged Returning are larger tickets on average, driven in part by laptops (orders 1001, 1016, 1023). That is a basket-mix fact, not evidence that named individuals are loyal. The two returns on Returning phone orders are a service risk: the file’s reverse logistics hits the higher-AOV label group.

Purchasing patterns visible in the file:

- New-customer completed mix includes the only Kisumu laptop, both Nairobi new furniture/electronics tickets, Nakuru’s desk and a phone, and Mombasa phones/tablets.
- Returning-customer completed mix includes the two-unit laptop orders (Nairobi January, Mombasa March).

---

## 8. Identified business risks

1. **Geographic concentration.** Nairobi is 39.28% of revenue. A Nairobi-specific disruption moves the company result.
2. **Category and SKU concentration.** Electronics 71.25% of revenue; laptops alone 33.70%, at the lowest unit margin.
3. **Phone returns.** One-third of phone orders reverse. If that rate persisted at scale, phone revenue would be unreliable. The sample is six orders; the rate is therefore a signal, not a proven process average.
4. **Nakuru conversion and assortment.** Lowest revenue, lowest AOV, the only cancellation, no chairs, no completed tablets.
5. **Returning-customer returns.** The only two returns sit on Returning phone orders. If “Returning” implies a relationship, those reversals are reputational as well as operational.
6. **Sample size and March cut-off.** Twenty-four transactions. March ends on the 25th in the file. Rankings can flip on one laptop.
7. **No operating-cost view.** Gross profit can look healthy while delivery, rent, and after-sales (especially phone returns) consume it. Those costs are not in the file.

---

## 9. Opportunities for improvement

1. **Furniture attach.** Chairs and desks have 41.67% and 37.14% unit margins. Nairobi already sells both; Nakuru does not sell chairs in this file.
2. **Close or recycle cancelled demand.** Order 1014 is KES 50,000 of tablet intent in Nakuru — material against Nakuru’s KES 260,000 completed revenue.
3. **Copy Mombasa fulfilment.** Mombasa is the only region with zero returns and zero cancellations in the sample (5/5 completed).
4. **March commercial pattern.** March delivered KES 614,000 with recovered laptop volume and stronger desk volume (KES 175,000). Stock and staffing for that mix is a concrete lever, acknowledging the month is truncated at the 25th.
5. **Laptop basket margin.** Keep laptop volume (it is the revenue engine) but attach furniture or higher-margin accessories so the 26.67% unit margin is not the whole ticket.

---

## 10. Five actionable recommendations

Each recommendation starts from a finding in this file.

### Recommendation 1 — Run a phone-quality and after-sales review in Nairobi and Kisumu

**Finding.** Orders 1006 and 1022 are the only returns. Both are phones; both are Returning customers; together they are 2 of 6 phone orders (33.33%) and KES 90,000 of reversed list value.

**Action.** Inspect fulfilment, packaging, and defect handling for phones in Nairobi and Kisumu. Record a return reason on every future reverse (the current file has none). Do not expand phone promotions until the next 20 phone orders show a return rate closer to the rest of the range (0 of 18 non-phone orders returned).

### Recommendation 2 — Recover Nakuru’s cancelled tablet demand and put chairs on the floor

**Finding.** Nakuru is last on revenue (KES 260,000, 16.69%) and AOV (KES 65,000). Order 1014 cancelled KES 50,000 of tablets. Completed Nakuru sales include no tablets and no office chairs — the highest-margin SKU in the catalogue.

**Action.** Follow up the 17 February cancellation. Trial office chairs in Nakuru (the SKU sold 14 units elsewhere at 41.67% unit margin). Review why Nakuru tickets average 1.75 units versus 2.4–2.75 in the other cities.

### Recommendation 3 — Use furniture to lift blended margin without cutting electronics range

**Finding.** Furniture margin is 38.84% versus electronics 28.83%. Office chairs are the volume leader (14 units) and margin leader, yet only 10.78% of revenue. Desks already contribute KES 104,000 profit, close to phones (KES 108,000) on less return risk.

**Action.** Bundle desk + chair in Nairobi, Mombasa and Kisumu, where both SKUs already sell. Keep electronics listed; this is mix management, not a category exit.

### Recommendation 4 — Treat laptop cost and attach as a margin project

**Finding.** Laptops generated KES 525,000 (33.70% of revenue) and KES 140,000 profit, but only 26.67% unit margin — the lowest of the five SKUs. February’s revenue drop tracks a fall in laptop units from 3 to 1.

**Action.** Negotiate unit cost or stop unrecorded discounting (none is visible in the file, so cost is the known lever). Attach a chair or desk to laptop tickets so a 26.67% core line is not the whole basket. Maintain laptop availability: the SKU is the top-line engine and March recovered when laptop units returned to 3.

### Recommendation 5 — Standardise on Mombasa’s completion discipline and staff for a March-like mix

**Finding.** Mombasa completed 5 of 5 orders, including all five SKUs, with AOV KES 79,200 (highest). March revenue rose 33.48% month-on-month to KES 614,000 after February’s −4.96%, with desk revenue at KES 175,000 and laptops back at KES 225,000.

**Action.** Document Mombasa pick, pack, and order-confirmation steps and apply them in Nairobi and Kisumu (the return locations) and Nakuru (the cancellation location). Align March inventory to laptops plus desks, which together were KES 400,000 of March’s KES 614,000.

---

## Limitations

- n = 24. Percentages on four-order regions and six-order SKUs move with one ticket.
- No customer IDs, no return reasons, no opex, no tax, no delivery fees, no prior year.
- March observation ends 25 March 2026.
- Filters on the dashboard recompute the same formulas on subsets; they do not create new source data.
