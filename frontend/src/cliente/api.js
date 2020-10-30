import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getAll = async () => {
    const response = await axios.get(`${API_URL}/tweets`);
    return response.data;
}

export {
    getAll
}