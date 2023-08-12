"use client";
import Login from "@/components/modal/Login";
import Signup from "@/components/modal/Signup";
import Xlogo from "@/images/Xlogo";
import { useState } from "react";


export default function Home() {
  const [openModal, setOpenModal] = useState("");


  return (
    <main className="bg-black min-h-screen px-10 flex text-white">
      
      <div className="w-[50vw] flex justify-center items-center">
        <Xlogo width="300px" height="300px" padding="0px" />
      </div>
      <div className="w-[50vw] p-6">
        <h1 className="font-bold text-6xl py-16">Happening Now</h1>
        <h3 className="font-bold text-3xl pb-4">Join today.</h3>

        <div onClick={()=>setOpenModal("signup")} className="text-center w-64 py-2 rounded-full font-bold mt-4 bg-primary cursor-pointer">
          Create account
        </div>

        <div className="py-1 text-xs text-neutral-500 w-64 mb-6">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </div>

        <div className="font-bold py-2">Already have account?</div>

        <div onClick={()=>setOpenModal("login")} className="text-center border border-gray-500 w-64 py-2 rounded-full font-bold  text-primary cursor-pointer">
          Sign in
        </div>
      </div>
      {openModal==="login" && <Login  setOpen={setOpenModal} />}
      {openModal==="signup" && <Signup  setOpen={setOpenModal} />}
    </main>
  );
}
