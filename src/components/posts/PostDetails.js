import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"
import { getUserById } from "../../services/userService"
import { getTopicById } from "../../services/topicService"
import { getLikeCount, getLikes } from "../../services/likeService"

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const [topic, setTopic] = useState({})
    const [allLikes, setAllLikes] = useState([])
    const [likeCount, setLikeCount] = useState(0)
    const { postId } = useParams()

    useEffect(() => {
        getPostById(postId).then((post) => {
            setPost(post)
        })

        if (post.userId) {
            getUserById(post.userId).then((user) => {
                setUser(user)
            })
        }

        if (post.topicId) {
            getTopicById(post.topicId).then((topic) => {
                setTopic(topic)
            })
        }

        getLikes().then((likes) => {
            setAllLikes(likes)
        })

    }, [post.id, post.topicId, post.userId, postId])

    useEffect(() => {
        setLikeCount(getLikeCount(post.id, allLikes))
    }, [allLikes, post.id])

    return <ul className='post'>

        <li>{post.title}</li>
        <li>{user.name}</li>
        <li>{topic.name}</li>
        <li>{post.timestamp}</li>
        <li>{post.body}</li>
        <li>{likeCount}</li>

    </ul>
}
// title, author, topic, date, body, number of likes
