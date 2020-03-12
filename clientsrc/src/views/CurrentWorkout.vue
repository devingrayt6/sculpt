<template>
  <div class="container-fluid background1">
    <div class="row">
      <div class="col-12 text-center h2 pt-2">Workout Title</div>
    </div>
    <form @submit.prevent="completeWorkout">
      <div class="accordion" id="currentWorkout">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >Bench</button>
            </h2>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Sets: 3, Weight: 50lb, Reps: 5</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-success float-right">Workout Complete</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CurrentWorkout",
  computed: {
    workout() {
      return this.$store.state.activeWorkout;
    }
  },
  methods: {
    completeWorkout() {
      this.$store.dispatch("saveStats", workout);
    }
  }
};
</script>

<style scoped>
.h2 {
  color: black;
  background-color: rgba(255, 255, 255, 0.452);
}
</style>