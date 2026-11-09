# Business analytics report

**Company.** A Kenyan retail company selling across Nairobi, Mombasa, Kisumu and Nakuru. No trading name was supplied, so none is invented.

**Period.** 5 January 2026 to 25 March 2026. The file has no earlier year, so there is no year-on-year comparison.

**Population.** 24 orders, IDs 1001 to 1024. This report describes that file. It is not a forecast.

**Money.** Figures are in Kenyan shillings (KES). The file has no currency field. KES is an assumption, made because the company operates in Kenya and the price levels match shilling retail prices. See the data-quality note.

**Recognition.** Revenue, cost, gross profit, units sold and average order value use completed orders only. Two returned orders and one cancelled order are reported separately and are not inside the headline. Gross profit is units times (price minus cost). It is not operating profit.

Labels used below:

- **Observation.** A figure or a count that comes straight from the file.
- **Interpretation.** What that figure suggests, and where the suggestion stops.
- **Recommendation.** An action, collected in section 10, each tied to an observation.

The arithmetic is reproduced in `KPI_CALCULATION_REFERENCE.md` and checked by `audit.py`.

## 1. Executive summary

**Observation.** On completed orders the company recognised KES 1,558,000 of revenue and KES 494,000 of gross profit, a margin of 31.71%. That is 21 orders and 50 units. Average order value is KES 74,190.48. Average selling price is KES 31,160.

**Observation.** Three of the 24 orders are not sales. Two phone orders were returned (list value KES 90,000, gross profit KES 27,000). One tablet order was cancelled (list value KES 50,000, gross profit KES 16,000). The return rate, returned orders divided by completed plus returned, is 2 / 23, or 8.70%.

**Observation.** March is the strongest month, at KES 614,000 of revenue and KES 194,000 of profit. February is the weakest, at KES 460,000, which is 4.96% below January. Nairobi contributes 39.28% of recognised revenue. Nakuru contributes 16.69% and holds the only cancellation. Laptops are the largest revenue line and the largest profit line, and they have the lowest product margin. Office chairs sell the most units and have the highest margin. Furniture earns 35.22% of the profit from 28.75% of the revenue, and every furniture order was completed.

**Interpretation.** The quarter is profitable at product level, concentrated in one city and one low-margin product, and the only repeated operational failure is a phone return. Twenty-four orders is a small book. One laptop order moves the revenue number by KES 75,000 or KES 150,000. Nothing here is a trend beyond these three months.

Management should open the two phone returns first, then the laptop cost, the Nakuru cancellation, the March spike, and a tracked test of selling furniture next to electronics in Nairobi. The actions are in section 10. Each one names the finding it depends on.

## 2. Data quality findings

**Observation.** The file has 24 rows and 10 fields. Order IDs are unique and run from 1001 to 1024 without a gap. No cell is blank. Dates, regions, products, categories, customer types and statuses are spelled consistently. Every product has one price and one cost on every row. Unit price is above unit cost everywhere. Units are positive integers from 1 to 5.

**Observation.** No returned or cancelled row is a copy of a completed row. Excluding those three rows does not also delete a matching sale.

**Interpretation.** The file is clean enough to total. It is not clean enough to explain a return, because there is no reason code, and it is not clean enough to talk about customers as people, because there is no customer identifier. Preparation did not change any value. The only decision was which statuses enter recognised revenue. The full check is in `DATA_QUALITY_AND_PREPARATION.md`.

## 3. Key performance indicators

| KPI | Result | Basis |
|---|---:|---|
| Total revenue | KES 1,558,000 | 21 completed orders |
| Cost of goods sold | KES 1,064,000 | Same 21 |
| Gross profit | KES 494,000 | Revenue minus cost |
| Gross profit margin | 31.71% | 494,000 / 1,558,000 |
| Completed orders | 21 | Status = Completed |
| Total orders in the file | 24 | All statuses |
| Units sold | 50 | Completed orders |
| Average order value | KES 74,190.48 | 1,558,000 / 21 |
| Average selling price | KES 31,160 | 1,558,000 / 50 |
| Returned orders | 2 | Reported, not in revenue |
| Cancelled orders | 1 | Reported, not in revenue |
| Return rate | 8.70% | 2 / 23 fulfilled orders |

