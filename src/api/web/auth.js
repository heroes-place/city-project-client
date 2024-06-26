import router from '../../router/'
import { socket } from '@/api/socket/socket.js'

const protocol = import.meta.env.MODE === 'production' ? 'https' : 'http'
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

export const logout = () => {
  socket.close()

  localStorage.removeItem('token')

  router.go('/login')
}

export const login = async (accountName, password) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        accountName,
        password
      })
    }

    fetch(`${protocol}://${SERVER_ADDRESS}/api/account/login?=`, options)
      .then(res => {
        if (res.ok) return res.json()

        return res.json().then(text => {
          throw new Error(text.message)
        })
      })
      .then(response => {
        console.log(response)

        const token = response.token

        localStorage.setItem('token', token)

        resolve(token)
      })
      .catch(err => reject(err))
  })
}

export const register = async (accountName, characterName, emailAddress, password) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        accountName,
        characterName,
        emailAddress,
        password
      })
    }

    fetch(`${protocol}://${SERVER_ADDRESS}/api/account/register?=`, options)
      .then(res => {
        if (res.ok) resolve()

        return res.json().then(text => {
          throw new Error(text.message)
        })
      })
      .catch(err => reject(err))
  })
}

export const checkToken = async () => {
  const token = localStorage.getItem('token')

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        token
      })
    }

    fetch(`${protocol}://${SERVER_ADDRESS}/api/account/verify-token?=`, options)
      .then(res => {
        if (res.ok) return res.json()

        return res.json().then(text => {
          throw new Error(text.message)
        })
      })
      .then(response => {
        resolve(true)
      })
      .catch(err => reject(err))
  })
}

// Move later in a user.js file

export const jwt_parse = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}
