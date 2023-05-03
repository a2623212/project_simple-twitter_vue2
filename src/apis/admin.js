import { apiHelper } from "../utils/helper";
// const getToken = () => localStorage.getItem("token");
const getAdmin = () => apiHelper.get("/admin");

export default {
  users: {
    async get() {
      const { data } = await getAdmin();
      const usersList = data.users;
      return usersList;
    },
  },
  tweets: {
    // 取得使用者清單
    async get() {
      const { data } = await getAdmin();
      const tweetsList = data.posts;

      return tweetsList;
    },

    async delete(number) {
      const adminData = await getAdmin();

      const {
        data: { signIn, users, posts },
      } = adminData;

      const newTweetsList = posts.filter((tweet) => {
        return tweet.id !== number;
      });

      const newData = {
        signIn,
        posts: newTweetsList,
        users,
      };

      return apiHelper.post("/admin", newData);
    },
  },
};
