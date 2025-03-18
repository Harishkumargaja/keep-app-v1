// src/components/NoteList.jsx
import Note from './Note';

function NoteList({ notes, onEditNote, onDeleteNote }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <Note key={note.id} note={note} onEditNote={onEditNote} onDeleteNote={onDeleteNote} />
      ))}
    </div>
  );
}

export default NoteList;