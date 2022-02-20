import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
import '../styles/playwithnotes.css'

const Playwithnotes = () => {
  const history = useHistory();
  const token = localStorage.getItem("Token");
  if (!token) {
    history.push("/Login");
  }

  return (
    <>
      <div className="container maincontent">
        <button><FaPlus className='icon' />Select Note</button>
      </div>
    </>
  )
}

export default Playwithnotes