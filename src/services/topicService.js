export const getTopics = async () => {
    return await fetch('http://localhost:8088/topics').then((res) => res.json())
}

export const getTopicById = async (id) => {
    return await fetch(`http://localhost:8088/topics/${id}`)
        .then((res) => res.json())
}
