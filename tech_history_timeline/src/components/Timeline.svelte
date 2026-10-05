<script lang="ts">
    import type { HistoricalEvent } from "../../types";

    // props: events
    interface Props {
        events: HistoricalEvent[],
        selectedEvent?: HistoricalEvent | null,
        onSelect?: (event: HistoricalEvent) => void
    };

    let {events, selectedEvent = null, onSelect }: Props = $props();

    let canvas: HTMLCanvasElement | undefined = $state();
    let hoveredEvent: HistoricalEvent | null = $state(null);

    const x_padding = 50;
    const y_padding = 100;

    // let mouseX = 0;
    // let mouseY = 0;
    
    function drawTimeline() {
        if (!canvas) return; // to avoid undefined canvas
        const ctx = canvas.getContext("2d");
        if (!ctx) return; // to avoid undefined ctx

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (events.length === 0) return; // no events -> no canvas content

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

            ctx.fillText(String(event.year), 0, 0);
            ctx.restore();

            if (hoveredEvent?.id === event.id) {
                ctx.fillStyle = "#00f0ff";
                ctx.font = "bold 14px monospace";
                ctx.textAlign = "center";
                ctx.fillText(event.title, x_pos, y_padding - 20);
            }
        })
    }

    $effect(() => { // use effect, so drawTimeline runs at every change
        drawTimeline();
    })

     function handleMouseMove(e: MouseEvent) {
        if (!canvas || events.length === 0) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;

        const years = events.map(ev => ev.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        const range = maxYear === minYear ? 1 : maxYear - minYear;

        const c = canvas;
        const found = events.find(event => {
            const normalized = (event.year - minYear) / range;
            const x_pos = x_padding + normalized * (c.width - x_padding * 2);
            const distance = Math.hypot(mouseX - x_pos, mouseY - y_padding);
            return distance <= 14;
        });

        hoveredEvent = found || null;
    }

    function handleClick() {
        if (hoveredEvent && onSelect) {
            onSelect(hoveredEvent);
        }
    }
</script>

<canvas
    bind:this={canvas}
    width="1000"
    height="200"
    onmousemove={handleMouseMove}
    onmouseleave={() => hoveredEvent = null}
    onclick={handleClick}
></canvas>

<style>
    canvas {
        width: 100%;
        max-width: 1000px;
        height: auto;
        background: rgba(18, 18, 30, 0.8);
        border: 1px solid #3b4252;
        border-radius: 8px;
        display: block;
        margin: 1.5rem auto;
        cursor: crosshair;
    }
</style>