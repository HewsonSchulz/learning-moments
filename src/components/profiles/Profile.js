import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../services/userService'
import { getPosts } from '../../services/postService'

export const Profile = () => {
    const { userId } = useParams()
    const [user, setUser] = useState({})
    const [numberOfPosts, setNumberOfPosts] = useState(0)

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

    </ul>
}
