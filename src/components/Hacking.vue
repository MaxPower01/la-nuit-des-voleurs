<template>
  <div class="hacking">
    <div class="flex-container text-center">
      <div class="container">
        <div class="input-container">
          <input
            readonly
            type="text"
            v-model="input"
            placeholder="Numéro de compte"
          />
        </div>
        <keyboard
          v-on:keyPressed="updateInput($event)"
          v-on:codeSubmitted="verifyCode()"
          v-on:codeReseted="resetInputCode()"
        ></keyboard>
      </div>
    </div>
    <!-- <button @click="reset">RESET</button> -->
  </div>
</template>

<script>
import Keyboard from "@/components/Keyboard.vue";

export default {
  name: "hacking",

  components: {
    Keyboard
  },

  data() {
    return {
      input: "",
      success: false,
      warning: false,
      error: false
    };
  },

  computed: {
    accounts() {
      return this.$store.getters.accounts;
    },

    userCash() {
      return this.$store.getters.user.cash;
    },

    timerIsActive() {
      return this.$store.getters.timer.active === true;
    }
  },

  methods: {
    reset() {
      this.$store.dispatch("reset");
    },

    verifyCode() {
      if (this.input.trim().length === 0) {
        return;
      }
      this.accounts.forEach(account => {
        if (this.input == account.number) {
          if (account.available === false) {
            this.success = true;
            this.$store.dispatch("accessAccount", account);
            this.$store.dispatch("updateFirestoreAccount", account);
          } else {
            this.warning = true;
          }
        } else {
          this.error = true;
        }
      });
      if (this.input == "64685971" && !this.timerIsActive) {
        this.startTimer();
      } else if (this.input == "81975268") {
        this.reset();
      } else if (this.success == true) {
        this.successNotification();
      } else if (this.warning == true) {
        this.warningNotification();
      } else if (this.error == true) {
        this.failureNotification();
      }
      this.resetInputCode();
    },

    startTimer() {
      this.$emit("startTimer");
    },

    updateInput(keyValue) {
      if (this.input.length < 10) {
        this.input += keyValue;
      }
    },

    resetInputCode() {
      this.input = "";
      this.success = false;
      this.warning = false;
      this.error = false;
    },

    successNotification() {
      this.$notify({
        title: "Succès",
        message: "Accès au compte autorisé.",
        type: "success"
      });
    },

    warningNotification() {
      this.$notify({
        title: "Avertissement",
        message: "Compte déjà accessible.",
        type: "warning"
      });
    },

    failureNotification() {
      this.$notify({
        title: "Erreur",
        message: "Numéro de compte invalide.",
        type: "error"
      });
    }
  }
};
</script>

<style scoped lang="scss">
$timer-height: 80px;
$menu-height: 100px;

.hacking {
  padding-top: $timer-height;
  padding-bottom: $menu-height;
  height: calc(100% - 180px);
}

.input-container {
  padding: 10px;
}

input[type="text"] {
  background-color: #242424;
  box-sizing: border-box;
  border: 2px solid #56c2b0;
  color: #f0f0f0;
  width: 100%;
  padding: 15px 10px;
  text-align: center;
  font-family: "Share Tech Mono", monospace;
  font-size: 1.25em;
}

input[type="text"]:focus {
  border-color: #56c2b0;
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #242424;
  border: none;
  color: #56c2b0;
  text-decoration: none;
  cursor: pointer;
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  font-size: larger;
}
</style>
