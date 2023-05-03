<template>
  <div id="adminUser">
    <template>
      <AdminNewNavbar :status="status" />
      <div class="adminUserPanel">
        <div class="title">
          <h1>使用者列表</h1>
        </div>
        <div class="admin-user-card">
          <AdminUserCard v-for="user in users" :key="user.id" :user="user" />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import AdminNewNavbar from "./../components/AdminNewNavbar";
import AdminUserCard from "./../components/adminUserCard";
import { Toast2 } from "./../utils/helper";
import adminAPI from "../apis/admin";

export default {
  name: "AdminUser",
  components: {
    AdminNewNavbar,
    AdminUserCard,
  },
  data() {
    return {
      users: [],
      status: {
        tweets: false,
        users: true,
      },
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    //抓所有user的資料
    async fetchUser() {
      try {
        const data = await adminAPI.users.get();
        this.users = data;
      } catch (error) {
        Toast2.fire({
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../styles/variables.scss";
#adminUser {
  display: flex;
  width: 80%;
  min-height: 100vh;
  margin: 0 auto;
}
.adminUserPanel {
  margin-left: 100px;
  flex: 1;
  min-height: 100vh;
}
.admin-user-card {
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid $borderColor;
}
.title {
  height: 55px;
  border: 1px solid $borderColor;
}
.title h1 {
  display: flex;
  font-size: 18px;
  font-weight: 700;
  padding: 13px 0 14px 26px;
  margin: 0;
}
</style>
