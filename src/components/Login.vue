<template>
  <div class="login">
    <img
      src="../assets/logo_Neocuivre_Noir.png"
      alt="Logo Neocuivre"
      class="logoNeo"
    />
    <div class="containerInput">
      <p>Utilisateur</p>
      <!-- Le joueur entre l'utilisateur du comptable-->
      <input readonly type="text" />
      <p>Mot de passe</p>
      <!-- Le joueur met le mot de passe du comptable-->
      <input readonly type="text" />
    </div>
    <!-- se connect à la section logiciel-->
    <button class="connexion-button">Connexion</button>
  </div>
</template>

<script>
export default {
  name: "computer",

  data() {
    return {
      connected: true,
      // Les données qui sont affichées sur l'interface et qui peuvent changer
      title: "Liste de comptes bancaires",
      nom: "Nom du compte Bancaire",
      argent: 20000,
      progressBarWidth: 0,
      banque: "Banque National du Canada",
      etat: "Pas Transferé"
    };
  },

  computed: {
    progressBarPercentage() {
      return "width:" + this.progressBarWidth + "%";
    },

    hackedAccounts() {
      return this.$store.getters["LaNuitDesVoleurs/hackedAccounts"];
    }
  }
};
</script>

<style scoped lang="scss">
.computer {
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
.patche {
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

input[type="text"] {
  background-color: #f8f8f8;
  box-sizing: border-box;
  border: 2px solid #a0a0a0;
  border-radius: 10px;
  color: #242424;
  padding: 7px 10px;
  text-align: center;
}

input[type="text"]:focus {
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

.containerEntreDonner {
  background-color: #ececec;
  /* height: 100%; */
  padding-left: 20%;
  padding-right: 2%;
  padding-bottom: 2%;
}
.id {
  text-align: center;
}
.idVers {
  text-align: center;
  padding-top: 4%;
}
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
}
.containerBouton {
  padding-top: 2%;
  display: flex;
  justify-content: flex-end;
}
.buttonAjouter {
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

.data-container {
  display: flex; /* or inline-flex */
  justify-content: space-between;
}

.data-info {
  text-align: left;
  padding-left: 3ch;
}

.data {
  text-align: left;
  padding: 1ch;
  margin-top: -2ch;
  padding-left: 3ch;
  padding-right: 3ch;
}

.data-container-info {
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
