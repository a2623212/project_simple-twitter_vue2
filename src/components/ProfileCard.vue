<template>
  <div>
    <main class="main">
      <div class="cover">
        <img :src="user.cover | emptyImage" alt="cover" class="cover__picture" />
      </div>
      <div class="user-avatar">
        <img :src="user.userAvatar | emptyImage" alt="avatar" class="user-avatar__picture" />
      </div>
      <div class="user-edit">
        <button
          class="user-edit__btn"
          v-if="user.userId === currentUser.id"
          id="show-modal"
          @click="showModal = true"
        >
          編輯個人資料
        </button>
        <div class="user-edit__followCtrl" v-else>
          <img
            src="./../assets/btn_messege.png"
            alt="avatar"
            class="user-edit__followCtrl__message"
          />
          <img
            src="./../assets/btn_noti_or.png"
            alt="avatar"
            class="user-edit__followCtrl__noti"
            v-if="isNotified"
            @click.stop.prevent="unNotified"
          />
          <img
            src="./../assets/btn_noti.png"
            alt="avatar"
            class="user-edit__followCtrl__noti"
            v-else
            @click.stop.prevent="onNotified"
          />
          <button
            class="user-edit__followCtrl__btn"
            @click.stop.prevent="deleteFollowship(user.id)"
            v-if="isFollowing"
          >
            正在跟隨
          </button>
          <button
            class="user-edit__followCtrl__btn1"
            @click.stop.prevent="addFollowship(user.id)"
            v-else
          >
            跟隨
          </button>
        </div>
        <ProfileEditModal
          :show="showModal"
          @close="showModal = false"
          :initial-user="user"
          :is-processing="isProcessing"
          @after-submit="handleAfterSubmit"
          @after-cancel-cover="handleCancelCover"
        />
      </div>
      <div class="user-info">
        <p class="user-info__name">{{ user.name }}</p>
        <p class="user-info__account">@{{ user.account }}</p>
        <div class="user-description">
          <p>
            {{ user.introduction }}
          </p>
        </div>
        <div class="user-network">
          <router-link
            :to="{
              name: 'user-followings',
              params: { id: this.$route.params.id },
            }"
          >
            <p>
              <span>{{ user.followingsLength }}個</span>跟隨中
            </p>
          </router-link>
          <router-link
            :to="{
              name: 'user-followers',
              params: { id: this.$route.params.id },
            }"
          >
            <p>
              <span>{{ user.followersLength }}位</span>跟隨者
            </p>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ProfileEditModal from "./ProfileEditModal.vue";
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helper";
import { Toast2 } from "./../utils/helper";

import { mapState } from "vuex";

export default {
  name: "ProfileCard",
  mixins: [emptyImageFilter],
  components: {
    ProfileEditModal,
  },
  props: {
    user: {
      type: Object,
      require: true,
    },
    followers: {
      type: Array,
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    isFollowing() {
      let follower = this.followers.filter((follower) => {
        return follower.followerId === this.currentUser.id;
      });

      if (follower.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      showModal: false,
      isProcessing: false,
      isNotified: false,
    };
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.update({
          userId: this.user.id,
          formData,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          title: "成功更新使用者資料",
        });
        this.showModal = false;
        this.$emit("after-update", formData);
      } catch (error) {
        this.isProcessing = false;
        console.log("error", error);
        Toast2.fire({
          title: "無法更新個人資料，請稍後再試",
        });
      }
    },
    deleteFollowship(userId) {
      this.$emit("after-del-followship", userId);
    },
    addFollowship(userId) {
      this.$emit("after-add-followship", userId);
    },
    handleCancelCover() {
      this.$emit("after-cancel-cover");
    },
    unNotified() {
      this.isNotified = false;
    },
    onNotified() {
      this.isNotified = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
.main {
  width: 100%;
  position: relative;
  border: {
    left: 1px solid #e6ecf0;
    right: 1px solid #e6ecf0;
  }
  .cover {
    width: 100%;
    height: 200px;
  }
  .user-avatar {
    width: 140px;
    height: 140px;
    position: absolute;
    top: 124px;
    left: 14px;
    &__picture {
      border: 4px solid $white;
      border-radius: 50%;
    }
  }
  .user-edit {
    position: absolute;
    top: 220px;
    right: 15px;
    &__btn {
      width: 120px;
      height: 35px;
      border-radius: 100px;
      border: 1px solid $orange;
      color: $orange;
      font-size: 15px;
      font-weight: 700;
    }
    &__followCtrl {
      display: flex;
      img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }
      &__btn {
        width: 90px;
        height: 35px;
        border-radius: 100px;
        background-color: $orange;
        font: {
          weight: 700;
          size: 15px;
        }
        color: $white;
      }
      &__btn1 {
        width: 60px;
        height: 35px;
        border: 1px solid $orange;
        border-radius: 100px;
        color: $orange;
        font-size: 15px;
        font-weight: 700;
      }
    }
  }

  .user-info {
    margin: {
      top: 69px;
      left: 15px;
    }
    &__name {
      font: {
        size: 19px;
        weight: 900;
      }
    }
    &__account {
      color: $secondaryTextColor;
      font: {
        size: 15px;
        weight: 500;
      }
    }
    .user-description {
      margin-top: 10px;
      color: $black;
      font-size: 14px;
      word-break: break-all;
    }
    .user-network {
      margin-top: 10px;
      display: flex;
      font-size: 14px;
      p {
        margin-right: 1rem;
        color: $secondaryTextColor;
        span {
          color: $black;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
