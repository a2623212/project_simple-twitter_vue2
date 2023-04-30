import { apiHelper } from "../utils/helper";
const getToken = () => localStorage.getItem("token");
const getUser = () => apiHelper.get("/users");

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
      const { data } = await getUser();
      const thisUser = data.find((user) => user.userId === userId);
      return thisUser.tweets;
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
  getFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  //取得following的資料
  getFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
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
