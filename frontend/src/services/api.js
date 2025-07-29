import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust the URL based on your backend configuration

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchDataById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/data/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data with id ${id}:`, error);
        throw error;
    }
};