import axios from 'axios';

export default axios.create({ baseURL: 'https://finnhub.io/api/v1/' });