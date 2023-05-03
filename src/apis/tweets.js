import { apiHelper } from "../utils/helper";
const getToken = () => localStorage.getItem("token");

export default {
  //main.vue首頁拿所有推文的api
  async getTweets() {
    try {
      const { data } = await apiHelper.get("/tweets");
      // Descending Ordering
      const result = data.sort((a, b) => b.id - a.id);
      return result;
    } catch (error) {
      console.log("this error is from tweets.js api:", error);
    }
  },

  //取得一篇tweet內容及其回覆清單
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()} ` },
    });
  },
  //新增一則推文
  createTweet(payload) {
    return apiHelper.post("/tweets", payload);
  },
  //推文可以加入like
  addLike() {
    return apiHelper.post("/tweets");
  },
  //推文可以移除like
  deleteLike({ tweetId }) {
    return apiHelper.post(`tweets/${tweetId}/unlike`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
