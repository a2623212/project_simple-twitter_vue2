import { apiHelper } from "../utils/helper";

export default {
  // login
  login({ account, password }) {
    return apiHelper.post("/signin", {
      account,
      password,
    });
  },
  register(formData) {
    return apiHelper.post("/users", formData);
  },
  async adminLogin({ account, password }) {
    const adminData = await apiHelper.get("/admin");
    const {
      data: { posts, users },
    } = adminData;
    const signIn = {
      account,
      password,
    };
    const newData = {
      signIn,
      posts,
      users,
    };
    return apiHelper.post("/admin", newData);
  },
};
