<template>
  <div class="container">
    <div class="navbar">
      <Navbar :current-status="currentStatus" @after-create-tweet="afterCreateTweet" />
    </div>
    <div class="main">
      <header class="header">
        <button>
          <router-link to="/main"
            ><img src="./../assets/arrow.png" alt="backarrow" class="previous-btn" />
          </router-link>
        </button>
        <div class="title">
          <p class="user-name">{{ user.name }}</p>
          <p class="user-tweet">{{ tweets.length }} 推文</p>
        </div>
      </header>
      <div class="user-page-body">
        <router-view
          :user="user"
          :tweets="tweets"
          :likes="likes"
          :followers="Followers"
          :followings="Followings"
          :replies="replyTweets"
          @after-like="handleAddLike"
          @after-delete-like="handleDeleteLike"
          @after-update="handleUpdate"
          @after-delete-on-like="handleDeleteLikePost"
          @after-remove-followship="handleRemoveFollowship"
          @after-add-followship="handleAddFollowship"
          @after-del-followship="handleDelFollowship"
          @after-cancel-cover="handleCancelCover"
          @after-create-reply-modal="handleReplyModal"
        />
      </div>
    </div>
    <div class="popular-users">
      <PopularUsers
        :change-top-user="topUsers"
        @after-remove-pop="handleRemovePop"
        @after-add-pop="handleAddPop"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PopularUsers from "../components/PopularUsers.vue";
import usersAPI from "./../apis/users";
import tweetsAPI from "./../apis/tweets";
import { Toast, Toast2 } from "./../utils/helper";
import { mapState } from "vuex";

