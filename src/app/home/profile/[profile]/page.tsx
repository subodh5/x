import { getUserTweet } from "@/actions/tweets";
import {  getCurrentUser,  getUserByUsername } from "@/actions/user";
import TweetCard from "@/components/TweetCard";
import { tweetType, userType } from "@/types/globalTypes";
import moment from "moment";
import FollowButton from "./FollowButton";


type Params = {
  params: {
    profile: string;
  };
};
interface userTypeExtended extends userType {
  followers: string[];
  following: string[];
  created_at: string;
}
export default async function page({ params: { profile } }: Params) {
  const userSelf: userTypeExtended = await getCurrentUser();
  const user: userTypeExtended = await getUserByUsername(profile);
  const tweets: tweetType[] = await getUserTweet(profile)  

  return (
    <div className="w-[50vw] border-r border-gray-800 text-white overflow-auto h-screen">
      <div className=" p-4  border-b border-b-gray-800 bg-black bg-opacity-80 backdrop-blur-sm sticky z-10 top-0">
        <h3 className="text-xl font-bold">{user.name}</h3>
      </div>
      <div className="h-44 bg-neutral-700 relative">
        <img
          src={user.profile_picture}
          alt=""
          className="rounded-full w-24 h-24 absolute -bottom-12 left-4 border-4 border-black"
        />
      </div>

      <div className="pt-14  border-b border-gray-800">
        <div className="px-4 flex flex-col">
          {String(userSelf._id) !== String(user._id) && (
            <FollowButton userSelf = {userSelf} userId={user._id}/>
          )}
          <p className="font-bold text-xl">{user.name}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
          <p className="text-sm text-gray-500">
            Joined {moment(user.created_at).format("MMM YYYY")}
          </p>
          <div className="flex gap-4 py-2 text-gray-500">
            <span>{user.followers.length} followers</span>
            <span>{user.following.length} following</span>
          </div>
        </div>
        <div className="p-4 hover:bg-neutral-900 w-fit border-b-4 rounded border-primary">
          Posts
        </div>
      </div>
      <TweetCard userSelf={userSelf} tweets={tweets}/>
    </div>
  );
}
