"use strict";

/*
  Recognition rule
  ----------------
  Completed orders are the only source of recognised revenue, cost, gross profit,
  units sold, average order value and average selling price.
  Returned and cancelled orders are excluded from those figures and reported apart.
  Return rate = returned orders / (completed orders + returned orders).
  Cancelled orders are not treated as returns.

  Control totals for the unfiltered file, audited independently:
  revenue 1,558,000 · cost 1,064,000 · profit 494,000 · units 50
  21 completed · 2 returned · 1 cancelled · 24 rows
*/

const RAW = [
  ["1001", "2026-01-05", "Nairobi", "Laptop", "Electronics", "Returning", 2, 75000, 55000, "Completed"],
  ["1002", "2026-01-07", "Mombasa", "Phone", "Electronics", "New", 3, 30000, 21000, "Completed"],
  ["1003", "2026-01-09", "Nairobi", "Office Chair", "Furniture", "New", 4, 12000, 7000, "Completed"],
  ["1004", "2026-01-12", "Kisumu", "Tablet", "Electronics", "Returning", 2, 25000, 17000, "Completed"],
  ["1005", "2026-01-15", "Nakuru", "Desk", "Furniture", "New", 1, 35000, 22000, "Completed"],
  ["1006", "2026-01-18", "Nairobi", "Phone", "Electronics", "Returning", 2, 30000, 21000, "Returned"],
  ["1007", "2026-01-21", "Mombasa", "Office Chair", "Furniture", "Returning", 3, 12000, 7000, "Completed"],
  ["1008", "2026-01-24", "Kisumu", "Laptop", "Electronics", "New", 1, 75000, 55000, "Completed"],
  ["1009", "2026-02-02", "Nairobi", "Tablet", "Electronics", "Returning", 3, 25000, 17000, "Completed"],
  ["1010", "2026-02-05", "Nakuru", "Phone", "Electronics", "New", 2, 30000, 21000, "Completed"],
  ["1011", "2026-02-08", "Mombasa", "Desk", "Furniture", "Returning", 2, 35000, 22000, "Completed"],
  ["1012", "2026-02-11", "Nairobi", "Laptop", "Electronics", "New", 1, 75000, 55000, "Completed"],
  ["1013", "2026-02-14", "Kisumu", "Office Chair", "Furniture", "Returning", 5, 12000, 7000, "Completed"],
  ["1014", "2026-02-17", "Nakuru", "Tablet", "Electronics", "New", 2, 25000, 17000, "Cancelled"],
  ["1015", "2026-02-20", "Nairobi", "Phone", "Electronics", "Returning", 4, 30000, 21000, "Completed"],
  ["1016", "2026-03-01", "Mombasa", "Laptop", "Electronics", "Returning", 2, 75000, 55000, "Completed"],
  ["1017", "2026-03-04", "Kisumu", "Desk", "Furniture", "New", 3, 35000, 22000, "Completed"],
  ["1018", "2026-03-07", "Nairobi", "Office Chair", "Furniture", "Returning", 2, 12000, 7000, "Completed"],
  ["1019", "2026-03-10", "Nakuru", "Phone", "Electronics", "Returning", 3, 30000, 21000, "Completed"],
  ["1020", "2026-03-13", "Mombasa", "Tablet", "Electronics", "New", 2, 25000, 17000, "Completed"],
  ["1021", "2026-03-16", "Nairobi", "Desk", "Furniture", "New", 2, 35000, 22000, "Completed"],
  ["1022", "2026-03-19", "Kisumu", "Phone", "Electronics", "Returning", 1, 30000, 21000, "Returned"],
  ["1023", "2026-03-22", "Nakuru", "Laptop", "Electronics", "Returning", 1, 75000, 55000, "Completed"],
  ["1024", "2026-03-25", "Nairobi", "Tablet", "Electronics", "New", 2, 25000, 17000, "Completed"]
];

const MONTHS = [
  { id: "2026-01", label: "January", short: "Jan" },
  { id: "2026-02", label: "February", short: "Feb" },
  { id: "2026-03", label: "March", short: "Mar" }
];

const REGIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];

const PRODUCTS = [
  { name: "Laptop", category: "Electronics" },
  { name: "Phone", category: "Electronics" },
  { name: "Tablet", category: "Electronics" },
  { name: "Office Chair", category: "Furniture" },
  { name: "Desk", category: "Furniture" }
];

const PLURAL = {
  Laptop: "Laptops",
  Phone: "Phones",
  Tablet: "Tablets",
  "Office Chair": "Office chairs",
  Desk: "Desks"
};

const ORDERS = RAW.map(function (row) {
  return {
    id: row[0],
    date: row[1],
    region: row[2],
    product: row[3],
    category: row[4],
    customer: row[5],
    units: row[6],
    price: row[7],
    cost: row[8],
    status: row[9],
    month: row[1].slice(0, 7)
  };
});

const state = {
  months: new Set(MONTHS.map(function (month) { return month.id; })),
  regions: new Set(REGIONS),
  category: "all",
  product: "all"
};

const charts = new Map();
const HAS_CHARTS = typeof Chart !== "undefined";
let controlOk = false;

function sum(rows, fn) {
  return rows.reduce(function (total, row) { return total + fn(row); }, 0);
}

function last(items) {
  return items[items.length - 1];
}

function measure(orders) {
  const completed = orders.filter(function (order) { return order.status === "Completed"; });
  const returned = orders.filter(function (order) { return order.status === "Returned"; });
  const cancelled = orders.filter(function (order) { return order.status === "Cancelled"; });
  const revenue = sum(completed, function (order) { return order.units * order.price; });
  const cogs = sum(completed, function (order) { return order.units * order.cost; });
  const profit = revenue - cogs;
  const units = sum(completed, function (order) { return order.units; });
  const fulfilled = completed.length + returned.length;
  const excluded = returned.concat(cancelled);
  return {
    recorded: orders.length,
    completed: completed,
    returned: returned,
    cancelled: cancelled,
    revenue: revenue,
    cogs: cogs,
    profit: profit,
    margin: revenue > 0 ? profit / revenue : null,
    units: units,
    aov: completed.length ? revenue / completed.length : null,
    asp: units > 0 ? revenue / units : null,
    returnRate: fulfilled ? returned.length / fulfilled : null,
    excludedList: sum(excluded, function (order) { return order.units * order.price; }),
    excludedProfit: sum(excluded, function (order) { return order.units * (order.price - order.cost); })
  };
}

