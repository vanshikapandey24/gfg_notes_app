// NoteContext.js
import { createContext, useState, useEffect } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('vhype-notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [binNotes, setBinNotes] = useState([]);

  // Sync notes to localStorage
  useEffect(() => {
    localStorage.setItem('vhype-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('vhype-pinned', JSON.stringify(pinnedNotes));
  }, [pinnedNotes]);

  useEffect(() => {
    localStorage.setItem('vhype-archived', JSON.stringify(archivedNotes));
  }, [archivedNotes]);

  useEffect(() => {
    localStorage.setItem('vhype-bin', JSON.stringify(binNotes));
  }, [binNotes]);

  // Add note
  const addNote = (note) => {
    setNotes([note, ...notes]);
  };

  // Delete note (move to bin)
  const deleteNote = (id) => {
    const target = notes.find(n => n.id === id) ||
                   pinnedNotes.find(n => n.id === id) ||
                   archivedNotes.find(n => n.id === id);
    if (target) {
      setNotes(notes.filter(n => n.id !== id));
      setPinnedNotes(pinnedNotes.filter(n => n.id !== id));
      setArchivedNotes(archivedNotes.filter(n => n.id !== id));
      setBinNotes([target, ...binNotes]);
    }
  };

  // Archive note
  const archiveNote = (id) => {
    const target = notes.find(n => n.id === id) || pinnedNotes.find(n => n.id === id);
    if (target) {
      setNotes(notes.filter(n => n.id !== id));
      setPinnedNotes(pinnedNotes.filter(n => n.id !== id));
      setArchivedNotes([target, ...archivedNotes]);
    }
  };

  // Unarchive note
  const unarchiveNote = (id) => {
    const target = archivedNotes.find(n => n.id === id);
    if (target) {
      setArchivedNotes(archivedNotes.filter(n => n.id !== id));
      setNotes([target, ...notes]);
    }
  };

  // Pin and unpin logic
  const pinNote = (id) => {
    const noteToPin = notes.find(n => n.id === id);
    if (noteToPin) {
      setNotes(notes.filter(n => n.id !== id));
      setPinnedNotes([noteToPin, ...pinnedNotes]);
    }
  };

  const unpinNote = (id) => {
    const noteToUnpin = pinnedNotes.find(n => n.id === id);
    if (noteToUnpin) {
      setPinnedNotes(pinnedNotes.filter(n => n.id !== id));
      setNotes([noteToUnpin, ...notes]);
    }
  };

  // Bin operations
  const restoreFromBin = (id) => {
    const restored = binNotes.find(n => n.id === id);
    setBinNotes(binNotes.filter(n => n.id !== id));
    setNotes([restored, ...notes]);
  };

  const permanentlyDelete = (id) => {
    setBinNotes(binNotes.filter(n => n.id !== id));
  };

  return (
    <NoteContext.Provider value={{
      notes,
      pinnedNotes,
      archivedNotes,
      binNotes,
      setNotes,
      setPinnedNotes,
      setArchivedNotes,
      setBinNotes,
      addNote,
      deleteNote,
      archiveNote,
      unarchiveNote, // ✅ Make sure to expose it here
      pinNote,
      unpinNote,
      restoreFromBin,
      permanentlyDelete,
    }}>
      {children}
    </NoteContext.Provider>
  );
};
