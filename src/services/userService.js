import { generateOptions } from '../utils'

export const getUsers = async () => {
  return await fetch('http://localhost:8088/users')
    .then((res) => res.json())
}

export const getUserByEmail = async (email) => {
  return await fetch(`http://localhost:8088/users?email=${email}`)
    .then((res) => res.json())
}

export const createUser = async (user) => {
  return await fetch('http://localhost:8088/users', generateOptions('POST', user))
    .then((res) => res.json())
}

export const getUserById = async (id) => {
  return await fetch(`http://localhost:8088/users/${id}`)
    .then((res) => res.json())
}
