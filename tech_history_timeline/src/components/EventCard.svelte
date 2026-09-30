<script lang="ts">
    import type { HistoricalEvent } from "../../types";

    interface Props {
        event: HistoricalEvent;
        isSelected?: boolean;
        onSelect?: (event: HistoricalEvent) => void;
    }

    let { event, isSelected = false, onSelect }: Props = $props();
</script>

<article class="event" class:selected={isSelected}>
    <h3>{event.title}</h3>
    <time datetime={String(event.year)}>{event.year}</time>
    <p>{event.description}</p>
    <div class="card-footer">
        <span class="category-badge">{event.category}</span>
        {#if onSelect}
            <button
                type="button"
                class="inspect-btn"
                onclick={() => onSelect?.(event)}
            >
                {isSelected ? "Inspecting" : "Inspect"}
            </button>
        {/if}
        {#if event.sourceUrl}
            <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a>
        {/if}
    </div>
</article>

<style>
    .event {
        display: flex;
        flex-direction: column;
        background-color: #2a2a3e;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        border-left: 4px solid #5a7a95;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .event.selected {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(90, 122, 149, 0.4);
        border-left-color: #7aa2b5;
    }

    .card-footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 0.75rem;
    }

    .category-badge {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        background: rgba(90, 122, 149, 0.3);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        color: #b5c7d3;
    }

    .inspect-btn {
        background: #3b4252;
        color: #eceff4;
        border: 1px solid #4c566a;
        padding: 0.25rem 0.6rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: background 0.2s;
    }

    .inspect-btn:hover {
        background: #4c566a;
    }

    a {
        color: #88c0d0;
        font-size: 0.85rem;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
