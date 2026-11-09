#!/usr/bin/env python3
"""Independent audit of the Q1 2026 retail file.

This is a second implementation of the recognition rule used by script.js.
It does not import the dashboard. Run: python3 audit.py
"""

from __future__ import annotations

RAW = [
    ("1001", "2026-01-05", "Nairobi", "Laptop", "Electronics", "Returning", 2, 75000, 55000, "Completed"),
    ("1002", "2026-01-07", "Mombasa", "Phone", "Electronics", "New", 3, 30000, 21000, "Completed"),
    ("1003", "2026-01-09", "Nairobi", "Office Chair", "Furniture", "New", 4, 12000, 7000, "Completed"),
    ("1004", "2026-01-12", "Kisumu", "Tablet", "Electronics", "Returning", 2, 25000, 17000, "Completed"),
    ("1005", "2026-01-15", "Nakuru", "Desk", "Furniture", "New", 1, 35000, 22000, "Completed"),
    ("1006", "2026-01-18", "Nairobi", "Phone", "Electronics", "Returning", 2, 30000, 21000, "Returned"),
    ("1007", "2026-01-21", "Mombasa", "Office Chair", "Furniture", "Returning", 3, 12000, 7000, "Completed"),
    ("1008", "2026-01-24", "Kisumu", "Laptop", "Electronics", "New", 1, 75000, 55000, "Completed"),
    ("1009", "2026-02-02", "Nairobi", "Tablet", "Electronics", "Returning", 3, 25000, 17000, "Completed"),
    ("1010", "2026-02-05", "Nakuru", "Phone", "Electronics", "New", 2, 30000, 21000, "Completed"),
    ("1011", "2026-02-08", "Mombasa", "Desk", "Furniture", "Returning", 2, 35000, 22000, "Completed"),
    ("1012", "2026-02-11", "Nairobi", "Laptop", "Electronics", "New", 1, 75000, 55000, "Completed"),
    ("1013", "2026-02-14", "Kisumu", "Office Chair", "Furniture", "Returning", 5, 12000, 7000, "Completed"),
    ("1014", "2026-02-17", "Nakuru", "Tablet", "Electronics", "New", 2, 25000, 17000, "Cancelled"),
    ("1015", "2026-02-20", "Nairobi", "Phone", "Electronics", "Returning", 4, 30000, 21000, "Completed"),
    ("1016", "2026-03-01", "Mombasa", "Laptop", "Electronics", "Returning", 2, 75000, 55000, "Completed"),
    ("1017", "2026-03-04", "Kisumu", "Desk", "Furniture", "New", 3, 35000, 22000, "Completed"),
    ("1018", "2026-03-07", "Nairobi", "Office Chair", "Furniture", "Returning", 2, 12000, 7000, "Completed"),
    ("1019", "2026-03-10", "Nakuru", "Phone", "Electronics", "Returning", 3, 30000, 21000, "Completed"),
    ("1020", "2026-03-13", "Mombasa", "Tablet", "Electronics", "New", 2, 25000, 17000, "Completed"),
    ("1021", "2026-03-16", "Nairobi", "Desk", "Furniture", "New", 2, 35000, 22000, "Completed"),
    ("1022", "2026-03-19", "Kisumu", "Phone", "Electronics", "Returning", 1, 30000, 21000, "Returned"),
    ("1023", "2026-03-22", "Nakuru", "Laptop", "Electronics", "Returning", 1, 75000, 55000, "Completed"),
    ("1024", "2026-03-25", "Nairobi", "Tablet", "Electronics", "New", 2, 25000, 17000, "Completed"),
]

failures = []


def check(name, actual, expected):
    if actual != expected:
        failures.append(f"{name}: got {actual}, expected {expected}")


def money(n):
    return f"{n:,.2f}" if round(n, 2) != round(n) else f"{n:,.0f}"


completed = [r for r in RAW if r[9] == "Completed"]
returned = [r for r in RAW if r[9] == "Returned"]
cancelled = [r for r in RAW if r[9] == "Cancelled"]


def revenue(rows):
    return sum(r[6] * r[7] for r in rows)


def cogs(rows):
    return sum(r[6] * r[8] for r in rows)


def profit(rows):
    return revenue(rows) - cogs(rows)


rev = revenue(completed)
cost = cogs(completed)
gp = profit(completed)
units = sum(r[6] for r in completed)
check("rows", len(RAW), 24)
check("unique ids", len({r[0] for r in RAW}), 24)
check("completed", len(completed), 21)
check("returned", len(returned), 2)
check("cancelled", len(cancelled), 1)
check("revenue", rev, 1_558_000)
check("cogs", cost, 1_064_000)
check("profit", gp, 494_000)
check("units", units, 50)
check("aov", round(rev / 21, 2), 74190.48)
check("asp", rev / 50, 31160)
check("return rate", round(2 / 23 * 100, 2), 8.70)
check("excluded list", revenue(returned) + revenue(cancelled), 140_000)
check("excluded profit", profit(returned) + profit(cancelled), 43_000)
check("all list value", revenue(RAW), 1_698_000)
check("all units", sum(r[6] for r in RAW), 55)

