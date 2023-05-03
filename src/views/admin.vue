<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="admin">
    <img class="admin-logo" src="../assets/Logo.png" alt="" />
    <h1>後台登入</h1>

    <form class="admin-form" @submit.prevent.stop="handleSubmit" novalidate>
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          id="account"
          v-model="account"
          name="account"
          type="text"
          class="form-control"
          autocomplete="username"
          placeholder="帳號"
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
          placeholder="密碼"
          required
          :class="{ invalid: error.password }"
        />
        <div v-if="error.password" class="invalid-message">密碼不得空白！</div>
      </div>

      <button class="btnLogin" type="submit" :disabled="isProcessing">登入</button>

      <div class="text-link">
        <router-link to="/login" class="btnFontLogin">前台登入</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorization from "./../apis/authorization";
import { Toast, Toast2 } from "./../utils/helper";
export default {
  name: "admin",
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      error: {
        password: false,
        account: false,
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true;
        if (!this.account) {
          this.error.account = true;
          this.password = "";
          this.isProcessing = false;
          return;
        }
        if (!this.password) {
          this.error.password = true;
          this.isProcessing = false;
          return;
        }

        const response = await authorization.adminLogin({
          account: this.account,
          password: this.password,
        });
        console.log("🚀 ~ file: admin.vue:86 ~ handleSubmit ~ response:", response);

        if (response.status !== 201) {
          throw new Error("請確認您輸入的帳號密碼");
        }

        Toast.fire({
          title: "Welcome!",
        });

        // localStorage.setItem("token", data.token);
        this.$router.push("/admin/main");
      } catch (error) {
        Toast2.fire({
          title: "請確認您輸入的帳號密碼",
        });
        this.isProcessing = false;
        console.log("error", error);
      }
    },
  },
  watch: {
    password() {
      if (this.password) {
        this.error.password = false;
      }
    },
    account() {
      if (this.account) {
        this.error.account = false;
      }
    },
  },
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="scss" scoped>
@import "./../styles/variables.scss";
#admin {
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.admin-logo {
  width: 40px;
  height: 40px;
}
h1 {
  margin-top: 25px;
  font-weight: bold;
  color: $mainColor;
  font-size: 23px;
}
.admin-form {
  position: relative;
}
.form-label-group {
  position: relative;
  width: 540px;
}
label {
  display: none;
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
  margin-top: 2em;
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
  left: 2px;
  font: {
    weight: 500;
    size: 15px;
  }
  color: #fc5a5a;
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

.btnFontLogin {
  text-decoration-line: underline;
  color: $blue;
}
.text-link {
  position: absolute;
  bottom: -46px;
  right: 0;
  font-weight: 700;
  color: $blue;
}
</style>
