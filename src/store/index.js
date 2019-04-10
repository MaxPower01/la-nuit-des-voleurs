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
    transfering: false,

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
      timeLeft: {},
      display: ""
    },

    accounts: []
  },

  getters: {
    hacking(state) {
      return state.hacking;
    },

    transfering(state) {
      return state.transfering;
    },

    user(state) {
      return state.user;
    },

    cash(state) {
      return state.user.cash;
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
    updateUserCash(context, cash) {
      context.commit("cashUpdated", cash);
    },

    updateFirestoreCash(firestoreCash) {
      db.collection("users")
        .doc("UfoRMZX1Asw7ADsdQXer")
        .set(
          {
            cash: firestoreCash
          },
          {
            merge: true
          }
        );
    },

    hackingTrue(context) {
      context.commit("hackingTrue");
    },

    hackingFalse(context) {
      context.commit("hackingFalse");
    },

    transferingTrue(context) {
      context.commit("transferingTrue");
    },

    transferingFalse(context) {
      context.commit("transferingFalse");
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
              password: doc.data().password,
              transfered: false,
              transferingLevel: 0
            };
            accounts.push(account);
          });
          context.commit("setAccounts", accounts);
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

      db.collection("pieceMaitresse")
        .doc("5VGRMPkX5JKpsxLDTDFw")
        .get()
        .then(doc => {
          const timeLeft = {
            seconds: doc.data().timeLeft.seconds,
            minutes: doc.data().timeLeft.minutes
          };
          context.commit("setTimer", timeLeft);
        });
    },

    updateTimer(context) {
      context.commit("timerUpdated");
    },

    resetTimer(context) {
      context.commit("timerReset");
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

    incrementTransferingLevel(context, transferedAccount) {
      context.commit("transferingLevelIncremented", transferedAccount);
    },

    hackAccount(context, hackedAccount) {
      context.commit("accountHacked", hackedAccount);
    },

    transferAccount(context, transferedAccount) {
      context.commit("accountTransfered", transferedAccount);
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

      db.collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            var docRef = db.collection("users").doc(doc.id);
            return docRef.update({
              cash: 0
            });
          });
        });

      db.collection("pieceMaitresse")
        .doc("5VGRMPkX5JKpsxLDTDFw")
        .set(
          {
            timeLeft: {
              seconds: 0,
              minutes: 60
            }
          },
          {
            merge: true
          }
        );
    }
  },

  mutations: {
    cashUpdated(state, cash) {
      state.user.cash += cash;
      const firestoreCash = state.user.cash;
      db.collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            var docRef = db.collection("users").doc(doc.id);
            return docRef.update({
              cash: firestoreCash
            });
          });
        });
    },

    hackingTrue(state) {
      state.hacking = true;
    },

    hackingFalse(state) {
      state.hacking = false;
    },

    transferingTrue(state) {
      state.transfering = true;
    },

    transferingFalse(state) {
      state.transfering = false;
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

    setTimer(state, timeLeft) {
      state.timer.timeLeft = timeLeft;
    },

    timerUpdated(state) {
      let seconds;
      let minutes;

      state.timer.timeLeft.seconds--;
      seconds = state.timer.timeLeft.seconds;
      minutes = state.timer.timeLeft.minutes;

      if (state.timer.timeLeft.seconds < 0) {
        state.timer.timeLeft.minutes--;
        state.timer.timeLeft.seconds = 59;
        seconds = state.timer.timeLeft.seconds;
        minutes = state.timer.timeLeft.minutes;
      }

      if (state.timer.timeLeft.seconds < 10) {
        state.timer.display = `${state.timer.timeLeft.minutes} : 0${
          state.timer.timeLeft.seconds
        }`;
      } else {
        state.timer.display = `${state.timer.timeLeft.minutes} : ${
          state.timer.timeLeft.seconds
        }`;
      }

      db.collection("pieceMaitresse")
        .doc("5VGRMPkX5JKpsxLDTDFw")
        .set(
          {
            timeLeft: {
              seconds: seconds,
              minutes: minutes
            }
          },
          {
            merge: true
          }
        );
    },

    timerReset(state) {
      state.timer.timeLeft.minutes = 60;
      state.timer.timeLeft.seconds = 0;

      db.collection("pieceMaitresse")
        .doc("5VGRMPkX5JKpsxLDTDFw")
        .set(
          {
            timeLeft: {
              seconds: 0,
              minutes: 60
            }
          },
          {
            merge: true
          }
        );
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
      ).hackingLevel += 1;
    },

    transferingLevelIncremented(state, transferedAccount) {
      state.accounts.find(
        account => account.id == transferedAccount.id
      ).transferingLevel += 10;
    },

    accountHacked(state, hackedAccount) {
      state.accounts.find(
        account => account.id == hackedAccount.id
      ).hacked = true;
    },

    accountTransfered(state, transferedAccount) {
      state.accounts.find(
        account => account.id == transferedAccount.id
      ).transfered = true;
    }
  }
});
