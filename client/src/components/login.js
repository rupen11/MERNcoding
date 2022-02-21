import React, { useState } from 'react'
import '../styles/login.css'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
  const history = useHistory();
  const token = localStorage.getItem("Token");
  if (token) {
    history.push("/Notes");
  }

  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/login", userData);
    if (res.status === 200) {
      localStorage.setItem("Token", res.data.jwtToken);
      history.push("/Notes");
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Something went wrong!, You cant login'
      })
    }
  }

  return (
    <div className="container loginForm">
      <div className="logincontainer">
        <form className='loginform' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input type="email" name="email" id="emailLogin" placeholder='Enter Email' onChange={handleData} />
          <input type="password" name="password" id="paswdLogin" placeholder='Password' onChange={handleData} />
          <button>Login</button>
          <span><Link to="/Signup">Don't have account? Register</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login