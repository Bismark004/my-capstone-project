import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        api_key: apiConfig.apiKey
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(
    async (config) => {
        console.log('Making request to:', config.url);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            console.log('Received response from:', response.config.url);
            return response.data;
        }
        return response;
    },
    (error) => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        throw error;
    }
);

export default axiosClient;