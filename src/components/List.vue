<template>
  <div class="list">
    <div
      v-for="account in availableAccounts"
      :key="account.id"
      class="account-container"
    >
      <table>
        <tr>
          <th>Numéro de compte :</th>
          <td align="right">{{ account.number }}</td>
        </tr>
        <tr>
          <th>Mot de passe :</th>
          <td align="right" v-if="!account.hacked">**********</td>
          <td align="right" v-else>{{ account.password }}</td>
        </tr>
      </table>

      <div class="actions-container">
        <!-- <div v-if="account.hackingLevel > 0" class="loading">
          <div class="progress-bar" :style="{ width: account.hackingLevel + '%' }"></div>
        </div>-->
        <div v-if="account.hackingLevel > 0">
          <div class="progress2 progress-moved">
            <div
              class="progress-bar2"
              :style="{ width: account.hackingLevel + '%' }"
            ></div>
          </div>
        </div>
        <div>
          <span
            readonly
            v-if="account.hackingLevel == 0"
            class="account-button"
            @click="hack(account)"
            >Pirater</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",

  computed: {
    hacking() {
      return this.$store.getters.hacking;
    },

    availableAccounts() {
      return this.$store.getters.availableAccounts;
    },

    accounts() {
      return this.$store.getters.accounts;
    }
  },

  methods: {
    hack(hackedAccount) {
      if (!this.hacking) {
        navigator.vibrate(10);
        this.$store.dispatch("hackingTrue");
        let i = 0;
        let interval = setInterval(() => {
          this.$store.dispatch("incrementhackingLevel", hackedAccount);
          // TODO : Réétablir les bonnes valeurs de "i" ici et le niveau d'incrémentation dans le store
          i += 1;
          if (i == 100) {
            clearInterval(interval);
            this.$store.dispatch("hackingFalse");
            this.$store.dispatch("hackAccount", hackedAccount);
            this.$store.dispatch("updateFirestoreAccount", hackedAccount);
          }
        }, 1000);
      }
    }
  }
};
</script>

<style scoped lang="scss">
$timer-height: 82px;
$menu-height: 102px;

.list {
  padding-top: $timer-height;
  padding-bottom: $menu-height;
  height: calc(100% - 184px);
  overflow: scroll;
}

.account-container {
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #fafafa;
}

table {
  width: 100%;
  text-align: left;
}

td {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
}

.actions-container {
  height: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.loading {
  height: 100%;
  background-color: #56c2b070;
  border: 2px solid #56c2b0;
  box-sizing: 100%;
  margin-right: 1ch;
  margin-left: 1ch;
}

.progress-bar {
  height: 100%;
  background-color: #56c2b0;
}

.account-button {
  background-color: #1c4b43;
  border: solid 1px;
  cursor: pointer;
  color: #56c2b0;
  text-decoration: none;
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  font-size: 1.5em;
  height: 100%;
  padding-bottom: 2px;
  padding-top: 2px;
  padding-left: 7px;
  padding-right: 7px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// PROGRESS BAR
.progress2 {
  padding: 6px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar2 {
  height: 18px;
  border-radius: 30px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  transition: 1s linear;
  transition-property: width, background-color;
}

.progress-moved .progress-bar2 {
  width: 85%;
  background-color: #56c2b0;
}

@keyframes progressAnimation {
  0% {
    width: 5%;
    background-color: #56c2b0;
  }
  100% {
    width: 85%;
    background-color: #56c2b0;
  }
}
</style>
