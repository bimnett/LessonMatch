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
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
});
};

export const logInUser = (username, password) => {
  return axios.post('/api/v1/login', {
    username, 
    password
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
});
};
