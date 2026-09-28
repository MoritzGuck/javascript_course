import { eventList, countEventsByCategory } from "./events.js";
import { fetchWikipediaSummary } from "./api.js";

import { Chart } from "chart.js/auto";

const eventsContainer = document.querySelector("#events-container");


function renderEvents(events) {
    eventsContainer.innerHTML = "";
    events.forEach(event => {
        const article = document.createElement("article");
        article.classList.add('event');
        eventsContainer.appendChild(article);
        article.setAttribute('data-id', event.id);
        article.innerHTML = `
            <h3>${event.title}</h3>
            <time>${event.year}</time>
            <em>📡 Decrypting Wikipedia fragment...</em>
            `;

        article.addEventListener("mouseenter", () => { article.classList.add("neural-highlight") });
        article.addEventListener("mouseleave", () => { article.classList.remove("neural-highlight") });

        const wikiPathArray = event.sourceUrl.split("/");
        let wikiPath = wikiPathArray.at(-1);

        fetchWikipediaSummary(wikiPath).then(eventSummary => {
            article.innerHTML = `
                <h3>${event.title}</h3>
                <time>${event.year}</time>
                <p>${eventSummary.extract}</p>
                `;

        }).catch(error => { console.log(`could not load event ${event.title}`) }

        )
    });
}




const canvas = document.getElementById("timeline");
const ctx = canvas.getContext("2d");
const x_padding = 50;
const y_padding = 100;

let mouseX = 0;
let mouseY = 0;

let activeEvents = eventList;

function drawTimeline(hoveredEvent = null, events = activeEvents) {
    activeEvents = events;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.moveTo(x_padding, y_padding);
    ctx.lineTo(1000 - x_padding, y_padding);
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;
    ctx.stroke();

    const years = events.map(event => event.year);
    let minYear = Math.min(...years);
    let maxYear = Math.max(...years);
    events.forEach(event => {
        let event_year = event.year;
        let normalized_year = event_year - minYear;
        let standardized_year = normalized_year / (maxYear - minYear);
        let x_pos = x_padding + standardized_year * (1000 - x_padding * 2);
        const radius = 8;

        ctx.beginPath();
        ctx.arc(x_pos, y_padding, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffaa00";
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.translate(x_pos, y_padding + 30);
        ctx.rotate(-0.78);

        ctx.fillText(event_year, 0, 0);
        ctx.restore();

        if (hoveredEvent === event) {
            ctx.fillStyle = "#00f0ff";
            ctx.font = "bold 14px monospace";
            ctx.textAlign = "center";
            ctx.fillText(event.title, x_pos, y_padding - 20);
        }
    })
}

drawTimeline();

canvas.addEventListener("mousemove", (mouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (mouseEvent.clientX - rect.left) * scaleX
    const mouseY = (mouseEvent.clientY - rect.top) * scaleY
    //console.log(`Scanner position: (${mouseX.toFixed(0)}, ${mouseY.toFixed(0)})`);

    const years = activeEvents.map(ev => ev.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const foundEvent = activeEvents.find(event => {
        const normalized = (event.year - minYear) / (maxYear - minYear);
        const x_pos = x_padding + normalized * (canvas.width - x_padding * 2);
        const distance = Math.sqrt((mouseX - x_pos) ** 2 + (mouseY - y_padding) ** 2);
        return distance <= 12; // hit radius
    });

    drawTimeline(foundEvent || null, activeEvents);
})


let statsChartInstance = null;

function initChart() {
    const ctx = document.getElementById('stats-chart');
    const categoryCounts = countEventsByCategory(eventList);
    const categories = Object.keys(categoryCounts);
    const counts = Object.values(categoryCounts);

    statsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: '# of events',
                data: counts,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}



function updateChart(events) {
    if (!statsChartInstance) return;
    const categoryCounts = countEventsByCategory(events);

    statsChartInstance.data.labels = Object.keys(categoryCounts);
    statsChartInstance.data.datasets[0].data = Object.values(categoryCounts);
    
    // Animate the update!
    statsChartInstance.update();
    
}


export {renderEvents, initChart, updateChart, drawTimeline}