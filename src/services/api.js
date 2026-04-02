// src/services/api.js

// Sirf REACT_APP_API_URL use karega, VITE hata diya
const API_BASE_URL = process.env.REACT_APP_API_URL ;

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        console.log('API Base URL:', this.baseURL);
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const finalOptions = {
            ...defaultOptions,
            ...options,
        };

        try {
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // Enquiry APIs
    async submitEnquiry(data) {
        return this.request('/enquiries', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getAllEnquiries() {
        return this.request('/enquiries');
    }

    async getStatistics() {
        return this.request('/enquiries/statistics');
    }
}

export default new ApiService();