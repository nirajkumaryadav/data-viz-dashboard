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

    // Update filtered data when filters or data change
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
        return [...new Set(data.map(item => item[key]).filter(Boolean))];
    }

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger mt-5">Error fetching data: {error.message}</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-primary text-center">Data Visualization Dashboard</h1>
            {/* Filters */}
            <div className="card p-3 mb-4 shadow-sm">
                <div className="row g-2">
                    <div className="col-md">
                        <select className="form-select" name="end_year" value={filters.end_year} onChange={handleFilterChange}>
                            <option value="">All Years</option>
                            {getUniqueValues(data, 'end_year').map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <select className="form-select" name="topic" value={filters.topic} onChange={handleFilterChange}>
                            <option value="">All Topics</option>
                            {getUniqueValues(data, 'topic').map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <select className="form-select" name="sector" value={filters.sector} onChange={handleFilterChange}>
                            <option value="">All Sectors</option>
                            {getUniqueValues(data, 'sector').map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <select className="form-select" name="region" value={filters.region} onChange={handleFilterChange}>
                            <option value="">All Regions</option>
                            {getUniqueValues(data, 'region').map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <select className="form-select" name="pestle" value={filters.pestle} onChange={handleFilterChange}>
                            <option value="">All PEST</option>
                            {getUniqueValues(data, 'pestle').map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <select className="form-select" name="source" value={filters.source} onChange={handleFilterChange}>
                            <option value="">All Sources</option>
                            {getUniqueValues(data, 'source').map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <select className="form-select" name="country" value={filters.country} onChange={handleFilterChange}>
                            <option value="">All Countries</option>
                            {getUniqueValues(data, 'country').map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <select className="form-select" name="city" value={filters.city} onChange={handleFilterChange}>
                            <option value="">All Cities</option>
                            {getUniqueValues(data, 'city').map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <Chart data={filteredData} />
            <DataTable data={filteredData} />
        </div>
    );
};

export default Dashboard;