// ANALYTICS DASHBOARD - MAIN SCRIPT
// The data used will be coming from data.js (it must be loaded first).
// What this file does:
//   1. Finds the HTML elements we need
//   2. Shows the stat cards, orders and platforms
//   3. Draws the sales chart (Chart.js)
//   4. Handles the search, dropdown, buttons and dark mode

// 1. FETCHING THE ELEMENTS NEEDED
const statsBox = document.getElementById("stats");
const ordersBody = document.getElementById("orders-body");
const platformList = document.getElementById("platform-list");

const searchInput = document.getElementById("search");
const periodSelect = document.getElementById("period");
const ordersToggle = document.getElementById("orders-toggle");
const platformToggle = document.getElementById("platform-toggle");

const chartBox = document.getElementById("chart-box");
const chartCanvas = document.getElementById("sales-chart");

const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");
const lightBtn = document.getElementById("light-btn");
const darkBtn = document.getElementById("dark-btn");

const orderDialog = document.getElementById("order-dialog");

// These remember if "See All" was clicked
let showAllOrders = false;
let showAllPlatforms = false;

// How many rows to show before "See All" is clicked
const ordersLimit = 5;
const platformsLimit = 4;


// 2. SHOW THE STAT CARDS
function showStats() {
    let html = "";

    // Go through every item in the stats list from data.js
    for (const stat of stats) {
        // Pick the badge colour and arrow depending on the trend
        let badgeClass = "badge-up";
        let arrow = "assets/icons/positive-rise.svg";
        let trendWord = "Up";

        if (stat.trend === "down") {
            badgeClass = "badge-down";
            arrow = "assets/icons/negative-rise.svg";
            trendWord = "Down";
        }

        // Build the HTML for one card and add it to the others
        html += `
            <article class="stat-card">
                <div class="stat-top">
                    <span class="stat-icon"><img src="${stat.icon}" alt=""></span>
                    <img class="stat-line" src="${stat.line}" alt="">
                </div>
                <p class="stat-title">${stat.title}</p>
                <strong class="stat-value">${stat.value}</strong>
                <div class="stat-change">
                    <span class="badge ${badgeClass}">
                        <img src="${arrow}" alt="">
                        <span class="sr-only">${trendWord}</span>
                        ${stat.change}
                    </span>
                    <span class="stat-note">vs. previous month</span>
                </div>
            </article>
        `;
    }

    statsBox.innerHTML = html;
}


// 3. SHOW THE ORDERS TABLE
function showOrders() {
    // Whatever is typed in the search box (in lowercase, so "MARCUS" also matches)
    const searchText = searchInput.value.toLowerCase().trim();

    // Step 1: keep only the orders whose name contains the search text
    const matches = [];
    for (const order of orders) {
        if (order.name.toLowerCase().includes(searchText)) {
            matches.push(order);
        }
    }

    // Step 2: if "See All" was not clicked (and nobody is searching), show only the first few
    let listToShow = matches;
    if (showAllOrders === false && searchText === "") {
        listToShow = matches.slice(0, ordersLimit);
    }

    // Step 3: build one table row for each order
    let html = "";
    for (const order of listToShow) {
        let statusClass = "status-paid";
        if (order.status === "Refund") {
            statusClass = "status-refund";
        }

        html += `
            <tr>
                <td>
                    <div class="customer">
                        <img src="${order.image}" alt="">
                        <span>${order.name}</span>
                    </div>
                </td>
                <td>${order.date}</td>
                <td class="amount hide-on-mobile">${formatMoney(order.amount)}</td>
                <td class="${statusClass} hide-on-mobile">${order.status}</td>
                <td>
                    <button type="button" class="view-btn" data-id="${order.id}" aria-label="View invoice for ${order.name}">
                        <img class="dark-icon" src="assets/icons/view.svg" alt="">
                        View
                    </button>
                </td>
            </tr>
        `;
    }

    // Step 4: if nothing matched, show a message instead of an empty table
    if (listToShow.length === 0) {
        html = `<tr class="empty-row"><td colspan="5">No orders found. Try a different name.</td></tr>`;
    }

    ordersBody.innerHTML = html;

    // Step 5: the "See All" button only makes sense when there are hidden orders
    ordersToggle.hidden = (searchText !== "" || orders.length <= ordersLimit);
    if (showAllOrders) {
        ordersToggle.textContent = "Show Less";
    } else {
        ordersToggle.textContent = "See All";
    }
}


// ---------- 4. SHOW THE TOP PLATFORMS ----------
function showPlatforms() {
    let listToShow = platforms;
    if (showAllPlatforms === false) {
        listToShow = platforms.slice(0, platformsLimit);
    }

    let html = "";
    for (const platform of listToShow) {
        // The width and colour of the bar come from the data
        html += `
            <div class="platform">
                <p class="platform-name">${platform.name}</p>
                <div class="progress" role="progressbar" aria-label="${platform.name} share"
                     aria-valuenow="${platform.percent}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-fill" style="width: ${platform.percent}%; background-color: ${platform.color};"></div>
                </div>
                <div class="platform-numbers">
                    <span>${formatMoney(platform.amount)}</span>
                    <span>${platform.growth}</span>
                </div>
            </div>
        `;
    }

    platformList.innerHTML = html;

    if (showAllPlatforms) {
        platformToggle.textContent = "Show Less";
    } else {
        platformToggle.textContent = "See All";
    }
}


// 5. SMALL HELPER FUNCTIONS

// Turns 18000 into "$18,000"
function formatMoney(number) {
    return "$" + number.toLocaleString("en-US");
}

// Checks if dark mode is switched on
function isDarkMode() {
    return document.body.classList.contains("dark");
}