**Observation.** List value on the two returns and the cancellation is KES 140,000. List gross profit on those rows is KES 43,000, which is 8.70% of the KES 494,000 that was recognised. That 8.70% is a different ratio from the return rate, which is also 8.70% after rounding. They should not be read as the same measure. One counts orders. The other compares shillings of profit.

## 4. Sales performance

**Observation.** Recognised revenue by month is January KES 484,000, February KES 460,000, March KES 614,000. Gross profit is KES 151,000, KES 149,000 and KES 194,000. Completed orders are 7, 6 and 8. Units sold are 16, 17 and 17.

**Observation.** February revenue is 4.96% below January, a drop of KES 24,000. March revenue is 33.48% above February, a rise of KES 154,000. March against January is (614,000 − 484,000) / 484,000 = 26.86%. Margins stay in a narrow band: 31.20%, 32.39%, 31.60%.

**Observation.** February also contains the only cancellation. March contains one of the two returns. January contains the other return.

**Interpretation.** March is the best month on revenue, profit and completed orders. February is the worst on those three. The margin did not move with the revenue, so the soft month and the strong month are mostly volume, not a change in pricing. The file contains no campaign, staffing or stock field, so the cause of the March rise is not in the data. Calling March the run-rate would be an assumption, not a finding.

**Observation.** The smallest completed order is KES 24,000 (order 1018, two office chairs). The largest is KES 150,000, and it happens twice (orders 1001 and 1016, two laptops each). The median completed order, once the 21 values are sorted, is KES 70,000.

## 5. Regional performance

| Region | Revenue | Share | Profit | Margin | Completed orders | AOV | Other statuses |
|---|---:|---:|---:|---:|---:|---:|---|
| Nairobi | 612,000 | 39.28% | 192,000 | 31.37% | 8 | 76,500 | 1 returned |
| Mombasa | 396,000 | 25.42% | 124,000 | 31.31% | 5 | 79,200 | none |
| Kisumu | 290,000 | 18.61% | 100,000 | 34.48% | 4 | 72,500 | 1 returned |
| Nakuru | 260,000 | 16.69% | 78,000 | 30.00% | 4 | 65,000 | 1 cancelled |

**Observation.** Nairobi is the highest revenue region. Nakuru is the lowest. Mombasa is the only region with every order completed, and it has the highest average order value. Kisumu has the highest margin. Nakuru has the lowest margin, the lowest average order value, and the only cancellation.

**Observation.** Price and cost do not change by city. Nairobi’s KES 612,000 splits into KES 470,000 of electronics and KES 142,000 of furniture. Mombasa’s five completed orders are one of each product. Nakuru’s four completed orders are a desk, two phones and a laptop. Nakuru completed no tablet and no office chair. The cancelled Nakuru order was the tablet.

**Interpretation.** The ranking is a mix ranking. Nakuru does not have a worse price list. It sold a mix with no chairs, which are the highest-margin product, and it lost the one tablet order it recorded. Mombasa’s clean file and higher average order value describe five orders. That is too small a base to call Mombasa an operating model worth copying. It is a contrast, not a method.

## 6. Product and category performance

| Product | Units sold | Revenue | Profit | Margin | Orders outside Completed |
|---|---:|---:|---:|---:|---|
| Laptop | 7 | 525,000 | 140,000 | 26.67% | none |
| Phone | 12 | 360,000 | 108,000 | 30.00% | 2 returned |
| Desk | 8 | 280,000 | 104,000 | 37.14% | none |
| Tablet | 9 | 225,000 | 72,000 | 32.00% | 1 cancelled |
| Office Chair | 14 | 168,000 | 70,000 | 41.67% | none |

**Observation.** By revenue, and by gross profit, the leading product is the laptop. By units, the leading product is the office chair. The chair is also the highest margin, at 41.67%, and the smallest revenue line, at 10.78%. The laptop is 33.70% of revenue and 28.34% of profit, at the lowest margin, 26.67%.

