<template>
  <div class="col-12 text-center">
    <div class="row text-center">
      <h2 class="col-12 title text-center">{{this.workout.title}}</h2>
    </div>
    <div class="row">
      <h4 class="col-12 title text-center">Exercises:</h4>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item listItem row p-2 m-2"
        v-for="(exerciseObj) in exerciseData"
        :key="exerciseObj._id"
      >
        <div class="title-row col-12">
          <h5>
            <u>{{exerciseObj.title}}</u>
          </h5>
          <p @click="deleteExercise(exerciseObj)" class="deletebutton text-danger">X</p>
        </div>
        <p class="col-12" v-show="exerciseObj.sets">Sets-{{exerciseObj.sets}}</p>
        <p class="col-12" v-show="exerciseObj.reps">Reps-{{exerciseObj.reps}}</p>
        <p class="col-12" v-show="exerciseObj.weights">Weight-{{exerciseObj.weights}}</p>
        <p class="col-12" v-show="exerciseObj.distance">Distance-{{exerciseObj.distance}}</p>
        <p class="col-12" v-show="exerciseObj.time">Time-{{exerciseObj.time}}</p>
      </li>
      <div v-if="newExerciseForm">
        <select class="custom-select" id="exerciseSelect" @change="addNewExercise($event)">
          <option selected>Add New Exercise</option>
          <option v-for="exercise in exercises" :key="exercise._id">{{exercise.title}}</option>
        </select>
      </div>
    </ul>
    <i
      v-if="!newExerciseForm"
      @click.prevent="newExerciseForm=true"
      class="fas fa-dumbbell text-success float-right m-3 h2"
    ></i>
    <i
      v-if="newExerciseForm"
      @click.prevent="newExerciseForm=false"
      class="fas fa-dumbbell text-warning float-right m-3 h2"
    ></i>
  </div>
</template>

<script>
import Exercise from "../components/Exercise";

export default {
  name: "WorkoutDetail",
  props: ["workoutData"],
  computed: {
    workout() {
      return this.$store.state.activeWorkout;
    },
    exerciseData() {
      return this.$store.state.activeWorkout.exerciseData;
    },
    exercises() {
      return this.$store.state.exercises;
    }
  },
  methods: {
    addExercise() {
      let workoutId = this.workoutData.id;
      let form = document.getElementById("exerciseSelect");
      let exercise = form.options[form.selectedIndex].value;
      console.log(exercise);
      this.$store.dispatch("addExerciseToWorkout", {
        workoutId: workoutId,
        body: exercise
      });
    }
  },
  data() {
    return {
      newExerciseForm: false,
      newExercise: {}
    };
  },
  components: {
    Exercise
  }
};
</script>

<style scoped>
.workout {
  height: 200px;
  width: 300px;
}
.deletebutton {
  cursor: pointer;
}
.listItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  background-color: transparent;
  align-items: baseline;
}
.title-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.listItem {
  border: 1px solid black;
}
</style>