months = {}
for key in ("2026-01", "2026-02", "2026-03"):
    rows = [r for r in completed if r[1].startswith(key)]
    months[key] = (len(rows), sum(r[6] for r in rows), revenue(rows), profit(rows))

check("jan", months["2026-01"], (7, 16, 484_000, 151_000))
check("feb", months["2026-02"], (6, 17, 460_000, 149_000))
check("mar", months["2026-03"], (8, 17, 614_000, 194_000))
check("mom feb", round((460_000 - 484_000) / 484_000 * 100, 2), -4.96)
check("mom mar", round((614_000 - 460_000) / 460_000 * 100, 2), 33.48)

regions = {}
for name in ("Nairobi", "Mombasa", "Kisumu", "Nakuru"):
    rows = [r for r in completed if r[2] == name]
    regions[name] = (len(rows), sum(r[6] for r in rows), revenue(rows), profit(rows))

check("nairobi", regions["Nairobi"], (8, 20, 612_000, 192_000))
check("mombasa", regions["Mombasa"], (5, 12, 396_000, 124_000))
check("kisumu", regions["Kisumu"], (4, 11, 290_000, 100_000))
check("nakuru", regions["Nakuru"], (4, 7, 260_000, 78_000))

nairobi_completed = [r for r in completed if r[2] == "Nairobi"]
check("nairobi electronics", revenue([r for r in nairobi_completed if r[4] == "Electronics"]), 470_000)
check("nairobi furniture", revenue([r for r in nairobi_completed if r[4] == "Furniture"]), 142_000)

products = {}
for name in ("Laptop", "Phone", "Tablet", "Office Chair", "Desk"):
    rows = [r for r in completed if r[3] == name]
    products[name] = (len(rows), sum(r[6] for r in rows), revenue(rows), profit(rows))

check("laptop", products["Laptop"], (5, 7, 525_000, 140_000))
check("phone", products["Phone"], (4, 12, 360_000, 108_000))
check("tablet", products["Tablet"], (4, 9, 225_000, 72_000))
check("chair", products["Office Chair"], (4, 14, 168_000, 70_000))
check("desk", products["Desk"], (4, 8, 280_000, 104_000))

for name, price, cost_each, margin in (
    ("Laptop", 75000, 55000, 26.67),
    ("Phone", 30000, 21000, 30.00),
    ("Tablet", 25000, 17000, 32.00),
    ("Office Chair", 12000, 7000, 41.67),
    ("Desk", 35000, 22000, 37.14),
):
    prices = {(r[7], r[8]) for r in RAW if r[3] == name}
    check(name + " price", prices, {(price, cost_each)})
    check(name + " margin", round((price - cost_each) / price * 100, 2), margin)

elec = [r for r in completed if r[4] == "Electronics"]
furn = [r for r in completed if r[4] == "Furniture"]
check("electronics", (len(elec), sum(r[6] for r in elec), revenue(elec), profit(elec)), (13, 28, 1_110_000, 320_000))
check("furniture", (len(furn), sum(r[6] for r in furn), revenue(furn), profit(furn)), (8, 22, 448_000, 174_000))
check("furniture lines all completed", all(r[9] == "Completed" for r in RAW if r[4] == "Furniture"), True)
check("furniture margin", round(174_000 / 448_000 * 100, 2), 38.84)
check("electronics margin", round(320_000 / 1_110_000 * 100, 2), 28.83)
check("furniture profit share", round(174_000 / 494_000 * 100, 2), 35.22)

new = [r for r in completed if r[5] == "New"]
ret = [r for r in completed if r[5] == "Returning"]
check("new", (len(new), sum(r[6] for r in new), revenue(new), profit(new)), (10, 21, 658_000, 215_000))
check("returning", (len(ret), sum(r[6] for r in ret), revenue(ret), profit(ret)), (11, 29, 900_000, 279_000))
check("returning aov", round(900_000 / 11, 2), 81818.18)
check("new aov", 658_000 / 10, 65800)
check("phone returns", [(r[0], r[2]) for r in returned], [("1006", "Nairobi"), ("1022", "Kisumu")])
check("cancel", [(r[0], r[2], r[3]) for r in cancelled], [("1014", "Nakuru", "Tablet")])

# No returned or cancelled row is a twin of a completed row.
twins = []
for left in returned + cancelled:
    for right in completed:
        if left[1:9] == right[1:9]:
            twins.append((left[0], right[0]))
check("twins", twins, [])

if failures:
    print("FAIL")
    print("\n".join(failures))
    raise SystemExit(1)

print("PASS")
print(f"Revenue {money(rev)}  COGS {money(cost)}  Profit {money(gp)}  Margin {gp / rev * 100:.2f}%")
print(f"Completed {len(completed)}  Units {units}  AOV {rev / 21:,.2f}  ASP {rev / units:,.0f}")
print(f"Return rate {2 / 23 * 100:.2f}%  Excluded list {money(revenue(returned) + revenue(cancelled))}")
