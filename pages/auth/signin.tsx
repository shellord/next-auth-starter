import { getProviders, signIn, getSession } from 'next-auth/react'
import Image from 'next/image'

export default function SignIn({ providers }) {
  return (
    <div className='flex flex-1 items-center flex-col justify-center'>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          {provider.id === 'google' && (
            <>
              <button
                onClick={() => signIn(provider.id)}
                className='p-2 bg-white text-black rounded shadow-lg flex items-center justify-center w-64 mb-5'
              >
                <Image
                  src='/images/google.png'
                  width={32}
                  height={32}
                  alt='google'
                />
                <p className='ml-2'> Sign up with {provider.name} </p>
              </button>
            </>
          )}
          {provider.id === 'facebook' && (
            <>
              <button
                onClick={() => signIn(provider.id)}
                className='p-2 bg-[#1877F2] text-black rounded shadow-lg flex items-center justify-center w-64 mb-5'
              >
                <Image
                  src='/images/facebook.png'
                  width={32}
                  height={32}
                  alt='google'
                />
                <p className='ml-2 text-white'>
                  {' '}
                  Sign up with {provider.name}{' '}
                </p>
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: { destination: '/user' },
    }
  }
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
