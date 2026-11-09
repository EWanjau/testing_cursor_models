/**
 * Retail executive dashboard
 * Recognised revenue and profit: Completed orders only.
 * Filters combine with AND and drive KPIs, charts, insights and exceptions.
 */

const ORDERS = [
  { orderId: 1001, date: "2026-01-05", region: "Nairobi", product: "Laptop", category: "Electronics", customerType: "Returning", units: 2, unitPrice: 75000, unitCost: 55000, status: "Completed" },
  { orderId: 1002, date: "2026-01-07", region: "Mombasa", product: "Phone", category: "Electronics", customerType: "New", units: 3, unitPrice: 30000, unitCost: 21000, status: "Completed" },
  { orderId: 1003, date: "2026-01-09", region: "Nairobi", product: "Office Chair", category: "Furniture", customerType: "New", units: 4, unitPrice: 12000, unitCost: 7000, status: "Completed" },
  { orderId: 1004, date: "2026-01-12", region: "Kisumu", product: "Tablet", category: "Electronics", customerType: "Returning", units: 2, unitPrice: 25000, unitCost: 17000, status: "Completed" },
  { orderId: 1005, date: "2026-01-15", region: "Nakuru", product: "Desk", category: "Furniture", customerType: "New", units: 1, unitPrice: 35000, unitCost: 22000, status: "Completed" },
  { orderId: 1006, date: "2026-01-18", region: "Nairobi", product: "Phone", category: "Electronics", customerType: "Returning", units: 2, unitPrice: 30000, unitCost: 21000, status: "Returned" },
  { orderId: 1007, date: "2026-01-21", region: "Mombasa", product: "Office Chair", category: "Furniture", customerType: "Returning", units: 3, unitPrice: 12000, unitCost: 7000, status: "Completed" },
  { orderId: 1008, date: "2026-01-24", region: "Kisumu", product: "Laptop", category: "Electronics", customerType: "New", units: 1, unitPrice: 75000, unitCost: 55000, status: "Completed" },
  { orderId: 1009, date: "2026-02-02", region: "Nairobi", product: "Tablet", category: "Electronics", customerType: "Returning", units: 3, unitPrice: 25000, unitCost: 17000, status: "Completed" },
  { orderId: 1010, date: "2026-02-05", region: "Nakuru", product: "Phone", category: "Electronics", customerType: "New", units: 2, unitPrice: 30000, unitCost: 21000, status: "Completed" },
  { orderId: 1011, date: "2026-02-08", region: "Mombasa", product: "Desk", category: "Furniture", customerType: "Returning", units: 2, unitPrice: 35000, unitCost: 22000, status: "Completed" },
  { orderId: 1012, date: "2026-02-11", region: "Nairobi", product: "Laptop", category: "Electronics", customerType: "New", units: 1, unitPrice: 75000, unitCost: 55000, status: "Completed" },
  { orderId: 1013, date: "2026-02-14", region: "Kisumu", product: "Office Chair", category: "Furniture", customerType: "Returning", units: 5, unitPrice: 12000, unitCost: 7000, status: "Completed" },
  { orderId: 1014, date: "2026-02-17", region: "Nakuru", product: "Tablet", category: "Electronics", customerType: "New", units: 2, unitPrice: 25000, unitCost: 17000, status: "Cancelled" },
  { orderId: 1015, date: "2026-02-20", region: "Nairobi", product: "Phone", category: "Electronics", customerType: "Returning", units: 4, unitPrice: 30000, unitCost: 21000, status: "Completed" },
  { orderId: 1016, date: "2026-03-01", region: "Mombasa", product: "Laptop", category: "Electronics", customerType: "Returning", units: 2, unitPrice: 75000, unitCost: 55000, status: "Completed" },
  { orderId: 1017, date: "2026-03-04", region: "Kisumu", product: "Desk", category: "Furniture", customerType: "New", units: 3, unitPrice: 35000, unitCost: 22000, status: "Completed" },
  { orderId: 1018, date: "2026-03-07", region: "Nairobi", product: "Office Chair", category: "Furniture", customerType: "Returning", units: 2, unitPrice: 12000, unitCost: 7000, status: "Completed" },
  { orderId: 1019, date: "2026-03-10", region: "Nakuru", product: "Phone", category: "Electronics", customerType: "Returning", units: 3, unitPrice: 30000, unitCost: 21000, status: "Completed" },
  { orderId: 1020, date: "2026-03-13", region: "Mombasa", product: "Tablet", category: "Electronics", customerType: "New", units: 2, unitPrice: 25000, unitCost: 17000, status: "Completed" },
  { orderId: 1021, date: "2026-03-16", region: "Nairobi", product: "Desk", category: "Furniture", customerType: "New", units: 2, unitPrice: 35000, unitCost: 22000, status: "Completed" },
  { orderId: 1022, date: "2026-03-19", region: "Kisumu", product: "Phone", category: "Electronics", customerType: "Returning", units: 1, unitPrice: 30000, unitCost: 21000, status: "Returned" },
  { orderId: 1023, date: "2026-03-22", region: "Nakuru", product: "Laptop", category: "Electronics", customerType: "Returning", units: 1, unitPrice: 75000, unitCost: 55000, status: "Completed" },
  { orderId: 1024, date: "2026-03-25", region: "Nairobi", product: "Tablet", category: "Electronics", customerType: "New", units: 2, unitPrice: 25000, unitCost: 17000, status: "Completed" },
];

const REGIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];
const PRODUCTS = ["Laptop", "Phone", "Tablet", "Office Chair", "Desk"];
const CATEGORIES = ["Electronics", "Furniture"];
const CUSTOMER_TYPES = ["New", "Returning"];
const STATUSES = ["Completed", "Returned", "Cancelled"];
const MONTHS = ["2026-01", "2026-02", "2026-03"];
const MONTH_LABELS = {
  "2026-01": "January 2026",
  "2026-02": "February 2026",
  "2026-03": "March 2026",
};

const PRODUCT_CATEGORY = {
  Laptop: "Electronics",
  Phone: "Electronics",
  Tablet: "Electronics",
  "Office Chair": "Furniture",
  Desk: "Furniture",
};

const charts = {};
let filters = { month: "all", region: "all", category: "all", product: "all" };

const DATASET = ORDERS.map((order) => {
  const revenue = order.units * order.unitPrice;
  const cogs = order.units * order.unitCost;
  return {
    ...order,
    month: order.date.slice(0, 7),
    revenue,
    cogs,
    grossProfit: revenue - cogs,
  };
});

function formatKES(value) {
  const rounded = Math.round(value);
  const digits = Math.abs(rounded).toLocaleString("en-KE");
  return `${rounded < 0 ? "−" : ""}KES ${digits}`;
}

function formatPct(ratio, digits = 2) {
  if (!Number.isFinite(ratio)) return "—";
  return `${(ratio * 100).toFixed(digits)}%`;
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + row[key], 0);
}

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function themePalette() {
  return {
    ink: cssVar("--ink"),
    muted: cssVar("--muted"),
    line: cssVar("--line"),
    gold: cssVar("--gold"),
    teal: cssVar("--teal"),
    ocean: cssVar("--ocean"),
    rust: cssVar("--rust"),
    wood: cssVar("--wood"),
    slate: cssVar("--slate"),
    raised: cssVar("--raised"),
  };
}

function applyFilters(rows) {
  return rows.filter((row) => {
    if (filters.month !== "all" && row.month !== filters.month) return false;
    if (filters.region !== "all" && row.region !== filters.region) return false;
    if (filters.category !== "all" && row.category !== filters.category) return false;
    if (filters.product !== "all" && row.product !== filters.product) return false;
    return true;
  });
}

