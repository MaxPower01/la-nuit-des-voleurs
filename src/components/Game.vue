<template>
  <div class="game full-height">
    <timer></timer>
    <hacking
      v-if="activeSection === 'hacking'"
      v-on:startTimer="startTimer"
    ></hacking>
    <list v-else-if="activeSection === 'list'"></list>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
import Timer from "@/components/piece-maitresse/Timer.vue";
import Hacking from "@/components/piece-maitresse/Hacking.vue";
import List from "@/components/piece-maitresse/List.vue";
import BottomMenu from "@/components/piece-maitresse/BottomMenu.vue";

export default {
  name: "game",

  components: {
    Timer,
    Hacking,
    List,
    BottomMenu
  },

  created() {
    this.$store.dispatch("LaNuitDesVoleurs/getFirestoreAccounts");
  },

  computed: {
    activeSection() {
      return this.$store.getters["LaNuitDesVoleurs/menu"].activeSection;
    }
  },

  methods: {
    startTimer() {
      this.$options.interval = setInterval(this.updateTimer, 1000);
    },

    updateTimer() {
      this.$store.dispatch("LaNuitDesVoleurs/updateTimer");
    }
  },

  beforeDestroy() {
    clearInterval(this.$options.interval);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// ...
</style>
