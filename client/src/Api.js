import axios from 'axios'

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api/v1'
})

export const registerUser = (username, password, birth_date, location) => {
  return Api.post('/users', {
    username,
    password,
    birth_date,
    location
  })
    .then(response => {
      console.log(response.data)
      const hyperlink = response.data.hyperlink.href
      localStorage.setItem('hyperlink', hyperlink)
      return response
    })
    .catch(error => {
      console.log(error)
    })
}

export const logInUser = (username, password) => {
  return Api.post('/login', {
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
  return Api.put(`/users/${userId}`, formData)
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
  return Api.get(`/users/${userId}`)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export const getUserProfileHyperlink = (hyperlink) => {
  return Api.get(hyperlink)
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
  return Api.get(`/users/${userId}/skills`)
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
export const getUserInterests = (userId) => {
  return Api.get(`/users/${userId}/skills`)
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
  return Api.delete(`/users/${userId}`)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}
export const getChatrooms = async (userId) => {
  try {
    const response = await Api.get('/chatrooms/');
    return response.data;
  }catch(err){
    console.error("There was a problem retrieving the chatrooms.");
  }
}
export const deleteAllUsers = async () => {
  try{
    const response = await Api.delete('/users/');
    return response.data;
  } catch(err){
    console.error("There was a problem deleting all users.");
  }
}
export const deleteAllMessages = async () => {
  try {
    const response = await Api.delete('/messages/');
    return response.data;
  } catch(err){
    console.error("There was a problem deleting all messages.");
  }
}

export const createMessage = (chatroomID, senderID, sentAt, content) => {
  return Api.post('/messages', {
    chatroomID,
    senderID,
    sentAt,
    content
  })
    .then(response => {
      console.log(response.data)
      return response
    })
    .catch(error => {
      console.log(error)
    })
}