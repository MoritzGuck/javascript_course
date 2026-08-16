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
        sourceUrl: "#https://en.wikipedia.org/wiki/Wright_brothers"
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

for (let event of eventList) {
    event.logInfo()
}