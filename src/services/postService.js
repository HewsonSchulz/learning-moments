// import { generateOptions } from '../utils'

export const getPosts = async () => {
    return await fetch('http://localhost:8088/posts').then((res) => res.json())
}


// export const postNewJoke = async (text) => {
//     const transientState = {
//         text,
//         told: false,
//     }

//     let response = await fetch('http://localhost:8088/jokes', generateOptions('POST', transientState))
//     response = await response.json()

//     return response
// }

// export const getAllJokes = async () => {
//     return await fetch('http://localhost:8088/jokes').then((res) => res.json())

// }

// export const updateJoke = async (joke) => {
//     let response = await fetch(`http://localhost:8088/jokes/${joke.id}`, generateOptions('PUT', joke))
//     response = await response.json()

//     return response
// }

// export const deleteJoke = async (joke) => {
//     let response = await fetch(`http://localhost:8088/jokes/${joke.id}`, generateOptions('DELETE'))
//     response = await response.json()

//     return response
// }