**Observation.** Electronics is 71.25% of revenue (KES 1,110,000) at a 28.83% margin, and 64.78% of profit. Furniture is 28.75% of revenue (KES 448,000) at a 38.84% margin, and 35.22% of profit. All 8 furniture orders were completed. Both returns and the cancellation are electronics.

**Interpretation.** “Highest-selling” depends on the unit. Chairs win units. Laptops win shillings and profit. Treating the chair as a problem because its revenue is small would miss the point: it is the margin and the volume. The product that needs attention is the phone, because it is the only product that was returned, and the laptop, because so much of the profit sits on the thinnest margin. The tablet’s completed business is ordinary (4 orders, 32.00% margin). The attention on tablets is one cancelled order, not the product line.

**Products requiring management attention**

1. Phones. 2 of 6 phone orders were returned, both flagged Returning. Completed phone revenue of KES 360,000 should not be read as demand for every phone that left the building. Three returned units, list value KES 90,000, never became revenue.
2. Laptops. They pay for the quarter, and they dilute the margin. Attention here means a cost check, not a delisting.
3. The cancelled Nakuru tablet. One order, not a tablet-range failure.

Desks and chairs do not show a failure in this file.

## 7. Customer behaviour

**Observation.** On completed orders, Returning contributes KES 900,000 (57.77%) across 11 orders, and New contributes KES 658,000 (42.23%) across 10 orders. Average order value is KES 81,818.18 against KES 65,800. Units per order are 2.64 against 2.10. Average selling price is KES 31,034.48 against KES 31,333.33. Returning margin is 31.00%. New margin is 32.67%.

**Observation.** Both returns are flagged Returning, and both are phones. The cancellation is flagged New, and it is a tablet. Of 4 phone orders flagged Returning, 2 were returned. Both phone orders flagged New were completed.

**Interpretation.** Returning orders are larger because they contain more units, not because they buy a richer price mix. The selling prices are within about 1% of each other. A higher average order value is not evidence of loyalty. The file has no customer identifier, so a person cannot be followed from one order to the next. Retention and lifetime value are not known, and they are not estimated here.

**Interpretation.** The returns sit on the Returning flag, but two orders are not a segment. It is a place to look: the phone, sold to a customer the file calls returning. It is not a finding that returning customers in general send products back.

## 8. Business risks

**Observation, then the risk it supports.**

1. **Concentration.** Nairobi is 39.28% of revenue. Laptops are 33.70%. A problem in one city, or in one SKU, moves the company number. The book is 24 orders, so the concentration is not smoothed by scale.
2. **Phone returns, on a sample of two.** The pattern is real inside this file and weak as a general claim. The risk is acting as if phone revenue is settled, or inventing a cause the file does not contain.
3. **Margin mix.** The category that produces 71.25% of revenue earns 28.83%. A shift further toward laptops can raise revenue and lower the company margin at the same time. Company margin is 31.71%. Laptop margin is 26.67%.
4. **Orders that do not become sales.** 3 of 24 rows, 12.50%, contribute nothing to revenue. List value KES 140,000. List profit KES 43,000. That is the size of the leak in this quarter, not a prediction of the next one.
5. **Gross profit is not the profit that can be spent.** No rent, wages, tax, delivery or payment fee is in the file. A 31.71% product margin can still be a weak business once those costs appear.
6. **Missing keys.** No customer id, no return reason, no discount field. A decision that needs one of those cannot be taken from this close alone.

## 9. Opportunities

These are readings of the file, not expected gains. Section 10 turns the ones that justify an action into recommendations.

**Observation.** Returned phones represent KES 27,000 of gross profit that was not recognised, and the cancelled tablets represent KES 16,000. **Interpretation.** If either failure was avoidable, that is the upper bound of the product profit those rows could have added, at the prices and costs in the file. It is not cash already lost in a measured way, because a return can also avoid a later warranty cost this file cannot see.

