import Vue from "vue";
import Vuex from "vuex";
import {
  // fb,
  db
} from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hacking: false,

    user: {
      name: "",
      cash: 0,
      timeWhenFinished: ""
    },

    menu: {
      activeSection: "hacking"
    },

    timer: {
      active: false,
      timeLeft: {
        seconds: 0,
        minutes: 60,
        display: "60 : 00"
      }
    },

    accounts: []
  },

  getters: {
    hacking(state) {
      return state.hacking;
    },

    user(state) {
      return state.user;
    },

    menu(state) {
      return state.menu;
    },

    timer(state) {
      return state.timer;
    },

    accounts(state) {
      return state.accounts;
    },

    availableAccounts(state) {
      return state.accounts.filter(account => account.available === true);
    },

    hackedAccounts(state) {
      return state.accounts.filter(account => account.hacked === true);
    }
  },

  actions: {
    hackingTrue(context) {
      context.commit("hackingTrue");
    },

    hackingFalse(context) {
      context.commit("hackingFalse");
    },

    getFirestoreData(context) {
      const accounts = [];

      db.collection("accounts")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const account = {
              id: doc.id,
              available: doc.data().available,
              bank: doc.data().bank,
              cash: doc.data().cash,
              hacked: doc.data().hacked,
              hackingLevel: doc.data().hackingLevel,
              number: doc.data().number,
              owner: doc.data().owner,
              password: doc.data().password
            };
            accounts.push(account);
          });
        });

      db.collection("users")
        .doc("UfoRMZX1Asw7ADsdQXer")
        .get()
        .then(doc => {
          const user = {
            id: doc.id,
            name: doc.data().name,
            cash: doc.data().cash,
            timeWhenFinished: doc.data().timeWhenFinished
          };
          context.commit("setUser", user);
        });

      context.commit("setAccounts", accounts);
    },

    updateTimer(context) {
      context.commit("timerUpdated");
    },

    accessAccount(context, accessedAccount) {
      context.commit("accountAccessed", accessedAccount);
    },

    getAccountCash(context, cash) {
      context.commit("gotAccountCash", cash);
    },

    displaySection(context, section) {
      context.commit("sectionDisplayed", section);
    },

    incrementhackingLevel(context, hackedAccount) {
      context.commit("hackingLevelIncremented", hackedAccount);
    },

    hackAccount(context, hackedAccount) {
      context.commit("accountHacked", hackedAccount);
    },

    updateFirestoreAccount(context, account) {
      db.collection("accounts")
        .doc(account.id)
        .set(account);
    },

    reset() {
      db.collection("accounts")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            var docRef = db.collection("accounts").doc(doc.id);
            return docRef.update({
              available: false,
              hacked: false,
              hackingLevel: 0,
              transfered: false,
              transferingLevel: 0
            });
          });
        });
    }
  },

  mutations: {
    hackingTrue(state) {
      state.hacking = true;
    },

    hackingFalse(state) {
      state.hacking = false;
    },

    connected(state) {
      state.connected = true;
    },

    setAccounts(state, accounts) {
      state.accounts = accounts;
    },

    setUser(state, user) {
      state.user = user;
    },

    timerUpdated(state) {
      state.timer.timeLeft.seconds--;

      if (state.timer.timeLeft.seconds < 0) {
        state.timer.timeLeft.minutes--;
        state.timer.timeLeft.seconds = 59;
      }

      if (state.timer.timeLeft.seconds < 10) {
        state.timer.timeLeft.display = `${state.timer.timeLeft.minutes} : 0${
          state.timer.timeLeft.seconds
        }`;
      } else {
        state.timer.timeLeft.display = `${state.timer.timeLeft.minutes} : ${
          state.timer.timeLeft.seconds
        }`;
      }
    },

    accountAccessed(state, accessedAccount) {
      const account = state.accounts.find(
        account => account.id == accessedAccount.id
      );
      account.available = true;
    },

    gotAccountCash(state, cash) {
      state.user.cash += cash;
    },

    sectionDisplayed(state, section) {
      state.menu.activeSection = section;
    },

    hackingLevelIncremented(state, hackedAccount) {
      state.accounts.find(
        account => account.id == hackedAccount.id
      ).hackingLevel += 10;
    },

    accountHacked(state, hackedAccount) {
      state.accounts.find(
        account => account.id == hackedAccount.id
      ).hacked = true;
    }
  }
});
