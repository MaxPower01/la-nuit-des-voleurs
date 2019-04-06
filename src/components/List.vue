<template>
  <div class="list">
    <div
      v-for="account in availableAccounts"
      :key="account.id"
      class="account-container"
    >
      <table>
        <tr>
          <th>Propriétaire</th>
          <td>{{ account.owner }}</td>
        </tr>
        <tr>
          <th>Banque</th>
          <td>{{ account.bank }}</td>
        </tr>
        <tr>
          <th>Compte</th>
          <td>{{ account.number }}</td>
        </tr>
        <tr>
          <th>Mot de passe</th>
          <td v-if="!account.hacked">**********</td>
          <td v-else>{{ account.password }}</td>
        </tr>
      </table>

      <div class="account-actions">
        <div v-if="account.hackingLevel > 0" class="loading">
          <div
            class="progress-bar"
            :style="{ width: account.hackingLevel + '%' }"
          ></div>
        </div>
        <div class="buttons">
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

    progressBarPercentage() {
      return "width:" + this.progressBarWidth + "%";
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
        this.$store.dispatch("hackingTrue");
        let i = 0;
        let interval = setInterval(() => {
          this.$store.dispatch("incrementhackingLevel", hackedAccount);
          // TODO : Réétablir les bonnes valeurs de "i" ici et le niveau d'incrémentation dans le store
          i += 1;
          if (i == 10) {
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
$timer-height: 80px;
$menu-height: 100px;

.list {
  padding-top: $timer-height;
  padding-bottom: $menu-height;
}

.account-container {
  text-align: center;
  /*padding-left: 2ch;*/
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

.account-actions {
  height: 25px;
  margin-top: 5px;
  margin-bottom: 5px;
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
  background-color: #56c2b04b;
  border: solid;
  cursor: pointer;
  color: #56c2b0;
  text-decoration: none;
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  font-size: 1.5em;
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
