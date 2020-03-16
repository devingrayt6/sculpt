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
      <li
        class="list-group-item listItem row p-2 m-2"
        v-for="(exerciseObj) in exerciseData"
        :key="exerciseObj._id"
      >
        <div class="title-row col-12">
          <h5>
            <u contenteditable @blur="onEdit('title')">{{exerciseObj.title}}</u>
          </h5>
          <p @click="deleteExercise(exerciseObj)" class="deletebutton text-danger">X</p>
        </div>
        <p class="col-12" v-show="exerciseObj.sets">
          Sets-
          <span contenteditable @blur="onEdit('sets')">{{exerciseObj.sets}}</span>
        </p>
        <p class="col-12" v-show="exerciseObj.reps">
          Reps-
          <span contenteditable @blur="onEdit('reps')">{{exerciseObj.reps}}</span>
        </p>
        <p class="col-12" v-show="exerciseObj.weight">
          Weight-
          <span contenteditable @blur="onEdit('weight')">{{exerciseObj.weight}}</span>
        </p>
        <p class="col-12" v-show="exerciseObj.distance">
          Distance-
          <span contenteditable @blur="onEdit('distance')">{{exerciseObj.distance}}</span>
        </p>
        <p class="col-12" v-show="exerciseObj.time">
          Time-
          <span contenteditable @blur="onEdit('time')">{{exerciseObj.time}}</span>
        </p>
      </li>
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
    onEdit(where) {
      let id = this.$store.state.activeWorkout._id;
      if (where == "reps") {
        let data = { reps: event.target.innerText * 1 };
        console.log(data);
        this.$store.dispatch("editWorkoutExercise", {
          update: data,
          workoutId: id
        });
      } else if (where == "sets") {
        let data = { sets: event.target.innerText * 1 };
        console.log(data);
        this.$store.dispatch("editWorkoutExercise", {
          update: data,
          workoutId: id
        });
      } else if (where == "weight") {
        let data = { weight: event.target.innerText * 1 };
        console.log(data);
        this.$store.dispatch("editWorkoutExercise", {
          update: data,
          workoutId: id
        });
      } else if (where == "distance") {
        let data = { distance: event.target.innerText * 1 };
        console.log(data);
        this.$store.dispatch("editWorkoutExercise", {
          update: data,
          workoutId: id
        });
      } else if (where == "time") {
        let data = { time: event.target.innerText * 1 };
        console.log(data);
        this.$store.dispatch("editWorkoutExercise", {
          update: data,
          workoutId: id
        });
      }
    },
    onEditWorkout(where) {
      let id = this.$store.state.activeWorkout._id;
      let data = { title: event.target.innerText, workoutId: id };
      console.log(data);
      this.$store.dispatch("editWorkout", data);
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