import { fetchWikipediaSummary } from "./apiServices.js";

class Event {
    constructor({ title, year, description, category, id, sourceUrl }) {
        this.title = title;
        this.year = year;
        this.description = description;
        this.category = category;
        this.id = id;
        this.sourceUrl = sourceUrl;
    }

    logInfo() {
        console.log(`📋${this.title}, ${this.year} ➡️ ${this.description} (📥 ${this.category})`)
    }
}

let eventList = [
    new Event({
        title: "First electric car",
        year: 1881,
        description: "The first electricalcar.",
        category: "transport",
        id: 1,
        sourceUrl: "https://en.wikipedia.org/wiki/History_of_the_electric_vehicle"
    }),
    new Event({
        title: "Printing press",
        year: 1450,
        description: "The important part were reusable letters",
        category: "information",
        id: 2,
        sourceUrl: "https://en.wikipedia.org/wiki/Printing_press"
    }),
    new Event({
        title: "First plane flight",
        year: 1903,
        description: "Brothers Wright",
        category: "transport",
        id: 3,
        sourceUrl: "https://en.wikipedia.org/wiki/Wright_brothers"
    }),
    new Event({
        title: "Moon landing",
        year: 1958,
        description: "The first moonlanding was actually from a robot Luna 2",
        category: "space",
        id: 4,
        sourceUrl: "https://en.wikipedia.org/wiki/Moon_landing"
    }),
    new Event({
        title: "Atlantic Radio Transmission",
        year: 1907,
        description: "the first radio transmission over the atlantic",
        category: "information",
        id: 5,
        sourceUrl: "https://en.wikipedia.org/wiki/History_of_radio"
    })
]

function createCategoryFilter(category) {
    return function (events) {
        events_copy = [...events];
        return events_copy.filter(event => event.category === category);
    }
}

function createEraFilter(era) {
    return function (events) {
        events_copy = [...events];
        switch (era) {
            case "prehistoric": return events_copy.filter(event => event.year < -10000);
            case "industrialization":  return events_copy.filter(event => event.year > 1800);
            case "modern": return events_copy.filter(event => event.year > 1900);
            default: return events_copy;
        }
    }
}

const eventsContainer = document.querySelector("#events-container");
const timelineCanvas = document.querySelector("#timeline");

function getEarliestEvent(events) {
    let eventsCopy = [...events];
    return eventsCopy.reduce((earliest, current) => { if (current.year <= earliest.year) { return current } else {return earliest}}, eventsCopy[0]);
}

function countEventsByCategory(events) {
    return events.reduce((counts, current) => {
        counts[current.category] = (counts[current.category] || 0) +1; 
        return counts;
    }, {})
}

function getEventTitles(events) {
    return events.map(event => event.title)
}

function displayEventInfo({title, year, category, sourceUrl, ...others} ) {
    let prefix = ""
    switch (category) {
        case "transport": prefix = "🚀"; break;
        case "information": prefix = "📖"; break;
        case "space": prefix = "👩‍🚀"; break;
        default: prefix = "🛠️";
    }
    const urlString = sourceUrl ?? "Source unknown"
    console.log(`[${prefix}] ${title} (${year}) - Details: id is ${others.id}. Source: ${urlString})`);
}

// Initialize system log
console.log(`Earliest event: ${getEarliestEvent(eventList).title}`);
console.log("Event counts by category:", countEventsByCategory(eventList));
eventList.forEach(displayEventInfo);

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

        article.addEventListener("mouseenter", () => {article.classList.add("neural-highlight")});
        article.addEventListener("mouseleave", () => {article.classList.remove("neural-highlight")});

        const wikiPathArray = event.sourceUrl.split("/");
        let wikiPath = wikiPathArray.at(-1);

        fetchWikipediaSummary(wikiPath).then(eventSummary => {
            article.innerHTML = `
                <h3>${event.title}</h3>
                <time>${event.year}</time>
                <p>${eventSummary.extract}</p>
                `;

        }).catch(error => {console.log(`could not load event ${event.title}`)}

        )
    });
}

console.log(`events container: ${eventsContainer}. timeline canvas: ${timelineCanvas}`)

const controlsForm = document.querySelector("#controls-form");