function formatKES(value) {
  if (!Number.isFinite(value)) return "—";
  const negative = value < 0;
  const parts = Math.abs(value).toFixed(2).split(".");
  const body = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const digits = parts[1] === "00" ? body : body + "." + parts[1];
  return (negative ? "−" : "") + "KES " + digits;
}

function formatPct(ratio) {
  if (ratio === null || !Number.isFinite(ratio)) return "—";
  const negative = ratio < 0;
  return (negative ? "−" : "") + Math.abs(ratio * 100).toFixed(2) + "%";
}

function formatMom(ratio) {
  if (ratio === null || !Number.isFinite(ratio)) return { text: "—", cls: "" };
  if (ratio === 0) return { text: "0.00%", cls: "" };
  const up = ratio > 0;
  return {
    text: (up ? "+" : "−") + Math.abs(ratio * 100).toFixed(2) + "%",
    cls: up ? "up" : "down"
  };
}

function formatAxis(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);
  const abs = Math.abs(number);
  if (abs >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (abs >= 1000) return Math.round(number / 1000) + "k";
  return String(number);
}

function formatDate(iso) {
  const parts = iso.split("-");
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return Number(parts[2]) + " " + names[Number(parts[1]) - 1] + " " + parts[0];
}

function joinLabels(labels) {
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return labels[0] + " and " + labels[1];
  return labels.slice(0, -1).join(", ") + " and " + labels[labels.length - 1];
}

function pluralName(name) {
  return PLURAL[name] || name;
}

function unitsPerOrder(metrics) {
  if (!metrics.completed.length) return "—";
  return (metrics.units / metrics.completed.length).toFixed(2);
}

function filteredOrders() {
  return ORDERS.filter(function (order) {
    return state.months.has(order.month) &&
      state.regions.has(order.region) &&
      (state.category === "all" || order.category === state.category) &&
      (state.product === "all" || order.product === state.product);
  });
}

function isFullBook() {
  return state.months.size === MONTHS.length &&
    state.regions.size === REGIONS.length &&
    state.category === "all" &&
    state.product === "all";
}

function productsForCategory(category) {
  return PRODUCTS.filter(function (product) {
    return category === "all" || product.category === category;
  });
}

function productsAllowed() {
  return productsForCategory(state.category).filter(function (product) {
    return state.product === "all" || product.name === state.product;
  });
}

function categoriesInPlay() {
  if (state.category !== "all") return [state.category];
  if (state.product !== "all") {
    const product = PRODUCTS.find(function (item) { return item.name === state.product; });
    return product ? [product.category] : [];
  }
  return ["Electronics", "Furniture"];
}

function monthSlices(orders) {
  return MONTHS.filter(function (month) { return state.months.has(month.id); }).map(function (month) {
    return Object.assign({}, month, measure(orders.filter(function (order) {
      return order.month === month.id;
    })));
  });
}

function priorMom(buckets, index) {
  const current = buckets[index];
  const monthIndex = MONTHS.findIndex(function (month) { return month.id === current.id; });
  if (monthIndex <= 0) return null;
  const prev = buckets.find(function (bucket) { return bucket.id === MONTHS[monthIndex - 1].id; });
  if (!prev || prev.revenue === 0) return null;
  return (current.revenue - prev.revenue) / prev.revenue;
}

function setText(id, text) {
  const node = document.getElementById(id);
  if (node) node.textContent = text;
}

function td(text, className) {
  const cell = document.createElement("td");
  cell.textContent = text;
  if (className) cell.className = className;
  return cell;
}

function num(text, extra) {
  return td(text, extra ? "num " + extra : "num");
}

function appendRow(body, cells) {
  const row = document.createElement("tr");
  cells.forEach(function (cell) { row.appendChild(cell); });
  body.appendChild(row);
}

function emptyRow(body, columns, message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = columns;
  cell.textContent = message;
  row.appendChild(cell);
  body.appendChild(row);
}

function nameCell(label, color) {
  const cell = document.createElement("td");
  const wrap = document.createElement("span");
  wrap.className = "name-cell";
  const swatch = document.createElement("span");
  swatch.className = "swatch";
  swatch.style.background = color;
  wrap.appendChild(swatch);
  wrap.appendChild(document.createTextNode(label));
  cell.appendChild(wrap);
  return cell;
}

function statusPill(status) {
  const pill = document.createElement("span");
  pill.className = "status status-" + status.toLowerCase();
  pill.textContent = status;
  const cell = document.createElement("td");
  cell.appendChild(pill);
  return cell;
}

function isDark() {
  return document.documentElement.dataset.theme === "dark";
}

function chartColors() {
  if (isDark()) {
    return {
      ink: "#e7eef2",
      muted: "#9aafb8",
      grid: "rgba(231, 238, 242, 0.12)",
      surface: "#172229",
      teal: "#3ecfc4",
      blue: "#8ec3e0",
      mint: "#8fd0c8",
      ochre: "#e2b06a",
      brown: "#e0c2a8",
      plum: "#c4b6dc",
      profit: "#7dcea4",
      amber: "#e2b06a",
      clay: "#ef9a96"
    };
  }
  return {
    ink: "#13242c",
    muted: "#52656f",
    grid: "rgba(19, 36, 44, 0.10)",
    surface: "#f7fafb",
    teal: "#0c6e6a",
    blue: "#1f6f9a",
    mint: "#3d8b84",
    ochre: "#c47b2b",
    brown: "#8a5a3a",
    plum: "#65587e",
    profit: "#1a7348",
    amber: "#a15c12",
    clay: "#8a3b38"
  };
}

function regionColor(name, colors) {
  return { Nairobi: colors.teal, Mombasa: colors.blue, Kisumu: colors.ochre, Nakuru: colors.plum }[name];
}

function productColor(name, colors) {
  return {
    Laptop: colors.teal,
    Phone: colors.blue,
    Tablet: colors.mint,
    "Office Chair": colors.ochre,
    Desk: colors.brown
  }[name];
}

function pointValue(ctx) {
  const parsed = ctx.parsed;
  if (typeof parsed === "number") return parsed;
  if (ctx.chart.options.indexAxis === "y") return parsed.x;
  return parsed.y;
}

function tooltipBase() {
  return {
    backgroundColor: "#14242c",
    titleColor: "#f4fafb",
    bodyColor: "#f4fafb",
    padding: 10,
    cornerRadius: 8,
    displayColors: true,
    boxPadding: 4
  };
}

function moneyTooltip() {
  const base = tooltipBase();
  base.callbacks = {
    label: function (ctx) {
      const name = ctx.chart.config.type === "doughnut" ? ctx.label : ctx.dataset.label;
      return name + ": " + formatKES(pointValue(ctx));
    }
  };
  return base;
}

