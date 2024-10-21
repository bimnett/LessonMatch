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
      const userId = response.data
      localStorage.setItem('userId', userId)
      console.log('User ID created')
      return response
    })
    .catch(error => {
      console.log(error)
    })
}
export const updateUserProfile = (userId, formData) => {
  return Api.put(`/users/${userId}`, formData)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
export const getUserProfile = (userId) => {
  return Api.get(`/users/${userId}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const getUserProfileHyperlink = (hyperlink) => {
  return Api.get(hyperlink)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const getUserSkills = (userId) => {
  return Api.get(`/users/${userId}/skills`)
    .then(response => {
      const skills = response.data.filter(skill => skill.isAnInterest === false)
      return skills
    })
    .catch(error => {
      throw error
    })
}
export const getUserInterests = (userId) => {
  return Api.get(`/users/${userId}/skills`)
    .then(response => {
      const interests = response.data.filter(skill => skill.isAnInterest === true)
      return interests
    })
    .catch(error => {
      throw error
    })
}

export const deleteUserProfile = (userId) => {
  return Api.delete(`/users/${userId}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
export const getChatrooms = async (userId) => {
  try {
    const response = await Api.get('/chatrooms/')
    return response.data
  } catch (err) {
    console.error('There was a problem retrieving the chatrooms.')
  }
}
export const getChatroomById = async (chatroomId) => {
  try {
    const response = await Api.get('/chatrooms/:id')
    return response.data
  } catch (err) {
    console.error('There was a problem retrieving this chatroom.')
  }
}
export const deleteAllUsers = async () => {
  try {
    const response = await Api.delete('/users/')
    return response.data
  } catch (err) {
    console.error("There was a problem deleting all users.");
  }
}
export const getUsersForCategory = async (categoryName, sortOrder = 1) => {
  try {
    const response = await Api.get(`/users/skills?categoryName=${categoryName}&sortOrder=${sortOrder}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteAllMessages = async () => {
  try {
    const response = await Api.delete('/messages/');
    return response.data;
  } catch(err){
    throw err;
  }
}

export const createNewChat = async (thisUser, otherUser) => {
  try {
    const response = await Api.post(`/users/${thisUser}/chatrooms`, {
      user2: otherUser 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMessage = (chatroomId, senderId, sentAt, content) => {
  return Api.post('/messages', {
    chatroomId,
    senderId,
    sentAt,
    content
  })
    .then(response => {
      return response
    })
    .catch(error => {
      throw error;
    })
}
export const getMessages = async (chatroomId) => {
  try {
    const response = await Api.get(`/chatrooms/${chatroomId}/messages`)
    return response.data
  } catch (err) {
    console.error('There was a problem retrieving the messages.')
  }
}
export const createSkill = (name, level, category, userId, isAnInterest) => {
  return Api.post('/skills', {
    name,
    level,
    category,
    userId,
    isAnInterest
  })
    .then(response => {
      return response
    })
    .catch(error => {
      throw error;
    })
}

export const getChatroomsOfUser = async (userId) => {
  try {
    const response = await Api.get(`/users/${userId}/chatrooms/`)
    return response.data
  } catch (error) {
      throw error
  }
}
