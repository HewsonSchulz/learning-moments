export const getPosts = async () => {
    return await fetch('http://localhost:8088/posts').then((res) => res.json())
}

export const getPostById = async (id) => {
    return await fetch(`http://localhost:8088/posts/${id}`)
        .then((res) => res.json())
}
