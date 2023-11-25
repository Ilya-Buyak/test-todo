<template>
  <main class="main">
    <img
      class="main__image"
      src="./assets/icons/Illustration.png"
      alt="notes"
      width="181"
      height="180"
    />
    <h1 class="main__title">Today I need to</h1>
    <MyForm />
    <template v-if="Object.keys(notes).length">
      <TheNotes />
      <div class="container container_progress-bar">
        <TheProgress progress-type="Completed" />
        <TheProgress progress-type="To be finished" />
      </div>
      <TheButtons />
    </template>
    <div class="container container_end" v-else>
      <IconNoTasks class="icon" />
      <p class="main__text">Congrats, you have no more tasks to do</p>
    </div>
  </main>
</template>

<script>
import MyForm from "@/components/MyForm.vue";
import IconNoTasks from "@/components/icons/IconNoTasks.vue";
import TheNotes from "@/components/TheNotes.vue";
import TheProgress from "@/components/TheProgress.vue";
import TheButtons from "@/components/TheButtons.vue";
export default {
  components: { MyForm, IconNoTasks, TheNotes, TheProgress, TheButtons },
  computed: {
    notes() {
      return this.$store.state.notes.items;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  background: linear-gradient(
    45deg,
    rgba(240, 195, 252, 1),
    rgba(215, 190, 252, 1),
    rgba(188, 177, 252, 1),
    rgba(161, 174, 252, 1),
    rgba(148, 189, 252, 1),
    rgba(142, 197, 252, 1)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}
.main {
  max-width: 730px;
  min-width: 610px;
  min-height: 80vh;
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 24px;
  &__image {
    margin-bottom: 20px;
  }
  &__title {
    margin: 0 0 40px 0;
    font-family: "Inter-Bold", sans-serif;
    font-size: 24px;
    line-height: 29px;
    font-weight: 700;
  }
  &__text {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    color: #8f99a3;
    margin: 0;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    &_progress-bar {
      margin-bottom: 20px;
    }
    &_end {
      margin: auto auto 0 auto;
    }
    .icon {
      margin-right: 10px;
    }
  }
}
</style>
