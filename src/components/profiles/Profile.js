import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../../services/userService'
import { getPosts } from '../../services/postService'

export const Profile = ({ loggedInUser }) => {
    const { userId } = useParams()
    const [user, setUser] = useState({})
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(userId).then((user) =>
            setUser(user)
        )

        getPosts().then((posts) => {
            let count = 0
            for (const post of posts) {
                if (post.userId === parseInt(userId)) {
                    count++
                }
            }
            setNumberOfPosts(count)
        })
    }, [userId])


    const renderEditButton = () => {
        if (user.id === loggedInUser.id) {
            return <button className='edit-btn' onClick={() => { navigate(`/profile/edit/${loggedInUser.id}`) }}>Edit</button>
        }

        return ''
    }


    return <ul className='profile'>

        <li className='profile__item' id='profile__name'>
            {user.name}
        </li>

        <li className='profile__item' id='profile__cohort'>
            Cohort {user.cohort}
        </li>

        <li className='profile__item' id='profile__cohort'>
            Created {numberOfPosts} post
            {numberOfPosts !== 1 ? 's' : ''}
        </li>

        {renderEditButton()}

    </ul>
}
