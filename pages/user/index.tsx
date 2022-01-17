import { signOut, getSession } from 'next-auth/react'
import Link from 'next/link'
import prisma from '../../lib/prisma'
import { useState } from 'react'

const User = ({ user }) => {
  const [username, setUsername] = useState(user?.username)

  const _handleUsernameSubmit = async (event) => {
    event.preventDefault()

    const res = await fetch('/api/register', {
      body: JSON.stringify({
        username: event.target.username.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const result = await res.json()
    setUsername(result.username)
  }

  if (!user) {
    return (
      <div>
        <p>Not Logged in</p>
        <Link href='/auth/signin'>
          <a>Go to SignIn</a>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex flex-1'>
      <div className='flex flex-1 flex-col'>
        <div className='flex justify-end p-5'>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className='bg-secondary px-5 py-2 rounded-full shadow-md shadow-blue-500/50'
          >
            Sign Out
          </button>
        </div>
        {username ? (
          <div className='flex justify-center  flex-1 mt-64'>
            <p className='text-2xl'> Hi {username}</p>
          </div>
        ) : (
          <div className='flex justify-center mt-64'>
            <form
              className='flex flex-col space-y-5'
              onSubmit={_handleUsernameSubmit}
            >
              <div className='flex text-4xl'>Hi</div>
              <div className='flex '>
                <label htmlFor='name' className=''>
                  Enter your desired Username
                </label>
              </div>
              <div className='flex justify-center'>
                <input
                  id='username'
                  type='text'
                  required
                  className='text-black px-3 py-1 rounded-full bg-gray-200'
                />
              </div>
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg px-5 py-2 rounded'
                >
                  Claim
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default User

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session) {
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
    })
    return {
      props: {
        user,
      },
    }
  }
  return {
    props: { user: null },
  }
}
