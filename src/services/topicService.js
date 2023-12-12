export const getTopics = async () => {
    return await fetch('http://localhost:8088/topics').then((res) => res.json())
}
