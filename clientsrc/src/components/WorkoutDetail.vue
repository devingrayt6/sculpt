<template>
  <div class="col-8 workout text-center">
    <div class="row">
      <h2 class="title">{{workoutData.title}}</h2>
    </div>
    <div class="row">
      <h4>Exercises:</h4>
    </div>
    <ul class="list-group list-group-flush m-2">
      <li
        class="list-group-item listItem row"
        v-for="(exerciseObj) in exerciseData"
        :key="exerciseObj._id"
      >
        <p @click="deleteExercise(exerciseObj)" class="deletebutton col-12 text-right text-danger">X</p>
        <h5 class="col-12">{{exerciseObj.title}}</h5>
        <p class="col-12" v-show="exerciseObj.sets>0">-{{exerciseObj.sets}}</p>
        <p class="col-12" v-show="exerciseObj.reps>0">-{{exerciseObj.reps}}</p>
        <p class="col-12" v-show="exerciseObj.weights>0">-{{exerciseObj.weights}}</p>
        <p class="col-12" v-show="exerciseObj.distance>0">-{{exerciseObj.distance}}</p>
        <p class="col-12" v-show="exerciseObj.time>0">-{{exerciseObj.time}}</p>
      </li>
      <div v-if="newExerciseForm">
        <form @submit.prevent="addExerciseToWorkout">
          <div class="form-group row text-white">
            <label for="exercise">Choose an Exercise</label>
            <select class="form-control" id="exerciseSelect">
              <option v-for="exercise in exercises" :key="exercise.id">{{exercise.title}}</option>
            </select>
          </div>
          <i @click="addExercise(exercise)" class="fas fa-plus text-success"></i>
        </form>
      </div>
    </ul>
    <i
      v-if="!newExerciseForm"
      @click.prevent="newExerciseForm=true"
      class="fas fa-dumbbell text-success float-right m-3"
    ></i>
    <i
      v-if="newExerciseForm"
      @click.prevent="newExerciseForm=false"
      class="fas fa-dumbbell text-danger float-right m-3"
    ></i>
  </div>
</template>

<script>
export default {
  name: "WorkoutDetail",
  props: ["workoutData"],
  computed: {
    workout() {
      return this.$store.state.activeWorkout;
    },
    exerciseData() {
      return this.workoutData.exerciseData;
    },
    exercises() {
      return this.$store.state.exercises;
    }
  },
  mounted() {
    if (!this.$store.state.workouts.length) {
      this.$store.dispatch("getWorkoutById", this.$route.params.workoutId);
    } else {
      this.setActiveWorkout();
    }
  },
  methods: {
    setActiveWorkout() {
      this.$store.dispatch("setActiveWorkout", this.$route.params.workoutId);
    },
    addExercise(exercise) {
      this.$store.dispatch("addExerciseToWorkout", exercise);
    }
  },
  data() {
    return {
      newExerciseForm: false,
      newExercise: {}
    };
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
</style>