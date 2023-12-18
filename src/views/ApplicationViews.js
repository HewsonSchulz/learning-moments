import { Outlet, Route, Routes } from 'react-router-dom'
import { PostsList } from '../components/posts/PostsList'
import { NavBar } from '../components/nav/NavBar'
import { useEffect, useState } from 'react'
import { PostDetails } from '../components/posts/PostDetails'
import { NewPost } from '../components/posts/NewPost'
import { MyPosts } from '../components/posts/MyPosts'

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        // get logged in user from local storage
        const localLearningUser = localStorage.getItem('learning_user')
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject) // { id: n }
    }, [])

    return <Routes>
        <Route path='/' element={<>
            <NavBar />
            <Outlet />
        </>}>

            <Route index element={<PostsList />} />

            <Route path='details'>
                <Route path=':postId' element={<PostDetails loggedInUser={currentUser} />} />
            </Route>

            <Route path='new' >
                <Route index element={<NewPost loggedInUser={currentUser} key='new-post' />} />
                <Route path=':postId' element={<NewPost loggedInUser={currentUser} key='edit-post' />} />
            </Route>

            <Route path='created' element={<MyPosts loggedInUser={currentUser} />} />

        </Route>
    </Routes>
}
