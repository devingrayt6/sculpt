import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    activeWorkout: {},
    workouts: [],
    exercises: [],
    stats: [],
    wod: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setStats(state, stats) {
      state.stats = stats
    },
    setWod(state, day) {
      // state.wod = state.profile.schedule[day]
      console.log(state.profile[day])
    },

  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getStats({ commit }) {
      try {
        let res = await api.get("stats");
        commit('setStats', res.data)
      } catch (error) {
        console.error(error);
      }
    },
  }
});
