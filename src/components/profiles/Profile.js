import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../../services/userService'
import { getPosts } from '../../services/postService'
import './Profile.css'

export const Profile = ({ loggedInUser }) => {
	const { userId } = useParams()
	const [user, setUser] = useState({})
	const [numberOfPosts, setNumberOfPosts] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		getUserById(userId).then((user) => setUser(user))

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
			return (
				<div
					id='profile-edit'
					className='fa-solid fa-pen-to-square edit-btn'
					onClick={() => {
						navigate(`/profile/edit/${loggedInUser.id}`)
					}}
				/>
			)
		}

		return ''
	}

	return (
		<>
			{renderEditButton()}
			<ul className='profile'>
				<li className='profile__item bold' id='profile__name'>
					{user.name}
				</li>

				<li className='profile__item' id='profile__cohort'>
					Cohort #<span className='bold'>{user.cohort}</span>
				</li>

				<li className='profile__item' id='profile__posts'>
					Created <span className='bold'>{numberOfPosts}</span> post
					{numberOfPosts !== 1 ? 's' : ''}
				</li>
			</ul>
		</>
	)
}
