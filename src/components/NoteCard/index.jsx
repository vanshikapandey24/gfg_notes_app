import React from 'react';
import { FaThumbtack } from 'react-icons/fa';
import {
  MdDelete,
  MdArchive,
  MdUnarchive,
  MdRestoreFromTrash
} from 'react-icons/md';

const NoteCard = ({
  note,
  onDelete,
  onPinToggle,
  onArchive,
  onUnarchive,
  onImportantToggle,
  onRestore,
  onPermanentDelete,
  isArchived = false,
  isTrashed = false
}) => {
  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 border border-gray-300 dark:border-gray-700">
      
      {/* 📌 Pin Button */}
      {!isArchived && !isTrashed && (
        <button
          onClick={onPinToggle}
          className={`absolute top-2 right-10 p-1 rounded-full ${
            note.pinned ? 'bg-blue-300' : 'bg-gray-200 dark:bg-gray-800'
          } hover:bg-blue-400`}
          title={note.pinned ? 'Unpin Note' : 'Pin Note'}
        >
          <FaThumbtack className={`text-sm ${note.pinned ? 'text-black rotate-45' : 'text-gray-700 dark:text-gray-200'}`} />
        </button>
      )}

      {/* ➤ Arrow-style Important Icon */}
      {!isArchived && !isTrashed && (
        <button
          onClick={onImportantToggle}
          className={`absolute bottom-2 right-10 p-1 rounded-full ${
            note.important ? 'bg-blue-300' : 'bg-gray-200 dark:bg-gray-800'
          } hover:bg-blue-400`}
          title={note.important ? 'Unmark Important' : 'Mark as Important'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={note.important ? '#1e3a8a' : '#9ca3af'}
          >
            <path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z"/>
          </svg>
        </button>
      )}

      {/* 📂 Archive/Unarchive */}
      {!isTrashed && !isArchived && (
        <button
          onClick={onArchive}
          className="absolute top-2 right-2 text-blue-600 hover:text-indigo-700"
          title="Archive Note"
        >
          <MdArchive size={20} />
        </button>
      )}

      {isArchived && !isTrashed && (
        <button
          onClick={onUnarchive}
          className="absolute top-2 right-2 text-gray-600 hover:text-green-700"
          title="Unarchive Note"
        >
          <MdUnarchive size={20} />
        </button>
      )}

      {/* 📝 Note Content */}
      <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 break-words">{note.title}</h3>
      <p className="text-gray-700 dark:text-gray-200 mt-1 break-words whitespace-pre-wrap">{note.text}</p>

      {/* 🗑️ Delete or Restore */}
      {!isTrashed ? (
        <button
          onClick={onDelete}
          className="absolute bottom-2 right-2 text-red-600 hover:text-red-800"
          title="Move to Bin"
        >
          <MdDelete size={20} />
        </button>
      ) : (
        <>
          <button
            onClick={onRestore}
            className="absolute bottom-2 right-10 text-green-600 hover:text-green-800"
            title="Restore Note"
          >
            <MdRestoreFromTrash size={20} />
          </button>
          <button
            onClick={onPermanentDelete}
            className="absolute bottom-2 right-2 text-red-700 hover:text-red-900"
            title="Delete Permanently"
          >
            <MdDelete size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default NoteCard;
