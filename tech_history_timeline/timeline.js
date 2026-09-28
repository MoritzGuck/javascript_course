import { eventList, createCategoryFilter, createEraFilter} from "./events.js";
import { renderEvents, initChart, updateChart, drawTimeline } from "./rendering.js";

const controlsForm = document.querySelector("#controls-form");
let currentEvents = eventList;

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
        let categoryFilter = createCategoryFilter(category);
        filtered = categoryFilter(filtered);
    }
    if (era && era !== "all") {
        let eraFilter = createEraFilter(era);
        filtered = eraFilter(filtered);
    }
    if (search && search != "") {
        filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search)
        );
    }
    currentEvents = filtered;
    renderEvents(currentEvents);
    updateChart(currentEvents);
    drawTimeline(null, currentEvents);
}

controlsForm.addEventListener("change", handleFilters);
controlsForm.addEventListener("submit", handleFilters);

initChart();
renderEvents(currentEvents);