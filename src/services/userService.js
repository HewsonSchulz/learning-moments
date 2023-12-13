import { fetchOptions } from '../utils'

// get all users from database
export const getUsers = async () => {
  return await fetch('http://localhost:8088/users')
    .then((res) => res.json())
}

// get specific user from database based on its email
export const getUserByEmail = async (email) => {
  return await fetch(`http://localhost:8088/users?email=${email}`)
    .then((res) => res.json())
}

// add new user to database
export const createUser = async (user) => {
  return await fetch('http://localhost:8088/users', fetchOptions('POST', user))
    .then((res) => res.json())
}

// get specific user from database based on its id
export const getUserById = async (id) => {
  return await fetch(`http://localhost:8088/users/${id}`)
    .then((res) => res.json())
}
