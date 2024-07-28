import React,{useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import './Register.css'

const Register = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });
    
        const data = await response.json();
    
        if (response.ok) {
          alert('Registration successful');
          navigate('/login');
        } else if (response.status === 409) {
          alert(data.error);
        } else {
          alert('An error occurred. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      }
    };
    
    
  return (
    <>
   <div className='container-fluid'>
  <div className='card'>
    <div className='card-title'>
      <h1 style={{color:'white'}}>Signup</h1>
    </div>
    <div className='card-body'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='form-control'
            placeholder='Name'
            required
          />
        </div>
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
      <p style={{color:'white'}}>Already have an account ? <Link to="/login" style={{color:'black',textDecoration:'none'}}>Login now</Link> </p>
      </div>
    
    </div>
  </div>
</div>


    </>
  )
}

export default Register