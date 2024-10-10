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
export const getUserSkills = (userId) => {
  return Api.get(`/api/v1/users/${userId}/skills`)
    .then(response => {
      console.log(response.data)
      const skills = response.data.filter(skill => skill.isAnInterest === false)
      return skills
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}
export const getUserinterests = (userId) => {
  return Api.get(`/api/v1/users/${userId}/skills`)
    .then(response => {
      console.log(response.data)
      const interests = response.data.filter(skill => skill.isAnInterest === true)
      return interests
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export const deleteUserProfile = (userId) => {
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
