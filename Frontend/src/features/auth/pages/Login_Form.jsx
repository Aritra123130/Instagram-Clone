import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const Login_Form = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { handlelogin } = useAuth();
  const navigate = useNavigate();
   
  async function handleSubmit(e) {
    e.preventDefault()
  
      // await axios.post('http://localhost:3000/api/auth/login', {
      //   username,
      //   password,
      // },{withCredentials:true}).then((res)=>{console.log(res)});
      handlelogin(username,password)
      .then((res)=>{console.log(res); navigate('/');} );

    
  }

  return (
    <main>
      <div className="form-container">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name='username'
            placeholder='Username'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name='password'
            placeholder='Password'
          />
          <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login_Form