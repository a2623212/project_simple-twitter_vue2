<template>
  <div class="container">
    <Navbar @after-create-tweet-modal="afterCreateTweetModal" :current-status="currentStatus" />
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
import { Toast2 } from "./../utils/helper";
import { mapState } from "vuex";

export default {
  name: "main-page",
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
      posts: [
        {
          tweetId: 100,
          UserId: 1,
          name: "Bob",
          image: "",
          account: "bob001",
          description:
            "Looks like Mother Nature finally got the memo that we're tired of her dramatic moods. It's officially good weather season, folks!",
          RepliesCount: 2,
          LikesCount: 12,
          createdAt: "20230304",
          userAvatar:
            "https://images.generated.photos/jWyOJXviE8Ul5twfCO8mzHKx6tC27x34XoaT_jLmISs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTg0OTc5LmpwZw.jpg",
          isLiked: true,
        },
        {
          tweetId: 200,
          UserId: 2,
          name: "Amy",
          image: "",
          account: "Amy001",
          description: "toilet paper is having a great year",
          RepliesCount: 100,
          LikesCount: 28,
          createdAt: "20230404",
          userAvatar:
            "https://images.generated.photos/m-ZXHrkQsHcyFCarE7GdBGMKcfD-c9Tng10aXkex5Bc/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjkzMDgzLmpwZw.jpg",
          isLiked: false,
        },
        {
          tweetId: 300,
          UserId: 3,
          name: "Joy Wang",
          image: "",
          account: "JwinTaiwan001",
          description:
            "Columbia Road Market is open on Easter Sunday. The market is only closed if Christmas Day falls on a Sunday once every seven years.",
          RepliesCount: 22,
          LikesCount: 150,
          createdAt: "20230415",
          userAvatar:
            "https://images.generated.photos/A0C-iICKwNMbO_YobmNi9q8PzaoK0d3v5mIXwcy7cyQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjY1MDAxLmpwZw.jpg",
          isLiked: false,
        },
      ],
      currentStatus: {
        isIndex: true,
        isUser: false,
        isSetting: false,
      },
    };
  },
  methods: {
    async afterCreateTweet(payload) {
      const {
        UserId,
        name,
        image,
        account,
        description,
        RepliesCount,
        LikesCount,
        createdAt,
        userAvatar,
      } = payload;
      this.posts.unshift({
        UserId,
        name,
        image,
        account,
        description,
        RepliesCount,
        LikesCount,
        createdAt,
        userAvatar,
      });
    },
    async afterCreateTweetModal(tweet) {
      try {
        const { data } = await tweetsAPI.createTweet({ tweet });
        console.log(data);
        const {
          tweetId,
          UserId,
          name,
          image,
          account,
          description,
          RepliesCount,
          LikesCount,
          createdAt,
          userAvatar,
        } = tweet;
        this.posts.unshift({
          tweetId,
          UserId,
          name,
          image,
          account,
          description,
          RepliesCount,
          LikesCount,
          createdAt,
          userAvatar,
        });
      } catch (error) {
        Toast2.fire({
          title: "目前無法推文，請稍後再試",
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
