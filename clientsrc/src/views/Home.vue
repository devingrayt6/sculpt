<template>
  <div class="home container-fluid">
    <div class="row home-row">
      <video autoplay muted loop id="myVideo">
        <source src="../../public/Boxing-gym.mp4" type="video/mp4" />
      </video>
      <button class="btn btn-secondary">Sign up</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped>
.home-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(53, 51, 51, 0.596);
}
video {
  z-index: -1;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
}
home {
  max-height: 100vh;
  max-width: 100vw;
}
</style>
