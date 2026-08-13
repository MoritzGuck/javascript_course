
// nicer solution: 

function makeEvent(title, inventorName, year, legacyFact, verified) { 
    const event_object = {
        title,
        inventorName,
        year,
        legacyFact,
        verified
    };
    console.log(`event: ${title} \n ${inventorName}. \n in year ${year}. ${legacyFact}. verfied: ${verified}`)
    return event_object
}

let firstElectricalCar = makeEvent("First electric car", "Gustave Trouvé", 1881, "The first electrical car.", true)
let firstPrintingPress = makeEvent("Printing press", "Johannes Gutenberg", 1450, "The important part were reusable letters", true)
let firstAirplane = makeEvent("First plane flight", "Brothers Wright", 1903, "The first flight with an airplne", true)

let eventList = [firstPrintingPress, firstElectricalCar, firstAirplane]


// filter by date (old first version)
function filterByDate(eventList, date, before = true) {
    let eventListNew = []
    for (let x in eventList) {
        event = eventList[x] 
        if (before) {
            if (event["year"] < date) {
                eventListNew.push(event);
            }
        } else {
            if (event["year"] > date) {
                eventListNew.push(event);
            }
        }
    }
    console.log(`new event list:`)
    eventListNew.forEach(function(entry) {
        console.log(entry);
        });
    return eventListNew
}
filtered_eventList = filterByDate(eventList, 1900, before=false)

// new version of filter by date
function filterByDateNew(eventList, minYear=0, maxYear=9999) {
    let eventListNew = eventList.filter(event => event["year"] >= minYear && event["year"] <= maxYear);
    console.log(`new event list:`)
    eventListNew.forEach(function(entry) {
        console.log(entry);
    });
    return eventListNew
}

filtered_eventList = filterByDateNew(eventList, minYear=1900)

//check valid event

function isValidEvent(event) {
    return event["title"] && event["year"] && event["legacyFact"] && typeof event["year"] === "number" && typeof event["legacyFact"] === "string";
}

const validEvents = eventList.filter(isValidEvent)
console.log(`valid events:`)
validEvents.forEach(function(entry){console.log(entry)})

// template literals

console.log(`🚀 ${firstElectricalCar.title} ${firstElectricalCar.year}`)

// classify to group by historical era
function classifyEra(year) {
    if (year < 1400){
        return "Ancient";
    } else if (year <= 1799) {
        return "Renaissance & Enlightenment";
    } else if (year <= 1949) {
        return "Industrial";
    } else if (year >= 1950) {
        return "Digital"
    }
}

let test_years = [1291, 1648, 1848, 1989]
for (let year of test_years) {
    console.log(`${year} is in ${classifyEra(year)}`)
}