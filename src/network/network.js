import axios from 'axios';

const conn = axios.create({
    baseURL : process.env.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Origin': process.env.APP_ORIGIN_URL
    }
});

export {conn};