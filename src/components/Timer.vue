<template>
  <div class="timer">
    <!-- Il faudrait utiliser une typographie monospace pour l'affichage du temps -->
    <div class="flex-container">
      <h1>{{ timeLeftString }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "timer",
  computed: {
    timeLeftString() {
      return this.$store.getters.timer.timeLeft.display;
    }
  }
};
</script>

<style scoped lang="scss">
.timer {
  border-bottom: solid;
  top: 0;
  position: fixed;
  width: 100%;
  height: 80px;
  text-align: center;
  background: #242424;
}

h1 {
  text-align: center;
}
</style>
