<template>
  <div class="component">
    <button
    type="button"
    class="btn btn-outline-success" 
    data-toggle="modal" 
    data-target="#finishedWorkout">
    Finish Workout
    </button>
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      id="finishedWorkout"
    >
    <form @submit.prevent="completeWorkout">
      <div class="modal-content form-group rounded input-group-default">
        <div class="modal-header d-flex flex-column">
          <h2>Enter Stats</h2>
          <p>Bench:</p>
          <input
            class="modal-title rounded form-control"
            placeholder="What did you bench?"
            aria-describedby="inputGroup-sizing-default"
            v-model="newStat.bench"
          />
          <p>Push up:</p>
          <input
            class="modal-title rounded form-control"
            placeholder="How many push ups?"
            aria-describedby="inputGroup-sizing-default"
            v-model="newStat.pushUp"
          />
          <p>Squat:</p>
          <input
            class="modal-title rounded form-control"
            placeholder="What did you squat?"
            aria-describedby="inputGroup-sizing-default"
            v-model="newStat.squat"
          />
          <p>Deadlift:</p>
          <input
            class="modal-title rounded form-control"
            placeholder="What did you dead lift?"
            aria-describedby="inputGroup-sizing-default"
            v-model="newStat.deadLift"
          />
          <p>Sit ups:</p>
          <input
            class="modal-title rounded form-control"
            placeholder="How many sit ups today?"
            aria-describedby="inputGroup-sizing-default"
            v-model="newStat.sitUp"
          />
          <p>Pull ups:</p>
          <input
            class="modal-title rounded form-control"
            placeholder="How many pull ups today?"
            aria-describedby="inputGroup-sizing-default"
            v-model="newStat.pullUp"
          />
          <p>Run:</p>
          <div class="row">
            <div class="col-6">
              <input
              class="modal-title rounded form-control"
              placeholder="Minutes?"
              aria-describedby="inputGroup-sizing-default"
              v-model="newStat.minutes"
              />
            </div>
            <div class="col-6">
              <input
                class="modal-title rounded form-control"
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
            class="btn btn-primary"
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
        time: this.minutes + this.seconds/60
      },
    };
  },
  computed: {},
  methods: {
    completeWorkout() {
      if(!this.newStat.time) {
        delete this.newStat.time
      }
      this.$store.dispatch("saveStats", this.newStat);
    }
  },
  props: [],
  components: {}
};
</script>


<style scoped>
.btn-fixer {
  margin: 2px 1px 2px 1px;
  font-size: 12px;
}
div.modal-content {
  background-color: #f7f4f3;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>