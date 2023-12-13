export const getLikes = async () => {
    return await fetch('http://localhost:8088/likes').then((res) => res.json())
}

// function for getting the like count of a post
export const getLikeCount = (postId, likes) => {
    let count = 0

    for (const like of likes) {
        if (postId === like.postId) {
            count++
        }
    }

    return count
}