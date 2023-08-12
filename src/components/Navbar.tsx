import Link from "next/link";
import { BiSolidHome, BiEnvelope } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuVerified } from "react-icons/lu";
import Xlogo from "../images/Xlogo";
import NavbarButtom from "./NavbarButtom";
import { getCurrentUser } from "@/actions/user";
import { userType } from "@/types/globalTypes";

const navItems = [
  {
    icon: <BiSolidHome />,
    name: "Home",
    link: "/home",
  },
  {
    icon: <AiOutlineSearch />,
    name: "Explore",
    link: "/home/explore",
  },
  {
    icon: <IoMdNotificationsOutline />,
    name: "Notifications",
    link: "/home/notifications",
  },
  {
    icon: <BiEnvelope />,
    name: "Messages",
    link: "/home/messages",
  },
  {
    icon: <LuVerified />,
    name: "Verified",
    link: "/home/verified",
  },
  {
    icon: <CgProfile />,
    name: "Profile",
    link: "/home/profile",
  },
];

export default async function Navbar() {

    const user:userType = await getCurrentUser()
    navItems[5].link = `/home/profile/${user.username}`
  
  return (
    <div className="w-[20vw] py-2 pr-2 text-white border-r border-gray-800">
      <Link href="/home">
        <div className="hover:bg-neutral-800 rounded-full w-fit">
          <Xlogo width="62px" height="62px" padding="16px" />
        </div>
      </Link>
      <div>
        {navItems.map((item) => {
          return (
            <Link
              href={item.link}
              key={item.name}
              className="flex gap-4 pl-4 pr-8 py-3 transition hover:bg-neutral-800 w-fit rounded-full"
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="text-xl">{item.name}</div>
            </Link>
          );
        })}
      </div>
        <NavbarButtom user={user}/>
    </div>
  );
}
