import CustomButton from "@/components/ui/CustomButton"
import Image from "next/image"
import ManageYourWorkForceTextStroke from "@/assets/LandingPage/manage-your-workforce-text-stroke.png"

const ManageWorkForceSection = () => {
  return (
    <div className="bg-[#4FD1C5] my-16 p-16">
      <div className="wrapper space-y-8 text-white px-16">
        <div className="relative">
          <div className="text-5xl relative z-10">Manage your workforce, wherever you are</div>
          <Image src={ManageYourWorkForceTextStroke || ""} width={312} height={25} alt="Picture of the author" className="absolute right-52" />
        </div>

        <div>
          <div>Access WorkZen-Pro from your computer, phone, or tablet.Available on Windows, macOS, Linux, Android, and iOS — stay connected and in</div>
          <div>control no matter where work takes you!</div>
          <div> A powerful web app for easy, on-the-go management!</div>
        </div>

        <CustomButton showArrow variant="secondary" className="mx-auto">
          Try Workzen-Pro
        </CustomButton>

        {/* <button className="bg-[#4F9CF9] px-8 py-4 rounded-lg text-white flex items-center justify-center gap-2 mx-auto">
        Try Workzen-Pro <MdOutlineArrowForward />
      </button> */}
      </div>
    </div>
  )
}

export default ManageWorkForceSection
