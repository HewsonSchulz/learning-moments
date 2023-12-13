import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { getUserByEmail } from '../../services/userService'

export const Login = () => {
  const [email, setEmail] = useState('hewsonschulz@bruh.com')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const foundUsers = await getUserByEmail(email.toLowerCase())
    if (foundUsers.length === 1) {
      const user = foundUsers[0]
      localStorage.setItem(
        'learning_user',
        JSON.stringify({
          id: user.id,
        })
      )

      navigate('/')
    } else {
      window.alert('Invalid login')
    }
  }

  return (
    <main className='auth-container'>
      <section>
        <form className='auth-form' onSubmit={handleLogin}>
          <h1 className='header'>Learning Moments</h1>
          <h2>Please sign in</h2>
          <fieldset className='auth-fieldset'>
            <div>
              <input
                type='email'
                value={email}
                className='auth-form-input'
                onChange={(evt) => setEmail(evt.target.value)}
                placeholder='Email address'
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className='auth-fieldset'>
            <div>
              <button className='auth-btn' type='submit'>Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className='register-link'>
        <Link to='/register'>Not a member yet?</Link>
      </section>
    </main>
  )
}
