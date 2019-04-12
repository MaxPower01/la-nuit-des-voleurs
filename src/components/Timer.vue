<template>
  <div class="timer">
    <!-- Il faudrait utiliser une typographie monospace pour l'affichage du temps -->
    <div class="flex-container">
      <table>
        <tr>
          <th align="left">Temps restant</th>
          <th align="right">Argent collecté</th>
        </tr>
        <tr>
          <td align="left">{{ timeLeftString }}</td>
          <td align="right">{{ cash }} $</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "timer",
  computed: {
    timeLeftString() {
      return this.$store.getters.timer.display;
    },

    cash() {
      return this.$store.getters.cash;
    }
  }
};
</script>

<style scoped lang="scss">
.timer {
  border-bottom: solid 2px;
  top: 0;
  position: fixed;
  width: 100%;
  height: 80px;
  text-align: center;
  background: #242424;
  overflow: hidden;
}

table {
  width: 90%;
}

th,
td {
  padding: 5px;
}
</style>
