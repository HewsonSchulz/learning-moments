import { useState } from "react"
import { PostTopicBar } from "./PostTopicBar"
import { getTopics } from "../../services/topicService"
import { addPost } from "../../services/postService"
import { currentDate } from "../../utils"
import { useNavigate } from "react-router-dom"

export const NewPost = ({ loggedInUser }) => {
    const [topicId, setTopicId] = useState('0')
    const [allTopics, setAllTopics] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const navigate = useNavigate()


    useState(() => {
        getTopics().then((topics) => {
            setAllTopics(topics)
        })
    }, [])

    const handleSaveClick = async () => {
        if (parseInt(topicId) && title && body) {
            await addPost({
                title,
                body,
                timestamp: currentDate(),
                userId: loggedInUser.id,
                topicId: parseInt(topicId)
            }).then(navigate('/'))
        }

        // TODO: navigate to My Posts view
        //! does not load new post on first render
    }


    return <>
        <div className='edit-container'>

            <div className='edit-options'>
                <PostTopicBar setTopic={setTopicId} topics={allTopics} />
                <input
                    className=''
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder='Title'
                    autoFocus
                />
            </div>

            <input
                className=''
                onChange={(event) => setBody(event.target.value)}
                placeholder='Body'
            />
        </div>

        <button className='save-btn' onClick={handleSaveClick}>Save</button>
    </>
}
