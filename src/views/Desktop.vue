<template>
  <div class="desktop">
    <!-- Login -->
    <div v-if="!connected">
      <div class="patch"></div>
      <login v-on:connected="connect"></login>
    </div>
    <!-- ./Login -->

    <!-- Logiciel -->
    <div v-else class="logiciel">
      <!-- Menu -->
      <div class="menu">
        <div class="contenerLogoBlanc">
          <img
            src="../assets/logo_Neocuivre_Blanc.png"
            alt="logo"
            class="logoBlanc"
          />
        </div>
        <!-- Une compilation du cash total ammasser dans notre téléversement -->
        <h1 class="cashTotal">Argent transféré</h1>
        <p class="cashTotal">{{ cash }} $</p>
        <!-- une option pour se déconnecter lorsqu'on a fini -->
        <h4 class="deconnexion">Déconnexion</h4>
      </div>
      <!-- ./Menu -->

      <!-- Nouveau compte -->
      <div class="new-account-container">
        <div class="flex-container">
          <div class="text-center">
            <h3>Numéro de compte</h3>
            <input
              v-model="accountInput"
              type="text"
              placeholder="Numéro de compte"
            />
          </div>
          <div class="text-center">
            <h3>Mot de passe</h3>
            <input
              v-model="passwordInput"
              type="password"
              placeholder="Mot de passe"
            />
          </div>
        </div>
        <div class="button-container">
          <button class="button-add" @click="addAccount">
            Accéder au compte
          </button>
        </div>
      </div>
      <!-- ./Nouveau compte -->

      <!-- Liste -->
      <div class="list">
        <!-- Account -->
        <div
          class="account"
          v-for="account in availableAccounts"
          :key="account.id"
        >
          <!-- Informations -->
          <div class="account-container">
            <div class="account-data">
              <h4>Propriétaire</h4>
              <p>{{ account.owner }}</p>
            </div>
            <div class="account-data">
              <h4>Banque</h4>
              <p>{{ account.bank }}</p>
            </div>
            <div class="account-data">
              <h4>Solde</h4>
              <p>{{ account.cash }} $</p>
            </div>
            <div class="account-data">
              <h4>État</h4>
              <p v-if="account.transfered == true">Transféré</p>
              <p v-else>Accessible</p>
            </div>
          </div>
          <!-- ./Informations -->

          <!-- Téléchargement -->
          <div class="loading-container">
            <div
              class="progress-bar"
              :style="{ width: account.transferingLevel + '%' }"
            ></div>
          </div>
          <button
            v-if="progressBarWidth != 100"
            class="account-button"
            @click="transfer(account)"
          >
            Transférer
          </button>
          <button v-else class="account-button-terminer">
            Transfert terminé
          </button>
          <!-- ./Téléchargement -->
        </div>
        <!-- ./Account -->
      </div>
      <!-- ./Liste -->
    </div>
    <!-- ./Logiciel -->
  </div>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  name: "desktop",

  components: {
    Login
  },

  data() {
    return {
      connected: false,
      accountInput: "",
      passwordInput: "",
      availableAccounts: [],
      progressBarWidth: 0
    };
  },

  computed: {
    progressBarPercentage() {
      return "width:" + this.progressBarWidth + "%";
    },

    accounts() {
      return this.$store.getters.accounts;
    },

    transfering() {
      return this.$store.getters.transfering;
    },

    cash() {
      return this.$store.getters.cash;
    }
  },

  created() {
    this.$store.dispatch("getFirestoreData");
  },

  methods: {
    // TODO : Mettre à jour l'utilisateur et les comptes lorsqu'il y a transfert
    connect() {
      this.connected = true;
    },

    addAccount() {
      let number;

      this.availableAccounts.forEach(account => {
        if (account.number == this.accountInput) {
          number = account.number;
        }
      });

      this.accounts.forEach(account => {
        if (
          account.number == this.accountInput &&
          account.password == this.passwordInput &&
          account.number != number
        ) {
          this.availableAccounts.push(account);
        }
      });

      this.resetAccountInputs();
    },

    resetAccountInputs() {
      this.accountInput = "";
      this.passwordInput = "";
    },

    transfer(transferedAccount) {
      if (!this.transfering) {
        this.$store.dispatch("transferingTrue");
        let i = 0;
        let interval = setInterval(() => {
          this.$store.dispatch("incrementTransferingLevel", transferedAccount);
          // TODO : Réétablir les bonnes valeurs de "i" ici et le niveau d'incrémentation dans le store
          i += 1;
          if (i == 10) {
            clearInterval(interval);
            this.$store.dispatch("transferingFalse");
            this.$store.dispatch("transferAccount", transferedAccount);
            this.$store.dispatch("updateFirestoreAccount", transferedAccount);
            this.$store.dispatch("updateUserCash", transferedAccount.cash);
          }
        }, 1000);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.desktop {
  text-align: left;
  margin: 0 !important;
  padding: 0 !important;
  background-color: #f8f8f8 !important;
  color: #242424;
  min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: 100%;
  width: 100vw !important;
  font-size: 1em;
  font-family: "Roboto", sans-serif;
}
h2 {
  margin-top: 1%;
}
h1 {
  margin-top: 1%;
  color: #242424;
}
.patch {
  background-color: #f8f8f8;
  width: 100%;
  height: 5%;
  margin-top: -1.5ch;
  position: absolute;
  top: 0px;
}
// page 1

.containerConnect {
  text-align: center;
  width: 100%;
}

.logoNeo {
  width: 20%;
  height: auto;
  padding-top: 200px;
  padding-bottom: 50px;
}

.containerInput {
  text-align: center;
  width: auto;
  border-top: 1px solid #e0e0e0;
}

.containerInput p {
  font-weight: bold;
}

.connexion-button {
  background-color: #ececec;
  border: 2px solid #a0a0a0;
  border-radius: 9px;
  color: #a0a0a0;
  text-decoration: none;
  margin-top: 35px !important;
  padding: 7px 10px;
  padding-left: 50px;
  padding-right: 50px;
  //cursor: pointer;
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  font-size: 1em;
  margin-top: 2%;
}

#idConnexion {
  text-align: center;
  width: auto;
}

//page 2

input {
  background-color: #f8f8f8;
  box-sizing: border-box;
  border: 2px solid #a0a0a0;
  border-radius: 10px;
  color: #242424;
  padding: 7px 10px;
  text-align: center;
}

input:focus {
  border-color: #242424;
}

.menu {
  background-color: #242424;
  width: 20%;
  height: 100ch;
  position: fixed;
  top: 0px;
}
.contenerLogoBlanc {
  text-align: center;
  width: 100%;
  padding-top: 4%;
}
.logoBlanc {
  text-align: center;
  width: 85%;
  padding-bottom: 5ch;
  border-bottom: 1px solid #696969;
}

.new-account-container {
  background-color: #ececec;
  /* height: 100%; */
  padding-left: 20%;
  padding-right: 2%;
  padding-bottom: 2%;
}
.text-center {
  text-align: center;
}
.text-center-alt {
  text-align: center;
  padding-top: 4%;
}
.flex-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
}
.button-container {
  padding-top: 2%;
  display: flex;
  justify-content: flex-end;
}
/* .button-add {
  background-color: #f8f8f8;
  border: 2px solid #a0a0a0;
  border-radius: 16px;
  color: #242424;
  cursor: pointer;
  text-decoration: none;
  padding-right: 20px;
  padding-left: 20px;
  font-size: 1em;
  font-family: "Roboto", sans-serif;
  text-align: center;
  display: flex;
  justify-content: flex-end;
} */

button {
  background-color: #ececec;
  border: 2px solid #a0a0a0;
  border-radius: 9px;
  color: #a0a0a0;
  text-decoration: none;
  margin-top: 35px !important;
  padding: 7px 10px;
  padding-left: 50px;
  padding-right: 50px;
  cursor: pointer;
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  font-size: 1em;
  margin-top: 2%;
}
.cashTotal {
  margin-top: 10%;
  display: flex;
  justify-content: center;
  color: #f8f8f8;
}
.deconnexion {
  margin-top: 50ch;
  display: flex;
  justify-content: center;
  color: #5c5c5c;
}

//liste de comptes
.list {
  padding-left: 20%;
  background-color: #f8f8f8;
}

.account {
  text-align: center;
  /*padding-left: 2ch;*/
  padding-bottom: 2ch;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f8f8f8;
}

.login {
  text-align: center;
  /*padding-left: 2ch;*/
  padding-bottom: 2ch;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f8f8f8;
}

.account-container {
  display: flex; /* or inline-flex */
  justify-content: space-between;
}

.account-data h4 {
  text-align: left;
  padding-left: 3ch;
}

.account-data p {
  text-align: left;
  padding: 1ch;
  margin-top: -2ch;
  padding-left: 3ch;
  padding-right: 3ch;
}

.account-container-info {
  display: flex; /* or inline-flex */
  justify-content: space-between;
}

.loading-container {
  background-color: #ececec;
  border: 2px solid #88df8e;
  box-sizing: 100%;
  margin-right: 3ch;
  margin-left: 3ch;
}

.progress-bar {
  background-color: #88df8e;
  /*  -webkit-box-sizing: 100%;
    box-sizing: 100%;
    width: 100%;*/
  padding-top: 1%;
  padding-bottom: 1%;
}

.account-button {
  background-color: #ececec;
  border: 2px solid #a0a0a0;
  border-radius: 16px;
  color: #a0a0a0;
  text-decoration: none;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  font-size: 1em;
  margin-top: 2%;
}

.account-button-terminer {
  background-color: #ececec;
  border: 2px solid #88df8e;
  border-radius: 16px;
  color: #88df8e;
  text-decoration: none;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  font-size: 1em;
  margin-top: 2%;
}
</style>
