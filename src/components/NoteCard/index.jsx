import React from 'react';
import { FaThumbtack } from 'react-icons/fa';
import { MdDelete, MdArchive, MdUnarchive } from 'react-icons/md'; // ✅ Import both Archive & Unarchive

const NoteCard = ({ note, onDelete, onPinToggle, onArchive, onUnarchive, isArchived = false }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 border border-gray-300">
      
      {/* Pin Button (Only show if not archived) */}
      {!isArchived && (
        <button
          onClick={onPinToggle}
          className={`absolute top-2 right-2 p-1 rounded-full ${
            note.pinned ? 'bg-blue-300' : 'bg-gray-200'
          } hover:bg-blue-400`}
          title={note.pinned ? 'Unpin Note' : 'Pin Note'}
        >
          <FaThumbtack className={`text-sm ${note.pinned ? 'text-black rotate-45' : 'text-gray-700'}`} />
        </button>
      )}

      <h3 className="text-lg font-semibold text-indigo-800 break-words">{note.title}</h3>
      <p className="text-gray-700 mt-1 break-words whitespace-pre-wrap">{note.text}</p>

      {/* Delete Button (works in both states) */}
      <button
        onClick={onDelete}
        className="absolute bottom-2 right-2 text-red-600 hover:text-red-800"
        title="Delete Note"
      >
        <MdDelete size={20} />
      </button>

      {/* Archive or Unarchive Button */}
      {!isArchived ? (
        <button
          onClick={onArchive}
          className="absolute middle-2 middle-2 text-blue-600 hover:text-indigo-700"
          title="Archive Note"
        >
          <MdArchive size={20} />
        </button>
      ) : (
        <button
          onClick={onUnarchive}
          className="absolute top-2 right-2 text-gray-600 hover:text-green-700"
          title="Unarchive Note"
        >
          <MdUnarchive size={20} />
        </button>
      )}
    </div>
  );
};

export default NoteCard;
