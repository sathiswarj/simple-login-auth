import React,{useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import './Register.css'

const Home = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const loginUser = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch('http://localhost:3001/api/login', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email,
                  password
              }),
          });

          const data = await response.json();

          if (response.ok) {
              alert('Login successful');
              navigate('/blog');
          } else if (response.status === 409) {
              alert(data.error);
          } else {
              alert('Please enter correct email or password');
          }
      } catch (error) {
          alert('Network error. Please try again later.');
      }
  };
  return (
    <>
      <div className='container-fluid'>
  <div className='card'>
    <div className='card-title'>
      <h1 style={{color:'white'}}>Login</h1>
    </div>
    <div className='card-body'>
      <form onSubmit={loginUser}>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
            placeholder='Email'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
            placeholder='Password'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Submit'
            className='btn btn-primary'
          />
        </div>
      </form>
      <div className="account">
      <p style={{color:'white'}}>New account ? <Link to="/register" style={{color:'black',textDecoration:'none'}}>Register now</Link> </p>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default Home