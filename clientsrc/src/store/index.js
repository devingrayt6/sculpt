import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";
import { STATES } from "mongoose";
import Exercise from "../../../server/models/Exercises";

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
    activeWorkout: { exercises: [] },
    workouts: [],
    exercises: [],
    stats: [],
    activeStat: {},
    wod: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setStats(state, stats) {
      state.stats = stats
    },
    setActiveStat(state, statObj) {
      let activeStat = state.stats[statObj].filter(el => el.stats != statObj)
      state.activeStat = activeStat
    },
    setWod(state, day) {
      state.wod = state.profile.schedule[day]
    },
    setWorkouts(state, workouts) {
      state.workouts = workouts
    },
    updateSchedule(state, data) {
      state.profile.schedule = data.schedule
    },

    setActiveWorkout(state, workout) {
      state.activeWorkout = workout
    },

    setExercises(state, exercises) {
      state.exercises = exercises
    },
    createWorkout(state, workout) {
      state.workouts.push(workout);
    },
    deleteWorkouts(state, workoutId) {
      state.workouts = state.workouts.filter(w => w._id != workoutId)
    },
    createExercise(state, exercise) {
      state.exercises.push(exercise);
    },
    deleteExercise(state, exerciseId) {
      state.exercises = state.exercises.filter(e => e._id != exerciseId)
    },
    addExerciseToWorkout(state, data) {
      state.activeWorkout.exerciseData.push(data)
    },
    deleteExerciseFromWorkout(state, data) {
      let exercise = state.activeWorkout.exerciseData.find(e => e._id = data.id)
      state.activeWorkout.exerciseData = state.activeWorkout.exercisesData.filter(e => e != exercise)
    }
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
        let res = await api.get("profile");
        commit('setStats', res.data.stats)
      } catch (error) {
        console.error(error);
      }
    },
    setActiveStat({ commit }, statObj) {
      commit("setActiveStat", statObj)
    },

    async getWorkouts({ commit }) {
      try {
        let res = await api.get("workouts")
        commit('setWorkouts', res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async setDayWorkout({ commit }, data) {
      let update = {
        schedule: data.schedule
      }
      try {
        let res = await api.put(`profile/${data.profileId}`, update)
        commit('updateSchedule', res.data)

      } catch (error) {
        console.error(error);

      }
    },

    async createWorkout({ commit }, workout) {
      try {
        let res = await api.post('workouts', workout);
        commit('createWorkout', res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async setActiveWorkout({ commit }, workout) {
      try {
        commit('setActiveWorkout', workout)
      } catch (error) {
        console.error(error);

      }
    },

    async deleteWorkout({ commit }, workoutId) {
      try {
        let res = await api.delete(`workouts/${workoutId}`)
        commit('deleteWorkout', workoutId)
      } catch (error) {
        console.error(error);
      }
    },

    async getExercises({ commit }) {
      try {
        let res = await api.get('exercises')
        commit('setExercises', res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async createExercise({ commit, dispatch }, exercise) {
      try {
        let res = await api.post('exercises', exercise);
        commit('createExercise', exercise);
        dispatch('getExercises')
      } catch (error) {
        console.error(error)
      }
    },

    async deleteExercise({ commit }, exerciseId) {
      try {
        let res = await api.delete(`exercises/${exerciseId}`)
        commit('deleteExercise', exerciseId)
      } catch (error) {

      }
    },

    async addExerciseToWorkout({ commit }, data) {
      try {
        let res = await api.post(`workouts/${data.workoutId}/exercise`, data.body)
        commit('addExerciseToWorkout', data.body)
      } catch (error) {
        console.error(error)
      }
    },

    async deleteExerciseFromWorkout({ commit }, data) {
      try {
        let res = await api.delete(`workouts/${data.workoutId}/exercise`, data.body)
        commit('deleteExerciseFromWorkout', data.body)
      } catch (error) {
        console.error(error);
      }
    }
  }
});
