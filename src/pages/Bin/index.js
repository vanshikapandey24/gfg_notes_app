// src/pages/Bin/index.jsx
import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { useNotes } from "../../context/NoteContext";
import { Navbar } from "../../components/Navbar";
import { Fragment } from "react";

const Bin = () => {
  const { binNotes, restoreFromBin, permanentlyDelete } = useNotes();

  const handleRestore = (note) => {
    restoreFromBin(note.id);
  };

  const handleDeleteForever = (id) => {
    permanentlyDelete(id);
  };

  return (
     <Fragment>
      <Navbar />
      
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          <h2 className="text-2xl font-semibold mb-4">Bin</h2>
        {binNotes.length === 0 ? (
          <p className="text-gray-500">No notes in Bin.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {binNotes.map((note) => (
              <div key={note.id} className="bg-blue-200 p-4 rounded shadow relative">
                <h3 className="font-semibold">{note.title}</h3>
                <p>{note.content}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleRestore(note)}
                    className="px-2 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => handleDeleteForever(note.id)}
                    className="px-2 py-1 text-sm bg-red-200 hover:bg-blue-300 rounded"
                  >
                    Delete Forever
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
    </Fragment>
  );
};

export default Bin;
