<template>
  <ul class="notes">
    <transition-group name="flip-list">
      <li
        class="note"
        v-for="(item, i) in filteredNotes"
        :key="item.id"
        draggable="true"
        @dragover="onDragOver(item, i, $event)"
        @dragend="finishDrag(item, i, $event)"
        @dragstart="startDrag(item, i, $event)"
      >
        <IconDrag class="icon-drag" />
        <input
          class="note__input"
          type="checkbox"
          :id="item.id"
          :checked="item.checked"
          v-model="item.checked"
          @change="changeIsChecked"
        />
        <label class="note__label" :for="item.id"></label>
        <input
          v-if="item.isEditing"
          type="text"
          class="note__edit-input"
          v-model="item.value"
          @keydown.enter="editNote(item)"
          :ref="item.id"
        />
        <p v-else class="note__name" :class="{ note__name_completed: item.checked }">
          {{ item.value }}
        </p>
        <span v-show="item.error" class="error">Название не может быть пустым</span>
        <div class="note__icons">
          <IconPencil class="icon" @click.native="editNote(item)"/>
          <IconRemove class="icon" @click.native="deleteNote(item.id)" />
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import IconPencil from "@/components/icons/IconPencil.vue";
import IconRemove from "@/components/icons/IconRemove.vue";
import IconDrag from "@/components/icons/IconDrag.vue";
export default {
  name: "TheNotes",
  components: { IconPencil, IconRemove, IconDrag },
  data() {
    return {
      over: {},
      startLoc: 0,
      dragging: false,
      dragFrom: {},
    };
  },
  computed: {
    filteredNotes() {
      return this.$store.getters.filteredNotes;
    },
  },
  methods: {
    changeIsChecked() {
      this.$store.dispatch("saveNotes");
    },
    deleteNote(id) {
      this.$store.dispatch("deleteNote", id);
    },
    editNote(item) {
      if (item.value) {
        this.$store.dispatch("toggleEdit", item.id);
        if (item.isEditing) {
          this.$nextTick(() => {
            this.$refs[item.id][0].focus();
          });
        }
      } else {
        this.$store.dispatch("toggleError", item.id);
      }
    },
    startDrag(item, i, e) {
      this.startLoc = e.clientY;
      this.dragging = true;
      this.dragFrom = item;
    },
    finishDrag(item, pos) {
      this.$store.dispatch("finishDrag", { pos, overPos: this.over.pos, item });
      this.over = {};
    },
    onDragOver(item, pos, e) {
      const dir = this.startLoc < e.clientY ? "down" : "up";
      this.over = { item, pos, dir };
    },
  },
};
</script>

<style scoped lang="scss">
.notes {
  max-width: 410px;
  width: 100%;
  list-style: none;
  max-height: 92px;
  overflow-x: auto;
  padding: 0 20px 0 0;
  .flip-list-move {
    transition: transform 0.2s;
  }
  .over {
    opacity: 0.6;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e9e9e9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  .note {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-left: 20px;
    .icon-drag {
      display: none;
      cursor: pointer;
    }
    &:hover .icon-drag {
      position: absolute;
      top: 1px;
      left: 0;
      display: block;
    }
    &:last-child {
      margin-bottom: 0;
    }
    .error {
      position: absolute;
      bottom: -8px;
      left: 34px;
      color: #ff0000;
      font-size: 10px;
      line-height: 10px;
    }
    &__label {
      cursor: pointer;
      width: 16px;
      height: 16px;
      border: 1px solid #c7ccd1;
      border-radius: 2px;
      margin-right: 16px;
    }
    &__input {
      display: none;
    }
    &__edit-input {
      border: none;
      outline: none;
      background-color: transparent;
      width: 70%;
      border-bottom: 1px solid #c7ccd1;
      box-sizing: border-box;
      padding: 0;
    }
    .note__input:checked + .note__label {
      position: relative;
      background-color: #2578f4;
      border-color: transparent;
      &:after {
        content: "\2713";
        position: absolute;
        top: -2px;
        left: 2px;
        color: #fff;
      }
    }
    &__name,
    .note__edit-input {
      margin: 0;
      font-family: "Inter", sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      &_completed {
        opacity: 0.5;
      }
    }
    &__name {
      border-bottom: 1px solid transparent;
    }
    &__icons {
      margin: 0 0 0 auto;
      .icon {
        cursor: pointer;
        &:first-child {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>