function handleFilters(event) {
    if (event.type === "submit") {
        event.preventDefault(); //prevents browser from reloading page
    }

    const formData = new FormData(controlsForm);
    const category = formData.get("category");
    const search = formData.get("search")?.toLowerCase().trim() || "";
    const era = formData.get("era");

    console.log(`category: ${category}, era: ${era}, search: ${search}`)
    let filtered = [...eventList];

    if (category && category !== "all") {
        categoryFilter = createCategoryFilter(category);
        filtered = categoryFilter(filtered);
    }
    if (era && era !== "all") {
        eraFilter = createEraFilter(era);
        filtered = eraFilter(filtered);
    }
    if (search && search != "") {
        filtered = filtered.filter(item =>  
            item.title.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search)
        );
    }

    renderEvents(filtered);
}

controlsForm.addEventListener("change", handleFilters);
controlsForm.addEventListener("submit", handleFilters);

function fetchEventsWithDelay() { // returns the *Promise* immediately, but not the result
    const eventListCopy = new Promise((resolve) => { // when using Promise, you pass a resolve function, that has the purpose of storing the eventual output. 
        // The promise is like a status ticker of a pizza delivery that shows you whether it is still pending, processing or fulfilled ("delivered").
        setTimeout(() => {
            resolve([...eventList]) // here you actually use the resolve function you passed.
        }, 1000)
    });
    return eventListCopy;
}

/* fetchEventsWithDelay().then(eventList => { // "then" attaches the callback function in the parameters to the promise. When the promise changes to fulfilled, it triggers the callback.
    console.log(`events loaded? First list item: ${eventList[0].title}`);
}); */


async function loadAndRenderEvents() {
    try {
        let events = await fetchEventsWithDelay();
        renderEvents(events);
    } catch (error) {
        console.log(`Rendering events failed: ${error}`)
    }
}

loadAndRenderEvents()

function fetchTransportEvents(events) {
    return new Promise(resolve => 
        setTimeout(() => {
                let transportFilter = createCategoryFilter("transport");
                let eventList = transportFilter(events);
                resolve(eventList);
            }, 800)
    )
}

function fetchInformationEvents(events) {
    return new Promise(resolve => 
        setTimeout(() => {
                let transportFilter = createCategoryFilter("information");
                let eventList = transportFilter(events);
                resolve(eventList);
            }, 800)
    )
}

/*
combinedEvents = Promise.all([fetchTransportEvents(eventList), fetchInformationEvents(eventList)])
    .then(([transportEvents, infoEvents]) => {
        const combined = [...transportEvents, ...infoEvents];
        renderEvents(combined);
    });

*/



/* fetchWikipediaSummary("Moon_landing").then(results => {
    console.log(`wiki result: ${results.title}, ${results.extract}`)
})
 */
const canvas = document.getElementById("timeline");
const ctx = canvas.getContext("2d");
const x_padding = 50;
const y_padding = 100;

let mouseX = 0;
let mouseY = 0;

function drawTimeline(hoveredEvent = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.moveTo(x_padding, y_padding);
    ctx.lineTo(1000-x_padding, y_padding);
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;
    ctx.stroke();

    const years = eventList.map(event => event.year);
    let minYear = Math.min(...years);
    let maxYear = Math.max(...years);
    eventList.forEach(event => {
        let event_year = event.year;
        let normalized_year = event_year - minYear;
        let standardized_year = normalized_year / ( maxYear - minYear );
        let x_pos = x_padding + standardized_year * (1000 - x_padding * 2);
        const radius = 8;

        ctx.beginPath();
        ctx.arc(x_pos, y_padding, radius, 0, Math.PI *2);
        ctx.fillStyle = "#ffaa00";
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.translate(x_pos, y_padding+30);
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

    const years = eventList.map(ev => ev.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const foundEvent = eventList.find(event => {
        const normalized = (event.year - minYear) / (maxYear - minYear);
        const x_pos = x_padding + normalized * (canvas.width - x_padding * 2);
        const distance = Math.sqrt((mouseX - x_pos)**2 + (mouseY - y_padding)**2);
        return distance <= 12; // hit radius
    });

    drawTimeline(foundEvent || null);
})
