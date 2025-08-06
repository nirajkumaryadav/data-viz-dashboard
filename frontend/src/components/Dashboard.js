import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import Chart from './Chart';
import DataTable from './DataTable';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [filters, setFilters] = useState({
        end_year: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        country: '',
        city: ''
    });

    // Mouse Tracking 3D Effect (excluding footer)
    useEffect(() => {
        const handleMouseMove = (e) => {
            const cards = document.querySelectorAll('.card-interactive:not(footer .card-interactive)');
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;
                
                const angleX = (mouseY - cardY) / 40;
                const angleY = (cardX - mouseX) / 40;
                
                card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(5px)`;
            });
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchData();
                setData(response);
                setFilteredData(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        let result = data;
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                result = result.filter(item => String(item[key]) === String(value));
            }
        });
        setFilteredData(result);
    }, [filters, data]);

    function getUniqueValues(data, key) {
        if (!Array.isArray(data) || data.length === 0) return [];
        return [...new Set(data.map(item => item[key]).filter(Boolean))];
    }

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Calculate insights for the insights section
    const getInsights = () => {
        if (!filteredData || filteredData.length === 0) return null;

        const sectors = getUniqueValues(filteredData, 'sector');
        const regions = getUniqueValues(filteredData, 'region');
        const avgIntensity = (filteredData.reduce((sum, d) => sum + (d.intensity || 0), 0) / filteredData.length).toFixed(1);
        const avgLikelihood = (filteredData.reduce((sum, d) => sum + (d.likelihood || 0), 0) / filteredData.length).toFixed(1);
        const avgImpact = (filteredData.reduce((sum, d) => sum + (d.impact || 0), 0) / filteredData.length).toFixed(1);
        
        const highIntensityData = filteredData.filter(d => (d.intensity || 0) > 4);
        const recentData = filteredData.filter(d => (d.end_year || 0) >= 2024);

        return {
            sectors: sectors.length,
            regions: regions.length,
            avgIntensity,
            avgLikelihood,
            avgImpact,
            highIntensityCount: highIntensityData.length,
            recentCount: recentData.length,
            totalRecords: filteredData.length
        };
    };

    const insights = getInsights();

    // Dark Loading State
    if (loading) return (
        <div className="loading-spinner">
            <div style={{ textAlign: 'center' }}>
                <div className="spinner"></div>
                <div style={{
                    color: '#e0e0e0',
                    fontSize: '1.3rem',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    marginTop: '20px',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                    🌙 Loading Dark Dashboard...
                </div>
            </div>
        </div>
    );

    // Dark Error State
    if (error) return (
        <div className="error-container">
            <div className="container">
                <div className="alert alert-danger card-interactive" style={{
                    background: 'rgba(220, 53, 69, 0.15)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(220, 53, 69, 0.3)',
                    borderRadius: '16px',
                    color: '#f8d7da',
                    transformStyle: 'preserve-3d',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <h4>⚠️ Error Loading Data</h4>
                    <p>Unable to fetch data: {error.message}</p>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => window.location.reload()}
                    >
                        🔄 Retry
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            {/* Fixed Header */}
            <h1 className="mb-4 text-center gradient-text">
                🌙 Data Visualization Dashboard
            </h1>
            
            {/* Dark Filters Section */}
            <div className="card card-interactive p-3 mb-4 shadow-sm glass-card">
                <h5 className="mb-3" style={{
                    color: 'rgba(224, 224, 224, 0.9)', 
                    fontWeight: 600,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    🔍 Filters
                </h5>
                <div className="row g-2">
                    {[
                        { name: "end_year", label: "📅 Year" },
                        { name: "topic", label: "📊 Topic" },
                        { name: "sector", label: "🏢 Sector" },
                        { name: "region", label: "🌍 Region" },
                        { name: "pestle", label: "📈 PEST" },
                        { name: "source", label: "📰 Source" },
                        { name: "country", label: "🇺🇳 Country" },
                        { name: "city", label: "🏙️ City" }
                    ].map(filter => {
                        const options = getUniqueValues(data, filter.name);
                        return (
                            <div className="col-md" key={filter.name}>
                                <label htmlFor={filter.name}>
                                    {filter.label}
                                </label>
                                <select
                                    className="form-select hover-glow"
                                    name={filter.name}
                                    id={filter.name}
                                    value={filters[filter.name]}
                                    onChange={handleFilterChange}
                                    disabled={loading || error || options.length === 0}
                                >
                                    <option value="">
                                        {loading ? "Loading..." : 
                                         error ? "Error loading" : 
                                         `All ${filter.label.split(' ')[1]}s`}
                                    </option>
                                    {options.map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
                
                {/* Filter Summary */}
                <div className="mt-3 pt-3" style={{
                    borderTop: '1px solid rgba(102, 126, 234, 0.2)',
                    color: 'rgba(224, 224, 224, 0.8)',
                    fontSize: '0.9rem'
                }}>
                    <strong>📋 Results:</strong> {filteredData.length} items
                    {Object.values(filters).some(v => v) && (
                        <button 
                            className="btn btn-sm ms-2"
                            style={{
                                background: 'rgba(102, 126, 234, 0.3)',
                                border: '1px solid rgba(102, 126, 234, 0.4)',
                                color: '#e0e0e0',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => setFilters({
                                end_year: '', topic: '', sector: '', region: '',
                                pestle: '', source: '', country: '', city: ''
                            })}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px) translateZ(3px)';
                                e.target.style.background = 'rgba(102, 126, 234, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0) translateZ(0)';
                                e.target.style.background = 'rgba(102, 126, 234, 0.3)';
                            }}
                        >
                            🗑️ Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Chart Section */}
            <div style={{ transformStyle: 'preserve-3d' }}>
                <Chart data={filteredData} />
            </div>

            {/* NEW: Key Insights Section */}
            {insights && (
                <div className="card card-interactive shadow-sm mb-4" style={{
                    background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.9) 0%, rgba(15, 12, 41, 0.8) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                }}>
                    <div className="card-body">
                        <h2 className="card-title">💡 Key Insights</h2>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="insight-card" style={{
                                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    transition: 'all 0.3s ease',
                                    marginBottom: '16px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px) translateZ(10px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📊</div>
                                    <div style={{ color: '#f093fb', fontSize: '1.8rem', fontWeight: '700' }}>
                                        {insights.avgIntensity}
                                    </div>
                                    <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>
                                        Average Intensity
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="insight-card" style={{
                                    background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.2), rgba(240, 147, 251, 0.2))',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(118, 75, 162, 0.3)',
                                    transition: 'all 0.3s ease',
                                    marginBottom: '16px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px) translateZ(10px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(118, 75, 162, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎯</div>
                                    <div style={{ color: '#764ba2', fontSize: '1.8rem', fontWeight: '700' }}>
                                        {insights.avgLikelihood}
                                    </div>
                                    <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>
                                        Average Likelihood
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="insight-card" style={{
                                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.2), rgba(102, 126, 234, 0.2))',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(240, 147, 251, 0.3)',
                                    transition: 'all 0.3s ease',
                                    marginBottom: '16px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px) translateZ(10px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(240, 147, 251, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚡</div>
                                    <div style={{ color: '#667eea', fontSize: '1.8rem', fontWeight: '700' }}>
                                        {insights.avgImpact}
                                    </div>
                                    <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>
                                        Average Impact
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="insight-card" style={{
                                    background: 'linear-gradient(135deg, rgba(39, 174, 96, 0.2), rgba(102, 126, 234, 0.2))',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(39, 174, 96, 0.3)',
                                    transition: 'all 0.3s ease',
                                    marginBottom: '16px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px) translateZ(10px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(39, 174, 96, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔥</div>
                                    <div style={{ color: '#27ae60', fontSize: '1.8rem', fontWeight: '700' }}>
                                        {insights.highIntensityCount}
                                    </div>
                                    <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>
                                        High Intensity Items
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <div style={{
                                    background: 'rgba(102, 126, 234, 0.1)',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(102, 126, 234, 0.2)'
                                }}>
                                    <div className="row text-center">
                                        <div className="col-md-4">
                                            <div style={{ color: '#a0a0ff', fontSize: '1.2rem', fontWeight: '600' }}>
                                                🏢 {insights.sectors} Sectors
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div style={{ color: '#a0a0ff', fontSize: '1.2rem', fontWeight: '600' }}>
                                                🌍 {insights.regions} Regions
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div style={{ color: '#a0a0ff', fontSize: '1.2rem', fontWeight: '600' }}>
                                                📅 {insights.recentCount} Recent Data
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div style={{ transformStyle: 'preserve-3d' }}>
                <DataTable data={filteredData} />
            </div>

            {/* NEW: Quick Actions Section */}
            <div className="card card-interactive shadow-sm mb-4" style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.9) 0%, rgba(15, 12, 41, 0.8) 100%)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
                <div className="card-body">
                    <h2 className="card-title">⚡ Quick Actions</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <button 
                                className="btn btn-primary w-100 mb-2"
                                onClick={() => window.print()}
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    padding: '12px',
                                    fontSize: '1rem'
                                }}
                            >
                                🖨️ Print Dashboard
                            </button>
                        </div>
                        <div className="col-md-4">
                            <button 
                                className="btn btn-primary w-100 mb-2"
                                onClick={() => {
                                    const dataStr = JSON.stringify(filteredData, null, 2);
                                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                                    const url = URL.createObjectURL(dataBlob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = 'dashboard-data.json';
                                    link.click();
                                }}
                                style={{
                                    background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
                                    border: 'none',
                                    padding: '12px',
                                    fontSize: '1rem'
                                }}
                            >
                                📥 Export Data
                            </button>
                        </div>
                        <div className="col-md-4">
                            <button 
                                className="btn btn-primary w-100 mb-2"
                                onClick={() => window.location.reload()}
                                style={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #667eea 100%)',
                                    border: 'none',
                                    padding: '12px',
                                    fontSize: '1rem'
                                }}
                            >
                                🔄 Refresh Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* FIXED FOOTER - No Movement */}
            <footer className="text-center" style={{
                fontSize: '0.95rem',
                color: 'rgba(224, 224, 224, 0.7)'
            }}>
                <div className="card-interactive">
                    💡 Built with React, D3.js & FastAPI | 
                    &copy; {new Date().getFullYear()} Dark Data Dashboard
                </div>
            </footer>

            {/* Fixed Floating Action Button */}
            <button 
                className="floating-action-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Back to Top"
            >
                ⬆️
            </button>
        </div>
    );
};

export default Dashboard;