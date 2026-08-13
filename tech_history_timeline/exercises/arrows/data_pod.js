// Mission: The Arrow Refactor
// Run me with: node data_pod.js

const events = [
    { title: "Steam Engine", year: 1712, category: "Engineering" },
    { title: "Spinning Jenny", year: 1764, category: "Textiles" },
    { title: "Power Loom", year: 1785, category: "Textiles" },
    { title: "Telegraph", year: 1837, category: "Communication" },
];

function getTitles(events) {
    return events.map(event => event.title);
}

function getTextileEvents(events) {
    return events.filter(event => event.category === "Textiles");
}

function logEventInfo(events) {
    events.forEach(event => console.log(`${event.year} - ${event.title} (${event.category})`));
}

function totalYears(events) {
    return events.reduce((sum, event) => sum + event.year, 0);
}

console.log("Titles:", getTitles(events));
console.log("Textile events:", getTextileEvents(events).length);
console.log("All events:");
logEventInfo(events);
console.log("Sum of years:", totalYears(events));

counts_obj = events.reduce((counts, event) => counts[event.category] + 1)
console.log(counts_obj)