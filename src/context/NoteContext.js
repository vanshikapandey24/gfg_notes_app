// src/context/NoteContext.js
import { createContext, useState, useEffect, useContext } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('vhype-notes')) || []);
  const [pinnedNotes, setPinnedNotes] = useState(() => JSON.parse(localStorage.getItem('vhype-pinned')) || []);
  const [archivedNotes, setArchivedNotes] = useState(() => JSON.parse(localStorage.getItem('vhype-archived')) || []);
  const [binNotes, setBinNotes] = useState(() => JSON.parse(localStorage.getItem('vhype-bin')) || []);
  const [importantNotes, setImportantNotes] = useState(() => JSON.parse(localStorage.getItem('vhype-important')) || []);

  // 🔄 Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('vhype-notes', JSON.stringify(notes));
    localStorage.setItem('vhype-pinned', JSON.stringify(pinnedNotes));
    localStorage.setItem('vhype-archived', JSON.stringify(archivedNotes));
    localStorage.setItem('vhype-bin', JSON.stringify(binNotes));
    localStorage.setItem('vhype-important', JSON.stringify(importantNotes));
  }, [notes, pinnedNotes, archivedNotes, binNotes, importantNotes]);

  // ➕ Add Note
  const addNote = (note) => setNotes([note, ...notes]);

  // 🗑️ Delete Note → Send to Bin
  const deleteNote = (id) => {
    const findAndRemove = (list, setList) => {
      const note = list.find(n => n.id === id);
      if (note) {
        setList(list.filter(n => n.id !== id));
        return note;
      }
      return null;
    };

    const deletedNote =
      findAndRemove(notes, setNotes) ||
      findAndRemove(pinnedNotes, setPinnedNotes) ||
      findAndRemove(archivedNotes, setArchivedNotes) ||
      findAndRemove(importantNotes, setImportantNotes);

    if (deletedNote) {
      setBinNotes([deletedNote, ...binNotes]);
    }
  };

  // 📦 Archive / Unarchive
  const archiveNote = (id) => {
    const target = notes.find(n => n.id === id) || pinnedNotes.find(n => n.id === id);
    if (target) {
      setNotes(notes.filter(n => n.id !== id));
      setPinnedNotes(pinnedNotes.filter(n => n.id !== id));
      setArchivedNotes([target, ...archivedNotes]);
    }
  };

  const unarchiveNote = (id) => {
    const target = archivedNotes.find(n => n.id === id);
    if (target) {
      setArchivedNotes(archivedNotes.filter(n => n.id !== id));
      setNotes([target, ...notes]);
    }
  };

  // 📌 Pin / Unpin
  const pinNote = (id) => {
    const target = notes.find(n => n.id === id);
    if (target) {
      setNotes(notes.filter(n => n.id !== id));
      setPinnedNotes([target, ...pinnedNotes]);
    }
  };

  const unpinNote = (id) => {
    const target = pinnedNotes.find(n => n.id === id);
    if (target) {
      setPinnedNotes(pinnedNotes.filter(n => n.id !== id));
      setNotes([target, ...notes]);
    }
  };

  // ⭐ Toggle Important
  const toggleImportantNote = (id) => {
    const allLists = [
      { list: notes, setList: setNotes },
      { list: pinnedNotes, setList: setPinnedNotes },
      { list: archivedNotes, setList: setArchivedNotes },
      { list: importantNotes, setList: setImportantNotes }
    ];

    let updatedNote = null;

    for (const { list, setList } of allLists) {
      const found = list.find(n => n.id === id);
      if (found) {
        updatedNote = { ...found, important: !found.important };
        setList(list.filter(n => n.id !== id));
        break;
      }
    }

    if (updatedNote) {
      if (updatedNote.important) {
        setImportantNotes([updatedNote, ...importantNotes]);
      } else {
        setNotes([updatedNote, ...notes]);
      }
    }
  };

  // ♻️ Restore From Bin
  const restoreFromBin = (id) => {
    const note = binNotes.find(n => n.id === id);
    if (note) {
      setBinNotes(binNotes.filter(n => n.id !== id));
      setNotes([note, ...notes]);
    }
  };

  // ❌ Permanently Delete From Bin
  const permanentlyDelete = (id) => {
    setBinNotes(binNotes.filter(n => n.id !== id));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,  // ✅ <--- Add this
        pinnedNotes,
        setPinnedNotes, // ✅
        archivedNotes,
        setArchivedNotes, // ✅
        binNotes,
        setBinNotes, // ✅
        importantNotes,
        setImportantNotes, // ✅
        addNote,
        deleteNote,
        archiveNote,
        unarchiveNote,
        pinNote,
        unpinNote,
        toggleImportantNote,
        restoreFromBin,
        permanentlyDelete,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
