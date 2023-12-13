import { fetchOptions } from "../utils"

export const getLikes = async () => {
    return await fetch('http://localhost:8088/likes').then((res) => res.json())
}

export const getLikeCount = (postId, likes) => {
    let count = 0

    for (const like of likes) {
        if (postId === like.postId) {
            count++
        }
    }

    return count
}

export const addLike = async (body) => {
    return await fetch('http://localhost:8088/likes', fetchOptions('POST', body))
        .then((res) => res.json())
}

export const deleteLike = async (like) => {
    return await fetch(`http://localhost:8088/likes/${like.id}`, fetchOptions('DELETE'))
        .then((res) => res.json())
}

export const getLikeByCFK = (userId, postId, likes) => {
    for (const like of likes) {
        if (postId === like.postId && userId === like.userId) {
            return like
        }
    }

    return {}
}
