<template>
  <div class="keyboard">
    <table readonly>
      <tr>
        <td v-on:click="emulateKey('0')">0</td>
        <td v-on:click="emulateKey('1')">1</td>
        <td v-on:click="emulateKey('2')">2</td>
        <td v-on:click="emulateKey('3')">3</td>
        <td v-on:click="emulateKey('4')">4</td>
      </tr>
      <tr>
        <td v-on:click="emulateKey('5')">5</td>
        <td v-on:click="emulateKey('6')">6</td>
        <td v-on:click="emulateKey('7')">7</td>
        <td v-on:click="emulateKey('8')">8</td>
        <td v-on:click="emulateKey('9')">9</td>
      </tr>
    </table>

    <table readonly>
      <tr>
        <td v-on:click="submit">
          <i class="el-icon-check"></i>
        </td>
        <td v-on:click="resetCode">
          <i class="el-icon-close"></i>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "keyboard",

  data() {
    return {
      inputCode: ""
    };
  },

  methods: {
    emulateKey(keyValue) {
      this.$emit("keyPressed", keyValue);
      navigator.vibrate(10);
    },

    submit() {
      this.$emit("codeSubmitted");
      navigator.vibrate(10);
    },

    resetCode() {
      this.$emit("codeReseted");
      navigator.vibrate(10);
    }
  }
};
</script>

<style scoped lang="scss">
table {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}

td {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #1c4b43;
  border: 2px solid #56c2b0;
  color: #00dbb7;
  cursor: pointer;
}
</style>
