import { apiHelper } from "../utils/helper";
const getToken = () => localStorage.getItem("token");
const getUser = () => apiHelper.get("/users");

// const filterUser = async (userId) => {
//   const { data } = await getUser();
//   const thisUser = data.find((user) => user.userId === userId);
//   return thisUser;
// };

// function declaration
async function filterUser(userId) {
  const { data } = await getUser();
  const thisUser = data.find((user) => user.userId === userId);
  return thisUser;
}

// const filterUser = (userId) => {
//   return getUser().then(({ data }) => {
//     const thisUser = data.find((user) => user.userId === userId);
//     console.log("🚀 ~ file: users.js:23 ~ returngetUser ~ thisUser:", thisUser)
//     return thisUser;
//   });

// };

export default {
  // 取得User的資料 (需要user ID)
  async get(userId) {
    try {
      const { data } = await apiHelper.get(`/users/${userId}`);
      const userData = data[0];
      return userData;
    } catch (error) {
      return error;
    }
  },
  // 取得User的推文資料 (需要user ID)
  async getTweets(userId) {
    try {
      const thisUser = await filterUser(userId);

      const result = thisUser.tweets;
      console.log("🚀 ~ file: users.js:22 ~ getTweets ~ result:", result);

      return result;
    } catch (error) {
      return error;
    }
  },

  // 取得User的回覆資料  (需要user ID)
  async getReplies(userId) {
    try {
      const { data } = await getUser();
      const thisUser = data.find((user) => user.userId === userId);
      return thisUser.replies;
    } catch (error) {
      console.log("this error from api:", error);
      return error;
    }
  },
  // 取得User的喜愛內容 (需要user ID)
  async getLikes(userId) {
    try {
      const { data } = await getUser();
      const thisUser = data.find((user) => user.userId === userId);
      return thisUser.likes;
    } catch (error) {
      console.log("this error from api:", error);
      return error;
    }
  },

  // 取得topUser的資料
  getTopUser() {
    return apiHelper.get("/users/top", { headers: { Authorization: `Bearer ${getToken()}` } });
  },
  // 取得follower的資料
  async getFollowers(userId) {
    try {
      const { data } = await getUser();
      const thisUser = data.find((user) => user.userId === userId);
      return thisUser.followers;
    } catch (error) {
      return console.log("this is error from api getFollowers:", error);
    }
  },
  //取得following的資料
  async getFollowings(userId) {
    try {
      const { data } = await getUser();
      const thisUser = data.find((user) => user.userId === userId);
      return thisUser.followings;
    } catch (error) {
      return console.log("this is error from api getFollowings:", error);
    }
  },

  // 上傳個人資料更新
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  // 取消追蹤
  removeFollowship({ userId }) {
    return apiHelper.delete(`/followships/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  // 新增追蹤
  addFollowship({ formData }) {
    return apiHelper.post("/followships", formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  //抓currentUser到vuex
  getCurrentUser() {
    return apiHelper.get("/user", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
