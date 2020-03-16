<template>
  <div class="container-fluid" v-if="profile">
    <div>
      <h3 class="text-center my-3">{{dayOfWeek}} {{todaysDate}}</h3>
    </div>
    <div class="row">
      <div class="offset-1 col-10 offset-1">
        <div class="current-wod text-center">
          <router-link
            to="/currentworkout"
            v-if="selectedDay==dayOfWeek"
            @click="setActiveWorkout(this.$store.state.profile.schedule[this.selectedDay])"
          >
            <todays-workout :workoutData="getWod" class="today-workout" />
          </router-link>
          <router-link
            @click="setActiveWorkout(this.$store.state.profile.schedule[this.selectedDay])"
            to="/myworkouts"
            v-else
          >
            <todays-workout :workoutData="getWod" class="today-workout" />
          </router-link>
          <button
            class="btn btn-success change-workout text-center"
            v-if="this.$store.state.profile.schedule[selectedDay]"
            @click="editWod"
          >change workout</button>
        </div>
      </div>
    </div>

    <div class="calendar" id="calendar">
      <div class="text-center">
        <p @click="setWod('Sunday')">Sun</p>
      </div>
      <div class="text-center">
        <p @click="setWod('Monday')">Mon</p>
      </div>
      <div class="text-center">
        <p @click="setWod('Tuesday')">Tue</p>
      </div>
      <div class="text-center">
        <p @click="setWod('Wednesday')">Wed</p>
      </div>
      <div class="text-center">
        <p @click="setWod('Thursday')">Thu</p>
      </div>
      <div class="text-center">
        <p @click="setWod('Friday')">Fri</p>
      </div>
      <div class="text-center">
        <p @click="setWod('Saturday')">Sat</p>
      </div>
    </div>

    <div class="icons" id="icons">
      <div class="text-center" v-if="this.$store.state.profile.schedule[`Sunday`]">
        <i class="fas fa-dumbbell" @click="setWod('Sunday')"></i>
      </div>
      <div class="text-center" v-else>
        <i class="fas fa-bed" @click="setWod('Sunday')"></i>
      </div>
      <div class="text-center" v-if="this.$store.state.profile.schedule[`Monday`]">
        <i class="fas fa-dumbbell" @click="setWod('Monday')"></i>
      </div>
      <div class="text-center" v-else>
        <i class="fas fa-bed" @click="setWod('Monday')"></i>
      </div>
      <div class="text-center" v-if="this.$store.state.profile.schedule[`Tuesday`]">
        <i class="fas fa-dumbbell" @click="setWod('Tuesday')"></i>
      </div>
      <div class="text-center" v-else>
        <i class="fas fa-bed" @click="setWod('Tuesday')"></i>
      </div>
      <div class="text-center" v-if="this.$store.state.profile.schedule[`Wednesday`]">
        <i class="fas fa-dumbbell" @click="setWod('Wednesday')"></i>
      </div>
      <div class="text-center" v-else>
        <i class="fas fa-bed" @click="setWod('Wednesday')"></i>
      </div>
      <div class="text-center" v-if="this.$store.state.profile.schedule[`Thursday`]">
        <i class="fas fa-dumbbell" @click="setWod('Thursday')"></i>
      </div>
      <div class="text-center" v-else>
        <i class="fas fa-bed" @click="setWod('Thursday')"></i>
      </div>
      <div class="text-center" v-if="this.$store.state.profile.schedule[`Friday`]">
        <i class="fas fa-dumbbell" @click="setWod('Friday')"></i>
      </div>
      <div class="text-center" v-else>
        <i class="fas fa-bed" @click="setWod('Friday')"></i>
      </div>
      <div class="text-center" v-if="this.$store.state.profile.schedule[`Friday`]">
        <i class="fas fa-dumbbell" @click="setWod('Saturday')"></i>
      </div>
      <div class="text-center" v-else>
        <i class="fas fa-bed" @click="setWod('Saturday')"></i>
      </div>
    </div>

    <div class="toggled-workouts my-3" v-if="toggleWorkouts">
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-dark text-white mb-1" @click="setDayWorkout(`rest`)">
            Rest Day
            <i class="fas fa-bed"></i>
          </li>
          <li
            class="list-group-item bg-dark text-white mb-1"
            @click="setDayWorkout(workout)"
            v-for="workout in workouts"
            :key="workout._id"
          >{{workout.title}}</li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="stats col-12">
        <div class="text-center">
          <h3 class="mt-3">STATS:</h3>
        </div>
        <div class="row">
          <div class="col-4 my-3" id="bench">
            Bench
            lbs: 180
          </div>
          <div class="col-4 my-3" id="squat">
            Squat
            lbs: 250
          </div>
          <div class="col-4 my-3" id="dead-lift">
            Dead Lift
            lbs: 280
          </div>
          <div class="col-4 my-3" id="push-ups">
            Push Ups
            max: 100
          </div>
          <div class="col-4 my-3" id="pull-ups">
            Pull Ups
            max: 20
          </div>
          <div class="col-4 my-3" id="sit-ups">
            Sit Ups
            max: 120
          </div>
        </div>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import todaysWorkout from "../components/Workout";
