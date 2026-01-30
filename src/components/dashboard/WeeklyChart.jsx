import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function WeeklyChart({ data }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: "Tamamlama oranı",
                        data: data.values,
                        borderWidth: 3,
                        borderColor: "#fe5d03",
                        backgroundColor: "rgba(254, 93, 3, 0.1)",
                        fill: true,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: "#eee" },
                    },
                    x: {
                        grid: { display: false },
                    },
                },
            },
        });

        // ResizeObserver → container resize olunca chart resize
        const observer = new ResizeObserver(() => {
            chartRef.current?.resize();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            chartRef.current?.destroy();
        };
    }, [data]);

    return (
        <div className="chart-container" ref={containerRef}>
            <canvas ref={canvasRef} />
        </div>
    );
}
