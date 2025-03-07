import RegisterHeader from '@/app/components/Already'
// import AuthHeader from '@/app/components/AuthHeader'
import AuthImage from '@/assets/Mask Group.png'
import Image from 'next/image'
import ImageText from '@/app/components/ImageText'
import Link from 'next/link'
import NavText from '@/app/components/NavText'
// const layout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <>
//             <div className='min-h-screen min-w-screen bg-[#F8F9FA]'>
//                 <div className="flex justify-center items-center">
//                     <div className="p-2 flex justify-center items-center">
//                         <div className="flex justify-center items-center space-x-8">
//                             {/* <NavText text="About us" />
//                             <NavText text="Products" />
//                             <NavText text="Prices" /> */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-6 flex flex-col items-center">
//                     <div className="shadow-xl h-fit rounded-xl p-4 md:p-10 bg-white w-full ">
//                         <RegisterHeader />
//                         <div className="grid grid-cols-1 sm:grid-cols-3">
//                             <div className="col-span-1 relative hidden md:flex">
//                                 <Image
//                                     src={AuthImage}
//                                     alt="Background"
//                                     width={500}  // 👈 Adjust based on actual display size
//                                     height={300} // 👈 Adjust accordingly
//                                     priority     // 👈 Ensures it loads early
//                                     quality={75} // 👈 Compresses image without losing quality
//                                 />

//                                 <div className="absolute inset-0 flex justify-center ml-16 min-w-fit flex-col text-white ">
//                                     <ImageText />
//                                 </div>
//                             </div>
//                             <div className="col-span-2 mt-6 md:mt-28" >
//                                 {children}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='flex justify-center items-center whitespace-normal pt-4 w-full '>
//                     <p className='w-2/3 text-center text-sm md:text-base'>
//                         © Copyright 2025 Employee Management System. All Rights Reserved
//                         Designed and Developed by
//                         <Link href={"https://techsolutionspro.com/"} className='text-[#4FD1C5] text-semibold'>Tech Solutions Pro</Link>
//                     </p>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default layout
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
                {/* Header Section */}
                <div className="flex justify-center items-center">
                    <div className="p-2 flex justify-center items-center">
                        <div className="flex justify-center items-center space-x-8">
                            <NavText text="About us" />
                            <NavText text="Products" />
                            <NavText text="Prices" />
                        </div>
                    </div>
                </div>

                {/* Main Content (Expands to push the footer down) */}
                <div className="flex-grow p-6 flex flex-col items-center">
                    <div className="shadow-xl h-fit rounded-xl p-4 md:p-10 bg-white w-full">
                        <RegisterHeader />
                        <div className="grid grid-cols-1 sm:grid-cols-3">
                            {/* Left Image Section */}
                            <div className="col-span-1 relative hidden md:flex">
                                <Image
                                    src={AuthImage}
                                    alt="Background"
                                    width={500}
                                    height={300}
                                    priority
                                    quality={75}
                                />
                                <div className="absolute inset-0 flex justify-center ml-16 min-w-fit flex-col text-white">
                                    <ImageText />
                                </div>
                            </div>
                            {/* Right Content Section */}
                            <div className="col-span-2 mt-6 md:mt-28">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer (Sticks to the bottom) */}
                <footer className="w-full py-4 text-center text-sm md:text-base">
                    <p className="w-2/3 mx-auto">
                        © Copyright 2025 Employee Management System. All Rights Reserved.
                        Designed and Developed by
                        <Link href="https://techsolutionspro.co.uk/" className="text-[#4FD1C5] font-semibold"> Tech Solutions Pro</Link>
                    </p>
                </footer>
            </div>
        </>
    );
};

export default layout;
