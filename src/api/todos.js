 import axios from 'axios';
 const API_BASE = 'https://jsonplaceholder.typicode.com';
 
export const fetchTodos = async (page = 1, limit = 10) => {
 const response = await axios.get(`${API_BASE}/todos`, {
 params: { _page: page, _limit: limit },
 });
 return response.data;
 };
 