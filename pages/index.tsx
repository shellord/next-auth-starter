import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <div className='flex flex-1 flex-col items-center'>
        <p className='font-poppins text-5xl text-white font-bold'>
          Watashi.app
        </p>
        <p className='font-poppins text-white mt-5'>
          Claim your spot on the waitlist
        </p>
        <button
          className='px-10 py-2 mt-5 bg-secondary rounded-full text-white'
          onClick={() =>
            signIn('', {
              callbackUrl: 'http://localhost:3000/user',
            })
          }
        >
          <span>Enter</span>
        </button>
      </div>
    </div>
  )
}

export default Home
