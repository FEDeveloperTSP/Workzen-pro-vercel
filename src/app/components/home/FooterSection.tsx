import CustomButton from "@/components/ui/CustomButton"
import { Dropdown, Space } from "antd"
import type { MenuProps } from "antd"
import { FaChevronDown, FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa"
import { GrLanguage } from "react-icons/gr"
import { useRouter } from "next/navigation"
const FooterSection = () => {
  const router = useRouter()
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "English",
    },
    {
      key: "2",
      label: "French",
    },
    {
      key: "3",
      label: "Spanish",
    },
  ]

  return (
    <div className="bg-[#4FD1C5] mt-16 pt-16">
      <div className="wrapper sm:p-0 lg:p-4">
        <div className="text-white flex gap-8">
          <div className="flex-1 space-y-4">
            <div className="text-xl font-bold">Workzen-Pro</div>
            <div>WorkZen-Pro was built for the modern workforce — simplifying team management, attendance, and scheduling from anywhere in the world.</div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="text-lg font-bold">Product</div>
            <ul>
              <li>Overview</li>
              <li>Pricing</li>
              <li>Customer stories</li>
            </ul>
          </div>

          <div className="flex-1 space-y-4">
            <div className="text-lg font-bold">Resources</div>
            <ul>
              <li>Blog</li>
              <li>Guides & tutorials</li>
              <li>Help center</li>
            </ul>
          </div>

          <div className="flex-1 space-y-4">
            <div className="text-lg font-bold">Company</div>
            <ul>
              <li>About us</li>
              <li>Careers</li>
              <li>Media kit</li>
            </ul>
          </div>

          <div className="flex-1 space-y-4">
            <div className="text-xl font-bold">Try It Today</div>
            <div>Get started for free. Add your whole team as your needs grow.</div>
            <CustomButton showArrow variant="secondary" onClick={() => router.push("/register") }>
              Start today
            </CustomButton>
          </div>
        </div>

        <hr className="h-px my-8 bg-[#212529] border-0 dark:bg-gray-700"></hr>

        <div className="flex items-center justify-between text-white mb-8">
          <div className="flex gap-8">
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ["1"],
              }}
              trigger={["click"]}
            >
              <Space className="cursor-pointer">
                <GrLanguage />
                English
                <FaChevronDown />
              </Space>
            </Dropdown>
            <div>Terms & privacy</div>
            <div>Security</div>
            <div>Status</div>
            <div>©2025 Workzen-Pro by Tech solutions Pro</div>
          </div>
          <div className="flex gap-4">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterSection
