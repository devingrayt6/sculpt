<template>
  <div class="container-fluid">
    <div class="row text-center">
      <h3 class="col-12 my-3">{{dayOfWeek}} {{todaysDate}}</h3>
    </div>
    <div class="row schedule-row p-3 bg-primary mx-3">
      <workout v-if="this.activeWorkout" :workoutData="activeWorkout" />
      <button
        @click="toggleWorkouts = !toggleWorkouts"
        v-if="this.workouts.length>0"
        class="btn btn-secondary my-2"
      >
        Set Schedule for
        <span>{{this.selectedDay}}</span>
      </button>
      <router-link
        to="/myWorkouts"
        v-if="this.workouts.length==0"
        class="btn btn-primary"
      >Create Workouts</router-link>
    </div>
    <div class="row schedule-row pb-3 bg-primary mx-3" v-if="toggleWorkouts">
      <div class="col-10">
        <select
          class="form-control"
          :id="this.selectedDay"
          @change.prevent="updateSchedule"
          v-model="selected"
        >
          <option value="rest day">Rest Day</option>
          <option
            v-for="workoutObj in workouts"
            :key="workoutObj._id"
            :value="workoutObj"
          >{{workoutObj.title}}</option>
        </select>
      </div>
    </div>
    <div class="calendar row">
      <div class="text-center border border-dark" @click="setActiveDay('sunday')">
        <p>Sun</p>
      </div>
      <div class="text-center border border-dark" @click="setActiveDay('monday')">
        <p>Mon</p>
      </div>
      <div class="text-center border border-dark" @click="setActiveDay('tuesday')">
        <p>Tue</p>
      </div>
      <div class="text-center border border-dark" @click="setActiveDay('wednesday')">
        <p>Wed</p>
      </div>
      <div class="text-center border border-dark" @click="setActiveDay('thursday')">
        <p>Thu</p>
      </div>
      <div class="text-center border border-dark" @click="setActiveDay('friday')">
        <p>Fri</p>
      </div>
      <div class="text-center border border-dark" @click="setActiveDay('saturday')">
        <p>Sat</p>
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
  </div>
</template>

<script>
import Workout from "../components/Workout";
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
      this.$store.dispatch("buildSchedule");
      this.selectedDay = this.dayOfWeek.toLowerCase();
      this.setActiveDay(this.selectedDay);
      this.$store.dispatch("setActiveDay", this.selectedDay);
    }
  },
  computed: {
    workouts() {
      return this.$store.state.workouts;
    },
    activeWorkout() {
      return this.$store.state.activeWorkout;
    },
    schedule() {
      return this.$store.state.schedule;
    }
  },
  methods: {
    setActiveDay(day) {
      this.selectedDay = day;
      this.$store.dispatch("setActiveDay", this.selectedDay);
      if (this.workouts.length == 0) {
        let workout = "no workouts created yet";
        console.log(workout);
      } else if (!this.schedule[day]) {
        this.$store.dispatch("resetActiveWorkout", {});
        this.toggleWorkouts = true;
        console.log("toggle");
      } else {
        this.$store.dispatch("getWorkoutOfDay", this.selectedDay);
      }
    },
    setActiveWorkout(workout) {
      this.$store.dispatch("setActiveWorkout", workout);
    },
    updateSchedule() {
      let workout = this.selected;
      this.$store.dispatch("updateSchedule", workout);
      this.toggleWorkouts = false;
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
      selectedDay: "",
      selected: {}
    };
  },
  components: {
    Workout
  }
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2.5rem;
}
/*
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
} */
/* .toggled-workouts {
  height: 15rem;
  overflow-y: auto;
} */
/* .today-workout {
  width: 100%;
  margin: auto auto;
} */
/* .change-workout {
  justify-self: center;
  width: 45%;
  height: 15%;
  padding: 1px;
} */
.schedule-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>