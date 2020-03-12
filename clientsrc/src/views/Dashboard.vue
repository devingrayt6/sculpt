<template>
  <div class="container-fluid">
    <div>
      <h3 class="text-center my-3">{{dayOfWeek}} {{todaysDate}}</h3>
    </div>
    <div class="row">
      <div class="offset-1 col-10 offset-1">
        <h2 class="overlay">Todays Workout</h2>
        <img
          class="todays-workout"
          src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=1"
          alt
        />
      </div>
    </div>

    <div class="calendar" id="calendar">
      <p @click="setWod('Sunday')">Sun</p>
      <p @click="setWod('Monday')">Mon</p>
      <p @click="setWod('Tuesday')">Tue</p>
      <p @click="setWod('Wednesday')">Wed</p>
      <p @click="setWod('Thursday')">Thu</p>
      <p @click="setWod('Friday')">Fri</p>
      <p @click="setWod('Saturday')">Sat</p>
    </div>

    <div v-if="toggleWorkouts">
      <li v-for="workout in workouts" :key="workout._id">{{workout.title}}</li>
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
      this.$store.dispatch("getWod");
      this.$store.dispatch("getStats");
      this.$store.state.profile.schedule;
      this.$store.dispatch("getWorkouts");
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
    }
  },
  methods: {
    setWod(day) {
      if (this.$store.state.profile[day]) {
        this.$store.commit("setWod", day);
      } else {
        this.toggleWorkouts = !this.toggleWorkouts;
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
      toggleWorkouts: false
    };
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
  margin-bottom: 1.5rem;
}
.calendar p {
  color: rgb(124, 121, 121);
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
</style>