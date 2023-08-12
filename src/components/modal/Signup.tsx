"use client";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";
import SubmitButton from "./Button";
import submitSignup from "@/actions/signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function Signup({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter()

  async function submitForm(userData:FormData){
    try {
      await submitSignup(userData);
      toast.success("Successfully created account")
      router.push("/verify-email")

    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className="bg-white text-white bg-opacity-10 inset-0 fixed backdrop-blur-sm flex justify-center items-center">
      <div className="w-[40vw] px-28 py-2 flex flex-col items-center  fixed bg-black rounded-3xl">
        <p
          onClick={() => setOpen("")}
          className="justify-self-start absolute left-1 top-1 p-2 hover:bg-neutral-900 rounded-full cursor-pointer"
        >
          <AiOutlineClose />
        </p>

        <h1 className="text-2xl font-bold py-4 self-start">
          Create your account
        </h1>
        <form action={submitForm} className="w-full mb-4">
          <input
            type=" text"
            name="name"
            className="p-3 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
            placeholder="name"
            autoFocus
            required
          />
          <input
            type=" email"
            name="email"
            className="p-3 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
            placeholder="email"
            required
          />
          <input
            type=" text"
            name="username"
            className="p-3 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
            placeholder="username"
            required
          />
          <input
            type="password"
            name="password"
            min={6}
            className="p-3 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
            placeholder="password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            className="p-3 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
            placeholder="confirm password"
            required
          />
          <SubmitButton text="Sign up"/>
          <ToastContainer/>
        </form>
      </div>
    </div>
  );
}
