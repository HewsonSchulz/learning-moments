// get all posts from database
export const getPosts = async () => {
    return await fetch('http://localhost:8088/posts').then((res) => res.json())
}

// get specific post from database based on its id
export const getPostById = async (id) => {
    return await fetch(`http://localhost:8088/posts/${id}`)
        .then((res) => res.json())
}