function groupCompleted(completed, key, order) {
  return order.map((label) => {
    const rows = completed.filter((row) => row[key] === label);
    const revenue = sum(rows, "revenue");
    const profit = sum(rows, "grossProfit");
    const units = sum(rows, "units");
    return {
      label,
      orders: rows.length,
      units,
      revenue,
      profit,
      margin: revenue ? profit / revenue : null,
    };
  });
}

function summarize(rows) {
  const completed = rows.filter((row) => row.status === "Completed");
  const returned = rows.filter((row) => row.status === "Returned");
  const cancelled = rows.filter((row) => row.status === "Cancelled");
  const revenue = sum(completed, "revenue");
  const cogs = sum(completed, "cogs");
  const profit = revenue - cogs;
  const units = sum(completed, "units");

  const byMonth = MONTHS.map((month) => {
    const monthRows = completed.filter((row) => row.month === month);
    const monthRevenue = sum(monthRows, "revenue");
    const monthProfit = sum(monthRows, "grossProfit");
    return {
      month,
      label: MONTH_LABELS[month],
      orders: monthRows.length,
      units: sum(monthRows, "units"),
      revenue: monthRevenue,
      profit: monthProfit,
    };
  });

  const mom = byMonth.map((item, index) => {
    if (index === 0) return { ...item, mom: null };
    const prev = byMonth[index - 1].revenue;
    return {
      ...item,
      mom: prev ? (item.revenue - prev) / prev : null,
    };
  });

  return {
    rows,
    completed,
    returned,
    cancelled,
    revenue,
    cogs,
    profit,
    margin: revenue ? profit / revenue : null,
    units,
    completedCount: completed.length,
    returnedCount: returned.length,
    cancelledCount: cancelled.length,
    allCount: rows.length,
    aov: completed.length ? revenue / completed.length : null,
    asp: units ? revenue / units : null,
    returnRate: rows.length ? returned.length / rows.length : null,
    byMonth: mom,
    byRegion: groupCompleted(completed, "region", REGIONS),
    byProduct: groupCompleted(completed, "product", PRODUCTS),
    byCategory: groupCompleted(completed, "category", CATEGORIES),
    byCustomer: groupCompleted(completed, "customerType", CUSTOMER_TYPES),
    byStatus: STATUSES.map((status) => ({
      label: status,
      orders: rows.filter((row) => row.status === status).length,
    })),
  };
}

function productsForCategory(category) {
  if (category === "all") return PRODUCTS;
  return PRODUCTS.filter((product) => PRODUCT_CATEGORY[product] === category);
}

function fillSelect(select, values, labels, current) {
  const keep = select.querySelector('option[value="all"]');
  select.innerHTML = "";
  select.appendChild(keep);
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labels ? labels[value] : value;
    select.appendChild(option);
  });
  select.value = values.includes(current) ? current : "all";
  return select.value;
}

function setupFilters() {
  const monthSelect = document.getElementById("filter-month");
  const regionSelect = document.getElementById("filter-region");
  const categorySelect = document.getElementById("filter-category");
  const productSelect = document.getElementById("filter-product");

  fillSelect(monthSelect, MONTHS, MONTH_LABELS, filters.month);
  fillSelect(regionSelect, REGIONS, null, filters.region);
  fillSelect(categorySelect, CATEGORIES, null, filters.category);
  syncProductOptions();

  monthSelect.addEventListener("change", () => {
    filters.month = monthSelect.value;
    render();
  });
  regionSelect.addEventListener("change", () => {
    filters.region = regionSelect.value;
    render();
  });
  categorySelect.addEventListener("change", () => {
    filters.category = categorySelect.value;
    filters.product = syncProductOptions();
    render();
  });
  productSelect.addEventListener("change", () => {
    filters.product = productSelect.value;
    render();
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    filters = { month: "all", region: "all", category: "all", product: "all" };
    monthSelect.value = "all";
    regionSelect.value = "all";
    categorySelect.value = "all";
    syncProductOptions();
    render();
  });
}

