<template>
  <div class="mobile full-height">
    <timer></timer>
    <transition name="fade" mode="out-in">
      <hacking
        v-if="activeSection === 'hacking'"
        v-on:startTimer="startTimer"
        v-on:stopTimer="stopTimer"
      ></hacking>
      <list v-if="activeSection === 'list'"></list>
    </transition>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import Hacking from "@/components/Hacking.vue";
import List from "@/components/List.vue";
import BottomMenu from "@/components/BottomMenu.vue";

export default {
  name: "mobile",

  components: {
    Timer,
    Hacking,
    List,
    BottomMenu
  },

  created() {
    this.startTimer();
  },

  computed: {
    activeSection() {
      return this.$store.getters.menu.activeSection;
    }
  },

  methods: {
    startTimer() {
      this.$options.interval = setInterval(this.updateTimer, 1000);
    },

    updateTimer() {
      this.$store.dispatch("updateTimer");
    },

    stopTimer() {
      clearInterval(this.$options.interval);
      this.$store.dispatch("resetTimer");
    }
  },

  beforeDestroy() {
    clearInterval(this.$options.interval);
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
