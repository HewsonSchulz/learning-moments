import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

export const NavBar = ({ loggedInUser }) => {
	const navigate = useNavigate()
	const url = useLocation().pathname

	return (
		<ul className='navbar'>
			<li className='navbar-item'>
				<Link to='/' className='navbar-link' id={url === '/' ? 'selected' : ''}>
					All Posts
				</Link>
			</li>

			<li className='navbar-item'>
				<Link to='/new' className='navbar-link' id={url === '/new' ? 'selected' : ''}>
					New Post
				</Link>
			</li>

			<li className='navbar-item'>
				<Link to='/created' className='navbar-link' id={url === '/created' ? 'selected' : ''}>
					My Posts
				</Link>
			</li>

			<li className='navbar-item'>
				<Link to='/liked' className='navbar-link' id={url === '/liked' ? 'selected' : ''}>
					Favorites
				</Link>
			</li>

			<li className='navbar-item'>
				<Link
					to={`/profile/${loggedInUser.id}`}
					className='navbar-link'
					id={
						url === `/profile/${loggedInUser.id}` || url === `/profile/edit/${loggedInUser.id}`
							? 'selected'
							: ''
					}
				>
					Profile
				</Link>
			</li>

			{localStorage.getItem('learning_user') ? (
				<li className='navbar-item navbar-logout'>
					<Link
						to=''
						onClick={() => {
							localStorage.removeItem('learning_user')
							navigate('/login', { replace: true })
						}}
						className='navbar-link'
					>
						Logout
					</Link>
				</li>
			) : (
				''
			)}
		</ul>
	)
}
