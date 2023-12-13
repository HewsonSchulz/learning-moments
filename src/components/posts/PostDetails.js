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
    // get current post id from URL
    const { postId } = useParams()


    const setAndGetLikes = () => {
        // get all likes
        getLikes().then((likes) => {

            // set current like
            setLike(getLikeByCFK(loggedInUser.id, post.id, likes))

            // set like count
            setLikeCount(getLikeCount(post.id, likes))

            for (const like of likes) {
                // if the current user has liked the current post
                if (like.userId === loggedInUser.id && like.postId === post.id) {
                    // set if user has liked current post to true
                    setHasLikedPost(true)
                }
            }

        })
    }


    useEffect(() => {
        // get current post object based on its id
        getPostById(postId).then((post) => {
            setPost(post)
        })

        // if post has been saved
        if (post.userId) {
            // get user object based on current post's userId
            getUserById(post.userId).then((user) => {
                setUser(user)
            })
        }

        // if post has been saved
        if (post.topicId) {
            // get topic object based on current post's topicId
            getTopicById(post.topicId).then((topic) => {
                setTopic(topic)
            })
        }

        // get all likes
        setAndGetLikes()

        if (loggedInUser.id === user.id) {
            setIsAuthor(true)
        }

    }, [loggedInUser.id, post.topicId, post.userId, postId, user.id]) // setAndGetLikes dependency causes infinite loop

    const handleLikeClick = async () => {
        await addLike({ userId: loggedInUser.id, postId: post.id })
        setAndGetLikes()
    }

    const handleUnlikeClick = async () => {
        await deleteLike(like)
        setHasLikedPost(false)
        setAndGetLikes()
    }

    const renderLikeButton = () => {
        // if current user is not the author, and current user is not undefined
        if (!isAuthor && user.id) {
            // and has liked the post
            if (hasLikedPost) {
                // then return unlike button
                return <button className='unlike-btn' onClick={handleUnlikeClick}>Unlike</button>
            } else {
                // otherwise, return like button
                return <button className='like-btn' onClick={handleLikeClick}>Like</button>
            }
        } else {
            // if current user is the author, return nothing
            return ''
        }
    }
    // if current user is the author, display nothing

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
