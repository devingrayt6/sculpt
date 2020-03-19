<template>
  <div class="container-fluid">
    <div class="row text-center">
      <h3 class="col-12 my-3">{{dayOfWeek}} {{todaysDate}}</h3>
    </div>
    <div class="row schedule-row p-3 bg-primary mx-3">
      <workout @clicked="changeView" v-if="this.activeWorkout" :workoutData="activeWorkout" />
      <button
        @click="toggleWorkouts = !toggleWorkouts"
        v-if="this.workouts.length>0"
        class="btn btn-secondary my-2"
      >
        Change
        <span>{{this.selectedDay}}</span>'s Workout
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
          <option :value="this.restDayObj">Rest Day</option>
          <option
            v-for="workoutObj in workouts"
            :key="workoutObj._id"
            :value="workoutObj"
          >{{workoutObj.title}}</option>
        </select>
      </div>
    </div>
    <div class="calendar row">
      <div class="text-center" @click="setActiveDay('sunday')">
        <p class="m-0">Sun</p>
        <i v-if="this.schedule.sunday" class="fas fa-dumbbell"></i>
        <i
          v-if="!this.schedule.sunday || this.schedule.sunday.title == 'Rest Day'"
          class="fas fa-bed"
        ></i>
      </div>
      <div class="text-center" @click="setActiveDay('monday')">
        <p class="m-0">Mon</p>
        <i v-if="this.schedule.monday" class="fas fa-dumbbell"></i>
        <i
          v-if="!this.schedule.monday || this.schedule.monday.title == 'Rest Day'"
          class="fas fa-bed"
        ></i>
      </div>
      <div class="text-center" @click="setActiveDay('tuesday')">
        <p class="m-0">Tue</p>
        <i v-if="this.schedule.tuesday" class="fas fa-dumbbell"></i>
        <i
          v-if="!this.schedule.tuesday || this.schedule.tuesday.title == 'Rest Day'"
          class="fas fa-bed"
        ></i>
      </div>
      <div class="text-center" @click="setActiveDay('wednesday')">
        <p class="m-0">Wed</p>
        <i v-if="this.schedule.wednesday" class="fas fa-dumbbell"></i>
        <i
          v-if="!this.schedule.wednesday || this.schedule.wednesday.title == 'Rest Day'"
          class="fas fa-bed"
        ></i>
      </div>
      <div class="text-center" @click="setActiveDay('thursday')">
        <p class="m-0">Thu</p>
        <i v-if="this.schedule.thursday" class="fas fa-dumbbell"></i>
        <i
          v-if="!this.schedule.thursday || this.schedule.thursday.title == 'Rest Day'"
          class="fas fa-bed"
        ></i>
      </div>
      <div class="text-center" @click="setActiveDay('friday')">
        <p class="m-0">Fri</p>
        <i v-if="this.schedule.friday" class="fas fa-dumbbell"></i>
        <i
          v-if="!this.schedule.friday || this.schedule.friday.title == 'Rest Day'"
          class="fas fa-bed"
        ></i>
      </div>
      <div class="text-center" @click="setActiveDay('saturday')">
        <p class="m-0">Sat</p>
        <i v-if="this.schedule.saturday" class="fas fa-dumbbell"></i>
        <i
          v-if="!this.schedule.saturday || this.schedule.saturday.title == 'Rest Day'"
          class="fas fa-bed"
        ></i>
      </div>
    </div>
    <div class="row mt-3">
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
        this.$store.dispatch("setActiveWorkout", this.restDayObj);
      } else if (!this.schedule[day]) {
        this.$store.dispatch("setActiveWorkout", this.restDayObj);
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
    },
    changeView() {
      if (this.activeWorkout.title != "Rest Day") {
        if (this.selectedDay === this.dayOfWeek.toLowerCase()) {
          this.$router.push({ name: "CurrentWorkout" });
        } else {
          this.$router.push({ name: "MyWorkouts" });
        }
      }
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
      selected: {},
      restDayObj: {
        title: "Rest Day",
        type: "rest"
      }
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
.schedule-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>