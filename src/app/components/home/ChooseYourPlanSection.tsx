import { CircleCheckBig } from "lucide-react"
import Image from "next/image"
import CustomButton from "@/components/ui/CustomButton"
import ChooseYourPlanTextStroke from "@/assets/LandingPage/choose-your-plan-text-stroke.png"
import { useRouter } from "next/navigation"
const ChooseYourPlanSection = () => {
  const router=useRouter()
  return (
    <div className="wrapper my-16 sm:p-4 xl:p-0">
      <div className="flex items-center justify-center">
        <div className="font-bold text-5xl relative">
          <div>Choose Your Plan</div>
          <Image src={ChooseYourPlanTextStroke || ""} width={332} height={29} alt="Picture of the author" className="absolute -z-[1] bottom-0 -right-8" />
        </div>
      </div>
      <div className="text-center my-8">
        Whether you want to get organized, keep your personal life on track, or boost workplace productivity, Evernote has the right plan <div>for you.</div>
      </div>

      <div className="flex gap-4 my-16">
        <div className="flex-1">
          <div className="border border-[#FFE492] p-8 space-y-6">
            <div className="font-semibold text-2xl">Standard</div>
            <div className="font-semibold text-4xl">$5</div>
            <div className="font-semibold">Capture ideas and find them quickly</div>

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CircleCheckBig /> Sync unlimited devices
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> 10 GB monthly uploads
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> 200 MB max. note size
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> Customize Home dashboard and access extra widgets
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> Connect primary Google Calendar account
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> Add due dates, reminders, and notifications to your tasks
              </li>
            </ul>
            <CustomButton variant="outline" onClick={() => router.push("/register") }>Get Started</CustomButton>

            {/* <button className="px-8 py-4 rounded-lg border border-[#FFE492] font-medium">Get Started</button> */}
          </div>
        </div>
        <div className="flex-1">
          <div className="rounded-xl p-8 space-y-6 bg-[#4FD1C5] scale-y-110 text-white">
            <div className="font-semibold text-2xl">Personal</div>
            <div className="font-semibold text-4xl text-black">$11.99</div>
            <div className="font-semibold">Keep home and family on track</div>

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CircleCheckBig stroke="#000" /> Sync unlimited devices
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig stroke="#000" /> 10 GB monthly uploads
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig stroke="#000" /> 200 MB max. note size
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig stroke="#000" /> Customize Home dashboard and access extra widgets
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig stroke="#000" /> Connect primary Google Calendar account
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig stroke="#000" /> Add due dates, reminders, and notifications to your tasks
              </li>
            </ul>
            <CustomButton variant="secondary" onClick={() => router.push("/register") }>Get Started</CustomButton>
            {/* <button className="bg-[#4F9CF9] px-8 py-4 rounded-lg text-white">Get Started</button> */}
          </div>
        </div>
        <div className="flex-1">
          <div className="border border-[#FFE492] p-8 space-y-6">
            <div className="font-semibold text-2xl">Organization</div>
            <div className="font-semibold text-4xl">$49.99</div>
            <div className="font-semibold">Capture ideas and find them quickly</div>

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CircleCheckBig /> Sync unlimited devices
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> 10 GB monthly uploads
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> 200 MB max. note size
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> Customize Home dashboard and access extra widgets
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> Connect primary Google Calendar account
              </li>
              <li className="flex items-center gap-2">
                <CircleCheckBig /> Add due dates, reminders, and notifications to your tasks
              </li>
            </ul>

            <CustomButton variant="outline" onClick={() => router.push("/register") }>Get Started</CustomButton>
            {/* <button className="px-8 py-4 rounded-lg border border-[#FFE492] font-medium">Get Started</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseYourPlanSection
