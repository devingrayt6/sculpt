<template>
  <div>
    <div>
      <h3 class="text-center mt-2">{{todaysDate}}</h3>
    </div>
    <div class="row">
      <div offset-2 col-8>
        <h2 class="overlay">Todays Workout</h2>
        <img
          class="todays-workout"
          src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  mounted: {},
  computed: {},
  methods: {},
  data() {
    return {
      todaysDate: `${new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/")
        .split("/")
        .reverse()
        .join("/")}`
    };
  }
};
</script>

<style scoped>
.overlay {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 50;
  text-align: center;
  color: white;
}
.todays-workout {
}
</style>