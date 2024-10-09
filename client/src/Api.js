import axios from 'axios'

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api'
})

export const registerUser = (username, password, birth_date, location) => {
  return Api.post('/v1/users', {
    username,
    password,
    birth_date,
    location
  })
    .then(response => {
      console.log(response.data)
      return response
    })
    .catch(error => {
      console.log(error)
    })
}

export const logInUser = (username, password) => {
  return Api.post('/v1/login', {
    username,
    password
  })
    .then(response => {
      console.log('User ID created')
      const userId = response.data
      localStorage.setItem('userId', userId)
      return response
    })
    .catch(error => {
      console.log(error)
    })
}
export const updateUserProfile = (userId, formData) => {
  return Api.put(`/api/v1/users/${userId}`, formData)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}
export const getUserProfile = (userId) => {
  return Api.get(`/api/v1/users/${userId}`)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}
export const DeleteUserProfile = (userId) => {
  return Api.delete(`/api/v1/users/${userId}`)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}
