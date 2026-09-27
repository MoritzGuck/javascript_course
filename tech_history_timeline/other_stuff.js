function displayEventInfo({ title, year, category, sourceUrl, ...others }) {
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