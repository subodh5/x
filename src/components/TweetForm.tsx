"use client";
import { BiImage } from "react-icons/bi";
import { AiOutlineFileGif } from "react-icons/ai";
import { useState } from "react";
import { getSignature } from "@/actions/tweets";
import { postTweet } from "@/actions/tweets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners"
import { userType } from "@/types/globalTypes";
import { useTransition } from 'react'

export default function TweetForm({userSelf}:{userSelf:userType}) {


  const [imgFile, setImgFile] = useState<File | null>(null);
  const [tweetText, setTweetText] = useState("");
  let [isPending, startTransition] = useTransition()

  async function submitForm() {

    if (!(tweetText || imgFile)) {
      return;
    }
    try {
      
    if (imgFile) {
      const { timestamp, signature } = await getSignature();

      const formData = new FormData();
      formData.append("file", imgFile);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("signature", signature);
      formData.append("timestamp", String(timestamp));
      formData.append("folder", "next");
      
      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;

      const { public_id } = await fetch(endpoint, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      await postTweet({ public_id: public_id, tweet: tweetText, user:userSelf });
    } else {
      await postTweet({ public_id: "", tweet: tweetText, user:userSelf });
    }
    setImgFile(null)
    setTweetText("")
    toast.success("Successfylly posted")
  } catch (error) {
      toast.error("Failed to post")
  }
  }

  return (
    <div className="flex gap-2 px-3 pt-3 pb-2 w-full border-gray-800 border-b">
      <img
        src={userSelf.profile_picture}
        alt="icon"
        className="rounded-full w-10 h-10"
      />
      <form action={()=>startTransition(()=>submitForm())} className="w-full">
        <textarea
          name="tweet"
          rows={2}
          placeholder="What is happening?!"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          className="bg-black text-xl outline-none border-none w-full resize-none"
        ></textarea>
        {imgFile && (
          <div>
            <span className="cursor-pointer" onClick={() => setImgFile(null)}>
              X
            </span>
            <img
              src={URL.createObjectURL(imgFile)}
              alt="icon"
              className="h-20"
            />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex text-primary text-xl ">
            <label
              htmlFor="img-upload"
              className="p-2 rounded-full hover:bg-[#021927]"
            >
              <input
                type="file"
                id="img-upload"
                name="img"
                accept="image/*"
                onChange={(e) =>
                  setImgFile(e.target.files ? e.target.files[0] : null)
                }
                hidden
              />
              <BiImage />
            </label>
            <label
              htmlFor="gif-upload"
              className="p-2 rounded-full hover:bg-[#021927]"
            >
              <input
                type="file"
                id="gif-upload"
                name="gif"
                accept="image/*"
                hidden
              />
              <AiOutlineFileGif />
            </label>
          </div>

          <button className="bg-primary rounded-full px-4" disabled={isPending}>
          <ClipLoader color="#FFF" size={20} loading={isPending}/>
          Post
          </button>
          
        </div>
        <ToastContainer/>
      </form>
    </div>
  );
}
