<template>
  <div>
    <chart v-if="charts" :chartData="charts" />
    <div class="col-12 stats-form">
      <label for="statsPage">Type</label>
      <select class="form-control" id="statsPage" @change="toggleStats($event)">
        <option value="bench">Bench</option>
        <option value="pushUp">Push Ups</option>
        <option value="squat">Squats</option>
        <option value="deadLift">Dead Lifts</option>
        <option value="sitUp">Sit Ups</option>
        <option value="pullUp">Pull Ups</option>
        <option value="run">Run</option>
      </select>
    </div>
    <div class="col-4 my-stats">
      <p>{{this.exerciseChoice}}</p>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "../components/Chart"
export default {
  name: "Stats",
  mounted() {
    this.$store.dispatch("getStats")
  },
  
  data(){
    return {  
      charts: false, 
      exerciseChoice: this.$store.state.stats
    }
  },
  computed: {
    stats(){
      // get the specific stats
      return this.$store.state.activeStat
    }
  },
  methods: {
    toggleStats(event) {
      this.charts = true
      let activeStat = event.target.value
      this.$store.dispatch("setActiveStat", activeStat)
    },
  },
  components: {
    Chart
  }
};
</script>

<style scoped>
.workout-container {
  max-width: 100vw;
  min-height: 100vh;
  background-color: rgba(59, 57, 57, 0.719);
  display: flex;
  flex-direction: column;
  align-content: center
}

</style>