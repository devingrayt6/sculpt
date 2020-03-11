<template>
  <div>
    <div class="col-8 newWorkout-form">
      <form>
        <div class="form-group row">
          <label for="workout-name" class="col-sm-2 col-form-label">Workout Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="workout-name" />
          </div>
        </div>
        <div class="row">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle mx-3 mb-2"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Type of Workout</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item">Chest</a>
              <a class="dropdown-item">Back</a>
              <a class="dropdown-item">Legs</a>
              <a class="dropdown-item">Core</a>
              <a class="dropdown-item">Arms</a>
              <a class="dropdown-item">Shoulders</a>
              <a class="dropdown-item">Cardio</a>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </div>
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