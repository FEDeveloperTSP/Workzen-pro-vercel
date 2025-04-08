import Image from "next/image"
import ManageYourWorkForceTextStroke from "@/assets/LandingPage/manage-your-workforce-text-stroke.png"
import GreenQuotes from "@/assets/LandingPage/green-qutoes.png"
import WhiteQuotes from "@/assets/LandingPage/white-quotes.png"
import ProfilePicPlaceholder from "@/assets/LandingPage/profile-pic-placeholder.png"

import Slider from "react-slick"

const TestimonialsSection = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <div className="wrapper my-16 sm:p-0 lg:p-4">
      <div className="relative">
        <div className="text-center font-bold text-5xl">What Our Clients Says</div>
        <Image
          src={ManageYourWorkForceTextStroke || ""}
          width={200}
          height={50}
          alt="Picture of the author"
          className="absolute right-[25%] top-3 h-[50px] -z-[1]"
        />
      </div>

      <div className="my-8">
        <Slider {...settings}>
          <div className="pr-4">
            <div className="flex-1 shadow-lg">
              <div className="p-4 bg-white">
                <div className="my-8">
                  <Image src={GreenQuotes || ""} width={86} height={60} alt="Picture of the author" />
                </div>
                <div>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                <hr className="h-px my-8 bg-[#212529] border-0 dark:bg-gray-700"></hr>

                <div className="flex gap-4">
                  <div>
                    <Image src={ProfilePicPlaceholder} width={95} height={95} alt="" />
                  </div>
                  <div>
                    <div className="text-[#4FD1C5] font-semibold text-xl">Faizan Chaudhry</div>
                    <div>Head of Talent Acquisition, North America</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pr-4">
            <div className="flex-1 shadow-lg">
              <div className="p-4 bg-[#4F9CF9] text-white">
                <div className="my-8">
                  <Image src={WhiteQuotes || ""} width={86} height={60} alt="Picture of the author" />
                </div>
                <div>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                <hr className="h-px my-8 bg-white border-0 dark:bg-gray-700"></hr>

                <div className="flex gap-4">
                  <div>
                    <Image src={ProfilePicPlaceholder} width={95} height={95} alt="" />
                  </div>
                  <div>
                    <div className="text-[#4FD1C5] font-semibold text-xl">Faizan Chaudhry</div>
                    <div>Head of Talent Acquisition, North America</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pr-4">
            <div className="flex-1 shadow-lg">
              <div className="p-4 bg-[#4F9CF9] text-white">
                <div className="my-8">
                  <Image src={WhiteQuotes || ""} width={86} height={60} alt="Picture of the author" />
                </div>
                <div>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                <hr className="h-px my-8 bg-white border-0 dark:bg-gray-700"></hr>

                <div className="flex gap-4">
                  <div>
                    <Image src={ProfilePicPlaceholder} width={95} height={95} alt="" />
                  </div>
                  <div>
                    <div className="text-[#4FD1C5] font-semibold text-xl">Faizan Chaudhry</div>
                    <div>Head of Talent Acquisition, North America</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pr-4">
            <div className="flex-1 shadow-lg">
              <div className="p-4 bg-[#4F9CF9] text-white">
                <div className="my-8">
                  <Image src={WhiteQuotes || ""} width={86} height={60} alt="Picture of the author" />
                </div>
                <div>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                <hr className="h-px my-8 bg-white border-0 dark:bg-gray-700"></hr>

                <div className="flex gap-4">
                  <div>
                    <Image src={ProfilePicPlaceholder} width={95} height={95} alt="" />
                  </div>
                  <div>
                    <div className="text-[#4FD1C5] font-semibold text-xl">Faizan Chaudhry</div>
                    <div>Head of Talent Acquisition, North America</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default TestimonialsSection
