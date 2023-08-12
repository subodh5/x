"use client";
import TweetCardBottom from "./TweetCardBottom";
import Link from "next/link";
import { userType, tweetType } from "@/types/globalTypes";
import { useState } from "react";
import moment from "moment";

export default function TweetCard({
  userSelf,
  tweets,
}: {
  userSelf: userType;
  tweets: tweetType[];
}) {
  const [hover, setHover] = useState(false);
  return (
    <div>
      {tweets.map((tweet) => {
        return (
          <div
            key={tweet._id}
            className="p-4 hover:bg-neutral-900 cursor-pointer transition border-b border-gray-800"
          >
            <Link
              href={
                hover
                  ? `/home/profile/${tweet.author.username}`
                  : `/home/post/${tweet._id}`
              }
            >
              <div className="flex gap-2">
                <img
                  src={tweet.author.profileURL}
                  alt="icon"
                  className="rounded-full w-10 h-10"
                />

                <div>
                  <div className="flex gap-1">
                    <p
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      className="font-bold hover:underline"
                    >
                      {tweet.author.name}
                    </p>
                    <p className="text-gray-500">@{tweet.author.username}</p>
                    <p className="text-gray-500">
                      . {moment(tweet.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="my-1">{tweet.content}</div>
                  {tweet.photoURL && (
                    <img
                      src={tweet.photoURL}
                      alt=""
                      className="w-fit rounded-2xl"
                    />
                  )}
                </div>
              </div>
            </Link>
            <TweetCardBottom
              likes={tweet.likes.length}
              liked={tweet.likes.includes(userSelf._id)}
              replies={tweet.replyTweetIds.length}
              postId={tweet._id}
              userId={userSelf._id}
            />
          </div>
        );
      })}
    </div>
  );
}
