import React from 'react'
import UserForm from '../components/UserForm'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-row p-10 items-center content-center justify-evenly'>
      <div>
        <UserForm formType='login' />
        <p>No tienes una cuenta?</p>
        <Link to='/register'>Registrate!</Link>
      </div>
    </div>
  )
}

export default Login