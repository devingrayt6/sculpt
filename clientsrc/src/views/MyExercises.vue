<template>
  <div class="container-fluid exercise-container">
    <div class="row text-center">
      <div class="col-12 h2 pt-2">My Exercises</div>
    </div>
    <NewExerciseForm
      class="list-group-item listItem row p-2 m-2 text-center bg-dark text-white"
      v-if="newExerciseForm"
      v-on:clicked="toggleButton"
    />
    <div class="button-row">
      <button
        v-if="!newExerciseForm"
        @click="newExerciseForm=true"
        class="btn btn-success m-3 h4"
      >Add New Exercise</button>
      <button
        v-if="newExerciseForm"
        @click="newExerciseForm=false"
        class="btn btn-warning float-right m-3 h2"
      >Cancel</button>
    </div>
    <ul class="list-group">
      <exercise
        class="list-group-item listItem row p-2 m-2 text-center"
        v-for="(exerciseObj) in exercises"
        :key="exerciseObj._id"
        :exerciseData="exerciseObj"
      />
    </ul>
  </div>
</template>

<script>
import NewExerciseForm from "../components/NewExerciseForm";
import Exercise from "../components/Exercise";

export default {
  name: "MyExercises",
  mounted() {
    this.$store.dispatch("getExercises");
    this.$store.dispatch("setActiveWorkout", {});
  },
  data() {
    return {
      newExerciseForm: false
    };
  },
  computed: {
    exercises() {
      return this.$store.state.exercises;
    }
  },
  components: {
    NewExerciseForm,
    Exercise
  },
  methods: {
    toggleButton() {
      this.newExerciseForm = false;
    }
  }
};
</script>

<style scoped>
.listItem {
  border: 1px solid black;
}
.h2 {
  color: black;
  background-color: rgba(255, 255, 255, 0.452);
}
.exercise-container {
  max-width: 100vw;
  min-height: 100vh;
  background-color: white;
}
.button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>