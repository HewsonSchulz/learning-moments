import { Outlet, Route, Routes } from 'react-router-dom'
import { PostsList } from '../components/posts/PostsList'
import { NavBar } from '../components/nav/NavBar'
import { useEffect, useState } from 'react'
import { PostDetails } from '../components/posts/PostDetails'

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

        </Route>
    </Routes>
}
