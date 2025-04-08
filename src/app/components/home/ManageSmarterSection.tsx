import Image from "next/image"
import ManageSmarterImage from "@/assets/LandingPage/Work-Together-Image.png"
import ManageSmarterTextStroke from "@/assets/LandingPage/manage-smarter-text-stroke.png"
import CustomButton from "@/components/ui/CustomButton"
import { useRouter } from "next/navigation"
const ManageSmarterSection = () => {
  const router=useRouter()
  return (
    <div className="wrapper my-16 sm:p-4 xl:p-0">
      <div className="flex px-4 py-8 items-center">
        <div className="flex-1">
          <Image src={ManageSmarterImage || ""} width={583} height={542} alt="Picture of the author" className="w-full" />
        </div>
        <div className="flex-1 p-16 space-y-10">
          <div className="relative">
            <div className="font-bold text-5xl">Manage Smarter</div>
            <Image src={ManageSmarterTextStroke || ""} width={332} height={25} alt="Picture of the author" className="absolute -z-[1] right-24 -bottom-3" />
          </div>

          <div>
            With WorkZen-Pro, streamline your workforce management and empower your
            <div>team with efficiency.</div>
            <div>Easily track attendance, manage shifts, and simplify payroll — all in one place.</div>
          </div>

          <CustomButton showArrow variant="secondary" onClick={() => router.push("/register") }>
            Try it now
          </CustomButton>

          {/* <button className="bg-[#4F9CF9] px-8 py-4 rounded-lg text-white flex items-center justify-center gap-2">
          Try it now <MdOutlineArrowForward />
        </button> */}
        </div>
      </div>
    </div>
  )
}

export default ManageSmarterSection
