import { Link } from 'react-router-dom'
import { deleteLike, getLikeByCFK, getLikeCount } from '../../services/likeService'
import { findTopicById } from '../../services/topicService'
import { deletePost } from '../../services/postService'
import './Posts.css'

export const Post = ({ post, topics, likes, author, likedPostsUser, resetState }) => {
    const topic = findTopicById(post.topicId, topics)
    const likeCount = getLikeCount(post.id, likes)

    const handleDeleteClicked = async () => {
        await deletePost(post)
        resetState()
    }

    const handleUnlikeClicked = async () => {
        await deleteLike(getLikeByCFK(likedPostsUser.id, post.id, likes))
        resetState()
    }

    // if there is an author
    if (author) {
        return <div className='post'>
            <ul className='post-ul'>

                <li>
                    <Link to={`/details/${post.id}`}>
                        <span className='post__item' id='post__title'>{post.title}</span>
                    </Link>
                    <button className='delete-btn' onClick={handleDeleteClicked}>
                        <i className='fa-solid fa-trash-can' />
                    </button>
                </li>

            </ul>
        </div>
    } else if (likedPostsUser) {
        // otherwise, if there is a likedPostsUser
        return <div className='post'>
            <ul className='post-ul'>

                <li>
                    <Link to={`/details/${post.id}`}>
                        <span className='post__item' id='post__title'>{post.title}</span>
                    </Link>
                    <button className='unlike-btn' onClick={handleUnlikeClicked}>
                        Unlike
                    </button>
                </li>

            </ul>
        </div>
    } else {
        // otherwise, if there is no author or likedPostsUser
        return <div className='post'>
            <ul className='post-ul'>

                <Link to={`/details/${post.id}`}>
                    <li className='post__item' id='post__title'>{post.title}</li>
                </Link>

                <li className='post__item' id='post__topic'>{topic?.name}</li>

                <li className='post__item' id='post__likes'><i className='fa-solid fa-thumbs-up' />&ensp;{likeCount}</li>

            </ul>
        </div>
    }
}
