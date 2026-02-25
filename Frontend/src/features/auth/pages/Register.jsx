import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleregister } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
       await handleregister(username, email, password);
      
      navigate('/'); // redirect to home or dashboard after successful registration
    } catch (err) {
      console.error(err);
    }
  }
    
  
  

  
  
  return (
    <main>
       <div className="form-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            type="text" 
            name='username' 
            placeholder='Username' />
          <input  
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            type="text" 
            name='email' 
            placeholder='Email' />
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            name='password' 
            placeholder='Password' />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      
      </div>
      
      
    </main>
  )
}

export default Register