import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"
import { getUserById } from "../../services/userService"
import { getTopicById } from "../../services/topicService"
import { addLike, deleteLike, getLikeByCFK, getLikeCount, getLikes } from "../../services/likeService"

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const [topic, setTopic] = useState({})
    const [like, setLike] = useState({})
    const [likeCount, setLikeCount] = useState(0)
    const [hasLikedPost, setHasLikedPost] = useState(false)
    const [isAuthor, setIsAuthor] = useState(false)
    // get current post id from URL path
    const { postId } = useParams()


    //? refactor this function into likeService.js
    const setAndGetLikes = () => {
        // get all likes
        getLikes().then((likes) => {
            // set current like
            setLike(getLikeByCFK(loggedInUser.id, post.id, likes))
            // set like count
            setLikeCount(getLikeCount(post.id, likes))

            // check if the current user has liked the current post
            for (const like of likes) {
                if (like.userId === loggedInUser.id && like.postId === post.id) {
                    setHasLikedPost(true)
                }
            }
        })
    }


    useEffect(() => {
        // get current post object
        getPostById(postId).then((post) => {
            setPost(post)
        })

        // if post has been saved
        if (post.userId) {
            // get current user object
            getUserById(post.userId).then((user) => {
                setUser(user)
            })
        }

        // if post has been saved
        if (post.topicId) {
            // get current topic object
            getTopicById(post.topicId).then((topic) => {
                setTopic(topic)
            })
        }

        // get all likes
        setAndGetLikes()

        if (loggedInUser.id === user.id) {
            setIsAuthor(true)
        }

    }, [loggedInUser.id, post.topicId, post.userId, postId, user.id]) //! setAndGetLikes dependency causes infinite loop


    const handleLikeClick = async () => {
        await addLike({ userId: loggedInUser.id, postId: post.id })
        setAndGetLikes()
        //TODO navigate to the Favorites view
    }
    const handleUnlikeClick = async () => {
        await deleteLike(like)
        setHasLikedPost(false)
        setAndGetLikes()
    }
    const handleEditClick = async () => {
        //TODO navigate to Edit Post view
    }

    const renderLikeButton = () => {
        // if current user is not the author, and current user exists
        if (!isAuthor && user.id) {
            // if user has liked the post
            if (hasLikedPost) {
                // return unlike button
                return <button className='unlike-btn' onClick={handleUnlikeClick}>Unlike</button>
            } else {
                // otherwise, return like button
                return <button className='like-btn' onClick={handleLikeClick}>Like</button>
            }
        } else {
            // if current user is the author, return edit button
            return <button className='edit-btn' onClick={handleEditClick}>Edit</button>
        }
    }


    return <ul className='post'>

        <li>{post.title}</li>
        <li>{user.name}</li>
        <li>{topic.name}</li>
        <li>{post.timestamp}</li>
        <li>{post.body}</li>
        <li>{likeCount}</li>

        {renderLikeButton()}

    </ul>
}