**Observation.** Furniture’s margin is 10.01 percentage points above electronics. **Interpretation.** On a pure mix calculation, KES 100,000 of revenue earned at the furniture margin instead of the electronics margin is about KES 10,010 more gross profit. That is arithmetic (100,000 × (174,000 / 448,000 − 320,000 / 1,110,000) = 10,010.46). It is not evidence that the demand exists. Nairobi is the place the test is most relevant, because KES 470,000 of its KES 612,000 is already electronics, next to only KES 142,000 of furniture.

**Observation.** Mombasa completed every order it recorded. **Interpretation.** Worth asking what that counter did differently. Not worth writing a process manual from five orders.

## 10. Recommendations

Ordered by what to open first: the repeated leak, the largest cost question, the thinnest region, the planning risk, then the mix test.

### 1. Review the two phone returns before reordering handsets

**Finding.** The only returned orders are 1006 (Nairobi, 18 January, returning customer, 2 phones, list value KES 60,000, gross profit KES 18,000) and 1022 (Kisumu, 19 March, returning customer, 1 phone, list value KES 30,000, gross profit KES 9,000). That is 2 of 6 phone orders, and 2 of 4 phone orders placed by returning customers. Both phone orders from new customers were completed. No other product was returned. The file has no reason code.

**Action.** Read the fault and handover notes on 1006 and 1022 before the next phone purchase. Do not guess the cause from this file. Add a reason code to any future return so the next close can separate a defect from a change of mind.

### 2. Keep laptops, and review the KES 55,000 unit cost

**Finding.** Laptops bring in KES 525,000 of revenue, 33.70% of recognised revenue, and KES 140,000 of gross profit, more than any other product. The margin is 26.67%, the lowest of the five products, against a company margin of 31.71%. Unit price is KES 75,000 and unit cost is KES 55,000 in every region and every month.

**Action.** Ask procurement to confirm the unit cost and whether a lower cost is available. Do not drop the line to chase a higher margin: it is the main profit pool. A price increase is not supported here. The file has no lost sales and no competitor prices.

### 3. Follow up the Nakuru tablet cancellation, and do not cut the city

**Finding.** Nakuru has the lowest recognised revenue, KES 260,000 (16.69%), the lowest gross margin, 30.00%, and the lowest average order value, KES 65,000, from 4 completed orders. It is the only region with a cancellation: order 1014 on 17 February, a new customer, 2 tablets, list value KES 50,000 and unrealised gross profit of KES 16,000. Nakuru completed no tablet and no office chair in the quarter.

**Action.** Find out why 1014 was cancelled, including whether the stock was available. Four completed orders are too few to justify leaving the city, and enough to justify a stock and follow-up check.

### 4. Explain March before using it as the run-rate

**Finding.** Recognised revenue went from KES 484,000 in January to KES 460,000 in February, a fall of 4.96%, then to KES 614,000 in March, a rise of 33.48% on February. February had 6 completed orders, the fewest, and it contains the only cancellation. March had 8 completed orders and the highest profit, KES 194,000, and it also contains one phone return.

**Action.** Match February and March to staffing, stock and any campaign records before setting the second-quarter buy. Those causes are not in this file. Do not plan the next quarter as if March repeats, and do not treat February as a collapse in demand.

### 5. Offer furniture with electronics in Nairobi

**Finding.** Furniture earned a 38.84% gross margin and 35.22% of gross profit from 28.75% of recognised revenue. All 8 furniture orders were completed. Electronics earned a 28.83% margin and produced both returns and the cancellation. Of Nairobi recognised revenue of KES 612,000, KES 470,000 was electronics and KES 142,000 was furniture.

**Action.** In Nairobi, offer a desk or a chair with a laptop or a phone, and record whether the attachment is accepted. The margin gap is in this file. Acceptance is not. Run it as a tracked test, not as a permanent assortment change.

## What this report does not say

It does not say that returning customers are loyal, that Mombasa has a better process, that phones are defective, that Nakuru should be closed, or that March will repeat. Those would be stories pasted onto 24 orders. The orders support the five actions above, and they support stopping there.
