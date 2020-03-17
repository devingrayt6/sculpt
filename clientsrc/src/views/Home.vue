<template>
  <div class="home container-fluid">
    <div class="row home-row">
      <video autoplay muted loop id="myVideo">
        <source src="../../public/Boxing-gym.mp4" type="video/mp4" />
      </video>
      <div>
        <button v-if="!$auth.isAuthenticated" @click="login" class="btn btn-secondary">Login</button>
        <button v-else @click="logout" class="btn btn-secondary">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserData } from "@bcwdev/auth0-vue";

export default {
  name: "home",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
      this.$store.dispatch("getProfile");
      this.$router.push({ name: "Dashboard" });
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped>
.home-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(53, 51, 51, 0.596);
}
video {
  z-index: -1;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
}
home {
  max-height: 100vh;
  max-width: 100vw;
}
</style>
