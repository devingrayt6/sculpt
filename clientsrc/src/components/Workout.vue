<template>
  <div class="col-8 workout text-center" :id="workoutData.type">
    <h2 @click="setActiveWorkout" class="title text-white">{{workoutData.title}}</h2>
  </div>
</template>

<script>
export default {
  name: "Workout",
  props: ["workoutData"],
  methods: {
    setActiveWorkout() {
      this.$store.dispatch("setActiveWorkout", this.workoutData);
    }
  }
};
</script>

<style scoped>
.workout {
  height: 200px;
  width: 300px;
}
.title {
  background-color: rgba(0, 0, 0, 0.575);
}
</style>