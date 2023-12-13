// get all topics from database
export const getTopics = async () => {
    return await fetch('http://localhost:8088/topics').then((res) => res.json())
}

// get specific topic from database based on its id
export const getTopicById = async (id) => {
    return await fetch(`http://localhost:8088/topics/${id}`)
        .then((res) => res.json())
}

// get specific topic based on its id
export const findTopicById = (topicId, topics) => {
    for (const topic of topics) {
        if (topicId === topic.id) {
            return topic
        }
    }

    return null
}
