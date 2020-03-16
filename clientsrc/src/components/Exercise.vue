<template>
  <div>
    <div class="title-row col-12">
      <h5>
        <u>{{exerciseData.title}}</u>
      </h5>
      <p @click="deleteExercise(exerciseData)" class="deletebutton text-danger">X</p>
    </div>
    <p class="col-12" v-show="exerciseData.sets">Sets-{{exerciseData.sets}}</p>
    <p class="col-12" v-show="exerciseData.reps">Reps-{{exerciseData.reps}}</p>
    <p class="col-12" v-show="exerciseData.weight">Weight-{{exerciseData.weight}}</p>
    <p class="col-12" v-show="exerciseData.distance">Distance-{{exerciseData.distance}}</p>
    <p class="col-12" v-show="exerciseData.time">Time-{{exerciseData.time}}</p>
  </div>
</template>

<script>
export default {
  name: "Exercise",
  props: ["exerciseData"],
  methods: {
    deleteExercise(data) {
      this.$store.dispatch("deleteExercise", data._id);
    }
  }
};
</script>

<style scoped>
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
</style>