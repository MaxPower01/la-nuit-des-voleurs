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
    <vue-particles
      color="#56c2b0"
      linesColor="#56c2b0"
      :particleSize="2"
      :particleOpacity="0.3"
      :lineOpacity="0.3"
      :linesDistance="200"
      :moveSpeed="2"
      class="particles"
    ></vue-particles>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import Hacking from "@/components/Hacking.vue";
import List from "@/components/List.vue";
import BottomMenu from "@/components/BottomMenu.vue";
import {
  // fb,
  db
} from "../firebase";

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
    db.collection("users")
      .doc("UfoRMZX1Asw7ADsdQXer")
      .onSnapshot(doc => {
        // console.log("Current data: ", doc.data().cash);
        this.$store.dispatch("updateUserCashLocal", doc.data().cash);
      });
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
// .mobile {
//   background-image: url("../assets/coding-background-1.jpg");
// }

.particles {
  position: absolute;
  z-index: -999;
  height: calc(100% - 10px);
  width: 100%;
  left: 0;
  top: 0;
  background-color: #242424;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
