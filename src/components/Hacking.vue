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
      error: false,
      notificationDuration: 2000
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
      this.$emit("stopTimer");
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
      if (this.input == "666") {
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
        type: "success",
        duration: this.notificationDuration,
        offset: 100
      });
    },

    warningNotification() {
      this.$notify({
        title: "Avertissement",
        message: "Compte déjà accessible.",
        type: "warning",
        duration: this.notificationDuration,
        offset: 100
      });
    },

    failureNotification() {
      this.$notify({
        title: "Erreur",
        message: "Numéro de compte invalide.",
        type: "error",
        duration: this.notificationDuration,
        offset: 100
      });
    }
  }
};
</script>

<style scoped lang="scss">
$timer-height: 82px;
$menu-height: 102px;

.hacking {
  padding-top: $timer-height;
  padding-bottom: $menu-height;
  height: calc(100% - 184px);
  overflow: scroll;
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
