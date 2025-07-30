import { Fragment, useContext } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { NoteContext } from "../../context/NoteContext";
import NoteCard from "../../components/NoteCard";

export const Archive = () => {
  const { archivedNotes, unarchiveNote, deleteNote } = useContext(NoteContext);

  return (
    <Fragment>
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          <h2 className="text-2xl font-semibold mb-4">Archived Notes</h2>

          {archivedNotes.length === 0 ? (
            <p className="text-gray-500">No archived notes yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {archivedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onUnarchive={() => unarchiveNote(note.id)}
                  onDelete={() => deleteNote(note.id)}
                  isArchived={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
};
