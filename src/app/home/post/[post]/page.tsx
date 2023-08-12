import Link from "next/link";
import { userType, tweetType } from "@/types/globalTypes";
import { getReplies, getTweetById } from "@/actions/tweets";
import moment from "moment";
import ReplyForm from "@/components/ReplyForm";
import { getCurrentUser } from "@/actions/user";
import TweetCard from "@/components/TweetCard";

type Params = {
  params: {
    post: string;
  };
};
export default async function page({ params: { post } }: Params) {
  const userSelf: userType = await getCurrentUser();
  const tweet: tweetType = await getTweetById(post);
  const replies : tweetType[]= await getReplies(post)  
  
  return (
    <div className="w-[50vw] border-r border-gray-800 text-white overflow-auto h-screen">
      <div className=" p-4  border-b border-b-gray-800 bg-black bg-opacity-80 backdrop-blur-sm sticky top-0">
        <h3 className="text-xl font-bold">Post</h3>
      </div>
      <div className="p-4 transition border-b border-gray-800">
        <div className="flex gap-2">
          <img
            src={tweet.author.profileURL}
            alt="icon"
            className="rounded-full w-10 h-10"
          />

          <div>
            <div>
              <Link
                href={`/home/profile/${tweet.author.username}`}
                className="font-bold hover:underline"
              >
                {tweet.author.name}
              </Link>
              <p className="text-gray-500">@{tweet.author.username}</p>
            </div>
            <div className="my-4">{tweet.content}</div>
            <img src={tweet.photoURL} alt="" className="w-fit rounded-2xl" />
            <p className="my-2 text-sm text-gray-500">
              {moment(tweet.createdAt).format("h:mm a . MMM D . YYYY")}
            </p>
          </div>
        </div>

        <ReplyForm
          likes={tweet.likes.length}
          liked={tweet.likes.includes(userSelf._id)}
          replies={tweet.replyTweetIds.length}
          postId = {tweet._id}
          user = {userSelf}
        />
      </div>
      <TweetCard userSelf={userSelf} tweets={replies}/>
    </div>
  );
}
