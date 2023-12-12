import { Outlet, Route, Routes } from 'react-router-dom'
import { PostsList } from '../components/posts/PostsList'
import { NavBar } from '../components/nav/NavBar'
import { useEffect, useState } from 'react'

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localLearningUser = localStorage.getItem('learning_user')
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject)
    }, [])

    return <Routes>
        <Route path='/' element={<>
            <NavBar />
            <Outlet />
        </>}>
            <Route index element={<PostsList />} />
        </Route>
    </Routes>
}