let weekDays = {
  "0": "Sunday",
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday"
};
export default {
  name: "Dashboard",
  mounted() {
    {
      this.$store.dispatch("getStats");
      this.$store.dispatch("getWorkouts");
      this.$store.dispatch("setActiveWorkout");
      this.selectedDay = this.dayOfWeek;
    }
  },
  computed: {
    drawWod() {
      return this.$store.state.wod;
    },
    drawStats() {
      return this.$store.state.stats;
    },
    workouts() {
      return this.$store.state.workouts;
    },
    getWod() {
      return this.$store.state.profile.schedule[this.selectedDay];
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    setWod(day) {
      if (this.$store.state.profile.schedule[day]) {
        this.$store.commit("setWod", day);
        this.toggleWorkouts = false;
      } else {
        this.toggleWorkouts = true;
      }
      this.selectedDay = day;
    },

    editWod() {
      this.toggleWorkouts = true;
    },

    setDayWorkout(workout) {
      if (workout == "rest") {
        workout = "";
      }
      let newSchedule = this.$store.state.profile.schedule;
      newSchedule[this.selectedDay] = workout;
      let data = {
        schedule: newSchedule,
        profileId: this.$store.state.profile.id
      };
      this.$store.dispatch("setDayWorkout", data);
      this.toggleWorkouts = false;
    },

    setActiveWorkout(workout) {
      this.$store.dispatch("setActiveWorkout", workout);
    }
  },
  data() {
    return {
      todaysDate: `${new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/")
        .split("/")
        .reverse()
        .join("/")}`,
      dayOfWeek: `${weekDays[new Date().getDay()]}`,
      toggleWorkouts: false,
      selectedDay: ""
    };
  },
  components: {
    todaysWorkout
  }
};
</script>

<style scoped>
.overlay {
  position: absolute;
  /* background: rgba(0, 0, 0, 0.5); */
  width: 100%;
  height: 50;
  text-align: center;
  color: white;
  margin-top: 8rem;
}
.todays-workout {
  width: 100%;
}
.calendar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2.5rem;
}
.calendar p {
  color: rgb(124, 121, 121);
  font-size: 14px;
}
.calendar div {
  width: 1rem;
}
.icons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.icons i {
  font-size: 14px;
}
.icons div {
  width: 1rem;
}
.stats {
  bottom: 0;
  width: 100%;
  height: 25rem;
  background-color: black;
  color: green;
}
.stats h3 {
  color: white;
}
.stats ul {
  list-style-type: none;
}
.stats ul li {
  font-size: 18px;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.toggled-workouts {
  height: 15rem;
  overflow-y: auto;
}
.today-workout {
  width: 100%;
  margin: auto auto;
}
.change-workout {
  justify-self: center;
  width: 45%;
  height: 15%;
  padding: 1px;
}
.current-wod {
}
</style>