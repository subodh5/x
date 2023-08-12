"use client"
import { AiOutlineClose } from "react-icons/ai";
import Xlogo from "@/images/Xlogo";
import Link from "next/link";
import VerifyButton from "./VerifyButton";
import { getCurrentUser } from "@/actions/user";
import { sendVerificationEmail, verifyEmail } from "@/actions/verifyEmail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const router = useRouter()
  const [user, setUser] = useState<{_id:string, email:string, isVerified:boolean} | null>(null)
  const [verified, setVerified] = useState(false)

  useEffect(()=>{
    getCurrentUser().then((user)=>{
      setUser(user)
    })
  },[verified])

  async function submitCode(code:FormData){
    
    try {
      await verifyEmail(code)
      setVerified(true)
      toast.success("Successfully verified")
    } catch (error:any) {
      toast.error(error.message);
    }
  }

  async function submitForm(userData: FormData) {
    
    try {
      await sendVerificationEmail(userData);
      toast.success("Successfully sent email")
      router.push("/verify-email?token=Paste link in address bar")

    } catch (error: any) {
      toast.error(error.message);
    }
  }


  return (
    <div className="bg-black text-white bg-opacity-80 inset-0 fixed backdrop-blur-sm flex justify-center items-center">
      <div className="w-[40vw] px-28 py-2 flex flex-col items-center fixed bg-black rounded-3xl">
        <Link href="/">
          <p className="justify-self-start absolute left-1 top-1 p-2  hover:bg-neutral-900 rounded-full cursor-pointer">
            <AiOutlineClose />
          </p>
        </Link>
        <Xlogo width="36px" height="36px" padding="0px" />

        {user?.isVerified && (
          <div className="m-3">
            <div className="text-lg text-green-500 mb-3 text-center">User verified</div>
            <Link href="/home" className="font-bold bg-primary p-3 rounded-full m-3">Go to home page</Link>
          </div>
        )}

        {!user?.isVerified && !searchParams.token && (
          <div>
            <h1 className="text-3xl font-bold py-8 self-start">
              Verify your email first
            </h1>
            <h3>Your email: {user?.email}</h3>
            <p>Verified: {`${user?.isVerified}`}</p>
            <form action={submitForm} className="w-full mb-4">
              <input
                type="text"
                name="email"
                value={user?.email}
                hidden
                readOnly
              />
              <input
                type="text"
                name="userId"
                value={user?._id}
                hidden
                readOnly
              />
              <VerifyButton text="Send Code" />
            </form>
          </div>
        )}

        {!user?.isVerified && searchParams.token && (
          <div>
            <h1 className="text-3xl font-bold py-8 self-start">
              Submit your code
            </h1>
            <form action={submitCode} className="w-full mb-4">
              <input
                type="text"
                name="code"
                className="p-4 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
                value={searchParams.token}
              />
              <VerifyButton text="Verify" />
            </form>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}
