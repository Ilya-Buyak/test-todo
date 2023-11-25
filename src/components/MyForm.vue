<template>
  <form class="container">
    <input
      class="input"
      type="text"
      placeholder="Add new todo..."
      v-model="value"
      @keydown.enter.prevent="createTask"
      @input="checkInput"
    />
    <span v-show="isShowError" class="error">Введите название</span>
    <button
      v-show="isShowed"
      type="submit"
      class="button"
      @click.prevent="createTask"
    >
      Submit
    </button>
  </form>
</template>

<script>
export default {
  name: "MyInput",
  data() {
    return {
      value: "",
      isShowError: false,
    };
  },
  computed: {
    isShowed() {
      return this.value;
    },
  },
  methods: {
    createTask() {
      if (!this.value) {
        this.isShowError = true;
      } else {
        this.isShowError = false;
        this.$store.dispatch("addNewTodo", this.value);
        this.value = "";
      }
    },
    checkInput() {
      if (!this.value) {
        this.isShowError = true;
      } else {
        this.isShowError = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 410px;
  width: 100%;
  margin-bottom: 40px;
  position: relative;
  .input {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 16px;
    border-radius: 8px;
    max-width: 310px;
    width: 100%;
    padding: 12px;
    border: 1px solid #8f99a3;
    outline: none;
    margin-right: 10px;
    &::placeholder {
      color: #8f99a3;
    }
  }
  .error {
    position: absolute;
    bottom: -14px;
    left: 34px;
    color: #ff0000;
    font-size: 12px;
    line-height: 14px;
  }
  .button {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 13px;
    line-height: 16px;
    padding: 12px;
    background-color: #2578f4;
    border-radius: 8px;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
