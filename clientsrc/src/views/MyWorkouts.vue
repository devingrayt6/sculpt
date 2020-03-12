<template>
  <div class="container-fluid workout-container">
    <div class="row text-center">
      <div class="col-12 h2">My Workouts</div>
    </div>
    <div class="snap-container">
      <div class="row workout-row">
        <!-- <workouts/> -->

        <div class="snap-child">
          <div class="workout arms text-center">
            <h2 class="title">Workout Title</h2>
          </div>
        </div>
        <div class="snap-child">
          <div class="workout shoulders text-center">
            <h2 class="title">Workout TItle</h2>
          </div>
        </div>
        <div class="snap-child">
          <div class="workout back text-center">
            <h2 class="title">Workout TItle</h2>
          </div>
        </div>
        <div class="snap-child">
          <div class="workout chest text-center">
            <h2 class="title">Workout TItle</h2>
          </div>
        </div>
        <div class="snap-child">
          <div class="workout legs text-center">
            <h2 class="title">Workout TItle</h2>
          </div>
        </div>
        <div class="snap-child">
          <div class="workout core text-center">
            <h2 class="title">Workout TItle</h2>
          </div>
        </div>
        <div class="snap-child">
          <div class="workout cardio text-center">
            <h2 class="title">Workout TItle</h2>
          </div>
        </div>
        <div class="snap-child">
          <div class="workout bg-primary text-center">
            <button @click="workoutForm=true" class="btn btn-outline-success">Create New Workout</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row newWorkoutForm m-2 p-2" v-if="workoutForm">
      <h4 class="text-white">Create New Workout</h4>
      <new-workout />
    </div>
    <div class="row activeWorkout" v-if="activeWorkout">
      <h2>Active Workout</h2>
    </div>
  </div>
</template>

<script>
import NewWorkout from "../components/NewWorkout";
import Workout from "../components/Workout";

export default {
  name: "MyWorkouts",
  computed: {},
  data() {
    return {
      workoutForm: false,
      activeWorkout: false
    };
  },
  mounted() {
    this.$store.dispatch("getWorkoutsByUserId");
  },
  computed: {
    workouts() {
      return this.$store.state.workouts;
    }
  },
  methods: {
    addWorkout() {},
    deleteWorkout() {},
    editWorkout() {}
  },
  components: {
    NewWorkout
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