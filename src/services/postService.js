import { fetchOptions } from "../utils"

// get all posts from database
export const getPosts = async () => {
    return await fetch('http://localhost:8088/posts').then((res) => res.json())
}

// get specific post from database based on its id
export const getPostById = async (id) => {
    return await fetch(`http://localhost:8088/posts/${id}`)
        .then((res) => res.json())
}

// add new post to database
export const addPost = async (post) => {
    return await fetch('http://localhost:8088/posts', fetchOptions('POST', post))
        .then((res) => res.json())
}

// get specific post based on its author
export const findPostByUser = (userId, posts) => {
    for (const post of posts) {
        if (userId === post.userId) {
            return post
        }
    }

    return null
}

// delete specific posts from database
export const deletePost = async (post) => {
    return await fetch(`http://localhost:8088/posts/${post.id}`, fetchOptions('DELETE'))
        .then((res) => res.json())
}

// update old post in database
export const updatePost = async (post) => {
    return await fetch(`http://localhost:8088/posts/${post.id}`, fetchOptions('PUT', post))
        .then((res) => res.json())
}
