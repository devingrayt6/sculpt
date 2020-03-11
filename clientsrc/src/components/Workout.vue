<template>
  <div class="col-8 workout deadlift text-center">
    <h2 class="title">Workout Title</h2>
  </div>
</template>

<script>
export default {
  name: "Workout",
  props: ["workoutData"],
  methods: {
    setActiveWorkout() {}
  }
};
</script>

<style scoped>
.workout {
  height: 200px;
  width: 300px;
}
</style>