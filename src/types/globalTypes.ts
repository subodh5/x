export interface userType {
    _id: string;
    username: string;
    name: string;
    profile_picture: string;
  }
 export interface tweetType {
    author: { name: string; username: string; profileURL: string };
    _id: string;
    content: string;
    photoURL: string;
    likes: string[];
    replyTweetIds:string[];
    createdAt: string;
  }