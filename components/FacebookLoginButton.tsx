'use client'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FaFacebook } from 'react-icons/fa'

const FaceBookLoginButton = () => {
  return (
    <button onClick={() => signIn("facebook", { redirectTo: "/" })}
      className='bg-blue-500 flex items-center px-3 py-4 gap-x-2 text-2xl rounded-md'>
        <FaFacebook className='text-white mt-1 text-3xl' />
        <span className='text-white'>Sign in with Facebook</span>
    </button>
  )
}

export default FaceBookLoginButton