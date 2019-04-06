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
    },

    displayList() {
      this.$store.dispatch("displaySection", "list");
    }
  }
};
</script>

<style lang="scss">
$icon-width: 25%;
$icon-container-width: 50%;

.bottom-menu {
  background: #242424;
  bottom: 0;
  position: fixed;
  height: 100px;
  border-top: solid;
  overflow: hidden;
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
