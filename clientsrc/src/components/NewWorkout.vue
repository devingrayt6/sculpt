<template>
  <div>
    <div class="col-12 newWorkout-form">
      <form class="pl-2 newForm">
        <div class="form-group row text-white">
          <label for="exampleFormControlInput1">Workout Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Workout Name..."
          />
        </div>
        <div class="form-group row text-white">
          <label for="exampleFormControlSelect1">Type</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Chest</option>
            <option>Back</option>
            <option>Legs</option>
            <option>Core</option>
            <option>Arms</option>
            <option>Shoulders</option>
            <option>Cardio</option>
          </select>
        </div>
        <button class="btn btn-sm btn-success float-right">Create</button>
      </form>
    </div>
    <div class="col-4 my-exercises"></div>
  </div>
</template>

<script>
export default {
  name: "NewWorkout"
};
</script>

<style scoped>
</style>