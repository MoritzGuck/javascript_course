<script lang="ts">
    import { eventList } from "../events";
    import type { HistoricalEvent, CategoryFilter, Era } from "../types";
    import EventCard from "./components/EventCard.svelte";

    let selectedCategory = $state<CategoryFilter>("all");
    let selectedEra = $state<Era>("all");
    let searchQuery = $state<string>("");
    let selectedEvent = $state<HistoricalEvent | null>(null);

    let filteredEvents = $derived.by(() => {
        let result = eventList as HistoricalEvent[];

        if (selectedCategory != "all") {
            result = result.filter((e) => e.category === selectedCategory);
        }

        if (selectedEra != "all") {
            if (selectedEra === "prehistoric") {
                result = result.filter((e) => e.year < -10000);
            } else if (selectedEra === "industrialization") {
                result = result.filter((e) => e.year > 1800);
            } else if (selectedEra === "modern") {
                result = result.filter((e) => e.year > 1900);
            }
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            result = result.filter(
                (e) =>
                    e.title.toLocaleLowerCase().includes(q) ||
                    e.description.toLowerCase().includes(q),
            );
        }

        return result;
    });
</script>

<header>
    <h1>Tech History Timeline</h1>
    <p>A journey through technological breakthroughs</p>
</header>

<nav>
    <form id="controls-form">
        <select bind:value={selectedEra}>
            <option value="all">All Eras</option>
            <option value="prehistoric">Prehistoric</option>
            <option value="industrialization">Industrialization</option>
            <option value="modern">Modern</option>
        </select>

        <select bind:value={selectedCategory}>
            <option value="all">All Categories</option>
            <option value="transport">Transport</option>
            <option value="information">Information</option>
            <option value="space">Space</option>
        </select>

        <input
            type="search"
            placeholder="Search fragments..."
            bind:value={searchQuery}
        />
    </form>
</nav>

<main>
    <div id="events-container">
        {#each filteredEvents as event (event.id)}
            <EventCard
                event={event}
                isSelected={selectedEvent?.id === event.id}
                onSelect={(e) => (selectedEvent = e)}
            />
        {:else}
            <p class="empty-state">
                No temporal fragments found matching your criteria.
            </p>
        {/each}
    </div>
</main>

<footer>
    <p>© 2024 Chrono-Vault. All rights reserved.</p>
</footer>
