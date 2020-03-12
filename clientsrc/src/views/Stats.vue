<template>
  <div>
    <div class="col-12">
      <div class="card mt-3">
        <div class="card-body">
          <p>Stats</p>
          <h2>GRAPH</h2>
          <p>Weight: </p>
        </div>
      </div>
    </div>
    <div class="col-12 stats-form">
          <label for="exampleFormControlSelect1">Type</label>
          <select class="form-control" id="exampleFormControlSelect1" @change="toggleStats($event)">
            <option value="bench">Bench</option>
            <option value="push-ups">Push Ups</option>
            <option value="squats">Squats</option>
            <option value="dead-lifts">Dead Lifts</option>
            <option value="sit-ups">Sit Ups</option>
            <option value="pull-ups">Pull Ups</option>
            <option value="run">Run</option>
          </select>
    </div>
    <div class="col-4 my-stats"></div>
  </div>
</template>

<script>
export default {
  name: "Stats",
  mounted() {
    console.log(this.$store.state.profile.id)
  },
  computed: {
    stats(){
      return this.$store.state.profile.stats
    }
  },
  data() {
    return {
        data:{
          graphType: ""
      }
    }
  },
  methods: {
    toggleStats(event) {
      let profileId = this.$store.state.profile.id
      let data = {
        
      }
      this.$store.dispatch("getStats",  )
      console.log(event.target.value)
      // this.graphType = even
      // console.log(this.graphType)
    },
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