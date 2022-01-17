const MainLayout = ({ children }) => {
  return (
    <div className='bg-primary h-screen text-white flex flex-1 font-poppins '>
      <div className='flex justify-center md:w-1/2 md:flex-none md:mx-auto flex-1'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
