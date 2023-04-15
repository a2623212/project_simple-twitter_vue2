<template>
  <div id="login">
    <img class="login-logo" src="../assets/Icon.png" alt="" />
    <h1>登入Alphitter</h1>

    <form class="login-form" @submit.prevent.stop="handleSubmit" novalidate>
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          id="account"
          v-model="account"
          name="account"
          type="text"
          class="form-control"
          autocomplete="username"
          required
          autofocus
          :class="{ invalid: error.account }"
        />
        <div v-if="error.account" class="invalid-message">帳號不得空白！</div>
      </div>
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          autocomplete="new-password"
          required
          :class="{ invalid: error.password }"
        />
        <div v-if="error.password" class="invalid-message">密碼不得空白！</div>
      </div>
      <button class="btnLogin" type="submit" :disabled="isProcessing">登入</button>
      <div class="text-link">
        <router-link to="/register" class="btnRegister">註冊Alphitter</router-link
        ><span class="seperater">・</span
        ><router-link to="/admin" class="btnAdmin">後台登入</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast, Toast2 } from "./../utils/helper";

export default {
  name: "login",
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      error: {
        password: false,
        account: false,
      },
      seedAccound: "12345678",
      seedPassword: "0000",
    };
  },
  methods: {
    handleSubmit() {
      const userAccount = this.account;
      const userPassword = this.password;
      // 等待中登錄btn disable
      this.isProcessing = true;
      // 表單驗證
      if (!userAccount) {
        this.error.account = true;
        this.isProcessing = false;
        return;
      } else {
        this.error.account = false;
      }

      if (!userPassword) {
        this.error.password = true;
        this.isProcessing = false;
        return;
      } else {
        this.error.password = false;
      }

      // Check the account and put in localStorage

      if (userAccount === this.seedAccound && userPassword === this.seedPassword) {
        // put in localStorage
        localStorage.setItem("userAccount", userAccount);
        localStorage.setItem("userPassword", userPassword);
      } else {
        Toast2.fire({
          title: "輸入帳號密碼有誤！",
        });
        this.isProcessing = false;
        return;
      }

      // 成功登入後轉址到餐廳首頁
      Toast.fire({
        title: "登入成功！",
      });
      this.$router.push("/main");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
#login {
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-logo {
  width: 40px;
  height: 40px;
}

h1 {
  margin-top: 25px;
  font-weight: bold;
  color: $mainColor;
  font-size: 23px;
}
.login-form {
  margin-top: 40px;
  position: relative;
}
.form-label-group {
  position: relative;
}
label {
  position: absolute;
  color: $secondaryTextColor;
  font-size: 15px;
  font-weight: 500;
  display: block;
  width: 100%;
  padding-left: 11px;
}
.placeholder {
  position: absolute;
  left: 0.625rem;
  top: 0.313rem;
  color: $secondaryTextColor;
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
}
.invalid {
  border-bottom: 2px solid #fc5a5a;
}
input {
  width: 540px;
  height: 52px;
  border-radius: 4px;
  background-color: $formBgColor;
  margin-bottom: 2em;
  padding: 1.3em 0 0 1em;
  font-size: 19px;
  font-weight: 500;
  border: none;
  border-bottom: 2px solid $secondaryTextColor;
  &:focus,
  &:hover {
    border-bottom: 2px solid #50b5ff;
  }
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
.btnRegister {
  text-decoration-line: underline;
  color: $blue;
}
.btnAdmin {
  text-decoration-line: underline;
  color: $blue;
}

.btnLogin {
  width: 540px;
  height: 50px;
  border-radius: 50px;
  background-color: $orange;
  font-size: 18px;
  font-weight: 700;
  color: $white;
  margin-top: 2em;
  padding: 0.625rem 2.5rem;
  border: none;
  &:disabled {
    opacity: 0.7;
  }
}
.text-link {
  position: absolute;
  bottom: -46px;
  right: 0;
  font-weight: 700;
  color: $blue;
}
</style>
