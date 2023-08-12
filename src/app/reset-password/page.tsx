import Link from "next/link"
import Xlogo from "@/images/Xlogo"
import { AiOutlineClose } from "react-icons/ai"


export default function page() {
  function submitForm(){}
  return (
    <div className="">
    <div className="bg-white text-white bg-opacity-10 inset-0 fixed backdrop-blur-sm flex justify-center items-center">
      <div className="w-[40vw] px-28 py-2 flex flex-col items-center fixed bg-black rounded-3xl">
        <Link href="/">
          <p className="justify-self-start absolute left-1 top-1 p-2  hover:bg-neutral-900 rounded-full cursor-pointer">
            <AiOutlineClose />
          </p>
        </Link>
        <Xlogo width="36px" height="36px" padding="0px" />

        <h1 className="text-3xl font-bold py-8 self-start">Sign in to X</h1>
        <form action={submitForm} className="w-full mb-4">
          <input
            type=" text"
            name="username"
            className="p-4 my-2 w-full bg-black outline-none border border-neutral-500 rounded-md focus:border-2 focus:border-primary"
            placeholder="username or email"
            autoFocus
          />
          
        </form>
      </div>
    </div>
  </div>
  )
}
