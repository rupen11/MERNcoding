import React, { useState } from 'react'
import '../styles/signup.css'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const Signup = () => {
  const history = useHistory();
  const token = localStorage.getItem("Token");
  if (token) {
    history.push("/Notes");
  }

  const [userData, setUserData] = useState({ email: "", password: "", confirmpassword: "" });

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
    const json = await res.json();
    if (res.status === 200) {
      localStorage.setItem("Token", json.jwtToken);
      history.push("/Notes");
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Something went wrong!'
      })
    }
  }


  return (
    <div className="container signupform">
      <div className="signupcontainer">
        <form className='registerForm' onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input className='emailsignup' type="email" name='email' id='email' placeholder='Enter Email' autoComplete='off' onChange={handleData} />

          <input className='paswd' type="password" name='password' id='password' placeholder='Password' onChange={handleData} />

          <input className='cpaswd' type="password" name="confirmpassword" id="cpassword" placeholder='Confirm Password' onChange={handleData} />

          <button type='submit'>Signup</button>
          <span><Link to="/Login">Already a user? Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup