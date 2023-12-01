import Axios from 'axios';

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
});

export function setToken(token) {
  api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export function removeToken() {
  api.defaults.headers.common['Authorization'] = null;
}

export default api;
// api.interceptors.request.use((request) => {
//   const token = localStorage.getItem('token');
//   console.log(token)
//   if (token) {
//     request.headers.Authorization = `Bearer ${token}`;
//   }
//   return request;
// })
// 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,