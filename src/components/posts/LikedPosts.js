import { PostsList } from "./PostsList"

export const LikedPosts = ({ loggedInUser }) => {
    return <PostsList likedPostsUser={loggedInUser} />
}
