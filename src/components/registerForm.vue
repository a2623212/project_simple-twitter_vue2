<template>
  <form @submit.prevent.stop="handleSubmit()" novalidate>
    <div class="row">
      <label for="account">account</label>
      <input
        id="account"
        name="account"
        type="text"
        v-model="form.account"
        required
        maxlength="50"
        :class="{ error: error.account }"
      />
      <div class="note" v-if="error.account">Please enter your account!</div>
    </div>

    <div class="row">
      <label for="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        v-model="form.name"
        required
        :class="{ error: error.name || error.length }"
      />
      <div class="note" v-if="error.name">Please enter your name!</div>

      <div class="note" v-if="error.length">名稱長度不得大於 50 字元</div>
    </div>

    <div class="row">
      <label for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        v-model="form.email"
        maxlength="50"
        required
        :class="{ error: error.email }"
      />
      <div class="note" v-if="error.email">Please enter your Email!</div>
    </div>

    <div class="row">
      <label for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        v-model="form.password"
        required
        maxLength="12"
        :class="{ error: error.password }"
      />
      <div class="note" v-if="error.password">Please enter your Password</div>
    </div>
    <div class="row">
      <label for="passwordCheck">Confirm Password</label>
      <input
        id="passwordCheck"
        name="passwordCheck"
        type="password"
        v-model="form.checkPassword"
        required
        :class="{ error: error.checkPassword }"
      />
      <div class="note" v-if="error.checkPassword">Passwords are not same.</div>
    </div>

    <template v-if="isRegister">
      <div class="row mt-4">
        <button class="btn submit" type="submit" :disabled="isProcessing">
          {{ isProcessing ? "Applying.." : "Apply" }}
        </button>
      </div>
      <div class="row">
        <router-link to="/login">
          <button class="btn cancel">Cancel</button>
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <button v-if="!isSaved" class="btn update" type="submit" :disabled="isProcessing">
          {{ isProcessing ? "儲存中.." : "儲存" }}
        </button>
        <button v-else class="btn update" disabled>已儲存</button>
      </div>
    </template>
  </form>
</template>
<script>
import { Toast, Toast2 } from "../utils/helper";

export default {
  name: "registerForm",
  props: {
    isRegister: {
      // if signUp => signUp => API POST: /users
      // if not signUp => accountEdit => API PUT: /users/:id
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      form: {
        name: "",
        account: "",
        email: "",
        password: "",
        checkPassword: "",
      },
      isProcessing: false,
      error: {
        account: false,
        length: false,
        name: false,
        email: false,
        password: false,
        checkPassword: false,
      },
    };
  },
  methods: {
    handleSubmit() {
      if (!this.formDataCheck()) {
        this.isProcessing = false;
        return;
      }
      this.handleSignUpSubmit();
    },

    formDataCheck() {
      this.isProcessing = true;

      if (!this.form.account) {
        this.error.account = true;
        return false;
      }
      this.error.account = false;
      if (!this.form.name) {
        this.error.name = true;
        return false;
      }
      this.error.name = false;
      if (!this.form.email) {
        this.error.email = true;
        return false;
      }
      this.error.email = false;
      if (this.form.email.trim().indexOf("@") === -1) {
        Toast2.fire({
          title: "Please check your email！",
        });
        return false;
      }

      if (!this.form.password) {
        this.error.password = true;
        return false;
      }
      this.error.password = false;
      if (this.form.password.length > 12 || this.form.password.length < 4) {
        Toast2.fire({
          title: "密碼長度不得小於 4 或超過 12！",
        });
        return false;
      }

      if (this.form.password !== this.form.checkPassword) {
        this.error.checkPassword = true;
        return false;
      }
      this.error.checkPassword = false;
      console.log("Data check passed");
      return true;
    },
    handleSignUpSubmit() {
      Toast.fire({
        title: "Sign up Successful!",
      });
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/variables.scss";
form {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 540px;
}
.row {
  width: 540px;
  margin: 10px 0;
  position: relative;
  & .error {
    border-bottom: 2px solid #fc5a5a;

    &:focus,
    &:hover {
      border-bottom: 2px solid #fc5a5a;
    }
  }
}
.row label {
  position: absolute;
  padding-left: 11px;
  color: $secondaryTextColor;
  font-size: 15px;
  font-weight: 500;
  display: block;
  width: 100%;
}
.row input {
  width: 540px;
  height: 52px;
  border-radius: 4px;
  background-color: $formBgColor;
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
.note {
  font-size: 15px;
  color: $orange;
  color: #fc5a5a;
}

.btn {
  width: 540px;
  border-radius: 50px;
  height: 50px;
}
button.submit,
button.update {
  background-color: $orange;
  color: $white;
  font-size: 18px;
  font-weight: 700;
}
button.cancel {
  color: $blue;
  text-decoration: underline;
  font-size: 18px;
  font-weight: 700;
}
.row:last-child {
  position: relative;
  height: 50px;
}
button.update {
  position: absolute;
  right: 0;
  width: 122px;
  font-size: 18px;
}
</style>
