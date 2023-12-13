import { Link } from 'react-router-dom'
import { getLikeCount } from '../../services/likeService'

// function for finding a topic based on its id
const getTopicById = (topicId, topics) => {
    for (const topic of topics) {
        if (topicId === topic.id) {
            return topic
        }
    }

    return null
}

export const Post = ({ post, topics, likes }) => {
    const topic = getTopicById(post.topicId, topics)
    const likeCount = getLikeCount(post.id, likes)

    return <ul className='post'>

        <Link to={`/details/${post.id}`}>
            <li className='post__item' id='post__title'>{post.title}</li>
        </Link>

        <li className='post__item' id='post__topic'>{topic?.name}</li>

        <li className='post__item' id='post__likes'>{likeCount}</li>

    </ul>
}
