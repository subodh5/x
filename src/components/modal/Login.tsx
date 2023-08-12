import Xlogo from "@/images/Xlogo";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";
import submitLogin from "@/actions/login";
import SubmitButton from "./Button";
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<string>>;
}) {
  
  const router = useRouter()

  async function submitForm(userData:FormData) {
    try{
    const response = await submitLogin(userData)
    router.push("/home")
    }
    catch(error:any){
      toast.error(error.message)
    }

  }

  return (
    <div>
      <div className="bg-white text-white bg-opacity-10 inset-0 fixed backdrop-blur-sm flex justify-center items-center">
        <div className="w-[40vw] px-28 py-2 flex flex-col items-center fixed bg-black rounded-3xl">
          <p
            onClick={() => setOpen("")}
            className="justify-self-start absolute left-1 top-1 p-2  hover:bg-neutral-900 rounded-full cursor-pointer"
          >
            <AiOutlineClose />
          </p>
          <Xlogo width="36px" height="36px" padding="0px" />

          <h1 className="text-3xl font-bold py-8 self-start">Sign in to X</h1>
          <form action={submitForm} className="w-full mb-4">
            <input
              type=" text"
              name="username"
              className="p-4 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
              placeholder="username or email"
              autoFocus
              required
            />
            <input
              type="password"
              name="password"
              className="p-4 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
              placeholder="password"
              required
            />
            <SubmitButton text="Log in"/>
            <ToastContainer position="top-center"/>
          </form>
          <Link href="reset-password" className="w-full text-center">
            <div className="py-2 border border-neutral-500 w-full rounded-full font-bold ">
              Forgot password?
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
