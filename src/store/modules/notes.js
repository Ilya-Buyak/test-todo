import Vue from "vue";

const state = {
  items: JSON.parse(localStorage.getItem("notes") || "{}"),
  activeButton: "All",
};

const getters = {
  countOfCompletedTasks(state) {
    return Object.values(state.items).filter((note) => note.checked).length;
  },
  filteredNotes(state) {
    switch (state.activeButton) {
      case "All":
        return Object.values(state.items);
      case "Completed":
        return Object.values(state.items).filter((note) => note.checked);
      case "Active":
        return Object.values(state.items).filter((note) => !note.checked);
    }
  },
};

const mutations = {
  toggleError(state, id) {
    state.items[id].error = true;
  },
  deleteNote(state, id) {
    Vue.delete(state.items, id);
    this.commit("saveNotes");
  },
  toggleEdit(state, id) {
    state.items[id].isEditing = !state.items[id].isEditing;
    state.items[id].error = false;
    if (!state.items[id].isEditing) {
      this.commit("saveNotes");
    }
  },
  saveNotes(state) {
    localStorage.setItem("notes", JSON.stringify(state.items));
  },
  addNewTodo(state, value) {
    const index = Date.now();
    Vue.set(state.items, index, {
      id: index,
      value,
      checked: false,
      isEditing: false,
      error: false,
    });
    this.commit("saveNotes");
  },
  finishDrag(state, payload) {
    const notes = Object.entries(state.items);
    notes.splice(payload.pos, 1);
    notes.splice(payload.overPos, 0, [payload.item.id, payload.item]);
    state.items = {};
    notes.forEach((el) => {
      Vue.set(state.items, el[0], el[1]);
    });
    this.commit("saveNotes");
  },
  checkAllNotes(state) {
    for (let note in state.items) {
      state.items[note].checked = true;
    }
    this.commit("saveNotes");
  },
  clearCompleted(state) {
    const notes = Object.values(state.items);
    state.items = {};
    notes.forEach((note) => {
      if (!note.checked) {
        Vue.set(state.items, note.id, note);
      }
    });
    this.commit("saveNotes");
  },
  changeActiveButton(state, name) {
    state.activeButton = name;
  },
};
const actions = {
  finishDrag({ commit }, payload) {
    commit("finishDrag", payload);
  },
  toggleError({ commit }, id) {
    commit("toggleError", id);
  },
  toggleEdit({ commit }, payload) {
    commit("toggleEdit", payload);
  },
  saveNotes({ commit }) {
    commit("saveNotes");
  },
  deleteNote({ commit }, id) {
    commit("deleteNote", id);
  },
  addNewTodo({ commit }, value) {
    commit("addNewTodo", value);
  },
  checkAllNotes({ commit }) {
    commit("checkAllNotes");
  },
  clearCompleted({ commit }) {
    commit("clearCompleted");
  },
  changeActiveButton({ commit }, name) {
    commit("changeActiveButton", name);
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
