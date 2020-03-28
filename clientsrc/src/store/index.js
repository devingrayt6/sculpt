import Vue from "vue";
import Vuex, { Store } from "vuex";
import Axios from "axios";
import router from "../router";
import { STATES } from "mongoose";

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
    stats: {},
    activeStat: {},
    wod: {},
    activeDay: "",
    schedule: {},
  },
  mutations: {
    setActiveStat(state, statObj) {
      state.activeStat = state.stats[statObj]
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
    setStats(state, stats) {
      state.stats = stats
    },
    setWod(state, day) {
      state.wod = state.profile.schedule[day]
    },
    setActiveDay(state, day) {
      state.activeDay = day
    },
    setWorkouts(state, workouts) {
      state.workouts = workouts
    },
    updateSchedule(state, { res, day }) {
      state.schedule[day] = res.data
    },
    setSchedule(state, { workout, day }) {
      Vue.set(state.schedule, day, workout)
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
    deleteWorkout(state, workoutId) {
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
      let exercises = state.activeWorkout.exerciseData.filter(e => e._id != data.exerciseId)
      state.activeWorkout.exerciseData = exercises
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
        commit("setStats", res.data.stats)
      } catch (error) {
        console.error(error);
      }
    },

    setActiveStat({ commit }, statObj) {
      commit("setActiveStat", statObj)
    },
    async getStats({ commit }) {
      try {
        let res = await api.get("stats")
        if(res.data.length == 0){
          let stats = {
            "bench": 0,
            "deadLift": 0,
            "pullUp": 0,
            "squat": 0,
            "sitUp": 0,
            "pushUp": 0,
            "time": 0
          }
          await api.post("stats", stats)
          let newStats = await api.get("stats")
          commit("setStats", newStats.data)
        }
        commit("setStats", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async saveStats({ commit }, completedStats) {
      try {
        let stats = await api.get("stats")
        commit("setStats", stats.data)
        let res = await api.put(`stats/${stats.data._id}`, completedStats)
        commit("setStats", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    getWorkoutOfDay({ commit }, day) {
      if (this.state.workouts.length == 0) {
        commit("setActiveWorkout", {})
        return "no workouts"
      } else {
        let workout = this.state.workouts.find(w => w.day.find(d => d === day))
        if (workout == undefined) {
          commit('setActiveWorkout', {})
        } else {
          commit("setActiveWorkout", workout)
        }
      }
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

    async buildSchedule({ commit, dispatch }) {
      try {
        let res = await api.get("workouts")
        let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        for (let i = 0; i < days.length; i++) {
          let day = days[i]
          let workout = res.data.find(w => w.day.find(d => d == day))
          if (workout) {
            commit("setSchedule", { workout, day })
          } else {
            commit('setWorkouts', res.data)
          }
        }
        dispatch("getWorkoutOfDay", this.state.activeDay)
      } catch (error) {
        console.error(error)
      }
    },

    async updateSchedule({ commit }, update) {
      try {
        let day = this.state.activeDay
        let workout = update
        let res = await api.put(`workouts/${workout.id}/addDay`, { "day": day })
        commit('updateSchedule', { res, day })
        commit('setActiveWorkout', res.data)
      } catch (error) {
        console.error(error)
      }
    },

    setActiveDay({ commit, dispatch }, day) {
      commit('setActiveDay', day)
      dispatch('getWorkoutOfDay', day)
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
        let res = await api.get(`workouts/${workout.id}`)
        commit('setActiveWorkout', res.data)
      } catch (error) {
        console.error(error);

      }
    },

    resetActiveWorkout({ commit }, workout) {
      commit('setActiveWorkout', workout)
    },

    async deleteWorkout({ commit }, workoutId) {
      try {
        let res = await api.delete(`workouts/${workoutId}`)
        commit('deleteWorkout', workoutId)
        let newWorkout = {}
        commit('setActiveWorkout', newWorkout)
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
        console.error(error)
      }
    },
    async editExercise({ commit }, data) {                     
      try {
        let res = await api.put(`exercises/${data.exerciseId}`, data.update)
      } catch (error) {
        console.error(error)
      }
    },

    async editWorkoutExercise({ commit }, data) {
      try {
        let res = await api.put(`workouts/${data.workoutId}/editExercise`, data)
      } catch (error) {
        console.error(error)
      }
    },
    async editWorkout({ commit }, data) {
      try {
        let res = await api.put(`workouts/${data.workoutId}`, data.update)
        commit('setActiveWorkout', res.data)
      } catch (error) {
        console.error(error)
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

    async deleteExerciseFromWorkout({ commit }, info) {
      try {
        let res = await api.delete(`workouts/${info.workoutId}/exercise/${info.exerciseId}`)
        commit('deleteExerciseFromWorkout', info)
      } catch (error) {
        console.error(error);
      }
    }
  }
});
