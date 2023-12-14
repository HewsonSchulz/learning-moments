import { Link } from 'react-router-dom'
import { getLikeCount } from '../../services/likeService'
import { findTopicById } from '../../services/topicService'
import { deletePost } from '../../services/postService'

export const Post = ({ post, topics, likes, author, resetState }) => {
    const topic = findTopicById(post.topicId, topics)
    const likeCount = getLikeCount(post.id, likes)

    const handleDeleteClicked = async () => {
        await deletePost(post)
        resetState()
    }

    // if there is no author
    if (!author) {
        return <ul className='post'>

            <Link to={`/details/${post.id}`}>
                <li className='post__item' id='post__title'>{post.title}</li>
            </Link>

            <li className='post__item' id='post__topic'>{topic?.name}</li>

            <li className='post__item' id='post__likes'>{likeCount}</li>

        </ul>
    } else {
        // otherwise, if there is an author
        return <ul className='post'>

            <li>
                <Link to={`/details/${post.id}`}>
                    <span className='post__item' id='post__title'>{post.title}</span>
                </Link>
                <button className='delete-btn' onClick={handleDeleteClicked}>
                    <i className='fa-solid fa-trash-can' />
                </button>
            </li>


        </ul>
    }
}
