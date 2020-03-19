<template>
  <div class="col-8 workout text-center" :id="workoutData.type">
    <h2 @click="setActiveWorkout" class="title text-white" v-if="workoutData">{{workoutData.title}}</h2>
    <div v-else>
      <img src="../assets/restday.jpg" width="100%" />
      <h5>No Workout Scheduled</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Workout",
  props: ["workoutData"],
  methods: {
    setActiveWorkout() {
      this.$store.dispatch("setActiveWorkout", this.workoutData);
      this.$emit("clicked");
    }
  }
};
</script>

<style scoped>
.workout {
  height: 200px;
  width: 300px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  background-color: rgba(0, 0, 0, 0.575);
}
</style>