function countTooltip() {
  const base = tooltipBase();
  base.callbacks = {
    label: function (ctx) {
      const count = pointValue(ctx);
      return ctx.label + ": " + count + (count === 1 ? " order" : " orders");
    }
  };
  return base;
}

function valueScale(colors) {
  return {
    beginAtZero: true,
    ticks: {
      color: colors.muted,
      maxTicksLimit: 5,
      callback: function (value) { return formatAxis(value); }
    },
    grid: { color: colors.grid },
    border: { display: false }
  };
}

function categoryScale(colors) {
  return {
    ticks: { color: colors.ink },
    grid: { display: false },
    border: { display: false }
  };
}

function legendOptions(colors, display) {
  return {
    display: display,
    position: "bottom",
    labels: {
      color: colors.ink,
      boxWidth: 10,
      boxHeight: 10,
      padding: 14,
      usePointStyle: true
    }
  };
}

function drawChart(id, hasData, config) {
  const canvas = document.getElementById(id);
  const empty = document.getElementById(id + "-empty");
  const box = canvas.parentElement;
  if (charts.has(id)) {
    charts.get(id).destroy();
    charts.delete(id);
  }
  if (!HAS_CHARTS || !hasData) {
    canvas.hidden = true;
    empty.hidden = false;
    box.classList.add("is-empty");
    empty.textContent = !HAS_CHARTS
      ? "Chart library did not load. The tables still have the figures."
      : empty.dataset.empty;
    return;
  }
  canvas.hidden = false;
  empty.hidden = true;
  box.classList.remove("is-empty");
  void canvas.clientWidth;
  try {
    charts.set(id, new Chart(canvas, config));
  } catch (error) {
    console.error(error);
    canvas.hidden = true;
    empty.hidden = false;
    box.classList.add("is-empty");
    empty.textContent = "This chart could not be drawn. The table still has the figures.";
  }
}

