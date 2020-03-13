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
          <NewExerciseForm v-if="!exerciseObj" />
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
        <select
          class="custom-select"
          id="exerciseSelect"
          @change.prevent="addExercise"
          v-model="selected"
        >
          <option selected :value="false">Add New Exercise</option>
          <option
            v-for="exerciseObj in exercises"
            :key="exerciseObj._id"
            :value="exerciseObj"
          >{{exerciseObj.title}}</option>
        </select>
      </div>
    </ul>
    <button
      v-if="!newExerciseForm"
      @click.prevent="newExerciseForm=true"
      class="btn btn-success m-3 h4"
    >Build Workout</button>
    <button
      v-if="newExerciseForm"
      @click.prevent="newExerciseForm=false"
      class="btn btn-warning float-right m-3 h2"
    >Cancel</button>
  </div>
</template>

<script>
import Exercise from "../components/Exercise";
import NewExerciseForm from "../components/NewExerciseForm";

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
    },
    workoutId() {
      return this.workout.id;
    }
  },
  methods: {
    addExercise() {
      let exercise = this.selected;
      let workoutId = this.workout.id;
      this.$store.dispatch("addExerciseToWorkout", {
        workoutId: workoutId,
        body: exercise
      });
    }
  },
  data() {
    return {
      newExerciseForm: false,
      newExercise: {},
      selected: {},
      createExercise: false
    };
  },
  components: {
    Exercise,
    NewExerciseForm
  },
  mounted() {
    this.$store.dispatch("getExercises");
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