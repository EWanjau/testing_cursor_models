# Data quality and preparation

The analysis uses the 24-order file supplied with the brief. No row was deleted, edited, or imputed. The dashboard loads those 24 rows and calculates from them.

## 1. Structure

Each row is one order. The fields are:

| Field | Role in this file |
|---|---|
| Order ID | Identity of the row. Values run from 1001 to 1024. |
| Date | Order date, written YYYY-MM-DD. |
| Region | Nairobi, Mombasa, Kisumu or Nakuru. |
| Product | Laptop, Phone, Tablet, Office Chair or Desk. |
| Category | Electronics or Furniture. |
| Customer Type | New or Returning. This is a flag on the order, not a person. |
| Units | Quantity on the order. |
| Unit Price | Price charged per unit, as given. |
| Unit Cost | Product cost per unit, as given. |
| Status | Completed, Returned or Cancelled. |

There is no customer identifier, no store identifier inside a city, no channel, no discount, no tax, no freight, no reason code, and no link from a return to another order.

## 2. Completeness and duplicates

- 24 rows, 24 distinct order IDs. No duplicate IDs.
- IDs are unbroken from 1001 through 1024. That shows no gap inside this numbering. It does not prove the company had no other orders outside the extract.
- No blank cells in any field.
- Every date parses. The earliest is 5 January 2026 and the latest is 25 March 2026. All 24 dates fall inside January, February or March 2026.
- Regions, products, categories, customer types and statuses use one spelling each. There is no “Nbi”, no “complete”, no “Return”.

## 3. Validity

- Units are positive integers, from 1 to 5.
- Unit price and unit cost are positive on every row, and unit price is above unit cost on every row.
- Price and cost do not vary. Each product has one category, one unit price and one unit cost on every row it appears:

| Product | Category | Unit price | Unit cost | Unit profit | Unit margin |
|---|---|---:|---:|---:|---:|
| Laptop | Electronics | 75,000 | 55,000 | 20,000 | 26.67% |
| Phone | Electronics | 30,000 | 21,000 | 9,000 | 30.00% |
| Tablet | Electronics | 25,000 | 17,000 | 8,000 | 32.00% |
| Office Chair | Furniture | 12,000 | 7,000 | 5,000 | 41.67% |
| Desk | Furniture | 35,000 | 22,000 | 13,000 | 37.14% |

- The same price holds in every city and every month. Regional margin gaps later in the report are mix, not a different price list.
- Large line values are quantity times the standard price. Order 1001 is 2 laptops, KES 150,000. Order 1013 is 5 chairs. Neither was treated as an error.
- No returned or cancelled row matches a completed row on date, region, product, category, customer type, units, price and cost. Excluding a return does not also remove a twin that is sitting in the completed set.

## 4. Status

| Status | Rows | Units on those rows | List value (units × price) | List gross profit |
|---|---:|---:|---:|---:|
| Completed | 21 | 50 | 1,558,000 | 494,000 |
| Returned | 2 | 3 | 90,000 | 27,000 |
| Cancelled | 1 | 2 | 50,000 | 16,000 |
| All rows | 24 | 55 | 1,698,000 | 537,000 |

The two returns are both phones, both flagged Returning:

- 1006, Nairobi, 18 January, 2 units, list value KES 60,000, list profit KES 18,000.
- 1022, Kisumu, 19 March, 1 unit, list value KES 30,000, list profit KES 9,000.

The cancellation is 1014, Nakuru, 17 February, new customer, 2 tablets, list value KES 50,000, list profit KES 16,000.

All 8 furniture rows are Completed. Every return and the cancellation are Electronics.

## 5. How returned and cancelled orders are treated

**Completed.** The order is a recognised sale.

- Revenue = units × unit price
- Cost of goods sold = units × unit cost
- Gross profit = revenue − cost
- Units sold includes these units

**Returned.** The row is an order that came back. It is excluded from revenue, cost, profit, units sold and average order value. It is counted in the order total, the status chart and the ledger. List value is reported beside the recognised figures, not inside them.

This treats the return as a full reversal of that order. The file has no partial quantity, no restocking fee and no refund date. There is also no original-order field. Because no completed twin exists, the exclusion does not reverse a sale that is also present as Completed.

**Cancelled.** The order was not fulfilled. It is excluded from recognised sales on the same basis, and it is not called a return. A cancellation never reached the customer, so it does not belong in the return rate.

**Return rate.** Returned orders divided by completed plus returned orders: 2 / 23 = 8.70%. The cancelled order is outside that denominator. As a share of every row in the file, returns are 2 / 24 = 8.33%. Both figures are stated so the definition is not hidden. The dashboard uses 8.70% and labels it “of orders that were not cancelled”.

An alternative that adds the returns into revenue and then subtracts them lands on the same recognised revenue, because they were never included. What this treatment refuses to do is leave KES 90,000 of returned phones, or KES 50,000 of cancelled tablets, inside the headline.

## 6. Assumptions

1. This file is the population for the close. It is not treated as a sample of a larger hidden book, and it is not used to forecast.
2. Unit price is the price actually charged, and unit cost is the product cost. There is no discount column. If a discount was stripped out before the file was produced, this analysis cannot see it.
3. Currency is Kenyan shillings. The file does not say so. The company operates in Kenya, and the price levels (a laptop at 75,000, a phone at 30,000) match shilling retail prices rather than dollar prices. Every figure is labelled KES on that assumption.
4. A Returned status means the whole quantity on that row was returned.
5. A Cancelled status means no revenue was earned and no product cost was incurred.
6. “Returning” describes the order, not a known person. Retention, repeat rate and lifetime value are not calculated.
7. Gross profit is product margin only. It is not operating profit, cash profit or net profit. Tax, freight, salaries, rent and overhead are absent.
8. Order ID sequence is not proof that these 24 rows are every order the company took.

## 7. What was not “cleaned”

Nothing was winsorised, nothing was filled, and no status was reinterpreted. The preparation step is a rule for which rows enter which totals, and that rule is visible on the dashboard: completed orders in the money, returns and the cancellation kept in view.
