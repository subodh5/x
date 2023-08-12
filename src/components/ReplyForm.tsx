"use client";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { experimental_useOptimistic as useOptimistic, useState } from "react";
import { likeTweet, postReplyTweet, unLikeTweet } from "@/actions/tweets";
import { userType } from "@/types/globalTypes";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { useTransition } from "react";

export default function ReplyForm({
  likes,
  liked,
  replies,
  postId,
  user,
}: {
  likes: number;
  liked: boolean;
  replies: number;
  postId: string;
  user: userType;
}) {
  let [isPending, startTransition] = useTransition();
  const [replyText, setReplyText] = useState("");
  const [optimisticLike, addOptimisticLike] = useOptimistic(
    { likes, liked },
    (state) => {
      if (state.liked) {
        return { ...state, likes: state.likes - 1, liked: false };
      } else {
        return { ...state, likes: state.likes + 1, liked: true };
      }
    }
  );
  async function toggleLike() {
    addOptimisticLike(optimisticLike);
    if (liked) {
      await unLikeTweet(postId, user._id);
    } else {
      await likeTweet(postId, user._id);
    }
  }

  async function postReply() {
    try {
      {
        replyText && (await postReplyTweet(replyText, user, postId));
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    setReplyText("")
  }

  return (
    <div>
      <div className="border-y border-gray-800 flex gap-3 py-3">
        <p>{likes} likes</p>
        <p>0 retweet</p>
        <p>{replies} replies</p>
      </div>
      <div className="flex justify-around py-4 border-b border-gray-800 text-2xl">
        <div className="p-2 rounded-full hover:bg-neutral-700 hover:text-primary transition">
          <FaRegComment />
        </div>
        <div className="p-2 rounded-full hover:bg-neutral-700 hover:text-green-500 transition">
          <FaRetweet />
        </div>
        <div onClick={toggleLike}>
          {optimisticLike.liked ? (
            <div className="p-2 rounded-full hover:bg-neutral-700 text-red-500 animate-heartbeat">
              <AiFillHeart />{" "}
            </div>
          ) : (
            <div className="p-2 rounded-full hover:bg-neutral-700 hover:text-red-500 animate-heartbeat">
              <AiOutlineHeart />
            </div>
          )}
        </div>
      </div>

      <form
        action={() => startTransition(() => postReply())}
        className="flex gap-2 pt-3"
      >
        <img
          src={user.profile_picture}
          alt="icon"
          className="rounded-full w-10 h-10"
        />
        <input
          type="text"
          name="reply"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="outline-none border-none p-2 w-full bg-black"
          placeholder="Post your reply"
        />
        <button className="bg-primary px-6 py-1 rounded-full " disabled={isPending}>
        <ClipLoader color="#FFF" size={20} loading={isPending}/>
          Reply
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
