<template>
  <div class="container">
    <button v-show="isShowCheckAllButton" class="button" @click="checkAllNotes">
      Check all
    </button>
    <button
      v-show="item === 'All' || (isShowClearButton && isShowCheckAllButton)"
      class="button"
      :class="{ active: item === activeButton }"
      v-for="(item, i) in buttons"
      :key="i"
      @click="changeActiveButton(item)"
    >
      {{ item }}
    </button>
    <button v-show="isShowClearButton" class="button" @click="clearCompleted">
      Clear Completed
    </button>
  </div>
</template>

<script>
export default {
  name: "TheButtons",
  data() {
    return {
      buttons: ["All", "Active", "Completed"],
    };
  },
  computed: {
    activeButton() {
      return this.$store.state.notes.activeButton;
    },
    countOfCompletedTasks() {
      return this.$store.getters.countOfCompletedTasks;
    },
    notesLength() {
      return Object.values(this.$store.state.notes.items).length;
    },
    isShowCheckAllButton() {
      return this.notesLength !== this.countOfCompletedTasks;
    },
    isShowClearButton() {
      return this.countOfCompletedTasks !== 0;
    },
  },
  methods: {
    changeActiveButton(name) {
      this.$store.dispatch("changeActiveButton", name);
    },
    checkAllNotes() {
      this.changeActiveButton("All");
      this.$store.dispatch("checkAllNotes");
    },
    clearCompleted() {
      this.changeActiveButton("All");
      this.$store.dispatch("clearCompleted");
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  font-family: "Inter-SemiBold", sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  margin-right: 15px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
  &.active {
    background-color: #2578f4;
    padding: 5px 10px;
    color: #fff;
  }
}
</style>
