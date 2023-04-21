<template>
  <div id="setting" class="container">
    <div class="navbar">
      <Navbar :current-status="currentStatus" />
    </div>
    <div class="setting-account">
      <div class="title">
        <h1>Settings</h1>
      </div>
      <!--       form block -->
      <form class="setting-form" @submit.stop.prevent="submitForm()" novalidate>
        <div class="form-label-group">
          <label for="account">Account</label>
          <input
            id="account"
            v-model="account"
            type="text"
            class="form-control"
            required
            :class="{ invalid: error.account }"
          />
          <div v-show="error.account" class="invalid-message">Please enter your account.</div>
        </div>
        <div class="form-label-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-control"
            required
            :class="{ invalid: error.name }"
          />
          <div v-show="error.name" class="invalid-message">Please enter your name.</div>
        </div>
        <div class="form-label-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="text"
            class="form-control"
            required
            :class="{ invalid: error.email.length || error.email.style }"
          />
          <div v-show="error.email.length" class="invalid-message">Please enter your email.</div>
          <div v-show="error.email.style" class="invalid-message">
            Please include an '@' in the email address.
          </div>
        </div>
        <div class="form-label-group">
          <label for="password">Enter Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-control"
            required
            :class="{ invalid: error.password }"
          />
          <div v-show="error.password" class="invalid-message">Please enter your password.</div>
        </div>
        <div class="form-label-group">
          <label for="password-check">Confirm Password</label>
          <input
            id="password-check"
            v-model="checkPassword"
            type="password"
            class="form-control"
            required
            :class="{ invalid: error.checkPassword }"
          />
          <div v-show="error.checkPassword" class="invalid-message">Passwords are not same.</div>
        </div>
        <div class="setting-block">
          <button class="btn" type="submit" :disabled="isProcessing">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
// import settingAPI from "./../apis/setting";
// import { Toast } from "./../utils/helper";
// import { Toast2 } from "./../utils/helper";
import { mapState } from "vuex";

export default {
  name: "setting",
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      isProcessing: false,
      currentStatus: {
        isIndex: false,
        isUser: false,
        isSetting: true,
      },
      error: {
        account: false,
        name: false,
        email: {
          length: false,
          style: false,
        },
        password: false,
        checkPassword: false,
      },
    };
  },
  methods: {
    // async formSubmit() {
    //   if (this.validiation()) {
    //     return;
    //   }
    //   try {
    //     const formData = {
    //       account: this.account ? this.account : this.currentUser.account,
    //       name: this.name ? this.name : this.currentUser.name,
    //       email: this.email ? this.email : this.currentUser.email,
    //       password: this.password,
    //       checkPassword: this.checkPassword,
    //     };
    //     this.isProcessing = true;

    //     const { data } = await settingAPI.setUser({
    //       userId: this.currentUser.id,
    //       formData,
    //     });
    //     this.isProcessing = false;
    //     //表單驗證，根據後端回傳的資料做不同的驗證
    //     if (data.message === "Error: email 已重複註冊！") {
    //       Toast2.fire({
    //         title: "Email已重覆註冊",
    //       });
    //       return;
    //     }
    //     if (data.message === "Error: account 已重複註冊！") {
    //       Toast2.fire({
    //         title: "帳號已重覆註冊",
    //       });
    //       return;
    //     }
    //     if (data.message === "Error: Passwords do not match!") {
    //       Toast2.fire({
    //         title: "密碼不一致，請再試一次",
    //       });
    //       return;
    //     }
    //     Toast.fire({
    //       title: "成功更新帳戶資料！",
    //     });
    //   } catch (error) {
    //     this.isProcessing = false;
    //     console.log("error", error);
    //     Toast2.fire({
    //       title: "無法設定帳戶資料，請稍後再試",
    //     });
    //   }
    // },

    submitForm() {
      // validation

      // account
      if (this.account.trim().length === 0) {
        this.error.account = true;
        this.account = "";
      }
      // name
      if (this.name.trim().length === 0) {
        this.error.name = true;
        this.name = "";
      }
      // email.length
      if (this.email.trim().length === 0) {
        this.error.email.length = true;
        this.email = "";
      } else {
        // email.style
        if (!this.email.includes("@")) {
          this.error.email.style = true;
          this.email = "";
        }
      }

      // password
      if (this.password.trim() === "") {
        this.error.password = true;
        this.password = "";
      }
      // checkPassword
      if (this.checkPassword.trim() === "" || this.password !== this.checkPassword) {
        this.error.checkPassword = true;
        this.checkPassword = "";
      }
      // clear
    },

    resetErrorMessage() {
      this.error.account = false;
      this.error.name = false;
      this.error.email.length = false;
      this.error.email.style = false;
      this.error.password = false;
      this.error.checkPassword = false;
    },

    // Current Users
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
#setting {
  display: grid;
  grid-template-columns: 210px auto;
  column-gap: 30px;
}

.title {
  border-bottom: 1px solid $borderColor;
  height: 55px;
  line-height: 55px;
}

h1 {
  color: $mainColor;
  font-size: 19px;
  padding-left: 1rem;
}

.setting-account {
  border-left: 1px solid $borderColor;
}

.setting-form {
  padding: 1.875rem 25.3125rem 0 1rem;
  margin-bottom: 40rem;
  position: relative;
}
.form-label-group {
  position: relative;
  label {
    position: absolute;
    left: 0.625rem;
    top: 0.313rem;
    color: $secondaryTextColor;
    font-size: 15px;
    font-weight: 500;
    line-height: 15px;
  }
  input {
    width: 642px;
    height: 52px;
    border-radius: 4px;
    background-color: $formBgColor;
    padding: 1.25rem 0 0.25rem 0.625rem;
    margin-bottom: 1.875rem;
    color: $mainColor;
    font-size: 19px;
    font-weight: 500;
    border: none;
    border-bottom: 2px solid $secondaryTextColor;
    &:focus,
    &:hover {
      border-bottom: 2px solid #50b5ff;
    }
    .invalid-message {
      position: absolute;
      top: 50px;
      left: 2px;
      font: {
        weight: 500;
        size: 15px;
      }
      color: #fc5a5a;
    }
  }
  .invalid {
    border-bottom: 2px solid #fc5a5a;
  }
}
.setting-block {
  width: 642px;
  position: relative;
}
.btn {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50px;
  background-color: $orange;
  font-size: 18px;
  font-weight: 700;
  color: $white;
  margin-top: 0.625rem;
  padding: 0.625rem 2.5rem;
  border: none;
  &:disabled {
    opacity: 0.7;
  }
}

.invalid-message {
  position: absolute;
  top: 3rem;
  color: #fc5a5a;
  font-size: 12px;
  font-weight: 500;
}
</style>
