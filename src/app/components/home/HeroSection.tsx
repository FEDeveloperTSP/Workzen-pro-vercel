import Link from "next/link"
import CustomButton from "@/components/ui/CustomButton"
import HeroImage from "@/assets/LandingPage/hero-image.png"
import Image from "next/image"
import { IoMdCheckmark } from "react-icons/io"
import WorkzenLogo from "@/assets/LandingPage/workzen-logo.png"
import { useRouter } from "next/navigation"
const HeroSection = () => {
  const router=useRouter()
  return (
    <div className="bg-[#4FD1C5]">
      <div className="wrapper sm:p-0 lg:p-4">
        <header className="text-white flex justify-between items-center p-4 py-2">
          <div className="font-semibold text-xl">
            <img src={WorkzenLogo.src} alt="" className="w-36" />
          </div>
          <div className="flex items-center gap-8">
            <button className="font-medium">Pricing</button>
            <button className="font-medium">Contact us</button>
            <Link href="/login">
              <CustomButton variant="light-black">Login</CustomButton>

              {/* <button className="bg-[#424242] px-8 py-4 rounded-lg">Login</button> */}
            </Link>
            <CustomButton variant="white" showArrow onClick={() =>router.push("/register") }>
              Try Workzen-pro
            </CustomButton>
            {/* <button className="bg-white px-8 py-4 rounded-lg text-[#4FD1C5] flex items-center justify-center gap-2">
                    Try for free <MdOutlineArrowForward />
                  </button> */}
          </div>
        </header>

        <div className="flex px-4 py-8">
          <div className="flex-1 text-white">
            <div className="font-bold text-5xl leading-tight mb-4">
              <div>Revolutionize Your</div> <div>Workforce Management</div>
            </div>

            <div className="text-[18px]">
              Effortlessly manage shifts, schedules, and staff with Workzen-Pro — your all-in-one workforce management solution.
            </div>

            <ul className="text-[18px]">
              <li className="flex items-center gap-2">
                <IoMdCheckmark fill="#000" /> Automated Scheduling and Shift Management
              </li>
              <li className="flex items-center gap-2">
                <IoMdCheckmark fill="#000" /> Real-Time Attendance Tracking and Reporting
              </li>
              <li className="flex items-center gap-2">
                <IoMdCheckmark fill="#000" /> Seamless Payroll Integration and Compliance
              </li>
              <li className="flex items-center gap-2">
                <IoMdCheckmark fill="#000" /> Comprehensive Employee Database and Records
              </li>
              <li className="flex items-center gap-2">
                <IoMdCheckmark fill="#000" /> Instant Communication and Staff Notifications
              </li>
              <li className="flex items-center gap-2">
                <IoMdCheckmark fill="#000" /> Advanced Analytics for Performance Insights
              </li>
            </ul>

            <div className="text-[18px]">Discover how Workzen-Pro can transform your workforce management with innovative, time- saving features.</div>

            <div className="mt-6">
              <CustomButton variant="white" showArrow onClick={() =>router.push("/register") }>
                Try Workzen-pro
              </CustomButton>
              {/* <button className="bg-white px-8 py-4 rounded-lg text-[#4FD1C5] flex items-center justify-center gap-2">
                      Try Workzen-pro for free <MdOutlineArrowForward />
                    </button> */}
            </div>
          </div>

          <div className="flex-1 text-[18px] font-medium">
            <Image src={HeroImage || ""} width={674} height={480} alt="Picture of the author" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
