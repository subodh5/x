import { experimental_useOptimistic as useOptimistic } from "react";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { likeTweet, unLikeTweet } from "@/actions/tweets";

export default function TweetCardBottom({
  likes,
  liked,
  replies,
  postId,
  userId,
}: {
  likes: number;
  liked: boolean;
  replies:number;
  postId: string;
  userId: string;
}) {
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
      await unLikeTweet(postId, userId);
    } else {
      await likeTweet(postId, userId);
    }
  }

  return (
    <div className="flex  justify-around mt-4 text-neutral-500">
      <div className="flex gap-1 hover:text-primary">
        <div className="p-2 rounded-full hover:bg-neutral-700">
          <FaRegComment />
        </div>
        <span className="py-1">{replies}</span>
      </div>
      <div className="flex gap-1 hover:text-green-500">
        <div className="p-2 rounded-full hover:bg-neutral-700">
          <FaRetweet />
        </div>
        <span className="py-1">0</span>
      </div>
      <div onClick={toggleLike} className="flex gap-1 hover:text-red-500">
        <div className="p-2 rounded-full hover:bg-neutral-700">
          {optimisticLike.liked ? (
            <div className="text-red-500 animate-heartbeat">
              <AiFillHeart />{" "}
            </div>
          ) : (
            <div className="animate-heartbeat">
              <AiOutlineHeart />
            </div>
          )}
        </div>
        <span className="py-1">{optimisticLike.likes}</span>
      </div>
    </div>
  );
}
