<template>
  <div class="container-fluid background1">
    <div class="row">
      <div class="col-12 text-center h2 pt-2">{{this.workout.title}}</div>
    </div>
    <div
      class="m-1 bg-white p-1 row border border-dark"
      v-for="exerciseObj in exerciseData"
      :key="exerciseObj._id"
    >
      <h2
        class="col-12"
        type="button"
        data-toggle="collapse"
        :data-target="'#target'+exerciseObj._id"
      >{{exerciseObj.title}}</h2>
      <!-- <p class="col-6" v-show="exerciseObj.sets">Sets-{{exerciseObj.sets}}</p> -->
      <ul class="col-12 collapse" :id="'target'+exerciseObj._id" v-if="exerciseObj.sets">
        <li v-for="n in exerciseObj.sets*1" :key="n.title" class="listItem row">
          <p>
            <input class="form-check-input position-static" type="checkbox" />
          </p>
          <p>Set: {{n}}</p>
          <p v-show="exerciseObj.reps">Reps-{{exerciseObj.reps}}</p>
          <p v-show="exerciseObj.weights">Weight-{{exerciseObj.weights}}</p>
          <p v-show="exerciseObj.distance">Distance-{{exerciseObj.distance}}</p>
          <p v-show="exerciseObj.time">Time-{{exerciseObj.time}}</p>
        </li>
      </ul>
    </div>
    <completedWorkoutStatsModal v-if="exerciseData" />
  </div>
</template>

<script>
import completedWorkoutStatsModal from "../components/CompletedWorkoutStatsModal"
export default {
  name: "CurrentWorkout",
  mounted() {
    console.log(this.$store.state.activeWorkout.exerciseData);
  },
  computed: {
    workout() {
      return this.$store.state.wod
    },
    exerciseData() {
      return this.$store.state.wod.exerciseData;
    }
  },
  methods: {
  },
  data() {
    return {
      selected: {},
      finishWorkout: true
    };
  },
  components: {
    completedWorkoutStatsModal
    }
};
</script>

<style scoped>
.h2 {
  color: black;
  background-color: rgba(255, 255, 255, 0.452);
}
.listItem {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid black;
  width: 100%;
  padding-left: 8px;
}
p {
  padding-left: 1rem;
  margin-bottom: 8px;
  margin-top: 8px;
}
</style>