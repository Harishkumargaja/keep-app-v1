// src/components/Note.jsx
import { useState } from 'react';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';

function Note({ note, onEditNote, onDeleteNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEditNote(note.id, editedTitle, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  return (
    <div className="bg-gray-400 p-4 rounded-md shadow-md relative">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md  text-white"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded-md  text-white"
          />
          <div className="mt-2 flex justify-end">
            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded-md mr-2">
              <FaSave />
            </button>
            <button onClick={handleCancel} className="bg-gray-900 text-white p-2 rounded-md">
              <FaTimes />
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2  text-white">{note.title}</h2>
          <p>{note.content}</p>
          <div className="absolute top-2 right-2 flex">
            <button onClick={handleEdit} className="text-emerald-900 mr-2">
              <FaEdit />
            </button>
            <button onClick={() => onDeleteNote(note.id)} className="text-red-500">
              <FaTrashAlt />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;