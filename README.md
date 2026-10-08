# Analytics Dashboard

A sales analytics dashboard built with plain HTML, CSS and JavaScript. It shows sales trends, key numbers, recent orders and top platforms, and it works on desktop, tablet and phone.

This was one of my first projects when I started learning to code. I came back to it later to clean up the code, add real features and make it work properly.

<!-- Add a screenshot of the dashboard here, for example: ![Dashboard screenshot](assets/screenshot.png) -->

<!-- Add your live demo link here, for example: **Live demo:** https://your-project.vercel.app -->

## Features

- **Sales chart** drawn with Chart.js. Switch between monthly, weekly and yearly sales. The highest bar is highlighted and hovering a bar shows the exact amount.
- **Stat cards** for total orders, refunds, average sales and income, with green and red badges for the trend.
- **Last orders table** with a search box that filters by customer name, a "See All" button, and an invoice popup when you click "View".
- **Top platforms** list with progress bars and a "See All" button.
- **Light and dark mode.** Your choice is saved in the browser, and it follows your computer's setting the first time you visit.
- **Responsive layout.** On small screens the sidebar slides in from the left when you press the menu button.
- **Accessible basics:** labelled icons and form fields, a visible keyboard focus outline, and readable text colours.

## Built with

- HTML
- CSS (Grid, Flexbox and CSS variables)
- JavaScript (no frameworks)
- [Chart.js](https://www.chartjs.org/) for the chart
- Google Fonts: Inter and Plus Jakarta Sans

## Project structure

```
analytics-dashboard/
├── index.html        the page
├── css/
│   └── style.css     all the styles, split into labelled sections
├── js/
│   ├── data.js       all the numbers shown on the dashboard
│   └── main.js       builds the page, draws the chart, handles clicks
└── assets/
    ├── icons/        sidebar, header and card icons
    └── images/       customer and profile photos
```

## How to run it

No install or build step is needed.

1. Download or clone this repository.
2. Open `index.html` in your browser.

The chart and fonts load from the internet, so you need to be online the first time. If you use VS Code, the "Live Server" extension is a nice way to see changes as you edit.

## Changing the data

Everything on the dashboard comes from `js/data.js`. To change the chart values, the orders or the platforms, edit that file and refresh the page. You do not need to touch the HTML.

## What I improved from the first version

- Replaced the chart picture with a real, interactive chart
- Moved all the hardcoded content into one data file
- Made the search, dropdown, theme switch and menu button work
- Used a proper table, page landmarks and labelled icons
- Fixed invalid CSS, made the text larger and easier to read, and organised the styles with variables
- Renamed and organised the images and made the profile photos much smaller (the biggest was almost 4 MB)
