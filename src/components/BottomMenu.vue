<template>
  <nav class="bottom-menu">
    <div class="flex-container">
      <div class="icon-container" v-on:click="displayHacking()">
        <img
          v-if="activeSection === 'hacking'"
          src="../assets/icon-hacking-active.png"
          alt="Hacking"
          class="icon"
        />
        <img
          v-else
          src="../assets/icon-hacking.png"
          alt="Hacking"
          class="icon icon-side"
        />
      </div>
      <div class="icon-container" v-on:click="displayList()">
        <img
          v-if="activeSection === 'list'"
          src="../assets/liste-active.png"
          alt="List"
          class="icon"
        />
        <img
          v-else
          src="../assets/liste.png"
          alt="List"
          class="icon icon-side"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "bottom-menu",

  computed: {
    activeSection() {
      return this.$store.getters.menu.activeSection;
    }
  },

  methods: {
    displayHacking() {
      this.$store.dispatch("displaySection", "hacking");
      navigator.vibrate(10);
    },

    displayList() {
      this.$store.dispatch("displaySection", "list");
      navigator.vibrate(10);
    }
  }
};
</script>

<style lang="scss">
$icon-width: 25%;
$icon-container-width: 50%;

.bottom-menu {
  background: #242424;
  position: fixed;
  bottom: 0;
  height: 100px;
  border-top: solid 2px;
}

.flex-container {
  margin: auto;
}

.icon-container {
  width: $icon-container-width;
}

.icon {
  width: $icon-width;
  margin: auto;
}
</style>
