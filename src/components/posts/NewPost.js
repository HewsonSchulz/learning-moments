import { useState } from 'react'
import { PostTopicBar } from './PostTopicBar'
import { getTopics } from '../../services/topicService'
import { addPost, getPostById, updatePost } from '../../services/postService'
import { currentDate, updateStateObject } from '../../utils'
import { useNavigate, useParams } from 'react-router-dom'
import './NewPost.css'

export const NewPost = ({ loggedInUser }) => {
	const [allTopics, setAllTopics] = useState([])
	const [post, setPost] = useState({ topicId: '0', title: '', body: '' })
	const navigate = useNavigate()
	// get current post id from URL path
	const { postId } = useParams()

	useState(() => {
		getTopics().then((topics) => {
			setAllTopics(topics)
		})
		if (postId) {
			getPostById(postId).then((post) => {
				setPost(post)
			})
		}
	}, [])

	const handleSaveClick = async () => {
		if (parseInt(post.topicId) && post.title && post.body) {
			const newPost = {
				title: post.title,
				body: post.body,
				timestamp: currentDate(),
				userId: loggedInUser.id,
				topicId: parseInt(post.topicId),
			}

			if (!postId) {
				await addPost(newPost)
			} else {
				newPost.id = postId
				await updatePost(newPost)
			}

			navigate('/created')
		}
	}

	return (
		<>
			<div className='edit-container'>
				<div className='edit-selections'>
					<input
						onChange={(event) => {
							updateStateObject(setPost, 'title', event.target.value)
						}}
						placeholder='Title'
						autoFocus
						value={post.title}
					/>
					<PostTopicBar
						setTopic={(value) => {
							updateStateObject(setPost, 'topicId', value)
						}}
						topics={allTopics}
						topicId={post.topicId}
					/>
				</div>

				<div className='edit-body'>
					<textarea
						onChange={(event) => {
							updateStateObject(setPost, 'body', event.target.value)
						}}
						placeholder='Body...'
						value={post.body}
					/>
				</div>
			</div>

			<button className='save-btn' onClick={handleSaveClick}>
				<i className='fa-solid fa-cloud-arrow-up' />
			</button>
		</>
	)
}