function renderCharts(orders, metrics) {
  if (HAS_CHARTS) {
    Chart.defaults.font.family = '"Schibsted Grotesk", "Segoe UI", sans-serif';
    Chart.defaults.font.size = 12;
    Chart.defaults.color = chartColors().muted;
    Chart.defaults.animation = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? false
      : { duration: 160 };
  }
  const colors = chartColors();
  const months = monthSlices(orders);
  const monthHasSales = months.some(function (month) { return month.revenue > 0 || month.profit > 0; });

  drawChart("chart-month", monthHasSales, {
    type: "bar",
    data: {
      labels: months.map(function (month) { return month.short; }),
      datasets: [
        {
          label: "Revenue",
          data: months.map(function (month) { return month.revenue; }),
          backgroundColor: colors.teal,
          borderRadius: 4,
          maxBarThickness: 32
        },
        {
          label: "Gross profit",
          data: months.map(function (month) { return month.profit; }),
          backgroundColor: colors.profit,
          borderRadius: 4,
          maxBarThickness: 32
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: { legend: legendOptions(colors, true), tooltip: moneyTooltip() },
      scales: { x: categoryScale(colors), y: valueScale(colors) }
    }
  });

  const regions = REGIONS.filter(function (name) { return state.regions.has(name); }).map(function (name) {
    return Object.assign({ name: name }, measure(orders.filter(function (order) { return order.region === name; })));
  });
  const regionHasSales = regions.some(function (region) { return region.revenue > 0; });
  drawChart("chart-region", regionHasSales, {
    type: "bar",
    data: {
      labels: regions.map(function (region) { return region.name; }),
      datasets: [{
        label: "Revenue",
        data: regions.map(function (region) { return region.revenue; }),
        backgroundColor: regions.map(function (region) { return regionColor(region.name, colors); }),
        borderRadius: 4,
        maxBarThickness: 22
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: legendOptions(colors, false), tooltip: moneyTooltip() },
      scales: { x: valueScale(colors), y: categoryScale(colors) }
    }
  });

  const products = productsAllowed().map(function (product) {
    return Object.assign({}, product, measure(orders.filter(function (order) {
      return order.product === product.name;
    })));
  });
  const productHasSales = products.some(function (product) { return product.revenue > 0; });
  drawChart("chart-product-revenue", productHasSales, {
    type: "bar",
    data: {
      labels: products.map(function (product) { return product.name; }),
      datasets: [{
        label: "Revenue",
        data: products.map(function (product) { return product.revenue; }),
        backgroundColor: products.map(function (product) { return productColor(product.name, colors); }),
        borderRadius: 4,
        maxBarThickness: 42
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: legendOptions(colors, false), tooltip: moneyTooltip() },
      scales: { x: categoryScale(colors), y: valueScale(colors) }
    }
  });

  const profitSorted = products.slice().sort(function (a, b) { return b.profit - a.profit; });
  const profitHasSales = profitSorted.some(function (product) { return product.profit > 0; });
  drawChart("chart-product-profit", profitHasSales, {
    type: "bar",
    data: {
      labels: profitSorted.map(function (product) { return product.name; }),
      datasets: [{
        label: "Gross profit",
        data: profitSorted.map(function (product) { return product.profit; }),
        backgroundColor: profitSorted.map(function (product) { return productColor(product.name, colors); }),
        borderRadius: 4,
        maxBarThickness: 22
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: legendOptions(colors, false), tooltip: moneyTooltip() },
      scales: { x: valueScale(colors), y: categoryScale(colors) }
    }
  });

  const categories = categoriesInPlay().map(function (category) {
    return {
      name: category,
      metrics: measure(orders.filter(function (order) { return order.category === category; }))
    };
  }).filter(function (category) { return category.metrics.revenue > 0; });
  drawChart("chart-category", categories.length > 0, {
    type: "doughnut",
    data: {
      labels: categories.map(function (category) { return category.name; }),
      datasets: [{
        data: categories.map(function (category) { return category.metrics.revenue; }),
        backgroundColor: categories.map(function (category) {
          return category.name === "Electronics" ? colors.teal : colors.ochre;
        }),
        borderWidth: 2,
        borderColor: colors.surface,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: { legend: legendOptions(colors, true), tooltip: moneyTooltip() }
    }
  });

  const customers = ["New", "Returning"].map(function (type) {
    return Object.assign({ type: type }, measure(orders.filter(function (order) { return order.customer === type; })));
  });
  const customerHasSales = customers.some(function (customer) { return customer.revenue > 0; });
  drawChart("chart-customer", customerHasSales, {
    type: "bar",
    data: {
      labels: customers.map(function (customer) { return customer.type; }),
      datasets: [{
        label: "Revenue",
        data: customers.map(function (customer) { return customer.revenue; }),
        backgroundColor: [colors.blue, colors.teal],
        borderRadius: 4,
        maxBarThickness: 48
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: legendOptions(colors, false), tooltip: moneyTooltip() },
      scales: { x: categoryScale(colors), y: valueScale(colors) }
    }
  });

  const statuses = [
    { name: "Completed", count: metrics.completed.length, color: colors.teal },
    { name: "Returned", count: metrics.returned.length, color: colors.amber },
    { name: "Cancelled", count: metrics.cancelled.length, color: colors.clay }
  ].filter(function (status) { return status.count > 0; });
  drawChart("chart-status", statuses.length > 0, {
    type: "doughnut",
    data: {
      labels: statuses.map(function (status) { return status.name; }),
      datasets: [{
        data: statuses.map(function (status) { return status.count; }),
        backgroundColor: statuses.map(function (status) { return status.color; }),
        borderWidth: 2,
        borderColor: colors.surface,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: { legend: legendOptions(colors, true), tooltip: countTooltip() }
    }
  });

  const categoryLines = categoriesInPlay().map(function (category) {
    const categoryMetrics = measure(orders.filter(function (order) { return order.category === category; }));
    const share = metrics.revenue > 0 ? formatPct(categoryMetrics.revenue / metrics.revenue) : "—";
    return category + " " + formatKES(categoryMetrics.revenue) + " (" + share + "), profit " + formatKES(categoryMetrics.profit);
  });
  setText("category-summary", categoryLines.length ? categoryLines.join(". ") + "." : "");
  setText("status-summary", metrics.recorded
    ? metrics.completed.length + " completed, " + metrics.returned.length + " returned, " + metrics.cancelled.length + " cancelled."
    : "");
}

function renderMonthTable(orders) {
  const body = document.getElementById("month-body");
  body.replaceChildren();
  const months = monthSlices(orders);
  if (!months.length) {
    emptyRow(body, 9, "No months are selected.");
    return;
  }
  months.forEach(function (month, index) {
    const mom = formatMom(priorMom(months, index));
    appendRow(body, [
      td(month.label),
      num(String(month.completed.length)),
      num(String(month.returned.length)),
      num(String(month.cancelled.length)),
      num(String(month.units)),
      num(formatKES(month.revenue)),
      num(formatKES(month.profit)),
      num(formatPct(month.margin)),
      num(mom.text, mom.cls)
    ]);
  });
}

function renderRegionTable(orders, metrics) {
  const body = document.getElementById("region-body");
  const colors = chartColors();
  body.replaceChildren();
  const selected = REGIONS.filter(function (name) { return state.regions.has(name); });
  if (!selected.length || metrics.recorded === 0) {
    emptyRow(body, 10, metrics.recorded === 0 ? "No orders match these filters." : "No regions are selected.");
    return;
  }
  selected.forEach(function (name) {
    const region = measure(orders.filter(function (order) { return order.region === name; }));
    const share = metrics.revenue > 0 ? formatPct(region.revenue / metrics.revenue) : "—";
    appendRow(body, [
      nameCell(name, regionColor(name, colors)),
      num(String(region.completed.length)),
      num(String(region.returned.length)),
      num(String(region.cancelled.length)),
      num(String(region.units)),
      num(formatKES(region.revenue)),
      num(share),
      num(formatKES(region.profit)),
      num(formatPct(region.margin)),
      num(region.aov === null ? "—" : formatKES(region.aov))
    ]);
  });
}

function renderProductTable(orders) {
  const body = document.getElementById("product-body");
  const colors = chartColors();
  body.replaceChildren();
  if (!filteredOrders().length) {
    emptyRow(body, 9, "No orders match these filters.");
    return;
  }
  const products = productsAllowed().map(function (product) {
    return Object.assign({}, product, measure(orders.filter(function (order) {
      return order.product === product.name;
    })));
  }).sort(function (a, b) { return b.revenue - a.revenue || a.name.localeCompare(b.name); });
  products.forEach(function (product) {
    appendRow(body, [
      nameCell(product.name, productColor(product.name, colors)),
      td(product.category),
      num(String(product.completed.length)),
      num(String(product.units)),
      num(formatKES(product.revenue)),
      num(formatKES(product.profit)),
      num(formatPct(product.margin)),
      num(String(product.returned.length)),
      num(String(product.cancelled.length))
    ]);
  });
}

function renderCustomerTable(orders, metrics) {
  const body = document.getElementById("customer-body");
  body.replaceChildren();
  if (metrics.recorded === 0) {
    emptyRow(body, 9, "No orders match these filters.");
    return;
  }
  ["New", "Returning"].forEach(function (type) {
    const customer = measure(orders.filter(function (order) { return order.customer === type; }));
    const share = metrics.revenue > 0 ? formatPct(customer.revenue / metrics.revenue) : "—";
    appendRow(body, [
      td(type),
      num(String(customer.completed.length)),
      num(String(customer.units)),
      num(unitsPerOrder(customer)),
      num(formatKES(customer.revenue)),
      num(share),
      num(formatKES(customer.profit)),
      num(formatPct(customer.margin)),
      num(customer.aov === null ? "—" : formatKES(customer.aov))
    ]);
  });
}

function renderLedger(orders, metrics) {
  const body = document.getElementById("ledger-body");
  body.replaceChildren();
  const sorted = orders.slice().sort(function (a, b) {
    return a.date.localeCompare(b.date) || a.id.localeCompare(b.id);
  });
  setText("ledger-caption", sorted.length
    ? sorted.length + (sorted.length === 1 ? " order matches" : " orders match") + " the current filters."
    : "No orders match the current filters.");
  if (!sorted.length) {
    emptyRow(body, 10, "No orders match these filters.");
  } else {
    sorted.forEach(function (order) {
      const recognised = order.status === "Completed";
      const listValue = order.units * order.price;
      const profit = order.units * (order.price - order.cost);
      appendRow(body, [
        td(order.id),
        td(formatDate(order.date)),
        td(order.region),
        td(order.product),
        td(order.customer),
        num(String(order.units)),
        num(formatKES(listValue)),
        num(formatKES(recognised ? listValue : 0)),
        num(formatKES(recognised ? profit : 0)),
        statusPill(order.status)
      ]);
    });
  }
  setText("ledger-units", String(sum(orders, function (order) { return order.units; })));
  setText("ledger-list", formatKES(sum(orders, function (order) { return order.units * order.price; })));
  setText("ledger-revenue", formatKES(metrics.revenue));
  setText("ledger-profit", formatKES(metrics.profit));
}

function orderPhrase(order) {
  const unitWord = order.units === 1 ? "unit" : "units";
  return order.id + " (" + order.region + ", " + formatDate(order.date) + ", " +
    order.customer.toLowerCase() + " customer, " + order.units + " " + unitWord +
    ", list value " + formatKES(order.units * order.price) + ")";
}

function narrativeInsights() {
  const months = MONTHS.map(function (month) {
    return Object.assign({}, month, measure(ORDERS.filter(function (order) { return order.month === month.id; })));
  });
  const byRevenue = months.slice().sort(function (a, b) { return a.revenue - b.revenue; });
  const byProfit = months.slice().sort(function (a, b) { return a.profit - b.profit; });
  const byOrders = months.slice().sort(function (a, b) { return a.completed.length - b.completed.length; });
  const weakest = byRevenue[0];
  const strongest = last(byRevenue);
  const january = months[0];
  const february = months[1];
  const march = months[2];
  const aligned = byProfit[0].id === weakest.id && last(byProfit).id === strongest.id &&
    byOrders[0].id === weakest.id && last(byOrders).id === strongest.id;
  let timeBody = "Recognised revenue moved from " + formatKES(january.revenue) + " in January to " +
    formatKES(february.revenue) + " in February (" + formatMom((february.revenue - january.revenue) / january.revenue).text +
    "), then to " + formatKES(march.revenue) + " in March (" +
    formatMom((march.revenue - february.revenue) / february.revenue).text + " versus February).";
  if (aligned) {
    timeBody += " " + weakest.label + " is also the low point on gross profit at " + formatKES(weakest.profit) +
      " and on completed orders at " + weakest.completed.length + ". " + strongest.label +
      " is the high point on gross profit at " + formatKES(strongest.profit) +
      " and on completed orders at " + strongest.completed.length + ".";
  }

  const company = measure(ORDERS);
  const regions = REGIONS.map(function (name) {
    return Object.assign({ name: name }, measure(ORDERS.filter(function (order) { return order.region === name; })));
  });
  const regionRank = regions.slice().sort(function (a, b) { return a.revenue - b.revenue; });
  const lowRegion = regionRank[0];
  const highRegion = last(regionRank);
  const clean = regions.filter(function (region) {
    return region.recorded > 0 && region.returned.length === 0 && region.cancelled.length === 0;
  });
  const aovRank = regions.filter(function (region) { return region.aov !== null; })
    .sort(function (a, b) { return a.aov - b.aov; });
  const marginRank = regions.filter(function (region) { return region.margin !== null; })
    .sort(function (a, b) { return a.margin - b.margin; });
  const cancelRegions = regions.filter(function (region) { return region.cancelled.length > 0; });
  let regionBody = highRegion.name + " contributes " + formatKES(highRegion.revenue) + " of recognised revenue, " +
    formatPct(highRegion.revenue / company.revenue) + ", from " + highRegion.completed.length +
    " completed orders. " + lowRegion.name + " contributes " + formatKES(lowRegion.revenue) + ", " +
    formatPct(lowRegion.revenue / company.revenue) + ", from " + lowRegion.completed.length + " completed orders.";
  if (cancelRegions.length === 1) {
    regionBody += " " + cancelRegions[0].name + " is the only region with a cancellation.";
  }
  if (clean.length === 1 && last(aovRank).name === clean[0].name) {
    regionBody += " " + clean[0].name + " is the only region where every order was completed (" +
      clean[0].recorded + " orders), and it has the highest regional average order value, " +
      formatKES(clean[0].aov) + ".";
  }
  regionBody += " Unit price and unit cost do not vary by city, so the margin gap between " +
    last(marginRank).name + " (" + formatPct(last(marginRank).margin) + ") and " +
    marginRank[0].name + " (" + formatPct(marginRank[0].margin) + ") is product mix, not a different price list.";

  const products = PRODUCTS.map(function (product) {
    return Object.assign({}, product, measure(ORDERS.filter(function (order) { return order.product === product.name; })));
  });
  const revenueRank = products.slice().sort(function (a, b) { return a.revenue - b.revenue; });
  const profitRank = products.slice().sort(function (a, b) { return a.profit - b.profit; });
  const unitRank = products.slice().sort(function (a, b) { return a.units - b.units; });
  const productMargin = products.filter(function (product) { return product.margin !== null; })
    .sort(function (a, b) { return a.margin - b.margin; });
  const topRevenue = last(revenueRank);
  const topProfit = last(profitRank);
  const topUnits = last(unitRank);
  const lowMargin = productMargin[0];
  const highMargin = last(productMargin);
  const electronics = measure(ORDERS.filter(function (order) { return order.category === "Electronics"; }));
  const furniture = measure(ORDERS.filter(function (order) { return order.category === "Furniture"; }));
  let productBody = pluralName(topRevenue.name) + " are the largest revenue line at " +
    formatKES(topRevenue.revenue) + " (" + formatPct(topRevenue.revenue / company.revenue) + "). ";
  productBody += topProfit.name === topRevenue.name
    ? "They are also the largest profit line, at " + formatKES(topProfit.profit) + ". "
    : pluralName(topProfit.name) + " are the largest profit line, at " + formatKES(topProfit.profit) + ". ";
  productBody += lowMargin.name === topRevenue.name
    ? "They have the lowest product margin, " + formatPct(lowMargin.margin) + ". "
    : "The lowest product margin is " + lowMargin.name + " at " + formatPct(lowMargin.margin) + ". ";
  if (topUnits.name !== topRevenue.name) {
    productBody += pluralName(topUnits.name) + " sell the most units (" + topUnits.units + ")";
    if (highMargin.name === topUnits.name) {
      productBody += " and have the highest margin, " + formatPct(highMargin.margin);
    }
    productBody += ", on " + formatKES(topUnits.revenue) + " of revenue. ";
  }
  productBody += "The furniture category is " + formatPct(furniture.revenue / company.revenue) +
    " of recognised revenue and " + formatPct(furniture.profit / company.profit) +
    " of gross profit, at a " + formatPct(furniture.margin) + " margin. The electronics category is " +
    formatPct(electronics.revenue / company.revenue) + " of revenue, at a " + formatPct(electronics.margin) + " margin.";

  const returned = ORDERS.filter(function (order) { return order.status === "Returned"; });
  const cancelled = ORDERS.filter(function (order) { return order.status === "Cancelled"; });
  const furnitureRows = ORDERS.filter(function (order) { return order.category === "Furniture"; });
  const leakParts = [];
  if (returned.length) {
    leakParts.push((returned.length === 1 ? "One order was returned: " : returned.length + " orders were returned: ") +
      joinLabels(returned.map(orderPhrase)) + ".");
    if (returned.every(function (order) { return order.product === returned[0].product; })) {
      leakParts.push(returned.length === 1
        ? "The returned order is " + returned[0].product.toLowerCase() + "."
        : "All of them are " + pluralName(returned[0].product).toLowerCase() + ".");
    }
    if (returned.every(function (order) { return order.customer === "Returning"; })) {
      leakParts.push(returned.length === 1
        ? "It was placed by a returning customer."
        : "All of them were placed by returning customers.");
    }
    leakParts.push((returned.length === 1 ? "The reversed list value is " : "Together they reverse ") +
      formatKES(sum(returned, function (order) { return order.units * order.price; })) +
      (returned.length === 1 ? " and the reversed gross profit is " : " of list value and ") +
      formatKES(sum(returned, function (order) { return order.units * (order.price - order.cost); })) +
      (returned.length === 1 ? "." : " of gross profit."));
  }
  cancelled.forEach(function (order) {
    const name = order.product.toLowerCase();
    const article = /^[aeiou]/i.test(name) ? "an" : "a";
    leakParts.push("One order was cancelled: " + orderPhrase(order) + ", " + article + " " + name + ".");
  });
  if (furnitureRows.length && furnitureRows.every(function (order) { return order.status === "Completed"; })) {
    leakParts.push("All " + furnitureRows.length + " furniture orders were completed.");
  }

  const newer = measure(ORDERS.filter(function (order) { return order.customer === "New"; }));
  const returning = measure(ORDERS.filter(function (order) { return order.customer === "Returning"; }));
  const aspGap = Math.abs(newer.asp - returning.asp) / Math.max(newer.asp, returning.asp);
  const returningUnits = returning.units / returning.completed.length;
  const newUnits = newer.units / newer.completed.length;
  let customerBody = "Returning orders contribute " + formatKES(returning.revenue) + ", " +
    formatPct(returning.revenue / company.revenue) + " of recognised revenue, across " +
    returning.completed.length + " completed orders. New orders contribute " + formatKES(newer.revenue) +
    " across " + newer.completed.length + " completed orders. Average order value is " +
    formatKES(returning.aov) + " on returning orders and " + formatKES(newer.aov) + " on new orders.";
  if (aspGap < 0.05) {
    customerBody += " Average selling price is close: " + formatKES(returning.asp) + " versus " +
      formatKES(newer.asp) + ". The gap in order value is units per order, " +
      returningUnits.toFixed(2) + " versus " + newUnits.toFixed(2) + ".";
  }
  customerBody += " The file has no customer identifier, so this is not a retention rate and it is not a lifetime value.";

  let productTitle = pluralName(topRevenue.name) + " lead on revenue";
  if (topProfit.name === topRevenue.name && lowMargin.name === topRevenue.name) {
    productTitle = pluralName(topRevenue.name) + " lead on revenue and profit, at the lowest margin";
  }
  const customerTitle = aspGap < 0.05 && returningUnits > newUnits * 1.1
    ? "Returning orders are larger because they contain more units"
    : "Returning orders contribute more recognised revenue";
  const leakTitle = returned.length && returned.every(function (order) { return order.product === "Phone"; })
    ? "Every return in the file is a phone"
    : "Returns and cancellations sit outside recognised sales";

  return [
    { title: strongest.label + " leads on revenue, " + weakest.label + " trails", paragraphs: [timeBody] },
    { title: highRegion.name + " carries the revenue, " + lowRegion.name + " is the smallest book", paragraphs: [regionBody] },
    { title: productTitle, paragraphs: [productBody] },
    { title: leakTitle, paragraphs: [leakParts.join(" ")] },
    { title: customerTitle, paragraphs: [customerBody] }
  ];
}

function viewInsights(orders) {
  const metrics = measure(orders);
  const items = [];
  const months = monthSlices(orders);
  const withRevenue = months.filter(function (month) { return month.revenue > 0; });
  if (withRevenue.length >= 2) {
    const ranked = withRevenue.slice().sort(function (a, b) { return a.revenue - b.revenue; });
    const moves = [];
    months.forEach(function (month, index) {
      const ratio = priorMom(months, index);
      if (ratio !== null) {
        const prev = MONTHS[MONTHS.findIndex(function (item) { return item.id === month.id; }) - 1];
        moves.push({ label: month.label + " versus " + prev.label, ratio: ratio });
      }
    });
    let extra = "";
    if (moves.length) {
      const strongestMove = moves.slice().sort(function (a, b) { return Math.abs(b.ratio) - Math.abs(a.ratio); })[0];
      extra = " The largest adjacent change is " + strongestMove.label + ", " + formatMom(strongestMove.ratio).text + ".";
    }
    items.push({
      title: last(ranked).label + " has the highest revenue in this view",
      paragraphs: ["Completed revenue is " + formatKES(last(ranked).revenue) + " in " + last(ranked).label +
        " and " + formatKES(ranked[0].revenue) + " in " + ranked[0].label + "." + extra +
        " Month-to-month change is shown only when the previous calendar month is included."]
    });
  } else if (withRevenue.length === 1) {
    const only = withRevenue[0];
    items.push({
      title: only.label + " is the only month with recognised revenue",
      paragraphs: ["Completed revenue in this view is " + formatKES(only.revenue) + " and gross profit is " +
        formatKES(only.profit) + ", from " + only.completed.length + " completed " +
        (only.completed.length === 1 ? "order." : "orders.")]
    });
  } else {
    items.push({
      title: "No recognised revenue in this view",
      paragraphs: [metrics.recorded + (metrics.recorded === 1 ? " order is" : " orders are") +
        " in the filter and none " + (metrics.recorded === 1 ? "is" : "are") +
        " completed, so revenue, cost and profit stay at zero."]
    });
  }

  const regions = REGIONS.filter(function (name) { return state.regions.has(name); }).map(function (name) {
    return Object.assign({ name: name }, measure(orders.filter(function (order) { return order.region === name; })));
  }).filter(function (region) { return region.revenue > 0; });
  if (regions.length >= 2 && metrics.revenue > 0) {
    const ranked = regions.slice().sort(function (a, b) { return a.revenue - b.revenue; });
    items.push({
      title: last(ranked).name + " leads this view on revenue",
      paragraphs: [last(ranked).name + " contributes " + formatKES(last(ranked).revenue) + " (" +
        formatPct(last(ranked).revenue / metrics.revenue) + " of recognised revenue in this view). " +
        ranked[0].name + " contributes " + formatKES(ranked[0].revenue) + " (" +
        formatPct(ranked[0].revenue / metrics.revenue) + "). Margins differ by mix: unit price and unit cost do not vary by city in this file."]
    });
  } else if (regions.length === 1) {
    const only = regions[0];
    items.push({
      title: only.name + " is the only region with recognised revenue",
      paragraphs: [formatKES(only.revenue) + " of revenue and " + formatKES(only.profit) +
        " of gross profit in this view come from " + only.name + ", on " + only.completed.length +
        " completed " + (only.completed.length === 1 ? "order." : "orders.")]
    });
  } else {
    items.push({
      title: "No regional revenue in this view",
      paragraphs: ["None of the selected regions has a completed order under the current filters."]
    });
  }

  const products = productsAllowed().map(function (product) {
    return Object.assign({}, product, measure(orders.filter(function (order) { return order.product === product.name; })));
  }).filter(function (product) { return product.revenue > 0; });
  if (products.length === 1) {
    const only = products[0];
    items.push({
      title: pluralName(only.name) + " are the only product line with revenue",
      paragraphs: [formatKES(only.revenue) + " revenue, " + formatKES(only.profit) + " gross profit, " +
        only.units + " units, margin " + formatPct(only.margin) + "."]
    });
  } else if (products.length > 1) {
    const top = products.slice().sort(function (a, b) { return b.revenue - a.revenue; })[0];
    const topProfit = products.slice().sort(function (a, b) { return b.profit - a.profit; })[0];
    const topUnits = products.slice().sort(function (a, b) { return b.units - a.units; })[0];
    const margins = products.slice().sort(function (a, b) { return b.margin - a.margin; });
    let text = pluralName(top.name) + " lead this view on revenue at " + formatKES(top.revenue) +
      " (" + formatPct(top.revenue / metrics.revenue) + ").";
    text += topProfit.name === top.name
      ? " Gross profit on that line is " + formatKES(top.profit) + " (" + formatPct(top.margin) + " margin)."
      : " " + pluralName(topProfit.name) + " lead on gross profit at " + formatKES(topProfit.profit) + ".";
    if (topUnits.name !== top.name) text += " " + pluralName(topUnits.name) + " lead on units, at " + topUnits.units + ".";
    if (margins.length >= 2) text += " The highest margin in this view is " + margins[0].name + " at " + formatPct(margins[0].margin) + ".";
    items.push({ title: pluralName(top.name) + " lead revenue in this view", paragraphs: [text] });
  } else {
    items.push({
      title: "No product revenue in this view",
      paragraphs: ["No completed product sales match the current filters."]
    });
  }

  const bits = [];
  const excludedCount = metrics.returned.length + metrics.cancelled.length;
  if (excludedCount) {
    const parts = [];
    if (metrics.returned.length) parts.push(metrics.returned.length + " returned " + (metrics.returned.length === 1 ? "order" : "orders"));
    if (metrics.cancelled.length) parts.push(metrics.cancelled.length + " cancelled " + (metrics.cancelled.length === 1 ? "order" : "orders"));
    bits.push(parts.join(" and ") + (excludedCount === 1 ? " is" : " are") + " excluded from revenue. " + (excludedCount === 1 ? "Its" : "Their") + " list value is " + formatKES(metrics.excludedList) + ".");
    if (metrics.returned.length && metrics.returned.every(function (order) { return order.product === "Phone"; })) {
      bits.push(metrics.returned.length === 1 ? "The returned order is a phone." : "Every returned order in this view is a phone.");
    }
  } else if (metrics.recorded) {
    bits.push("Every order in this view was completed.");
  }
  const newCompleted = metrics.completed.filter(function (order) { return order.customer === "New"; });
  const returningCompleted = metrics.completed.filter(function (order) { return order.customer === "Returning"; });
  if (newCompleted.length && returningCompleted.length) {
    const newer = measure(newCompleted);
    const returning = measure(returningCompleted);
    bits.push("Average order value is " + formatKES(returning.aov) + " on returning orders and " +
      formatKES(newer.aov) + " on new orders. This is not a retention rate: the file has no customer identifier.");
  } else if (metrics.completed.length) {
    bits.push("This view does not contain both customer types on completed orders, so that comparison is not available. The file still has no customer identifier.");
  }
  if (!bits.length) bits.push("Nothing in this view can be recognised as a sale.");
  items.push({
    title: excludedCount ? "Some orders in this view are not sales" : "Customer and status notes",
    paragraphs: [bits.join(" ")]
  });
  return items;
}

function renderInsights(orders) {
  const full = isFullBook() && controlOk;
  const items = full ? narrativeInsights() : viewInsights(orders);
  setText("insight-scope", full
    ? "These points describe the whole file. The recommendations below are also written for the full quarter, and they stay put when you filter."
    : "These points describe the current filter only. The recommendations further down stay on the full quarter.");
  const host = document.getElementById("insight-list");
  host.replaceChildren();
  items.forEach(function (item) {
    const article = document.createElement("article");
    article.className = "card insight";
    const kicker = document.createElement("p");
    kicker.className = "kicker";
    kicker.textContent = full ? "Full quarter" : "This view";
    const title = document.createElement("h3");
    title.textContent = item.title;
    article.appendChild(kicker);
    article.appendChild(title);
    item.paragraphs.forEach(function (text) {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      article.appendChild(paragraph);
    });
    host.appendChild(article);
  });
}

function renderKpis(metrics) {
  setText("kpi-revenue", formatKES(metrics.revenue));
  setText("kpi-revenue-note", metrics.completed.length
    ? metrics.completed.length + " completed " + (metrics.completed.length === 1 ? "order" : "orders")
    : "No completed orders in this view");
  setText("kpi-profit", formatKES(metrics.profit));
  setText("kpi-profit-note", "Cost of goods " + formatKES(metrics.cogs));
  setText("kpi-margin", formatPct(metrics.margin));
  setText("kpi-margin-note", metrics.margin === null ? "No completed revenue in this view" : "Gross profit divided by revenue");
  setText("kpi-orders", String(metrics.recorded));
  setText("kpi-orders-note", metrics.completed.length + " completed · " + metrics.returned.length + " returned · " + metrics.cancelled.length + " cancelled");
  setText("kpi-units", String(metrics.units));
  setText("kpi-units-note", metrics.asp === null ? "Completed units only" : "Average selling price " + formatKES(metrics.asp));
  setText("kpi-aov", metrics.aov === null ? "—" : formatKES(metrics.aov));
  setText("kpi-aov-note", metrics.aov === null ? "No completed orders in this view" : "Revenue divided by completed orders");
}

function renderStrip(metrics) {
  if (metrics.recorded === 0) {
    setText("excluded-label", "Nothing in this view");
    setText("excluded-value", "—");
    setText("excluded-detail", "No orders match the filters.");
    return;
  }
  setText("excluded-label", "Excluded list value");
  setText("excluded-value", formatKES(metrics.excludedList));
  const rate = metrics.returnRate === null ? "Return rate —" : "Return rate " + formatPct(metrics.returnRate) + " of orders that were not cancelled";
  setText("excluded-detail", metrics.returned.length + " returned · " + metrics.cancelled.length + " cancelled · " + rate);
}

function describeMonths() {
  if (state.months.size === 0) return "no months";
  if (state.months.size === MONTHS.length) return "all months";
  return joinLabels(MONTHS.filter(function (month) { return state.months.has(month.id); }).map(function (month) { return month.label; }));
}

function describeRegions() {
  if (state.regions.size === 0) return "no regions";
  if (state.regions.size === REGIONS.length) return "all regions";
  return joinLabels(REGIONS.filter(function (region) { return state.regions.has(region); }));
}

function renderSummary(metrics) {
  const category = state.category === "all" ? "all categories" : state.category;
  const product = state.product === "all" ? "all products" : state.product;
  setText("view-summary", metrics.recorded + (metrics.recorded === 1 ? " order" : " orders") +
    " in this view, " + metrics.completed.length + " completed — " + describeMonths() + "; " +
    describeRegions() + "; " + category + "; " + product + ".");
  document.getElementById("empty-note").hidden = metrics.recorded !== 0;
  const completedNote = document.getElementById("completed-note");
  if (metrics.recorded > 0 && metrics.completed.length === 0) {
    completedNote.hidden = false;
    completedNote.textContent = "This view has orders, but none are completed. Recognised revenue is KES 0. The status chart and the ledger still include them.";
  } else {
    completedNote.hidden = true;
  }
}

function syncChips() {
  const allMonths = state.months.size === MONTHS.length;
  document.querySelectorAll("#month-filters button").forEach(function (button) {
    const id = button.dataset.month;
    const pressed = id === "all" ? allMonths : !allMonths && state.months.has(id);
    button.setAttribute("aria-pressed", String(pressed));
  });
  const allRegions = state.regions.size === REGIONS.length;
  document.querySelectorAll("#region-filters button").forEach(function (button) {
    const id = button.dataset.region;
    const pressed = id === "all" ? allRegions : !allRegions && state.regions.has(id);
    button.setAttribute("aria-pressed", String(pressed));
  });
  document.getElementById("category-filter").value = state.category;
  const productSelect = document.getElementById("product-filter");
  const hasOption = Array.prototype.some.call(productSelect.options, function (option) {
    return option.value === state.product;
  });
  if (hasOption) productSelect.value = state.product;
}

function syncProductOptions() {
  const select = document.getElementById("product-filter");
  const current = state.product;
  const allowed = productsForCategory(state.category);
  select.replaceChildren();
  const all = document.createElement("option");
  all.value = "all";
  all.textContent = "All products";
  select.appendChild(all);
  allowed.forEach(function (product) {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    select.appendChild(option);
  });
  const keep = allowed.some(function (product) { return product.name === current; });
  state.product = keep ? current : "all";
  select.value = state.product;
}

function toggleSet(set, id, universe) {
  if (id === "all") {
    universe.forEach(function (item) { set.add(item); });
    return;
  }
  if (set.size === universe.length) {
    set.clear();
    set.add(id);
    return;
  }
  if (set.has(id)) set.delete(id);
  else set.add(id);
}

function render() {
  const orders = filteredOrders();
  const metrics = measure(orders);
  syncChips();
  renderSummary(metrics);
  renderStrip(metrics);
  renderKpis(metrics);
  renderCharts(orders, metrics);
  renderMonthTable(orders);
  renderRegionTable(orders, metrics);
  renderProductTable(orders);
  renderCustomerTable(orders, metrics);
  renderLedger(orders, metrics);
  renderInsights(orders);
}

function resetFilters() {
  state.months = new Set(MONTHS.map(function (month) { return month.id; }));
  state.regions = new Set(REGIONS);
  state.category = "all";
  state.product = "all";
  syncProductOptions();
  render();
}

function syncThemeButton() {
  const button = document.getElementById("theme-toggle");
  const dark = isDark();
  button.setAttribute("aria-pressed", String(dark));
  button.textContent = dark ? "Use light mode" : "Use dark mode";
}

function toggleTheme() {
  const next = isDark() ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("retail-close-theme", next); } catch (error) { /* storage may be blocked */ }
  syncThemeButton();
  render();
}

function assertControl() {
  const metrics = measure(ORDERS);
  controlOk = metrics.revenue === 1558000 &&
    metrics.cogs === 1064000 &&
    metrics.profit === 494000 &&
    metrics.units === 50 &&
    metrics.completed.length === 21 &&
    metrics.recorded === 24 &&
    metrics.returned.length === 2 &&
    metrics.cancelled.length === 1 &&
    metrics.excludedList === 140000 &&
    metrics.excludedProfit === 43000;
  document.getElementById("check-banner").hidden = controlOk;
  if (!controlOk) console.error("Control totals failed", metrics);
}

function init() {
  document.getElementById("filters").addEventListener("submit", function (event) { event.preventDefault(); });
  document.getElementById("month-filters").addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;
    toggleSet(state.months, button.dataset.month, MONTHS.map(function (month) { return month.id; }));
    render();
  });
  document.getElementById("region-filters").addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;
    toggleSet(state.regions, button.dataset.region, REGIONS);
    render();
  });
  document.getElementById("category-filter").addEventListener("change", function (event) {
    state.category = event.target.value;
    syncProductOptions();
    render();
  });
  document.getElementById("product-filter").addEventListener("change", function (event) {
    state.product = event.target.value;
    render();
  });
  document.getElementById("reset-filters").addEventListener("click", resetFilters);
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  syncThemeButton();
  syncProductOptions();
  assertControl();
  render();
  window.RETAIL_AUDIT = {
    ORDERS: ORDERS,
    measure: measure,
    filteredOrders: filteredOrders,
    state: state,
    formatKES: formatKES,
    formatPct: formatPct,
    narrativeInsights: narrativeInsights
  };
}

init();
