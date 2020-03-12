<template>
  <div class="container-fluid workout-container">
    <div class="row text-center">
      <div class="col-12 h2">My Workouts</div>
    </div>
    <div class="snap-container">
      <div class="row workout-row">
        <workout v-for="(workoutObj) in workouts" :key="workoutObj._id" :workoutData="workoutObj" />
        <div class="snap-child">
          <div class="workout bg-primary text-center">
            <button @click="workoutForm=true" class="btn btn-outline-success">Create New Workout</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row newWorkoutForm m-2 p-2" v-if="workoutForm">
      <h4 class="text-white col-12">
        Create New Workout
        <i class="fas fa-ban text-warning float-right" @click="workoutForm=false"></i>
      </h4>
      <new-workout />
    </div>
    <div class="row activeWorkout mt-4" v-if="!workoutForm">
      <workout-detail />
    </div>
  </div>
</template>

<script>
import NewWorkout from "../components/NewWorkout";
import Workout from "../components/Workout";
import WorkoutDetail from "../components/WorkoutDetail";

export default {
  name: "MyWorkouts",
  data() {
    return {
      workoutForm: false,
      newWorkout: {}
    };
  },
  mounted() {
    this.$store.dispatch("getWorkouts");
  },
  computed: {
    workouts() {
      return this.$store.state.workouts;
    }
  },
  methods: {},
  components: {
    NewWorkout,
    Workout,
    WorkoutDetail
  }
};
</script>

<style scoped>
.snap-container {
  scroll-snap-type: x mandatory;
  scroll-padding: 50%;
}
.snap-child {
  scroll-snap-align: center;
}
.workout {
  height: 200px;
  width: 300px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.workout-row {
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  max-width: 100vw;
  position: relative;
  background-color: rgba(0, 0, 0, 0.705);
}
.h2 {
  color: black;
  background-color: rgba(255, 255, 255, 0.452);
}
.workout-container {
  max-width: 100vw;
  min-height: 100vh;
  background-color: rgba(59, 57, 57, 0.719);
}
.title {
  color: rgb(29, 172, 255);
  text-shadow: 0 2px 0 white;
}
.newWorkoutForm {
  background-color: rgba(0, 0, 0, 0.705);
}
</style>