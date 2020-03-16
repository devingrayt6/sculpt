<template>
  <div v-show="newForm">
    <form id="newExerciseForm" class="form-inline" @submit.prevent="createExercise">
      <h5>New Exercise</h5>
      <div class="form-row row">
        <div class="form-group col-12">
          <label for="newExerciseSets">Title:</label>
          <input
            class="ml-2"
            type="text"
            placeholder="Enter Exercise Title..."
            v-model="newExercise.title"
          />
        </div>
      </div>
      <h5>Weighted Exercise</h5>
      <div class="row form-row">
        <div class="form-group col-6">
          <label for="newExerciseReps">Reps:</label>
          <input
            class="col-6 ml-2"
            id="newExerciseReps"
            type="number"
            placeholder
            v-model="newExercise.reps"
          />
        </div>
        <div class="form-group col-6">
          <label for="newExerciseWeight">Weight:</label>
          <input
            class="col-6 ml-2"
            id="newExerciseWeight"
            type="number"
            placeholder
            v-model="newExercise.weight"
          />
        </div>
      </div>
      <div class="row form-row">
        <div class="form-group col-6">
          <label for="newExerciseSets">Sets:</label>
          <input
            class="col-6 ml-2"
            id="newExerciseSets"
            type="number"
            placeholder
            v-model="newExercise.sets"
          />
        </div>
      </div>
      <h5>Running Exercise</h5>
      <div class="row form-row">
        <div class="form-group col-6">
          <label for="newExerciseDistance">Distance:</label>
          <input
            class="col-6 ml-2"
            id="newExerciseDistance"
            type="text"
            placeholder
            v-model="newExercise.distance"
          />
        </div>
        <div class="form-group col-6">
          <label for="newExerciseTime">Time:</label>
          <input
            class="col-6 ml-2"
            id="newExerciseTime"
            type="text"
            placeholder
            v-model="newExercise.time"
          />
        </div>
        <div class="col-12">
          <button class="btn btn-sm btn-success mx-2 h4 float-right text-white">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewExerciseForm",
  data() {
    return {
      newExercise: {},
      newForm: true
    };
  },
  methods: {
    createExercise() {
      this.$store.dispatch("createExercise", this.newExercise);
      $("#newExerciseForm").remove();
      this.newForm = false;
    }
  }
};
</script>

<style scoped>
.form-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
}
.form-group {
  text-align: left;
}
</style>