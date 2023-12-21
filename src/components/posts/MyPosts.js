import { PostsList } from './PostsList'

export const MyPosts = ({ loggedInUser }) => {
	return <PostsList author={loggedInUser} />
}
