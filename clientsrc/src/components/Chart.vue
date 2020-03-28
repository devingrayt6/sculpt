<template>
  <div class="Chart">
    <div class="col-12">
      <div class="card mt-3">
        <div class="card-body">
          <p>Stats</p>
          <h2>GRAPH</h2>
          <!-- graph data comes in here -->
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import Chart from "chart.js"
  // let ctx= document.getElementById('myChart')
export default {
  name: 'Chart',
  mounted() {
    this.graphJS()
  },
  data(){
    return {
      activeStatData: this.$store.state.activeStat
    }
  },
  watch: {activeStat: function(){this.graphJS()}},
  methods: {
    graphJS(){
    const ctx = document.getElementById('myChart')
    const myChart = new Chart(ctx,{
      type: "line",
      data: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
    datasets: [{
      label: '# of times completed',
      data: this.statistics,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
        }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
                },
            scaleLabel: {
              display: true,
              labelString: 'Weight'
            }
            }]
        }
    }
    });
  },
},
  props: ["statistics"],
  computed: {
    activeStat() {
      return this.$store.state.activeStat

    }
  }
}
</script>


<style scoped>

</style>