function syncProductOptions() {
  const productSelect = document.getElementById("filter-product");
  const allowed = productsForCategory(filters.category);
  const next = fillSelect(productSelect, allowed, null, filters.product);
  filters.product = next;
  return next;
}

function renderFilterSummary(stats) {
  const parts = [];
  if (filters.month !== "all") parts.push(MONTH_LABELS[filters.month]);
  if (filters.region !== "all") parts.push(filters.region);
  if (filters.category !== "all") parts.push(filters.category);
  if (filters.product !== "all") parts.push(filters.product);

  const scope = parts.length ? parts.join(" · ") : "all regions, months, products";
  const node = document.getElementById("filter-summary");
  node.innerHTML = `<strong>${stats.completedCount}</strong> completed of <strong>${stats.allCount}</strong> matching orders · ${scope}`;
}

function renderLedger(stats) {
  const maxRevenue = Math.max(...stats.byRegion.map((item) => item.revenue), 0);
  const root = document.getElementById("city-ledger");
  root.innerHTML = stats.byRegion
    .map((item) => {
      const share = stats.revenue ? item.revenue / stats.revenue : 0;
      const width = maxRevenue ? (item.revenue / maxRevenue) * 100 : 0;
      const empty = item.revenue === 0 ? " is-empty" : "";
      return `
        <article class="ledger-city${empty}">
          <p class="name">${item.label}</p>
          <p class="amount">${formatKES(item.revenue)}</p>
          <p class="share">${formatPct(share)} of filtered revenue · ${item.orders} orders</p>
          <div class="ledger-bar" aria-hidden="true"><span style="width:${width}%"></span></div>
        </article>`;
    })
    .join("");
}

function renderKpis(stats) {
  const unitsPerOrder = stats.completedCount ? stats.units / stats.completedCount : null;
  const furniture = stats.byCategory.find((item) => item.label === "Furniture");
  const electronics = stats.byCategory.find((item) => item.label === "Electronics");
  let marginHint = "Product gross profit ÷ recognised revenue";
  if (furniture?.revenue && electronics?.revenue) {
    marginHint = `Furniture ${formatPct(furniture.margin)} · Electronics ${formatPct(electronics.margin)}`;
  }

  const cards = [
    {
      label: "Total revenue",
      value: formatKES(stats.revenue),
      hint: `${stats.completedCount} completed orders`,
    },
    {
      label: "Gross profit",
      value: formatKES(stats.profit),
      hint: `After ${formatKES(stats.cogs)} COGS`,
    },
    {
      label: "Gross profit margin",
      value: formatPct(stats.margin),
      hint: marginHint,
    },
    {
      label: "Total orders",
      value: String(stats.completedCount),
      hint: `${stats.returnedCount} returned · ${stats.cancelledCount} cancelled`,
    },
    {
      label: "Units sold",
      value: String(stats.units),
      hint: unitsPerOrder === null ? "No completed orders" : `${unitsPerOrder.toFixed(2)} units per completed order`,
    },
    {
      label: "Average order value",
      value: stats.aov === null ? "—" : formatKES(stats.aov),
      hint: stats.asp === null ? "No completed orders" : `ASP ${formatKES(stats.asp)} per unit`,
    },
  ];

  document.getElementById("kpi-grid").innerHTML = cards
    .map(
      (card) => `
      <article class="kpi-card">
        <p class="label">${card.label}</p>
        <p class="value">${card.value}</p>
        <p class="hint">${card.hint}</p>
      </article>`
    )
    .join("");
}

function chartOptions(extra = {}) {
  const palette = themePalette();
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: palette.ink, boxWidth: 12, font: { family: "Source Sans 3", size: 12 } },
      },
      tooltip: {
        callbacks: extra.tooltipCallbacks || {},
      },
    },
    scales: extra.scales,
  };
}

