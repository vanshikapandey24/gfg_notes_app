import React, { useState, useContext, Fragment } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { NoteContext } from '../../context/NoteContext';
import NoteCard from '../../components/NoteCard';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Icon imports

const Home = () => {
  const {
    notes,
    setNotes,
    binNotes,
    setBinNotes,
    archivedNotes,
    setArchivedNotes,
  } = useContext(NoteContext);

  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (title.trim() === '' || noteText.trim() === '') return;

    const newNote = {
      id: Date.now(),
      title,
      text: noteText,
      pinned: false,
      archived: false,
      important: false,
      createdAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setNoteText('');
  };

  const handlePinToggle = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    const sortedNotes = [
      ...updatedNotes.filter(note => note.pinned),
      ...updatedNotes.filter(note => !note.pinned),
    ];
    setNotes(sortedNotes);
  };

  const handleMoveToBin = (id) => {
    const noteToDelete = notes.find(note => note.id === id);
    if (noteToDelete) {
      setNotes(notes.filter(note => note.id !== id));
      setBinNotes([noteToDelete, ...binNotes]);
    }
  };

  const archiveNote = (id) => {
    const noteToArchive = notes.find(note => note.id === id);
    if (noteToArchive) {
      setNotes(notes.filter(note => note.id !== id));
      setArchivedNotes([noteToArchive, ...archivedNotes]);
    }
  };

  const toggleImportant = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, important: !note.important } : note
    );
    setNotes(updatedNotes);
  };

  const handleClearNotes = () => {
    if (window.confirm('Move all notes to Bin?')) {
      setBinNotes([...notes, ...binNotes]);
      setNotes([]);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>

            <input
              type="text"
              className="w-full p-1 mb-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="2"
              placeholder="Write your note here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />

            <div className="mt-1 flex gap-2">
              <button
                className="bg-indigo-600 text-white py-2 px-2 rounded hover:bg-indigo-700"
                onClick={handleAddNote}
              >
                Add Note
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={handleClearNotes}
              >
                Clear All Notes to Bin
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Your Notes:</h2>
              {notes.length === 0 ? (
                <p className="text-gray-500 mt-2">No notes yet.</p>
              ) : (
                <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {notes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={() => handleMoveToBin(note.id)}
                      onPinToggle={() => handlePinToggle(note.id)}
                      onArchive={() => archiveNote(note.id)}
                      onImportantToggle={() => toggleImportant(note.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Footer Section with icons only */}
        <footer className="bg-white border-t p-4 text-center text-sm text-gray-600">
          Built with ❤️ by Vanshika Pandey &nbsp;|&nbsp;
          <div className="flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/vanshika-pandey-48a3b52a6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-110 transition-transform"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/vanshikapandey24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:scale-110 transition-transform"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Home;
