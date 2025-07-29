import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';

const DataTable = ({ data }) => {
    return (
        <div>
            <h2 className="mb-3">Data Table</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Insight</th>
                            <th>Sector</th>
                            <th>Topic</th>
                            <th>Impact</th>
                            <th>Likelihood</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.insight}</td>
                                <td>{item.sector}</td>
                                <td>{item.topic}</td>
                                <td>{item.impact}</td>
                                <td>{item.likelihood}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;