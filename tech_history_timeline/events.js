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
        let events_copy = [...events];
        return events_copy.filter(event => event.category === category);
    }
}

function createEraFilter(era) {
    return function (events) {
        let events_copy = [...events];
        switch (era) {
            case "prehistoric": return events_copy.filter(event => event.year < -10000);
            case "industrialization": return events_copy.filter(event => event.year > 1800);
            case "modern": return events_copy.filter(event => event.year > 1900);
            default: return events_copy;
        }
    }
}

const eventsContainer = document.querySelector("#events-container");
const timelineCanvas = document.querySelector("#timeline");

function getEarliestEvent(events) {
    let eventsCopy = [...events];
    return eventsCopy.reduce((earliest, current) => { if (current.year <= earliest.year) { return current } else { return earliest } }, eventsCopy[0]);
}

function countEventsByCategory(events) {
    return events.reduce((counts, current) => {
        counts[current.category] = (counts[current.category] || 0) + 1;
        return counts;
    }, {})
}

function getEventTitles(events) {
    return events.map(event => event.title)
}



export {Event, eventList, createCategoryFilter, createEraFilter, getEarliestEvent, countEventsByCategory, getEventTitles, eventsContainer}