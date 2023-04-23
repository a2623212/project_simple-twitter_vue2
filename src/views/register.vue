<template>
  <div class="container">
    <div class="logo">
      <img src="../assets/Icon.png" alt="" />
    </div>
    <div class="title">
      <h1>Register</h1>
    </div>
    <registerForm :isRegister="isRegister"></registerForm>
  </div>
</template>

<script>
import registerForm from "../components/registerForm.vue";
export default {
  name: "register",
  components: { registerForm },
  data() {
    return {
      isRegister: true,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../styles/variables.scss";
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-top: 25px;
  h1 {
    font-weight: 700;
    font-size: 23px;
  }
}
.logo {
  margin-top: 60px;
}
.logo img {
  width: 50px;
  height: 50px;
}
</style>
