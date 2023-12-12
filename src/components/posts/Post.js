// function for finding a topic based on its id
const getTopicById = (topicId, topics) => {
    for (const topic of topics) {
        if (topicId === topic.id) {
            return topic
        }
    }

    return null
}
// function for getting the like count of a post
const getLikeCount = (postId, likes) => {
    let count = 0

    for (const like of likes) {
        if (postId === like.postId) {
            count++
        }
    }

    return count
}

export const Post = ({ post, topics, likes }) => {
    const topic = getTopicById(post.topicId, topics)
    const likeCount = getLikeCount(post.id, likes)

    return <ul className='post'>
        <li className='post__item' id='post__title'>{post.title}</li>
        <li className='post__item' id='post__topic'>{topic?.name}</li>
        <li className='post__item' id='post__likes'>{likeCount}</li>
    </ul>
}
