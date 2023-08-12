"use client";

import clearCookies from "@/actions/logout";
import { userType } from "@/types/globalTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavbarButtom({user}:{user:userType}) {
    const router = useRouter()
  const [showLogout, setShowLogout] = useState(false);
  async function logout() {
    await clearCookies()
    setShowLogout(false)
    router.push("/")
  }
  return (
    <div className="relative">
      <button className="rounded-full m-2 transition font-bold text-lg py-3 bg-primary hover:bg-[#0c84cf] px-20">
        Post
      </button>
      <div
        onClick={() => setShowLogout(prevState=>!prevState)}
        className="p-2 transition cursor-pointer rounded-full flex gap-2 items-center w-full mt-2 hover:bg-neutral-800"
      >
        <img
          src={user.profile_picture}
          alt="icon"
          className="rounded-full w-10 h-10"
        />
        <div>
          <p className="font-bold">{user.name}</p>
          <p className="text-gray-500 ">@{user.username}</p>
        </div>
        <div className="ml-auto text-xl mb-1">...</div>
      </div>
      {showLogout && (
        <form action={logout} className="py-4 px-12 absolute bottom-12 bg-neutral-900 rounded-2xl shadow-md shadow-white">
          <button>Logout</button>
        </form>
      )}
    </div>
  );
}
