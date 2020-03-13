<template>
  <div class="Chart">
    <div class="col-12">
      <div class="card mt-3">
        <div class="card-body">
          <p>Stats</p>
          <h2>GRAPH</h2>
          <!-- graph data comes in here -->
          <p class="text-black">Top weight: {{chartData}} </p>
          <canvas id="myChart" width="400" height="400"></canvas>
          <p></p>
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
  data(){
    return {
    }
  },
  mounted(){
    const ctx = document.getElementById('myChart')
    const myChart = new Chart(ctx,{
      type: "line",
      data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of votes',
      data: [12,19,3,4,7,11],
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
                }
            }]
        }
    }
    });
  },
  props: ["chartData"],
  methods:{
  }
}
</script>


<style scoped>

</style>