import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById, updateUser } from '../../services/userService'
import { updateStateObject } from '../../utils'
import '../posts/NewPost.css'

export const EditProfile = ({ loggedInUser }) => {
	const { userId } = useParams()
	const navigate = useNavigate()
	const [profile, setProfile] = useState({ name: '', cohort: 0 })

	const handleSaveClick = async () => {
		if (loggedInUser.id && profile.name && parseInt(profile.cohort)) {
			const oldUser = await getUserById(loggedInUser.id)
			await updateUser({
				id: loggedInUser.id,
				name: profile.name,
				email: oldUser.email,
				cohort: parseInt(profile.cohort),
			})

			navigate(`/profile/${loggedInUser.id}`)
		}
	}

	useEffect(() => {
		if (loggedInUser.id && loggedInUser.id !== parseInt(userId)) {
			navigate('/')
		}
	}, [loggedInUser.id, navigate, userId])

	useEffect(() => {
		if (loggedInUser.id) {
			getUserById(loggedInUser.id).then((user) => {
				updateStateObject(setProfile, 'name', user.name)
				updateStateObject(setProfile, 'cohort', user.cohort)
			})
		}
	}, [loggedInUser.id]) //! updateProfileState dependency causes infinite loop

	return (
		<>
			<div className='edit-container'>
				<div className='edit-selections'>
					<input
						onChange={(event) => {
							updateStateObject(setProfile, 'name', event.target.value)
						}}
						placeholder='Full Name'
						autoFocus
						value={profile.name}
					/>

					<input
						onChange={(event) => {
							updateStateObject(setProfile, 'cohort', event.target.value)
						}}
						type='number'
						placeholder='Cohort #'
						value={profile.cohort}
					/>
				</div>
			</div>

			<button className='save-btn' onClick={handleSaveClick}>
				<i className='fa-solid fa-cloud-arrow-up' />
			</button>
		</>
	)
}
