import axios from 'axios';

export const mainAxios = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN_URL,
  
});
