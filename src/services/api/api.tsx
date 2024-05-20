import axios from "axios";

const API_BASE_URL = 'https://fakestoreapi.com/products';

export const API = axios.create({
  baseURL: API_BASE_URL
});

API.interceptors.response.use(
  response => {
    return response
  },
  error => {
    throw error
  }
);