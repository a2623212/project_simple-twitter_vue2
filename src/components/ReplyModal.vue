<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <form class="modal-container">
        <div class="modal-header">
          <button name="header" @click="$emit('close')">
            <img src="../assets/X.png" alt="" />
          </button>
        </div>
        <div class="reply-container">
          <div class="avatar">
            <img :src="post.userAvatar | emptyImage" alt="" class="avatar__pic" />
            <div class="divider">
              <div class="divider__a"></div>
              <div class="divider__b"></div>
            </div>
          </div>
          <div class="tweet-content">
            <div class="title">
              <router-link to="" class="title__name">{{ post.name }}</router-link>
              <router-link to="" class="title__id">@{{ post.account }}</router-link>
              <router-link to="" class="title__formNow"
                >．{{ post.createdAt | fromNow }}</router-link
              >
            </div>
            <p class="description">
              {{ post.description }}
            </p>
            <div class="hashtag">
              <router-link to="" class="hashtag__reply">回覆</router-link>
              <router-link to="" class="hashtag__userid">@{{ post.account }}</router-link>
            </div>
          </div>
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
          <button
            class="modal-default-button"
            @click.stop.prevent="handleSubmit"
            :disabled="isLoading"
          >
            回覆
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Toast from "./../utils/helper";
import moment from "moment";
moment.locale("zh-tw");
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";

export default {
  mixins: [emptyImageFilter],
  props: {
    show: Boolean,
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  data() {
    return {
      text: "",
      isLoading: false,
      textToMuch: false,
      noSpace: false,
    };
  },
  filters: {
    fromNow(dateTime) {
      return dateTime ? moment(dateTime).fromNow() : "-";
    },
  },
  methods: {
    handleSubmit: function () {
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
      this.textToMuch = false;
      this.noSpace = false;
      this.isLoading = false;

      console.log(this.text);

      this.$emit("after-create-reply-modal", {
        tweetId: this.post.tweetId,
        comment: this.text,
      });

      this.$emit("close");
      Toast.fire({
        title: "回覆成功",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.swal2-container.swal2-top-end > .swal2-popup {
  display: flex !important;
  flex-direction: row-reverse !important;
  justify-content: space-between !important;
}
.reply-container {
  padding: 15px;
  padding-bottom: 0;
  display: flex;
  .avatar {
    position: relative;
    height: 50px;
    width: 50px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 100%;
    &__pic {
      border-radius: 100%;
      height: 50px;
      width: 50px;
    }
    .divider {
      display: flex;
      margin-top: 5px;
      &__a {
        z-index: 3;
        position: absolute;
        width: 25px;
        height: 5em;
        // max-height: 6em;
        border-right: 2px #ccd6dd solid;
      }
      // &__b {
      //   width: 25px;
      //   height: 100%;
      // }
    }
  }
  .tweet-content {
    display: flex;
    flex-direction: column;
    .description {
      word-break: break-all;
      width: 500px;
      margin-top: 5px;
      font-size: 15px;
    }
    .title {
      font-size: 15px;
      display: flex;
      &__name {
        color: #1c1c1c;
        margin-right: 5px;
        font-weight: bold;
      }
      &__id,
      &__formNow {
        color: #657786;
        font-weight: 500;
      }
    }
    .hashtag {
      font-size: 15px;
      margin: 10px 0 5px 0;
      &__reply {
        color: #657786;
      }
      &__userid {
        color: #ff6600;
      }
    }
  }
}
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // Ally: bgc 修正透明度，原本0.4 在user頁面會呈現全黑，現在調成0.1
  background-color: rgba(0, 0, 0, 0.4);
  display: table;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.modal-container {
  width: 600px;
  min-height: 300px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 14px;
}

.modal-header {
  display: flex;
  padding: 15px;
  margin-top: 0;
  color: #42b983;
  border-bottom: 1px #e6ecf0 solid;
}
.modal-body {
  z-index: 999;
  padding: 0 10px 0 10px;
  margin: 20px 0;
  display: flex;
  .avatar {
    z-index: 999;
    height: 50px;
    width: 50px;
    margin-right: 10px;
    display: flex;
    border-radius: 100%;
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
