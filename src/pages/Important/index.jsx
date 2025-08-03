// src/pages/Important/index.jsx
import { Fragment, useContext } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { NoteContext } from "../../context/NoteContext";
import NoteCard from "../../components/NoteCard";

const Important = () => {
  const { importantNotes, deleteNote, pinNote, archiveNote, toggleImportant } = useContext(NoteContext);

  return (
    <Fragment>
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          <h2 className="text-2xl font-semibold mb-4">Important Notes </h2>

          {importantNotes.length === 0 ? (
            <p className="text-gray-500">No important notes yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {importantNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={() => deleteNote(note.id)}
                  onPin={() => pinNote(note.id)}
                  onArchive={() => archiveNote(note.id)}
                  onImportantToggle={() => toggleImportant(note.id)}
                  isImportant={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
};

export default Important;
