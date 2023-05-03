<template>
  <div class="container">
    <Navbar :current-status="currentStatus" :current-user="currentUser" />
    <div>
      <a @click="$router.go(-1)" class="previous-page">
        <img src="./../assets/arrow.png" alt="" />
        <h4>推文</h4>
      </a>
      <Post :initial-tweet="reply" @after-create-reply-modal="afterCreateReplyModal" />
      <ReplyList
        :name="reply.name"
        :reply="item"
        v-for="item in reply.replies"
        :key="item.replyId"
      />
    </div>
    <Popular />
  </div>
</template>

<script>
import Post from "../components/post.vue";
import ReplyList from "../components/replyList.vue";
import Navbar from "../components/Navbar.vue";
import Popular from "../components/PopularUsers.vue";
import tweetAPI from "./../apis/tweets.js";
import { Toast2 } from "./../utils/helper";
import { mapState } from "vuex";

export default {
  components: {
    Post,
    ReplyList,
    Navbar,
    Popular,
  },
  data() {
    return {
      reply: {},
      currentStatus: {
        isIndex: true,
        isUser: false,
        isSetting: false,
      },
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const tweetId = this.$route.params.id;
    this.fetchReply(tweetId);
  },
  methods: {
    async fetchReply(tweetId) {
      try {
        const { data } = await tweetAPI.getTweet({ tweetId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.reply = data;

        // check the data
        const result = this.reply;
        console.log("🚀 ~ file: reply.vue:63 ~ fetchReply ~ result:", result);
      } catch (error) {
        Toast2.fire({
          title: "目前無法取得貼文資訊",
        });
      }
    },
    async afterCreateReplyModal(payload) {
      const { tweetId, comment } = payload;
      this.reply.Replies.unshift({
        UserId: this.currentUser.id,
        comment,
        createdAt: new Date(),
        tweetId,
        name: this.currentUser.name,
        account: this.currentUser.account,
        avatar: this.currentUser.avatar,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: 600px;
  .previous-page {
    border-left: 1px #e6ecf0 solid;
    border-right: 1px #e6ecf0 solid;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    img {
      width: 17px;
      height: 14px;
      margin-right: 2.5rem;
    }
    h4 {
      margin-right: 5rem;
      font-size: 18px;
    }
  }
}
</style>
