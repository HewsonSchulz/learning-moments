export const getLikes = async () => {
    return await fetch('http://localhost:8088/likes').then((res) => res.json())
}