function moneyTooltip() {
  return {
    label(context) {
      const label = context.dataset.label ? `${context.dataset.label}: ` : "";
      return `${label}${formatKES(context.parsed.y ?? context.parsed)}`;
    },
  };
}

function doughnutTooltip(kind) {
  return {
    label(context) {
      const value = context.parsed;
      if (kind === "money") return `${context.label}: ${formatKES(value)}`;
      return `${context.label}: ${value}`;
    },
  };
}

function moneyScales() {
  const palette = themePalette();
  return {
    x: {
      ticks: { color: palette.muted, font: { family: "Source Sans 3" } },
      grid: { color: palette.line },
      border: { color: palette.line },
    },
    y: {
      ticks: {
        color: palette.muted,
        font: { family: "IBM Plex Mono", size: 11 },
        callback: (value) => formatKES(value),
      },
      grid: { color: palette.line },
      border: { color: palette.line },
      beginAtZero: true,
    },
  };
}

function categoryScales() {
  const palette = themePalette();
  return {
    x: {
      ticks: { color: palette.muted, font: { family: "Source Sans 3" } },
      grid: { display: false },
      border: { color: palette.line },
    },
    y: {
      ticks: {
        color: palette.muted,
        font: { family: "IBM Plex Mono", size: 11 },
        callback: (value) => formatKES(value),
      },
      grid: { color: palette.line },
      border: { color: palette.line },
      beginAtZero: true,
    },
  };
}

function setChartEmpty(canvasId, isEmpty) {
  const canvas = document.getElementById(canvasId);
  const empty = canvas.parentElement.querySelector(".chart-empty");
  canvas.style.display = isEmpty ? "none" : "block";
  if (empty) {
    empty.hidden = !isEmpty;
    empty.classList.toggle("is-shown", isEmpty);
  }
}

function upsertChart(id, config) {
  const canvas = document.getElementById(id);
  if (charts[id]) {
    charts[id].data = config.data;
    charts[id].options = config.options;
    charts[id].update();
    return;
  }
  charts[id] = new Chart(canvas, config);
}

