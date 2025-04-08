import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import ProtectedLayout from '@/hoc/protectedLayout'
import Link from 'next/link'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProtectedLayout allowedRoles={['manager']}>
        <div className="h-screen flex">
          <div className="w-0 md:w-1/6 h-full overflow-y-hidden ">
            <Sidebar />
          </div>
          <div className="flex-1 p-5 w-full">
            <Header />
            <div className='mt-10 md:mt-0'>
              {children}
            </div>
          </div>

        </div>
        {/* <footer className="w-full py-4 text-center text-sm md:text-base">
          <p className="w-2/3 mx-auto">
            © Copyright 2025 Employee Management System. All Rights Reserved.
            Designed and Developed by
            <Link href="https://techsolutionspro.co.uk/" className="text-[#4FD1C5] font-semibold"> Tech Solutions Pro</Link>
          </p>
        </footer> */}
      </ProtectedLayout>
    </>
  )
}

export default layout
