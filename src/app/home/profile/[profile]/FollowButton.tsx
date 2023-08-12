"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { userType } from "@/types/globalTypes";
import { follow, unfollowUser } from "@/actions/user";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface userTypeExtended extends userType {
  followers: string[];
  following: string[];
}

export default function FollowButton({
  userSelf,
  userId,
}: {
  userSelf: userTypeExtended;
  userId: string;
}) {
  const isFollowing = userSelf.following.includes(userId)
  const [optimisticFollow, addOptimisticFollow] = useOptimistic(
    {isFollowing },
    (state) => {
      if (state.isFollowing) {
        return { isFollowing: false};
      } else {
        return {isFollowing : true};
      }
    }
  );

  async function followUser() {
    try {
      addOptimisticFollow(optimisticFollow)
      if (isFollowing) {
        await unfollowUser({ userId: userSelf._id, unfollowUserId: userId });
      } else {
        await follow({ userId: userSelf._id, followUserId: userId });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className="self-end">
      <button onClick={followUser} className="border border-gray-500 w-fit px-4 py-1 rounded-full self-end">
        {optimisticFollow.isFollowing ? "Following" : "Follow"}
      </button>
      <ToastContainer/>
    </div>
  );
}
