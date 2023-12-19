import { fetchOptions } from "../utils"

// get all likes from database
export const getLikes = async () => {
    return await fetch('http://localhost:8088/likes').then((res) => res.json())
}

// get number of likes for a given post
export const getLikeCount = (postId, likes) => {
    let count = 0

    for (const like of likes) {
        if (postId === like.postId) {
            count++
        }
    }

    return count
}

// add new like to database
export const addLike = async (body) => {
    return await fetch('http://localhost:8088/likes', fetchOptions('POST', body))
        .then((res) => res.json())
}

// delete specific like from database
export const deleteLike = async (like) => {
    return await fetch(`http://localhost:8088/likes/${like.id}`, fetchOptions('DELETE'))
        .then((res) => res.json())
}

// get specific like based on its composite foreign key
export const getLikeByCFK = (userId, postId, likes) => {
    for (const like of likes) {
        if (postId === like.postId && userId === like.userId) {
            return like
        }
    }

    return null
}
