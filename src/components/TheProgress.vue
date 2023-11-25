<template>
  <div class="progress">
    <p class="progress__text">{{ countOfTasks }} tasks</p>
    <h2 class="progress__subtitle">{{ progressType }}</h2>
    <div class="progress__bar">
      <span
        class="progress__bar-line"
        :style="`width: ${progressPercent}%; background-color:${
          progressType === 'Completed' ? '#5d5fef' : '#ef5da8'
        }`"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheProgress",
  props: {
    progressType: {
      type: String,
      required: true,
    },
  },
  computed: {
    notes() {
      return Object.values(this.$store.state.notes.items);
    },
    countOfCompletedTasks() {
      return this.$store.getters.countOfCompletedTasks;
    },
    countOfToBeFinished() {
      return this?.notes.length - this.countOfCompletedTasks;
    },
    countOfTasks() {
      return this.progressType === "Completed"
        ? this.countOfCompletedTasks
        : this.countOfToBeFinished;
    },
    progressPercent() {
      return (this.countOfTasks / this.notes.length) * 100;
    },
  },
};
</script>

<style scoped lang="scss">
.progress {
  width: 190px;
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  &:first-child {
    margin-right: 30px;
  }
  &__text {
    font-family: "Inter-SemiBold", sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    margin: 0 0 10px 0;
    color: #8f99a3;
  }
  &__subtitle {
    font-family: "Inter-Bold", sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    margin: 0 0 10px 0;
  }
  &__bar {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: #e9e9e9;
    border-radius: 8px;
    &-line {
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      border-radius: 8px;
      transition: width 0.5s;
    }
  }
}
</style>
