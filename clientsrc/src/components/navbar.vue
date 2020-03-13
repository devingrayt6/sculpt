<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="logo"></a>
    <router-link class="navbar-brand h2 pl-2" :to="{ name: 'Home' }">SCULPT</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto float-right text-right">
        <li
          data-toggle="collapse"
          data-target="#navbarText"
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link" :to="{ name: 'Profile' }">Profile</router-link>
        </li>
        <li
          data-toggle="collapse"
          data-target="#navbarText"
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Dashboard' }"
        >
          <router-link class="nav-link" :to="{ name: 'Dashboard' }">Dashboard</router-link>
        </li>
        <li
          data-toggle="collapse"
          data-target="#navbarText"
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'MyWorkouts' }"
        >
          <router-link class="nav-link" :to="{ name: 'MyWorkouts' }">My Workouts</router-link>
        </li>
        <li
          data-toggle="collapse"
          data-target="#navbarText"
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'CurrentWorkout' }"
        >
          <router-link class="nav-link" :to="{ name: 'CurrentWorkout' }">Current Workout</router-link>
        </li>
        <li
          data-toggle="collapse"
          data-target="#navbarText"
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Stats' }"
        >
          <router-link class="nav-link" :to="{ name: 'Stats' }">Stats</router-link>
        </li>
        <li
          data-toggle="collapse"
          data-target="#navbarText"
          class="nav-item text-white"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >Login</li>
        <li
          data-toggle="collapse"
          data-target="#navbarText"
          class="nav-item text-white"
          @click="logout"
          v-else
        >Logout</li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
      this.$store.dispatch("getProfile");
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    }
  }
};
</script>

<style scoped>
li {
  cursor: pointer;
}
nav {
  position: sticky;
}
</style>
