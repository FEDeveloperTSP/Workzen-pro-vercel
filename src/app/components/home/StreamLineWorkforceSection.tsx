import CustomButton from "@/components/ui/CustomButton"
import Image from "next/image"
import StreamLineYourWorkforce from "@/assets/LandingPage/stream-line-your-workforce-image.png"
import BackgroundVector from "@/assets/LandingPage/background-vector.png"
import TextStroke from "@/assets/LandingPage/text-stroke.png"
import { useRouter } from "next/navigation"
const StreamLineWorkforceSection = () => {
  const router=useRouter()
  return (
    <div className="wrapper my-16 sm:p-4 xl:p-0">
      <div className="flex px-4 py-8 items-center">
        <div className="flex-1 space-y-10 relative">
          <Image src={BackgroundVector || ""} width={285} height={233} alt="Picture of the author" className="absolute -left-16 -z-[1]" />

          <div className="font-bold text-4xl">Streamline Your Workforce</div>

          <div>
            <div className="relative">
              <Image src={TextStroke || ""} width={285} height={233} alt="Picture of the author" className="absolute -z-[1]" />
              <div>Effortlessly manage your team and optimize productivity with our all-in-one workforce management solution.</div>
            </div>
            <div className="font-medium mt-2">
              <div>Smart Shift Scheduling</div>
              <div className="text-[#C4C4C4]">
                <div>Clock In and Out</div>
                <div>Track Attendance, Absences, and Overtime in Real-Time</div>
                <div>Centralized Employee Database and Secure Document Storage</div>
                <div>Generate Comprehensive Reports with Just a Click</div>
              </div>
            </div>
          </div>
          <CustomButton showArrow variant="primary" onClick={() => router.push("/register") }>
            Get Started
          </CustomButton>

          {/* <button className="bg-[#4FD1C5] px-8 py-4 rounded-lg text-white flex items-center justify-center gap-2">
                  Get Started <MdOutlineArrowForward />
                </button> */}
        </div>
        <div className="flex-1">
          <Image src={StreamLineYourWorkforce || ""} width={670} height={475} alt="Picture of the author" className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

export default StreamLineWorkforceSection
