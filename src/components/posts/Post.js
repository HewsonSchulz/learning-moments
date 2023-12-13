import { Link } from 'react-router-dom'
import { getLikeCount } from '../../services/likeService'
import { findTopicById } from '../../services/topicService'

export const Post = ({ post, topics, likes }) => {
    const topic = findTopicById(post.topicId, topics)
    const likeCount = getLikeCount(post.id, likes)

    return <ul className='post'>

        <Link to={`/details/${post.id}`}>
            <li className='post__item' id='post__title'>{post.title}</li>
        </Link>

        <li className='post__item' id='post__topic'>{topic?.name}</li>

        <li className='post__item' id='post__likes'>{likeCount}</li>

    </ul>
}
