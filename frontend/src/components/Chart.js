import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        drawChart(data);
    }, [data]);

    const drawChart = (data) => {
        d3.select(chartRef.current).selectAll('*').remove();

        // Prepare data: Intensity by Topic
        const chartData = d3.rollups(
            data,
            v => d3.sum(v, d => d.intensity || 0),
            d => d.topic || 'Unknown'
        ).map(([topic, intensity]) => ({ topic, intensity }));

        // Sort by intensity descending
        chartData.sort((a, b) => b.intensity - a.intensity);

        const width = 600;
        const height = 300;
        const margin = { top: 30, right: 20, bottom: 70, left: 60 };

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const x = d3.scaleBand()
            .domain(chartData.map(d => d.topic))
            .range([margin.left, width - margin.right])
            .padding(0.2);

        const y = d3.scaleLinear()
            .domain([0, d3.max(chartData, d => d.intensity) || 10])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // X Axis
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        // Y Axis
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        // Axis labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height - 25)
            .attr("fill", "#555")
            .attr("font-size", "1rem")
            .text("Topic");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `rotate(-90)`)
            .attr("x", -height / 2)
            .attr("y", 20)
            .attr("fill", "#555")
            .attr("font-size", "1rem")
            .text("Total Intensity");

        // Tooltip
        const tooltip = d3.select(chartRef.current)
            .append("div")
            .style("position", "absolute")
            .style("background", "#fff")
            .style("border", "1px solid #b6c2d2")
            .style("padding", "6px 12px")
            .style("border-radius", "8px")
            .style("pointer-events", "none")
            .style("font-size", "0.95rem")
            .style("color", "#23272b")
            .style("box-shadow", "0 2px 8px rgba(13,110,253,0.08)")
            .style("opacity", 0);

        // Animated bars
        svg.selectAll('.bar')
            .data(chartData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.topic))
            .attr('width', x.bandwidth())
            .attr('y', y(0)) // Start from y(0) (bottom)
            .attr('height', 0) // Start with height 0
            .attr('fill', '#007bff')
            .on("mousemove", function (event, d) {
                tooltip
                    .style("opacity", 1)
                    .html(`<strong>${d.topic}</strong><br/>Intensity: ${d.intensity}`)
                    .style("left", (event.offsetX + 30) + "px")
                    .style("top", (event.offsetY - 30) + "px");
                d3.select(this).attr('fill', '#0056b3');
            })
            .on("mouseleave", function () {
                tooltip.style("opacity", 0);
                d3.select(this).attr('fill', '#007bff');
            })
            .transition()
            .duration(900)
            .delay((d, i) => i * 60)
            .attr('y', d => y(d.intensity))
            .attr('height', d => y(0) - y(d.intensity));

        // Legend (simple color box)
        svg.append("rect")
            .attr("x", width - margin.right - 120)
            .attr("y", margin.top - 20)
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", "#007bff");
        svg.append("text")
            .attr("x", width - margin.right - 95)
            .attr("y", margin.top - 6)
            .attr("fill", "#23272b")
            .attr("font-size", "1rem")
            .text("Intensity");
    };

    // Summary stats
    const totalIntensity = data.reduce((sum, d) => sum + (d.intensity || 0), 0);
    const topTopic = (() => {
        const topicMap = {};
        data.forEach(d => {
            if (d.topic) topicMap[d.topic] = (topicMap[d.topic] || 0) + (d.intensity || 0);
        });
        const sorted = Object.entries(topicMap).sort((a, b) => b[1] - a[1]);
        return sorted.length ? `${sorted[0][0]} (${sorted[0][1]})` : "N/A";
    })();

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body row">
                <div className="col-lg-8">
                    <h2 className="card-title">Intensity by Topic</h2>
                    <div ref={chartRef} id="chart" style={{ position: "relative" }}></div>
                </div>
                <div className="col-lg-4 d-flex flex-column justify-content-center align-items-start" style={{borderLeft: "1px solid #e3eafc", minHeight: 300}}>
                    <h5 className="mb-3" style={{color: "#0d6efd"}}>Details</h5>
                    <div className="mb-2"><strong>Total Intensity:</strong> {totalIntensity}</div>
                    <div className="mb-2"><strong>Top Topic:</strong> {topTopic}</div>
                    <div className="mb-2"><strong>Topics Count:</strong> {new Set(data.map(d => d.topic)).size}</div>
                    <div className="mb-2"><strong>Data Points:</strong> {data.length}</div>
                    <div style={{fontSize: "0.95rem", color: "#6c757d"}}>Hover bars for details</div>
                </div>
            </div>
        </div>
    );
};

export default Chart;