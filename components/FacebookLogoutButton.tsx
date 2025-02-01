'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { FaFacebook } from 'react-icons/fa'

const FaceBookLogoutButton = () => {
  return (
    <button onClick={() => signOut()}
      className='bg-blue-500 flex items-center px-2 py-3 gap-x-2 text-xl rounded-md'>
        <FaFacebook className='text-white mt-1 text-3xl' />
        <span className='text-white'>Logout from Facebook</span>
    </button>
  )
}

export default FaceBookLogoutButton