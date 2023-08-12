import { getAllTweet } from "@/actions/tweets";
import { getCurrentUser } from "@/actions/user";
import TweetCard from "@/components/TweetCard";
import TweetForm from "@/components/TweetForm";
import { userType } from "@/types/globalTypes";
import { tweetType } from "@/types/globalTypes";


export default async function MainContent() {

  const userSelf:userType = await getCurrentUser()
  const tweets:tweetType[] = await getAllTweet()  

  return (
    <div className=" text-white overflow-auto h-screen">
      <div className="h-28  border-b border-b-gray-800 bg-black bg-opacity-80 backdrop-blur-sm sticky top-0">
        <h3 className="text-xl font-bold h-1/2 px-4 py-3">Home</h3>
        <div className="flex items-center h-1/2">
          <p className="w-full hover:bg-neutral-800 h-full flex items-center justify-center cursor-pointer transition">
            For You
          </p>
          <p className="w-full h-full hover:bg-neutral-800 flex items-center justify-center cursor-pointer transition">
            Following
          </p>
        </div>
      </div>


    <TweetForm userSelf={userSelf}/>
    <TweetCard userSelf={userSelf} tweets={tweets}/>

    </div>
  );
}
