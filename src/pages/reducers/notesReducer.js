export const noteReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, payload],
      };

    case "DELETE_NOTE":
      const noteToDelete =
        state.notes.find(note => note.id === payload) ||
        state.archives.find(note => note.id === payload);

      return {
        ...state,
        notes: state.notes.filter(note => note.id !== payload),
        archives: state.archives.filter(note => note.id !== payload),
        trash: noteToDelete ? [...state.trash, noteToDelete] : state.trash,
      };

    case "ARCHIVE_NOTE":
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== payload.id),
        archives: [...state.archives, payload],
      };

    case "UNARCHIVE_NOTE":
      return {
        ...state,
        archives: state.archives.filter(note => note.id !== payload.id),
        notes: [...state.notes, payload],
      };

    case "TOGGLE_IMPORTANT":
      const toggleImportantInList = (list) =>
        list.map(note =>
          note.id === payload ? { ...note, important: !note.important } : note
        );

      return {
        ...state,
        notes: toggleImportantInList(state.notes),
        archives: toggleImportantInList(state.archives),
        trash: toggleImportantInList(state.trash),
      };

    case "DELETE_FROM_TRASH":
    case "DELETE_FOREVER":
      return {
        ...state,
        trash: state.trash.filter(note => note.id !== payload),
      };

    case "RESTORE_FROM_TRASH":
      const alreadyExists = state.notes.some(note => note.id === payload.id);
      return {
        ...state,
        notes: alreadyExists ? state.notes : [...state.notes, payload],
        trash: state.trash.filter(note => note.id !== payload.id),
      };

    default:
      return state;
  }
};
