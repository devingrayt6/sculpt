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
      <p>Sun</p>
      <p>Mon</p>
      <p>Tue</p>
      <p>Wed</p>
      <p>Thu</p>
      <p>Fri</p>
      <p>Sat</p>
    </div>

    <div class="row">
      <div class="stats offset-1 col-10 offset-1">
        <div class="text-center">
          <h3 class="mt-3">STATS:</h3>
        </div>

        <ul>
          <li id="bench">
            Bench
            <i class="fas fa-chart-line"></i>
          </li>
          <li id="squat">
            Squat
            <i class="fas fa-chart-line"></i>
          </li>
          <li id="dead-lift">
            Dead Lift
            <i class="fas fa-chart-line"></i>
          </li>
          <li id="push-ups">
            Push Ups
            <i class="fas fa-chart-line"></i>
          </li>
          <li id="pull-ups">
            Pull Ups
            <i class="fas fa-chart-line"></i>
          </li>
          <li id="sit-ups">
            Sit Ups
            <i class="fas fa-chart-line"></i>
          </li>
        </ul>
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
  mounted: {},
  computed: {},
  methods: {},
  data() {
    return {
      todaysDate: `${new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/")
        .split("/")
        .reverse()
        .join("/")}`,
      dayOfWeek: `${weekDays[new Date().getDay()]}`
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
  background-color: rgb(0, 0, 0);
  bottom: 0;
  width: 100%;
  height: 25rem;
  color: white;
}
.stats h3 {
  color: rgb(255, 255, 255);
}
.stats ul {
  list-style-type: none;
}
.stats ul li {
  font-size: 18px;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.stats ul i {
  color: green;
}
</style>