function renderCharts(stats) {
  if (typeof Chart === "undefined") return;

  const palette = themePalette();
  const regionColors = [palette.teal, palette.ocean, palette.gold, palette.rust];
  const productColors = [palette.ocean, palette.teal, palette.gold, palette.wood, palette.rust];
  const hasCompleted = stats.completedCount > 0;
  const hasOrders = stats.allCount > 0;

  Chart.defaults.font.family = "Source Sans 3";
  Chart.defaults.color = palette.ink;

  setChartEmpty("chart-monthly-revenue", !hasCompleted);
  setChartEmpty("chart-monthly-profit", !hasCompleted);
  setChartEmpty("chart-revenue-region", !hasCompleted);
  setChartEmpty("chart-revenue-product", !hasCompleted);
  setChartEmpty("chart-regional-compare", !hasCompleted);
  setChartEmpty("chart-product-profit", !hasCompleted);
  setChartEmpty("chart-category", !hasCompleted);
  setChartEmpty("chart-customer", !hasCompleted);
  setChartEmpty("chart-status", !hasOrders);

  if (hasCompleted) {
    upsertChart("chart-monthly-revenue", {
      type: "line",
      data: {
        labels: stats.byMonth.map((item) => item.label.replace(" 2026", "")),
        datasets: [{
          label: "Revenue",
          data: stats.byMonth.map((item) => item.revenue),
          borderColor: palette.teal,
          backgroundColor: palette.teal,
          tension: 0.15,
          pointRadius: 4,
        }],
      },
      options: chartOptions({ scales: moneyScales(), tooltipCallbacks: moneyTooltip() }),
    });

    upsertChart("chart-monthly-profit", {
      type: "line",
      data: {
        labels: stats.byMonth.map((item) => item.label.replace(" 2026", "")),
        datasets: [{
          label: "Gross profit",
          data: stats.byMonth.map((item) => item.profit),
          borderColor: palette.gold,
          backgroundColor: palette.gold,
          tension: 0.15,
          pointRadius: 4,
        }],
      },
      options: chartOptions({ scales: moneyScales(), tooltipCallbacks: moneyTooltip() }),
    });

    upsertChart("chart-revenue-region", {
      type: "bar",
      data: {
        labels: stats.byRegion.map((item) => item.label),
        datasets: [{
          label: "Revenue",
          data: stats.byRegion.map((item) => item.revenue),
          backgroundColor: regionColors,
        }],
      },
      options: {
        ...chartOptions({ scales: categoryScales(), tooltipCallbacks: moneyTooltip() }),
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: moneyTooltip() },
        },
      },
    });

    upsertChart("chart-revenue-product", {
      type: "bar",
      data: {
        labels: stats.byProduct.map((item) => item.label),
        datasets: [{
          label: "Revenue",
          data: stats.byProduct.map((item) => item.revenue),
          backgroundColor: productColors,
        }],
      },
      options: {
        ...chartOptions({ scales: categoryScales(), tooltipCallbacks: moneyTooltip() }),
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: moneyTooltip() },
        },
      },
    });

    upsertChart("chart-regional-compare", {
      type: "bar",
      data: {
        labels: stats.byRegion.map((item) => item.label),
        datasets: [
          { label: "Revenue", data: stats.byRegion.map((item) => item.revenue), backgroundColor: palette.teal },
          { label: "Gross profit", data: stats.byRegion.map((item) => item.profit), backgroundColor: palette.gold },
        ],
      },
      options: chartOptions({ scales: categoryScales(), tooltipCallbacks: moneyTooltip() }),
    });

    upsertChart("chart-product-profit", {
      type: "bar",
      data: {
        labels: stats.byProduct.map((item) => item.label),
        datasets: [{
          label: "Gross profit",
          data: stats.byProduct.map((item) => item.profit),
          backgroundColor: productColors,
        }],
      },
      options: {
        ...chartOptions({ scales: categoryScales(), tooltipCallbacks: moneyTooltip() }),
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: moneyTooltip() },
        },
      },
    });

    upsertChart("chart-category", {
      type: "doughnut",
      data: {
        labels: stats.byCategory.map((item) => item.label),
        datasets: [{
          data: stats.byCategory.map((item) => item.revenue),
          backgroundColor: [palette.ocean, palette.wood],
          borderColor: palette.raised,
          borderWidth: 2,
        }],
      },
      options: {
        ...chartOptions({ tooltipCallbacks: doughnutTooltip("money") }),
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: palette.ink, boxWidth: 12 },
          },
          tooltip: { callbacks: doughnutTooltip("money") },
        },
      },
    });

    upsertChart("chart-customer", {
      type: "bar",
      data: {
        labels: stats.byCustomer.map((item) => item.label),
        datasets: [{
          label: "Revenue",
          data: stats.byCustomer.map((item) => item.revenue),
          backgroundColor: [palette.ocean, palette.teal],
        }],
      },
      options: {
        ...chartOptions({ scales: categoryScales(), tooltipCallbacks: moneyTooltip() }),
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: moneyTooltip() },
        },
      },
    });
  }

  if (hasOrders) {
    upsertChart("chart-status", {
      type: "doughnut",
      data: {
        labels: stats.byStatus.map((item) => item.label),
        datasets: [{
          data: stats.byStatus.map((item) => item.orders),
          backgroundColor: [palette.teal, palette.rust, palette.slate],
          borderColor: palette.raised,
          borderWidth: 2,
        }],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: palette.ink, boxWidth: 12 },
          },
          tooltip: { callbacks: doughnutTooltip("count") },
        },
      },
    });
  }
}

