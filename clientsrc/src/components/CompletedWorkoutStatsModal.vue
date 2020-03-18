<template>
  <div class="component">
    <button
      type="button"
      class="btn btn-success"
      data-toggle="modal"
      data-target="#finishedWorkout"
    >Log Workout</button>
    <div class="modal" tabindex="-1" role="dialog" id="finishedWorkout">
      <form class="form-inline" @submit.prevent="completeWorkout">
        <div class="modal-content form-group rounded input-group-default container">
          <div class="modal-header d-flex flex-column">
            <h2 class="text-white">Enter Stats</h2>
            <div class="form-group-inline my-1 row">
              <h5 class="text-white mt-2 col-5">Bench:</h5>
              <input
                class="modal-title rounded form-control p-0 text-center col-7"
                placeholder="What did you bench?"
                aria-describedby="inputGroup-sizing-default"
                v-model="newStat.bench"
              />
            </div>
            <div class="form-group-inline my-1 row">
              <h5 class="text-white mt-2 col-5">Push up:</h5>
              <input
                class="modal-title rounded form-control p-0 text-center col-7"
                placeholder="How many push ups?"
                aria-describedby="inputGroup-sizing-default"
                v-model="newStat.pushUp"
              />
            </div>
            <div class="form-group-inline my-1 row">
              <h5 class="text-white mt-2 col-5">Squat:</h5>
              <input
                class="modal-title rounded form-control p-0 text-center col-7"
                placeholder="What did you squat?"
                aria-describedby="inputGroup-sizing-default"
                v-model="newStat.squat"
              />
            </div>
            <div class="form-group-inline my-1 row">
              <h5 class="text-white mt-2 col-5">Deadlift:</h5>
              <input
                class="modal-title rounded form-control p-0 text-center col-7"
                placeholder="What did you dead lift?"
                aria-describedby="inputGroup-sizing-default"
                v-model="newStat.deadLift"
              />
            </div>
            <div class="form-group-inline my-1 row">
              <h5 class="text-white mt-2 col-5">Sit ups:</h5>
              <input
                class="modal-title rounded form-control p-0 text-center col-7"
                placeholder="How many sit ups today?"
                aria-describedby="inputGroup-sizing-default"
                v-model="newStat.sitUp"
              />
            </div>
            <div class="form-group-inline my-1 row">
              <h5 class="text-white mt-2 col-5 title">Pull ups:</h5>
              <input
                class="modal-title rounded form-control p-0 text-center col-7"
                placeholder="How many pull ups today?"
                aria-describedby="inputGroup-sizing-default"
                v-model="newStat.pullUp"
              />
            </div>
            <div class="form-group-inline my-1 row">
              <h5 class="text-white mt-2 col-4 title">Run:</h5>
              <div class="col-4 p-1">
                <input
                  class="modal-title rounded form-control p-0 text-center"
                  placeholder="Minutes?"
                  aria-describedby="inputGroup-sizing-default"
                  v-model="newStat.minutes"
                />
              </div>
              <div class="col-4 p-1">
                <input
                  class="modal-title rounded form-control p-0 text-center"
                  placeholder="Seconds?"
                  aria-describedby="inputGroup-sizing-default"
                  v-model="newStat.seconds"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#finishedWorkout"
            >Submit</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {},
  name: "CompletedWorkoutStatsModal",
  data() {
    return {
      newStat: {
        time: this.minutes + this.seconds / 60
      }
    };
  },
  computed: {},
  methods: {
    completeWorkout() {
      if (!this.newStat.time) {
        delete this.newStat.time;
      }
      this.$store.dispatch("saveStats", this.newStat);
    }
  },
  props: [],
  components: {}
};
</script>


<style scoped>
/* .btn-fixer {
  margin: 2px 1px 2px 1px;
  font-size: 12px;
} */
/* div.modal-content {
  background-color: #f7f4f3;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
} */
.modal-content {
  background-color: black;
}
.form-group-inline {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.title {
  width: 100%;
}
</style>