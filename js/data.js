// DASHBOARD DATA
// All the numbers on the dashboard is updated in this file.

// The date shown at the top of the page (Will let this update base on the time anybody opens the dashboard)
const todayText = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric', year:
    'numeric'
});


// ----- 1. The four small cards (Total Order, Total Refund...) -----
// trend: "up" shows a green badge, "down" shows a red badge
const stats = [
    {
        title: "Total Order",
        value: "350",
        change: "23.5%",
        trend: "up",
        icon: "assets/icons/icon-total-order.svg",
        line: "assets/icons/line-total-order.svg"
    },
    {
        title: "Total Refund",
        value: "270",
        change: "23.5%",
        trend: "down",
        icon: "assets/icons/icon-total-refund.svg",
        line: "assets/icons/line-total-refund.svg"
    },
    {
        title: "Average Sales",
        value: "1,567",
        change: "23.5%",
        trend: "down",
        icon: "assets/icons/icon-average-sales.svg",
        line: "assets/icons/line-average-sales.svg"
    },
    {
        title: "Total Income",
        value: "$350,000",
        change: "23.5%",
        trend: "up",
        icon: "assets/icons/icon-total-income.svg",
        line: "assets/icons/line-total-income.svg"
    }
];


// ----- 2. The sales chart -----
// Each period has its own labels (bottom of the chart)
// and values (the height of each bar, in dollars)
const salesData = {
    monthly: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [12000, 23000, 7000, 33000, 16000, 45000, 16000, 27000, 36000, 9000, 34000, 30000]
    },
    weekly: {
        labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8", "Wk 9", "Wk 10", "Wk 11", "Wk 12"],
        values: [8200, 9600, 7400, 11800, 10300, 12500, 8900, 13700, 11200, 9800, 14200, 12900]
    },
    yearly: {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
        values: [310000, 360000, 290000, 420000, 470000, 520000]
    }
};


// ----- 3. The "Last orders" table -----
// image: the customer's photo
// status: must be either "Paid" or "Refund"
const orders = [
    { id: 1, name: "Marcus Bergson",  image: "assets/images/customer-1.jpg", date: "Nov 15, 2023", amount: 18000,  status: "Paid" },
    { id: 2, name: "Jaydon Vaccaro",  image: "assets/images/customer-2.jpg", date: "Nov 15, 2023", amount: 150000, status: "Refund" },
    { id: 3, name: "Corey Schleifer", image: "assets/images/customer-3.jpg", date: "Nov 14, 2023", amount: 87000,  status: "Paid" },
    { id: 4, name: "Cooper Press",    image: "assets/images/customer-4.jpg", date: "Nov 14, 2023", amount: 100000, status: "Refund" },
    { id: 5, name: "Phillip Lubin",   image: "assets/images/customer-5.jpg", date: "Nov 14, 2023", amount: 78000,  status: "Paid" },
    // These three only show up when you click "See All"
    { id: 6, name: "Elena Marsh",     image: "assets/images/customer-2.jpg", date: "Nov 13, 2023", amount: 42000,  status: "Paid" },
    { id: 7, name: "Tobias Wren",     image: "assets/images/customer-4.jpg", date: "Nov 13, 2023", amount: 65500,  status: "Paid" },
    { id: 8, name: "Amara Okafor",    image: "assets/images/customer-1.jpg", date: "Nov 12, 2023", amount: 23750,  status: "Refund" }
];


// ----- 4. The "Top Platform" list -----
// percent: how full the coloured bar should be (0 to 100)
const platforms = [
    { name: "Book Bazaar",   amount: 2500000, growth: "+15%", percent: 50, color: "#6160DC" },
    { name: "Artisan Aisle", amount: 1800000, growth: "+10%", percent: 40, color: "#54C5EB" },
    { name: "Toy Troop",     amount: 1200000, growth: "+8%",  percent: 30, color: "#FFB74A" },
    { name: "X Store",       amount: 600000,  growth: "+5%",  percent: 25, color: "#ED544E" },
    // These two only show up when you click "See All"
    { name: "Gadget Grove",  amount: 450000,  growth: "+4%",  percent: 20, color: "#34CAA5" },
    { name: "Home Haven",    amount: 300000,  growth: "+3%",  percent: 15, color: "#A78BFA" }
];