function buildInsights(stats) {
  if (stats.completedCount === 0) {
    return [{
      title: "No recognised sales in this view",
      body: "The current filters match no completed orders. Revenue, profit, units and AOV are therefore zero. Returned or cancelled rows may still appear under Exceptions if they match the filters.",
    }];
  }

  const items = [];
  const regionsWithSales = stats.byRegion.filter((item) => item.revenue > 0).sort((a, b) => b.revenue - a.revenue);
  const topRegion = regionsWithSales[0];
  const lowRegion = regionsWithSales[regionsWithSales.length - 1];
  const productsWithSales = stats.byProduct.filter((item) => item.revenue > 0).sort((a, b) => b.revenue - a.revenue);
  const productsByUnits = [...stats.byProduct].filter((item) => item.units > 0).sort((a, b) => b.units - a.units);
  const productsByMargin = [...stats.byProduct].filter((item) => item.margin !== null).sort((a, b) => b.margin - a.margin);
  const furniture = stats.byCategory.find((item) => item.label === "Furniture");
  const electronics = stats.byCategory.find((item) => item.label === "Electronics");
  const returning = stats.byCustomer.find((item) => item.label === "Returning");
  const neu = stats.byCustomer.find((item) => item.label === "New");
  const monthsWithSales = stats.byMonth.filter((item) => item.revenue > 0);
  const phoneRows = stats.rows.filter((row) => row.product === "Phone");
  const phoneReturns = phoneRows.filter((row) => row.status === "Returned");

  if (topRegion && stats.revenue) {
    items.push({
      title: `${topRegion.label} leads revenue`,
      body: `${topRegion.label} accounts for ${formatKES(topRegion.revenue)} (${formatPct(topRegion.revenue / stats.revenue)}) of recognised revenue in this view, from ${topRegion.orders} completed orders.`,
    });
  }

  if (lowRegion && topRegion && lowRegion.label !== topRegion.label) {
    items.push({
      title: `${lowRegion.label} is the smallest completed book`,
      body: `${lowRegion.label} contributed ${formatKES(lowRegion.revenue)} (${formatPct(lowRegion.revenue / stats.revenue)}) and ${lowRegion.orders} completed orders. AOV here is ${lowRegion.orders ? formatKES(lowRegion.revenue / lowRegion.orders) : "—"}.`,
    });
  }

  if (monthsWithSales.length >= 2) {
    const best = [...monthsWithSales].sort((a, b) => b.revenue - a.revenue)[0];
    const worst = [...monthsWithSales].sort((a, b) => a.revenue - b.revenue)[0];
    const feb = stats.byMonth.find((item) => item.month === "2026-02");
    const mar = stats.byMonth.find((item) => item.month === "2026-03");
    let body = `${best.label} is the strongest month (${formatKES(best.revenue)}). ${worst.label} is the weakest (${formatKES(worst.revenue)}).`;
    if (feb?.mom !== null && feb?.mom !== undefined) {
      body += ` February is ${formatPct(feb.mom)} versus January.`;
    }
    if (mar?.mom !== null && mar?.mom !== undefined) {
      body += ` March is ${formatPct(mar.mom)} versus February.`;
    }
    items.push({
      title: `${best.label.replace(" 2026", "")} is the peak; ${worst.label.replace(" 2026", "")} is the trough`,
      body,
    });
  }

  if (electronics?.revenue && furniture?.revenue) {
    items.push({
      title: "Electronics carry sales; furniture carries margin",
      body: `Electronics are ${formatKES(electronics.revenue)} (${formatPct(electronics.revenue / stats.revenue)}) at ${formatPct(electronics.margin)} margin. Furniture is ${formatKES(furniture.revenue)} at ${formatPct(furniture.margin)} margin.`,
    });
  }

  if (productsWithSales[0] && productsByMargin[0] && productsByUnits[0]) {
    const thin = [...stats.byProduct].filter((item) => item.revenue > 0).sort((a, b) => a.margin - b.margin)[0];
    items.push({
      title: `${productsWithSales[0].label} leads revenue; ${productsByUnits[0].label} leads units`,
      body: `${productsWithSales[0].label} generated ${formatKES(productsWithSales[0].revenue)}. ${productsByUnits[0].label} sold ${productsByUnits[0].units} units. ${thin.label} has the thinnest completed margin in this view (${formatPct(thin.margin)}).`,
    });
  }

  if (phoneReturns.length) {
    items.push({
      title: "Returns in this view are phones",
      body: `${phoneReturns.length} of ${phoneRows.length} phone orders were returned (${formatPct(phoneReturns.length / phoneRows.length)}). Returned IDs: ${phoneReturns.map((row) => row.orderId).join(", ")}. Non-phone returns: none in this filter.`,
    });
  } else if (stats.returnedCount) {
    items.push({
      title: "Returned orders are excluded from revenue",
      body: `${stats.returnedCount} returned order(s) match the filters and are omitted from recognised sales. List value ${formatKES(sum(stats.returned, "revenue"))}.`,
    });
  }

  if (returning?.revenue && neu?.revenue && stats.revenue) {
    items.push({
      title: "Returning-labelled orders have the larger tickets",
      body: `Returning: ${formatKES(returning.revenue)} (${formatPct(returning.revenue / stats.revenue)}), AOV ${returning.orders ? formatKES(returning.revenue / returning.orders) : "—"}. New: ${formatKES(neu.revenue)}, AOV ${neu.orders ? formatKES(neu.revenue / neu.orders) : "—"}. These are order labels, not unique customers.`,
    });
  }

  if (stats.cancelledCount) {
    items.push({
      title: "Cancelled demand is not recognised revenue",
      body: `${stats.cancelledCount} cancelled order(s) — IDs ${stats.cancelled.map((row) => row.orderId).join(", ")} — list value ${formatKES(sum(stats.cancelled, "revenue"))}.`,
    });
  }

  return items.slice(0, 6);
}

