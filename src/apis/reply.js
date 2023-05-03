import { apiHelper } from "../utils/helper";
import tweetsAPI from "./tweets.js";
import userAPI from "./users.js";

const getToken = () => localStorage.getItem("token");

export default {
  //新增一則貼文  failure
  async createReply({ id, comment }) {
    // get this single tweet
    const { data } = await tweetsAPI.getTweet({ tweetId: id });
    const tweet = data;
    // get currentUser
    const currentUser = await userAPI.getCurrentUser();
    const {
      data: { id: userId, avatar: userAvatar, account, name },
    } = currentUser;

    const reply = {
      createdAt: Date.now(),
      description: comment,
      userId,
      account,
      name,
      userAvatar,
    };

    tweet.replies.push(reply);

    return apiHelper.put(`/tweets/${id}`, tweet, {
      headers: {
        Authorization: `Bearer ${getToken()} `,
      },
    });
  },
};
