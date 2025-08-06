import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data = [] }) => {
    const chartRef = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            drawChart(data);
        } else {
            d3.select(chartRef.current).selectAll('*').remove();
        }
    }, [data]);

    const drawChart = (data) => {
        d3.select(chartRef.current).selectAll('*').remove();

        const chartData = d3.rollups(
            data,
            v => d3.sum(v, d => d.intensity || 0),
            d => d.topic || 'Unknown'
        ).map(([topic, intensity]) => ({ topic, intensity }));

        chartData.sort((a, b) => b.intensity - a.intensity);
        const topChartData = chartData.slice(0, 10);

        if (topChartData.length === 0) {
            d3.select(chartRef.current)
                .append('div')
                .style('text-align', 'center')
                .style('padding', '60px')
                .style('color', '#a0a0ff')
                .style('font-size', '1.4rem')
                .style('font-weight', '600')
                .html('🌟 No data available for the selected filters<br><span style="font-size: 1rem; color: #b0b0d0; margin-top: 10px; display: block;">Try adjusting your filter criteria</span>');
            return;
        }

        const width = 750;
        const height = 450;
        const margin = { top: 40, right: 30, bottom: 100, left: 90 };

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', 'transparent');

        // Enhanced gradient definitions
        const defs = svg.append("defs");
        
        // Main bar gradient
        const gradient = defs.append("linearGradient")
            .attr("id", "barGradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", height)
            .attr("x2", 0).attr("y2", 0);

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#667eea");

        gradient.append("stop")
            .attr("offset", "30%")
            .attr("stop-color", "#764ba2");

        gradient.append("stop")
            .attr("offset", "70%")
            .attr("stop-color", "#f093fb");

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#4facfe");

        // Glow filter
        const filter = defs.append("filter")
            .attr("id", "glow");

        filter.append("feGaussianBlur")
            .attr("stdDeviation", "3")
            .attr("result", "coloredBlur");

        const feMerge = filter.append("feMerge"); 
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        const x = d3.scaleBand()
            .domain(topChartData.map(d => d.topic))
            .range([margin.left, width - margin.right])
            .padding(0.3);

        const y = d3.scaleLinear()
            .domain([0, d3.max(topChartData, d => d.intensity) || 10])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Enhanced axes with better styling
        const xAxis = svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        xAxis.selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end")
            .style("font-size", "13px")
            .style("font-weight", "500")
            .style("fill", "#e0e0e0")
            .style("font-family", "Inter, sans-serif");

        const yAxis = svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(8));

        yAxis.selectAll("text")
            .style("font-size", "13px")
            .style("font-weight", "500")
            .style("fill", "#e0e0e0")
            .style("font-family", "Inter, sans-serif");

        // Style axis lines with glow
        svg.selectAll('.domain')
            .style('stroke', '#667eea')
            .style('stroke-width', '2px')
            .style('filter', 'url(#glow)');

        svg.selectAll('.tick line')
            .style('stroke', 'rgba(102, 126, 234, 0.4)')
            .style('stroke-width', '1px');

        // Enhanced axis labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height - 25)
            .attr("fill", "#b0b0d0")
            .attr("font-size", "1.1rem")
            .attr("font-weight", "600")
            .style("font-family", "Inter, sans-serif")
            .text("📊 Topics");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `rotate(-90)`)
            .attr("x", -height / 2)
            .attr("y", 30)
            .attr("fill", "#b0b0d0")
            .attr("font-size", "1.1rem")
            .attr("font-weight", "600")
            .style("font-family", "Inter, sans-serif")
            .text("⚡ Total Intensity");

        // Enhanced tooltip with glassmorphism
        const tooltip = d3.select(chartRef.current)
            .append("div")
            .style("position", "absolute")
            .style("background", "rgba(20, 20, 40, 0.95)")
            .style("backdrop-filter", "blur(15px)")
            .style("border", "1px solid rgba(102, 126, 234, 0.4)")
            .style("padding", "16px 20px")
            .style("border-radius", "16px")
            .style("pointer-events", "none")
            .style("font-size", "1rem")
            .style("color", "#e0e0e0")
            .style("box-shadow", "0 12px 30px rgba(0, 0, 0, 0.4)")
            .style("opacity", 0)
            .style("z-index", "1000")
            .style("font-family", "Inter, sans-serif")
            .style("font-weight", "500");

        // Spectacular animated bars
        const bars = svg.selectAll('.bar')
            .data(topChartData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.topic))
            .attr('width', x.bandwidth())
            .attr('y', y(0))
            .attr('height', 0)
            .attr('fill', 'url(#barGradient)')
            .attr('rx', 8)
            .attr('ry', 8)
            .style('cursor', 'pointer')
            .style('filter', 'url(#glow)')
            .on("mousemove", function (event, d) {
                tooltip
                    .style("opacity", 1)
                    .html(`
                        <div style="font-weight: 700; margin-bottom: 12px; color: #4facfe; font-size: 1.1rem;">
                            🎯 ${d.topic}
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="color: #b0b0d0;">Intensity:</span> 
                            <span style="color: #f093fb; font-weight: 700; font-size: 1.2rem;">${d.intensity}</span>
                        </div>
                        <div style="margin-top: 8px; font-size: 0.9rem; color: #a0a0ff;">
                            Click to explore more
                        </div>
                    `)
                    .style("left", (event.offsetX + 20) + "px")
                    .style("top", (event.offsetY - 80) + "px");
                
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('fill', '#4facfe')
                    .style('filter', 'url(#glow) brightness(1.3)')
                    .attr('transform', 'scale(1.05)');
            })
            .on("mouseleave", function () {
                tooltip.style("opacity", 0);
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('fill', 'url(#barGradient)')
                    .style('filter', 'url(#glow) brightness(1)')
                    .attr('transform', 'scale(1)');
            });

        // Stunning bar animations
        bars.transition()
            .duration(1200)
            .delay((d, i) => i * 150)
            .ease(d3.easeCubicOut)
            .attr('y', d => y(d.intensity))
            .attr('height', d => y(0) - y(d.intensity));

        // Enhanced legend with glassmorphism
        const legend = svg.append("g")
            .attr("transform", `translate(${width - 220}, ${margin.top - 15})`);

        legend.append("rect")
            .attr("width", 180)
            .attr("height", 40)
            .attr("fill", "rgba(20, 20, 40, 0.8)")
            .attr("stroke", "rgba(102, 126, 234, 0.3)")
            .attr("stroke-width", "1px")
            .attr("rx", 12)
            .style("backdrop-filter", "blur(10px)");

        legend.append("rect")
            .attr("x", 12)
            .attr("y", 12)
            .attr("width", 24)
            .attr("height", 16)
            .attr("fill", "url(#barGradient)")
            .attr("rx", 6);

        legend.append("text")
            .attr("x", 45)
            .attr("y", 16)
            .attr("dy", "0.8em")
            .attr("fill", "#e0e0e0")
            .attr("font-size", "0.95rem")
            .attr("font-weight", "600")
            .style("font-family", "Inter, sans-serif")
            .text(`Top ${topChartData.length} Topics by Intensity`);
    };

    // Enhanced summary stats
    const totalIntensity = (data || []).reduce((sum, d) => sum + (d.intensity || 0), 0);
    const avgIntensity = data && data.length > 0 ? (totalIntensity / data.length).toFixed(1) : 0;
    const topTopic = (() => {
        if (!data || data.length === 0) return "N/A";
        
        const topicMap = {};
        data.forEach(d => {
            if (d.topic) topicMap[d.topic] = (topicMap[d.topic] || 0) + (d.intensity || 0);
        });
        const sorted = Object.entries(topicMap).sort((a, b) => b[1] - a[1]);
        return sorted.length ? `${sorted[0][0]} (${sorted[0][1]})` : "N/A";
    })();

    const topicsCount = data ? new Set(data.map(d => d.topic)).size : 0;
    const dataLength = data ? data.length : 0;

    return (
        <div className="card card-interactive shadow-sm mb-4">
            <div className="card-body">
                <h2 className="card-title">📊 Intensity Analytics Hub</h2>
                
                <div className="row">
                    <div className="col-lg-8">
                        <div 
                            ref={chartRef} 
                            id="chart" 
                            style={{ 
                                position: "relative",
                                background: 'rgba(25, 25, 50, 0.9)',
                                borderRadius: '20px',
                                padding: '25px',
                                minHeight: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(102, 126, 234, 0.2)'
                            }}
                        ></div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div 
                            className="card-interactive" 
                            style={{
                                background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.9) 0%, rgba(15, 12, 41, 0.7) 100%)',
                                borderRadius: '20px',
                                padding: '28px',
                                border: '1px solid rgba(102, 126, 234, 0.3)',
                                minHeight: '500px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                transformStyle: 'preserve-3d',
                                transition: 'all 0.4s ease'
                            }}
                        >
                            <h5 className="mb-4" style={{
                                color: "#4facfe",
                                fontWeight: 700,
                                fontSize: '1.4rem',
                                textAlign: 'center',
                                borderBottom: '3px solid rgba(102, 126, 234, 0.4)',
                                paddingBottom: '15px'
                            }}>
                                🎯 Live Analytics
                            </h5>
                            
                            <div className="analytics-grid">
                                <div className="analytics-item" style={{
                                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    marginBottom: '18px',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                                }}>
                                    <div style={{color: '#f093fb', fontWeight: 700, fontSize: '1rem', marginBottom: '8px'}}>📊 Total Intensity</div>
                                    <div style={{color: '#e0e0e0', fontSize: '1.8rem', fontWeight: '800'}}>{totalIntensity}</div>
                                </div>
                                
                                <div className="analytics-item" style={{
                                    background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.15), rgba(240, 147, 251, 0.15))',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    marginBottom: '18px',
                                    border: '1px solid rgba(118, 75, 162, 0.3)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                                }}>
                                    <div style={{color: '#764ba2', fontWeight: 700, fontSize: '1rem', marginBottom: '8px'}}>📈 Average Intensity</div>
                                    <div style={{color: '#e0e0e0', fontSize: '1.6rem', fontWeight: '700'}}>{avgIntensity}</div>
                                </div>
                                
                                <div className="analytics-item" style={{
                                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.15), rgba(79, 172, 254, 0.15))',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    marginBottom: '18px',
                                    border: '1px solid rgba(240, 147, 251, 0.3)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                                }}>
                                    <div style={{color: '#4facfe', fontWeight: 700, fontSize: '1rem', marginBottom: '8px'}}>🏆 Top Topic</div>
                                    <div style={{color: '#e0e0e0', fontSize: '1rem', fontWeight: '600', wordBreak: 'break-word'}}>{topTopic}</div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-6">
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(79, 172, 254, 0.15))',
                                            padding: '16px',
                                            borderRadius: '12px',
                                            textAlign: 'center',
                                            border: '1px solid rgba(102, 126, 234, 0.3)',
                                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                                        }}>
                                            <div style={{color: '#4facfe', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px'}}>📋 Topics</div>
                                            <div style={{color: '#e0e0e0', fontSize: '1.4rem', fontWeight: '700'}}>{topicsCount}</div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.15), rgba(240, 147, 251, 0.15))',
                                            padding: '16px',
                                            borderRadius: '12px',
                                            textAlign: 'center',
                                            border: '1px solid rgba(118, 75, 162, 0.3)',
                                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                                        }}>
                                            <div style={{color: '#f093fb', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px'}}>📄 Records</div>
                                            <div style={{color: '#e0e0e0', fontSize: '1.4rem', fontWeight: '700'}}>{dataLength}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{
                                marginTop: '25px',
                                padding: '16px',
                                background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(240, 147, 251, 0.1))',
                                borderRadius: '12px',
                                border: '1px solid rgba(79, 172, 254, 0.3)',
                                textAlign: 'center'
                            }}>
                                <div style={{fontSize: "0.9rem", color: "#4facfe", fontStyle: 'italic', fontWeight: '500'}}>
                                    ✨ Hover over bars for detailed insights
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;