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
// import tweetsAPI from "../apis/tweets.js";
import Toast from "./../utils/helper";
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
          isFollowing: true,
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
          isFollowing: true,
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
          isFollowing: true,
        },
        {
          tweetId: 400,
          UserId: 4,
          name: "Emily Yu",
          image: "",
          account: "EmilyYu01",
          description:
            "Emily is a girl's name of Latin origin. Derived from the Roman namesake 'Aemilia'.",
          RepliesCount: 65,
          LikesCount: 39,
          createdAt: "20220126",
          userAvatar:
            "https://images.generated.photos/k60lubuQ7Xxi60qIEy8IjcrV9ok_tqSejtyp1mRhFBE/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTgwMDAxLmpwZw.jpg",
          isLiked: true,
          isFollowing: false,
        },
        {
          tweetId: 500,
          UserId: 5,
          name: "Charles EY",
          image: "",
          account: "Charlesey01",
          description:
            "The German boy’s name Charles means “free man.” Charles is a royal name that dates back to the reign of Charlemagne, the first Charles the Great. Ever the well-traveled name, it has graced monarchs in England, France, Spain, Hungary, and Portugal since.",
          RepliesCount: 138,
          LikesCount: 9,
          createdAt: "20210327",
          userAvatar:
            "https://images.generated.photos/-W9ewfcxUM-vzTiKVeOX2CQeEDSKHu5gaPoQHhccGdk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODgzNTE4LmpwZw.jpg",
          isLiked: false,
          isFollowing: false,
        },
        {
          tweetId: 600,
          UserId: 6,
          name: "Eli Ku",
          image: "",
          account: "EliKu01",
          description:
            "Prepare for your capacity to love unconditionally to reach new heights upon baby's arrival!",
          RepliesCount: 298,
          LikesCount: 3000,
          createdAt: "20230420",
          userAvatar:
            "https://images.generated.photos/hDvA4u8e1eBFqZAvv8p6E91p4X_Tuf8RGOgSuAwG8mE/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTg4OTg2LmpwZw.jpg",
          isLiked: true,
          isFollowing: true,
        },
        {
          tweetId: 700,
          UserId: 7,
          name: "Kai Nakawu",
          image: "",
          account: "KaiNakawu20091101",
          description:
            "Kai is a gender-neutral name of Welsh origin, with roots worldwide, including in Greece and Scandinavian countries. Kai means 'keeper of the keys and earth,' making it a grounding choice for a parent laying down foundations with baby. In Hawaii, Kai means 'the sea' while in New Zealand, Kai is the Maori word for 'food.'",
          RepliesCount: 16780,
          LikesCount: 38765,
          createdAt: "20230328",
          userAvatar:
            "https://images.generated.photos/8x0_R0LPmMTZzLEH1VyYX61jdZNLGYMLtE7lgIpygZ8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODU2NTA3LmpwZw.jpg",
          isLiked: true,
          isFollowing: false,
        },
        {
          tweetId: 800,
          UserId: 8,
          name: "Landon Lai",
          image: "",
          account: "Landonlailai1",
          description:
            "Landon is a gender-neutral name with British origins. This name simply means “long hill” and is more commonly used as a surname.",
          RepliesCount: 2,
          LikesCount: 4,
          createdAt: "20221231",
          userAvatar:
            "https://images.generated.photos/34hsZWE4kYqkfGCnCT4Zs1bWX17wutDFrrbM2fvMa4U/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjUzNzIyLmpwZw.jpg",
          isLiked: false,
          isFollowing: false,
        },
        {
          tweetId: 900,
          UserId: 9,
          name: "Beau Lin",
          image: "",
          account: "beaulin01",
          description:
            "Beau is a gender-neutral name of French origin. Traditionally used as a nickname, Beau has become more popular as a given name in its own right in the last 50 years.",
          RepliesCount: 10,
          LikesCount: 10,
          createdAt: "20230401",
          userAvatar:
            "https://images.generated.photos/V4ck5WmYnym9m4RuBCqbQLVNmSZoU_RWvHEi3v6_fmU/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTA2NTg4LmpwZw.jpg",
          isLiked: true,
          isFollowing: true,
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
    // async afterCreateTweetModal(tweet) {
    //   try {

    //     const { data } = await tweetsAPI.createTweet({ tweet });
    //     console.log(data);
    //     const {
    //       tweetId,
    //       UserId,
    //       name,
    //       image,
    //       account,
    //       description,
    //       RepliesCount,
    //       LikesCount,
    //       createdAt,
    //       userAvatar,
    //     } = tweet;
    //     this.posts.unshift({
    //       tweetId,
    //       UserId,
    //       name,
    //       image,
    //       account,
    //       description,
    //       RepliesCount,
    //       LikesCount,
    //       createdAt,
    //       userAvatar,
    //     });
    //   } catch (error) {
    //     Toast2.fire({
    //       title: "目前無法推文，請稍後再試",
    //     });
    //   }
    // },

    afterCreateTweetModal(payload) {
      console.log("text:", payload);
      Toast.fire({
        title: "Tweet Successfully!",
      });
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
