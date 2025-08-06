import React, { useEffect, useState } from 'react';

const DataTable = ({ data = [] }) => {
    const [hoveredRow, setHoveredRow] = useState(null);

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h2 className="card-title mb-3">📋 Data Table</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>📰 Title</th>
                                <th>💡 Insight</th>
                                <th>🏢 Sector</th>
                                <th>📊 Topic</th>
                                <th>⚡ Impact</th>
                                <th>🎯 Likelihood</th>
                                <th>🌍 Region</th>
                                <th>📅 Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, index) => (
                                <tr 
                                    key={index}
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    style={{
                                        transform: hoveredRow === index 
                                            ? 'translateZ(8px) rotateX(2deg)' 
                                            : 'translateZ(0) rotateX(0)',
                                        transition: 'all 0.3s ease',
                                        boxShadow: hoveredRow === index 
                                            ? '0 8px 25px rgba(102, 126, 234, 0.15)' 
                                            : 'none'
                                    }}
                                >
                                    <td style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                        {item.title || 'N/A'}
                                    </td>
                                    <td style={{maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                        {item.insight || 'N/A'}
                                    </td>
                                    <td>
                                        <span className="badge" style={{
                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem'
                                        }}>
                                            {item.sector || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge" style={{
                                            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem'
                                        }}>
                                            {item.topic || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            color: item.impact > 3 ? '#e74c3c' : item.impact > 2 ? '#f39c12' : '#27ae60',
                                            fontWeight: 'bold'
                                        }}>
                                            {item.impact || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            color: item.likelihood > 3 ? '#e74c3c' : item.likelihood > 2 ? '#f39c12' : '#27ae60',
                                            fontWeight: 'bold'
                                        }}>
                                            {item.likelihood || 'N/A'}
                                        </span>
                                    </td>
                                    <td>{item.region || 'N/A'}</td>
                                    <td>{item.end_year || 'N/A'}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" className="text-center" style={{
                                        padding: '50px',
                                        color: '#667eea',
                                        fontSize: '1.2rem'
                                    }}>
                                        📭 No data available for the selected filters
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Table Summary */}
                <div className="mt-3 pt-3" style={{
                    borderTop: '1px solid rgba(102, 126, 234, 0.1)',
                    fontSize: '0.9rem',
                    color: '#6c757d'
                }}>
                    <strong>📊 Showing:</strong> {data.length} records
                </div>
            </div>
        </div>
    );
};

export default DataTable;