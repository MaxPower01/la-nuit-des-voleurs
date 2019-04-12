<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getFirestoreData");
  }
};
</script>

<style lang="scss">
body {
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  margin: 0 !important;
  padding: 0 !important;
  // background-image: url("assets/background-code-binaire.jpg");
  color: #f0f0f0;
  height: 100vh;
  width: 100vw !important;
  overscroll-behavior-y: none;
}

#app {
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

.flex-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.full-height {
  height: 100%;
}

h1 {
  font-size: 1.5em;
}
</style>
