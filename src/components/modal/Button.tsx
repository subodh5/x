//since formstatus works only inside form, we have to create separate component for submit button
import { ClipLoader } from "react-spinners"
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton({text}:{text:string}) {

    const {pending} = useFormStatus()
    
  return (
    <button
    type="submit"
    disabled={pending}
    className="bg-neutral-200 font-bold text-black w-full rounded-full py-2 my-2"
  >
    <ClipLoader color="#1DA1F2" size={20} loading={pending}/>
    {!pending && text}
  </button>
  )
}
