<template>
  <div id="AdminTweet">
    <!-- adminNavbar.vue -->
    <div class="admin-navbar">
      <AdminNewNavbar :status="status" />
    </div>
    <!-- adminTweetList.vue -->
    <div class="adminTweetPanel">
      <div class="title">
        <h1>推文清單</h1>
      </div>
      <adminTweetList :tweets="tweets" @after-delete-tweet="handleDeleteTweet" />
    </div>
  </div>
</template>
<script>
import AdminNewNavbar from "./../components/AdminNewNavbar.vue";
import adminTweetList from "./../components/adminTweetList.vue";
import adminApi from "./../apis/admin";
import { Toast2 } from "@/utils/helper";
// import { Toast } from "./../utils/helper";

export default {
  name: "adminNewTweet",
  components: {
    AdminNewNavbar,
    adminTweetList,
  },
  created() {
    this.fetchAdminTweets();
  },
  data() {
    return {
      tweets: [],
      status: {
        tweets: true,
        users: false,
      },
    };
  },
  methods: {
    async fetchAdminTweets() {
      try {
        const data = await adminApi.tweets.get();
        this.tweets = data;
      } catch (error) {
        console.log("error", error);
        Toast2.fire({
          title: "暫時無法取得推文",
        });
      }
    },
    async handleDeleteTweet(tweetId) {
      try {
        console.log("2");
        console.log(tweetId);
        const { data } = await adminApi.tweets.delete(tweetId);
        console.log("🚀 ~ file: AdminNewTweet.vue:57 ~ handleDeleteTweet ~  data:", data);

        this.tweets = this.tweets.filter((tweet) => {
          return tweet.tweetId !== tweetId;
        });
      } catch (error) {
        console.log("error", error);
        Toast2.fire({
          title: "暫時無法刪除推文",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../styles/variables.scss";
#AdminTweet {
  width: 100%;
  display: grid;
  grid-template-columns: 378px 1062px;
}
.admin-navbar {
  padding-left: 113px;
}

.adminTweetPanel {
  min-height: 100vh;
  border: 1px solid $borderColor;
}

.title {
  height: 55px;
  border-bottom: 1px solid $borderColor;
}

.title h1 {
  font-size: 18px;
  font-weight: 700;
  padding: 13px 0 14px 23px;
  margin: 0;
  color: $mainColor;
}
</style>
