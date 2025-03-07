import LoginForm from '@/app/components/LoginForm'
import React from 'react'
const Login = () => {
  return (
    // <div className="flex flex-col justify-center items-center justify-items-center w-full" >
    <div className="h-fit w-full md:w-4/6 flex flex-col ">
      <h1 className="text-2xl md:text-4xl font-semibold">Log In</h1>
        <LoginForm/>
    </div>
    // </div>
  )
}
export default Login
