<template>
  <div class="container">
    <Navbar @after-create-tweet="afterCreateTweet" :current-status="currentStatus" />
    <div class="main-page">
      <Tweet @after-create-tweet="afterCreateTweet" />
      <Posts :initial-post="post" v-for="post in posts" :key="post.tweetId" />
    </div>
    <Popular />
  </div>
</template>

<script>
import Tweet from "../components/tweet.vue";
import Posts from "../components/posts.vue";
import Navbar from "../components/Navbar.vue";
import Popular from "../components/PopularUsers.vue";
import tweetsAPI from "../apis/tweets.js";
import Toast, { Toast2 } from "./../utils/helper";
import { mapState } from "vuex";

export default {
  name: "main-page",

  created() {
    this.fetchPost();
  },

  components: {
    Tweet,
    Posts,
    Navbar,
    Popular,
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  data() {
    return {
      posts: [],
      currentStatus: {
        isIndex: true,
        isUser: false,
        isSetting: false,
      },
    };
  },
  methods: {
    async fetchPost() {
      try {
        const data = await tweetsAPI.getTweets();

        this.posts = data;
      } catch (error) {
        console.log("this error is on the api");
        Toast2.fire({
          title: "can't fetch tweet posts",
        });
      }
    },
    async afterCreateTweet(payload) {
      try {
        const { data } = await tweetsAPI.createTweet(payload);
        const {
          userAvatar,
          UserId,
          name,
          account,
          description,
          RepliesCount,
          LikesCount,
          createdAt,
        } = data;
        const tweetId = data.id;
        this.posts.unshift({
          tweetId,
          userAvatar,
          UserId,
          name,
          account,
          description,
          RepliesCount,
          LikesCount,
          createdAt,
        });
        Toast.fire({
          title: "Tweet Successfully!",
        });
      } catch (error) {
        console.log("this error is on the api");
        Toast2.fire({
          title: "can't tweet now",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