export default {
  name: "User",

  components: {
    Navbar,
    PopularUsers,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    thisUserId() {
      return Number(this.$route.params.id);
    },
  },
  created() {
    const thisUserId = this.thisUserId;
    this.fetchUser(thisUserId);
    this.fetchTweets(thisUserId);
    this.fetchReplies(thisUserId);
    this.fetchLikes(thisUserId);
    this.fetchFollowers(thisUserId);
    this.fetchFollowings(thisUserId);
    this.$watch(
      () => this.$route.params,
      (newV, oldV) => {
        if (newV.id === oldV.id) {
          return;
        } else {
          const userId = Number(newV.id);
          console.log("renew the page", userId);
          this.fetchUser(userId);
          this.fetchTweets(userId);
          this.fetchReplies(userId);
          this.fetchLikes(userId);
          this.fetchFollowers(userId);
          this.fetchFollowings(userId);
        }
      }
    );
  },

  data() {
    return {
      currentStatus: {
        isIndex: false,
        isUser: true,
        isSetting: false,
      },
      user: {
        userId: -1,
        name: "",
        userAvatar: "",
        introduction: "",
        account: "",
        cover: "",
        followersLength: 0,
        followingsLength: 0,
      },
      tweets: [],
      replyTweets: [],
      likes: [],
      Followers: [],
      Followings: [],
      topUsers: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchUser(id) {
      try {
        const data = await usersAPI.get(id);
        const { userId, name, userAvatar, introduction, account, cover, followers, followings } =
          data;
        this.user = {
          userId,
          name,
          userAvatar,
          introduction,
          account,
          cover,
          followersLength: followers ? followers.length : 0,
          followingsLength: followings ? followings.length : 0,
        };
      } catch (error) {
        console.log(error);
        Toast2.fire({
          title: "Unable to retrieve user data.",
        });
      }
    },
    async fetchTweets(id) {
      try {
        const tweetsPromise = usersAPI.getTweets(id);
        console.log("🚀 ~ file: User.vue:148 ~ fetchTweets ~ tweetsPromise:", tweetsPromise);

        const data = await tweetsPromise;
        this.tweets = data;
        Toast.fire({
          title: " you got the right tweets data!",
        });
      } catch (error) {
        console.log("error", error);
        Toast2.fire({
          title: "Unable to retrieve user data.",
        });
      }
    },
    async fetchReplies(userId) {
      try {
        const data = await usersAPI.getReplies(userId);
        this.replyTweets = data;
        Toast.fire({
          title: " you got the right replies data!",
        });
      } catch (error) {
        console.log("error", error);
        Toast2.fire({
          title: "Unable to retrieve user data.",
        });
      }
    },
    // empty:處理面對空值的回傳方法
    async fetchLikes(userId) {
      try {
        const data = await usersAPI.getLikes(userId);
        this.likes = data;
        console.log("get the right Likes data!");
      } catch (error) {
        console.log("error", error);
        Toast2.fire({
          title: "Unable to retrieve user data.",
        });
      }
    },
    async fetchFollowers(id) {
      try {
        const data = await usersAPI.getFollowers(id);

        this.Followers = data;
        console.log("get the right Followers data!");
      } catch (error) {
        console.log("error from the component", error);
        Toast2.fire({
          title: "Unable to retrieve user data.",
        });
      }
    },
    async fetchFollowings(id) {
      try {
        const data = await usersAPI.getFollowings(id);

        this.Followings = data;
        console.log("get the right Followings data!");
      } catch (error) {
        console.log("error from the component", error);
        Toast2.fire({
          title: "Unable to retrieve user data.",
        });
      }
    },
    // async fetchTopUsers() {
    //   try {
    //     const { data } = await usersAPI.getTopUser();
    //     this.topUsers = data;
    //   } catch (error) {
    //     console.log("error", error);
    //     Toast2.fire({
    //       title: "無法取得資料，請稍後再試",
    //     });
    //   }
    // },
    // async handleAddLike(tweetId) {
    //   try {
    //     const { data } = await tweetsAPI.addLike({ tweetId });
    //     if (data.status === "error") {
    //       throw new Error(data.message);
    //     }
    //     this.tweets = this.tweets.map((tweet) => {
    //       if (tweet.tweetId === tweetId) {
    //         return {
    //           ...tweet,
    //           LikesCount: tweet.LikesCount + 1,
    //           isLiked: true,
    //         };
    //       }
    //       return tweet;
    //     });
    //   } catch (error) {
    //     console.log("error", error);
    //     Toast2.fire({
    //       title: "無法新增喜歡，請稍後再試",
    //     });
    //   }
    // },
    async handleDeleteLike(tweetId) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.tweetId === tweetId) {
            return {
              ...tweet,
              LikesCount: tweet.LikesCount - 1,
              isLiked: false,
            };
          }
          return tweet;
        });
      } catch (error) {
        console.log("error", error);
        Toast2.fire({
          title: "Unable to unlike!",
        });
      }
    },
    // async handleDeleteLikePost(tweetId) {
    //   try {
    //     const { data } = await tweetsAPI.deleteLike({ tweetId });
    //     if (data.status === "error") {
    //       throw new Error(data.message);
    //     }
    //     this.likes = this.likes.filter((like) => {
    //       return like.TweetId !== tweetId;
    //     });

    //     Toast.fire({
    //       title: "成功取消喜歡！",
    //     });
    //   } catch (error) {
    //     console.log("error", error);
    //     Toast2.fire({
    //       title: "無法取消喜歡，請稍後再試",
    //     });
    //   }
    // },
    // async handleRemoveFollowship(userId) {
    //   try {
    //     const { data } = await usersAPI.removeFollowship({ userId });
    //     if (data.message === "Error: Cannot unfollow yourself!") {
    //       console.log("error", data.message);
    //       Toast2.fire({
    //         title: "不能取消跟隨自己",
    //       });
    //       return;
    //     }
    //     if (data.message === "Error: You have not followed this user.!") {
    //       console.log("error", data.message);
    //       Toast2.fire({
    //         title: "已經取消跟隨",
    //       });
    //       return;
    //     }
    //     Toast.fire({
    //       title: "成功取消跟隨！",
    //     });

    //     // 從Followings清單中移除相同id的人
    //     this.Followings = this.Followings.filter((user) => {
    //       return user.followingId !== userId;
    //     });
    //     // 正在跟隨人數變少
    //     this.followingsLength - 1;
    //     // 重整topuser資料
    //     this.fetchTopUsers();
    //   } catch (error) {
    //     console.log("error", error);
    //     Toast2.fire({
    //       icon: "error",
    //       title: "無法取消跟隨，請稍後再試",
    //     });
    //   }
    // },
    // async handleAddFollowship(userId) {
    //   try {
    //     const formData = { id: userId };
    //     const { data } = await usersAPI.addFollowship({ formData });
    //     if (data.message === "Error: You are already following this user.") {
    //       Toast2.fire({
    //         title: "已經跟隨該用戶",
    //       });
    //       return;
    //     }
    //     if (data.message === "Error: Cannot follow yourself!") {
    //       Toast2.fire({
    //         title: "無法跟隨此用戶",
    //       });
    //     }
    //     // 對原本沒有跟隨的人跟隨
    //     this.Followers = this.Followers.map((user) => {
    //       if (user.followerId === userId) {
    //         return {
    //           ...user,
    //           isFollowed: true,
    //         };
    //       }
    //       return user;
    //     });
    //     Toast.fire({
    //       title: "成功跟隨此用戶",
    //     });
    //     this.fetchFollowings(this.user.id);
    //     // 跟隨人數加1
    //     this.followingsLength + 1;
    //     // 重整topuser資料
    //     this.fetchTopUsers();
    //   } catch (error) {
    //     console.log("error", error);
    //     Toast2.fire({
    //       title: "無法新增跟隨，請稍後再試",
    //     });
    //   }
    // },
    // async handleDelFollowship(userId) {
    //   try {
    //     const { data } = await usersAPI.removeFollowship({ userId });
    //     if (data.message === "Error: Cannot unfollow yourself!") {
    //       console.log("error", data.message);
    //       Toast2.fire({
    //         title: "不能取消跟隨自己",
    //       });
    //       return;
    //     }
    //     if (data.message === "Error: You have not followed this user.!") {
    //       console.log("error", data.message);
    //       Toast2.fire({
    //         title: "已經取消跟隨",
    //       });
    //       return;
    //     }
    //     Toast.fire({
    //       title: "成功取消跟隨！",
    //     });

    //     // 改變跟隨的狀態
    //     this.Followers = this.Followers.map((user) => {
    //       if (user.followerId === userId) {
    //         return {
    //           ...user,
    //           isFollowed: false,
    //         };
    //       }
    //       return user;
    //     });
    //     // 正在跟隨人數變少
    //     this.followingsLength - 1;
    //     // 重整topuser資料
    //     this.fetchTopUsers();
    //   } catch (error) {
    //     console.log("error", error);
    //     Toast2.fire({
    //       title: "無法取消跟隨，請稍後再試",
    //     });
    //   }
    // },
    handleUpdate(formData) {
      const { name, avatar, cover, introduction } = formData;
      this.user = {
        ...this.user,
        name,
        avatar,
        cover,
        introduction,
      };
      this.fetchTweets(this.user.id);
      this.fetchUser(this.user.id);
      this.fetchTopUsers();
      this.fetchLikes(this.user.id);
      this.fetchReplies(this.user.id);
    },
    handleRemovePop() {
      this.user.followingsLength - 1;
    },
    handleAddPop() {
      this.user.followingsLength + 1;
    },
    afterCreateTweet(payload) {
      console.log("text:", payload);
      const {
        userAvatar,
        UserId,
        name,
        account,
        description,
        RepliesCount,
        LikesCount,
        createdAt,
      } = payload;
      this.posts.unshift({
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
    },

    handleCancelCover() {
      this.user.cover = "";
    },
    handleReplyModal({ id, status }) {
      if (status === "tweets") {
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.tweetId === id.tweetId) {
            return {
              ...tweet,
              RepliesCount: tweet.RepliesCount + 1,
            };
          }
          return tweet;
        });
      } else if (status === "likes") {
        this.likes = this.likes.map((like) => {
          if (like.TweetId === id.tweetId) {
            like.Tweet.repliesCount++;
          }
          return like;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.container {
  display: grid;
  grid-template-columns: 210px 600px 350px;
  column-gap: 30px;
}
.main {
  width: 100%;
  height: auto;
}
.header {
  width: 100%;
  height: 55px;
  display: flex;
  align-content: center;
  border: {
    left: 1px solid #e6ecf0;
    right: 1px solid #e6ecf0;
  }
  .previous-btn {
    width: 17px;
    height: 14px;
    margin: 20px;
  }
  .title {
    margin-left: 1rem;
    .user-name {
      font-weight: 900;
      font-size: 19px;
    }
    .user-tweet {
      font-weight: 500;
      font-size: 13px;
      color: $secondaryTextColor;
    }
  }
}
</style>