function renderInsights(stats) {
  const items = buildInsights(stats);
  document.getElementById("insights-list").innerHTML = items
    .map(
      (item) => `
      <li>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </li>`
    )
    .join("");
}

function renderExceptions(stats) {
  const exceptions = [...stats.returned, ...stats.cancelled].sort((a, b) => a.orderId - b.orderId);
  const body = document.getElementById("exceptions-body");
  if (!exceptions.length) {
    body.innerHTML = `<tr class="empty-row"><td colspan="8">No returned or cancelled orders in this filter.</td></tr>`;
    return;
  }
  body.innerHTML = exceptions
    .map((row) => `
      <tr>
        <td>${row.orderId}</td>
        <td>${row.date}</td>
        <td>${row.region}</td>
        <td>${row.product}</td>
        <td>${row.customerType}</td>
        <td>${row.units}</td>
        <td>${formatKES(row.revenue)}</td>
        <td><span class="status-pill ${row.status.toLowerCase()}">${row.status}</span></td>
      </tr>`)
    .join("");
}

function render() {
  const stats = summarize(applyFilters(DATASET));
  renderFilterSummary(stats);
  renderLedger(stats);
  renderKpis(stats);
  renderCharts(stats);
  renderInsights(stats);
  renderExceptions(stats);
}

function setupTheme() {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-label");
  const stored = localStorage.getItem("branch-ledger-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");

  function apply(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    label.textContent = dark ? "Light mode" : "Dark mode";
    localStorage.setItem("branch-ledger-theme", theme);
    render();
  }

  apply(initial);
  button.addEventListener("click", () => {
    apply(root.dataset.theme === "dark" ? "light" : "dark");
  });
}

function stampOpenedAt() {
  const node = document.getElementById("last-updated");
  const stamp = new Date().toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  node.textContent = `Opened ${stamp}`;
}

document.addEventListener("DOMContentLoaded", () => {
  stampOpenedAt();
  setupFilters();
  setupTheme();
});
