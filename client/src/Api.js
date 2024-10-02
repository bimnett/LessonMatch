import axios from 'axios'

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api'
})

export const registerUser = (username, password, birth_date, location) => {
  return axios.post('/api/v1/users', {
    username, 
    password, 
    birth_date, 
    location
  })
};
