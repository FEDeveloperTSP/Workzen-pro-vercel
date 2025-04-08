import RegisterHeader from '@/app/components/Already'
// import AuthHeader from '@/app/components/AuthHeader'
import AuthImage from '@/assets/Mask Group.png'
import Image from 'next/image'
import ImageText from '@/app/components/ImageText'
import Link from 'next/link'
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
                {/* Header Section */}
                <div className="flex justify-center items-center">
                    {/* <div className="p-2 flex justify-center items-center">
                        <div className="flex justify-center items-center space-x-8">

                        </div>
                    </div> */}
                </div>

                {/* Main Content (Expands to push the footer down) */}
                <div className="flex-grow p-3 flex flex-col items-center justify-center">
                    <div className="shadow-xl h-fit rounded-xl p-2 md:p-4 bg-white w-full wrapper">
                        <RegisterHeader />
                        <div className="grid grid-cols-1 sm:grid-cols-3">
                            {/* Left Image Section */}
                            <div className="col-span-1 relative hidden md:flex">
                                <Image
                                    src={AuthImage}
                                    alt="Background"
                                    width={400}
                                    height={400}
                                    priority
                                    quality={75}
                                />
                                <div className="absolute inset-0 flex justify-center ml-16 min-w-fit flex-col text-white">
                                    <ImageText />
                                </div>
                            </div>
                            {/* Right Content Section */}
                            <div className="col-span-2 grid items-center">
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
