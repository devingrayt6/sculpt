<template>
  <div class="col-12 text-center">
    <div class="row text-center">
      <h2
        class="col-12 title text-center"
        contenteditable
        @blur="onEditWorkout('title')"
      >{{this.workout.title}}</h2>
    </div>
    <div class="row">
      <h4 class="col-12 title text-center">Exercises:</h4>
    </div>
    <ul class="list-group">
      <exercise
        class="list-group-item listItem row p-2 m-2 text-center"
        v-for="(exerciseObj) in exerciseData"
        :key="exerciseObj._id"
        :exerciseData="exerciseObj"
      />
      <div v-if="newExerciseForm">
        <select
          class="custom-select"
          id="exerciseSelect"
          @change.prevent="addExercise"
          v-model="selected"
        >
          <option
            v-for="exerciseObj in exercises"
            :key="exerciseObj._id"
            :value="exerciseObj"
          >{{exerciseObj.title}}</option>
        </select>
      </div>
    </ul>
    <div class="button-row row" v-if="workout._id">
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
      <button @click="deleteWorkout" class="btn btn-danger m-3 h4">Delete Workout</button>
    </div>
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
    },
    deleteExercise(data) {
      this.$store.dispatch("deleteExerciseFromWorkout", data);
      this.exerciseData;
    },
    deleteWorkout() {
      let id = this.$store.state.activeWorkout._id;
      this.$store.dispatch("deleteWorkout", id);
    },
    onEditWorkout(where) {
      let id = this.$store.state.activeWorkout._id;
      let data = { title: event.target.innerText };
      console.log(data);
      this.$store.dispatch("editWorkout", { update: data, workoutId: id });
    }
  },
  data() {
    return {
      newExerciseForm: false,
      selected: {},
      txt: ""
    };
  },
  mounted() {
    this.$store.dispatch("getExercises");
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
.button-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>