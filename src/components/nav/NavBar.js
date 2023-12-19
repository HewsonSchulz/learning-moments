import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

export const NavBar = ({ loggedInUser }) => {
    const navigate = useNavigate()

    return <ul className='navbar'>

        <li className='navbar-item'>
            <Link to='/' className='navbar-link'>All Posts</Link>
        </li>

        <li className='navbar-item'>
            <Link to='/new' className='navbar-link'>New Post</Link>
        </li>

        <li className='navbar-item'>
            <Link to='/created' className='navbar-link'>My Posts</Link>
        </li>

        <li className='navbar-item'>
            <Link to='/liked' className='navbar-link'>Favorites</Link>
        </li>

        <li className='navbar-item'>
            <Link to={`/profile/${loggedInUser.id}`} className='navbar-link'>Profile</Link>
        </li>

        {localStorage.getItem('learning_user') ? (
            <li className='navbar-item navbar-logout'>
                <Link to='' onClick={() => {
                    localStorage.removeItem('learning_user')
                    navigate('/login', { replace: true })
                }} className='navbar-link'>
                    Logout
                </Link>
            </li>
        ) : ('')}

    </ul>
}
