<template>
  <div>
    <div class="col-12 newWorkout-form">
      <form @submit.prevent="createNewWorkout" class="pl-2 newForm">
        <div class="form-group row text-white">
          <label for="exampleFormControlInput1">Workout Name</label>
          <input
            v-model="newWorkout.title"
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Workout Name..."
          />
        </div>
        <div class="form-group row text-white">
          <label for="typeSelect">Type</label>
          <select class="form-control" id="typeSelect">
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="core">Core</option>
            <option value="arms">Arms</option>
            <option value="shoulders">Shoulders</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>
        <button type="submit" class="btn btn-sm btn-success float-right">Create</button>
      </form>
    </div>
    <div class="col-4 my-exercises"></div>
  </div>
</template>

<script>
export default {
  name: "NewWorkout",
  data() {
    return {
      newWorkout: {
        title: "",
        type: ""
      }
    };
  },
  methods: {
    createNewWorkout() {
      let form = document.getElementById("typeSelect");
      let exercise = form.options[form.selectedIndex].value;
      let body = {
        title: this.newWorkout.title,
        type: exercise
      };
      this.$store.dispatch("createWorkout", body);
      this.$emit("clicked");
    }
  }
};
</script>

<style scoped>
</style>