// 6. DRAW THE SALES CHART
let salesChart = null;   // will hold the chart so it can replaced later

function drawChart() {
    // If the Chart.js file did not load (for example, no internet), show a message
    if (typeof Chart === "undefined") {
        chartBox.innerHTML = `<p class="chart-error">The chart could not load. Check your internet connection and refresh.</p>`;
        return;
    }

    // Get the numbers for the period chosen in the dropdown (monthly, weekly or yearly)
    const period = periodSelect.value;
    const data = salesData[period];

    // Pick colours that match light or dark mode
    let lightBar = "#c9efe3";
    let textColor = "#6b6e72";
    let gridColor = "#ebecf2";
    if (isDarkMode()) {
        lightBar = "#2b4a44";
        textColor = "#a0a6b1";
        gridColor = "#2a2e38";
    }
    const highlightBar = "#34caa5";

    // Find the biggest value, so we can colour that bar green
    let biggest = 0;
    for (const value of data.values) {
        if (value > biggest) {
            biggest = value;
        }
    }

    // Make a colour for every bar: green for the biggest, light mint for the rest
    const barColors = [];
    for (const value of data.values) {
        if (value === biggest) {
            barColors.push(highlightBar);
        } else {
            barColors.push(lightBar);
        }
    }

    // If a chart is already on the page, remove it before drawing a new one
    if (salesChart !== null) {
        salesChart.destroy();
    }

    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    // Create the chart
    salesChart = new Chart(chartCanvas, {
        type: "bar",
        data: {
            labels: data.labels,
            datasets: [{
                label: "Sales",
                data: data.values,
                backgroundColor: barColors,
                hoverBackgroundColor: highlightBar,   // bars turn green when you hover over them
                borderRadius: 20,                     // round bars
                borderSkipped: false,                 // round the bottom corners too
                maxBarThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,   // lets the chart fill the height we set in the CSS
            plugins: {
                legend: { display: false },   // one dataset, so no legend needed
                tooltip: {
                    backgroundColor: "#0d062d",
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        // Shows "$45,000" in the tooltip
                        label: function (context) {
                            return formatMoney(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: textColor }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: gridColor },
                    border: { display: false },
                    ticks: {
                        color: textColor,
                        // Shows "$10k" instead of "10000"
                        callback: function (value) {
                            return "$" + value / 1000 + "k";
                        }
                    }
                }
            }
        }
    });
}


// ---------- 7. DARK MODE ----------
function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    // Highlight the button of the theme that is on
    lightBtn.classList.toggle("active", theme !== "dark");
    darkBtn.classList.toggle("active", theme === "dark");
    lightBtn.setAttribute("aria-pressed", theme !== "dark");
    darkBtn.setAttribute("aria-pressed", theme === "dark");

    // Save the choice so it is still there after a refresh
    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        // Some browsers block saving. That is fine, the theme just will not be remembered.
    }

    // The chart colours depend on the theme, so draw it again
    drawChart();
}

// Start with the saved theme. If there is none, use the computer's setting.
function startTheme() {
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem("theme");
    } catch (error) {
        savedTheme = null;
    }

    if (savedTheme === null) {
        const computerPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        savedTheme = computerPrefersDark ? "dark" : "light";
    }

    setTheme(savedTheme);
}


// ---------- 8. INVOICE POPUP ----------
function openInvoice(id) {
    // Find the order with this id
    let chosenOrder = null;
    for (const order of orders) {
        if (order.id === id) {
            chosenOrder = order;
        }
    }
    if (chosenOrder === null) {
        return;
    }

    // Put its details in the popup, then open it
    document.getElementById("dialog-number").textContent = "INV-" + (1000 + chosenOrder.id);
    document.getElementById("dialog-name").textContent = chosenOrder.name;
    document.getElementById("dialog-date").textContent = chosenOrder.date;
    document.getElementById("dialog-amount").textContent = formatMoney(chosenOrder.amount);
    document.getElementById("dialog-status").textContent = chosenOrder.status;
    orderDialog.showModal();
}


// ---------- 9. WHAT HAPPENS WHEN THE USER DOES SOMETHING ----------

// Typing in the search box filters the orders
searchInput.addEventListener("input", showOrders);

// Choosing Monthly / Weekly / Yearly redraws the chart
periodSelect.addEventListener("change", drawChart);

// "See All" / "Show Less" buttons
ordersToggle.addEventListener("click", function () {
    showAllOrders = !showAllOrders;   // flips true to false, or false to true
    showOrders();
});

platformToggle.addEventListener("click", function () {
    showAllPlatforms = !showAllPlatforms;
    showPlatforms();
});

// Clicking "View" in the table opens the invoice.
// The rows are created by JavaScript, so we listen on the table body
// and check which button was clicked.
ordersBody.addEventListener("click", function (event) {
    const button = event.target.closest(".view-btn");
    if (button === null) {
        return;
    }
    openInvoice(Number(button.dataset.id));
});

document.getElementById("dialog-close").addEventListener("click", function () {
    orderDialog.close();
});

// Light and dark buttons
lightBtn.addEventListener("click", function () {
    setTheme("light");
});
darkBtn.addEventListener("click", function () {
    setTheme("dark");
});

// Menu button on small screens opens and closes the sidebar
hamburger.addEventListener("click", function () {
    const isOpen = sidebar.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
});

// The menu links do not go anywhere yet (this is a demo),
// so stop them from jumping to the top of the page
const emptyLinks = document.querySelectorAll('a[href="#"]');
for (const link of emptyLinks) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
    });
}


// ---------- 10. START EVERYTHING ----------
document.getElementById("today-date").textContent = todayText;
showStats();
showOrders();
showPlatforms();
startTheme();   // this also draws the chart
