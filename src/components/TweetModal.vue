<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <form class="modal-container" @submit.stop.prevent="handleSubmit">
        <div class="modal-header">
          <button name="header" @click="$emit('close')">
            <img src="../assets/X.png" alt="" />
          </button>
        </div>
        <div class="modal-body">
          <img :src="currentUser.avatar | emptyImage" alt="" class="avatar" />
          <textarea
            class="tweet"
            name="tweet"
            id=""
            cols="30"
            rows="10"
            placeholder="有什麼新鮮事?"
            v-model="text"
          ></textarea>
        </div>
        <div class="modal-footer">
          <div class="warn" v-show="textToMuch">字數不可超過140字</div>
          <div class="warn__2" v-show="noSpace">內容不可空白</div>
          <button class="modal-default-button" :disabled="isLoading">推文</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import tweetsAPI from "../apis/tweets.js";
// import { Toast } from "./../utils/helper";
// import { Toast2 } from "./../utils/helper";
import { mapState } from "vuex";
import { emptyImageFilter } from "../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  props: {
    show: Boolean,
  },
  data() {
    return {
      text: "",
      isLoading: false,
      textToMuch: false,
      noSpace: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    handleSubmit() {
      this.isLoading = true;
      if (this.text.trim().length > 140) {
        this.isLoading = false;
        this.noSpace = false;
        return (this.textToMuch = true);
      }
      if (this.text.trim().length === 0) {
        this.textToMuch = false;
        this.isLoading = false;
        return (this.noSpace = true);
      }
      const payload = {
        userAvatar: this.currentUser.avatar,
        UserId: this.currentUser.id,
        name: this.currentUser.name,
        account: this.currentUser.account,
        description: this.text,
        replies: [],
        LikesCount: 0,
        createdAt: new Date(),
      };
      console.log("🚀 ~ file: TweetModal.vue:78 ~ handleSubmit ~ payload:", payload);

      this.$emit("after-create-tweet", payload);
      this.textToMuch = false;
      this.noSpace = false;
      this.text = "";
      this.$emit("close");
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.modal-container {
  width: 600px;
  height: 300px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 14px;
}

.modal-header {
  padding: 15px;
  margin-top: 0;
  color: #42b983;
  border-bottom: 1px #e6ecf0 solid;
}

.modal-body {
  padding: 0 10px 0 10px;
  margin: 20px 0;
  display: flex;
  .avatar {
    border-radius: 100%;
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
  .tweet {
    font-size: 25px;
    resize: none;
    width: 510px;
    height: 149px;
    border: none;
  }
  .tweet::-webkit-input-placeholder {
    font-size: 18px;
    font: #9197a3;
  }
}
.modal-footer {
  display: flex;
  justify-content: end;
  .warn {
    margin-right: 10px;
    margin-top: 8px;
    width: 138px;
    height: 15px;
    font-size: 15px;
    color: #fc5a5a;
    font-weight: 500;
  }
  .warn__2 {
    margin-right: 10px;
    margin-top: 8px;
    width: 100px;
    height: 15px;
    font-size: 15px;
    color: #fc5a5a;
    font-weight: 500;
  }
  .modal-default-button {
    margin: 0 15px 20px 0;
    float: right;
    width: 66px;
    height: 38px;
    font-size: 18px;
    color: #ffffff;
    background-color: #ff6600;
    border-radius: 100px;
  }
}
</style>
