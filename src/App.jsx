// src/App.jsx
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
      console.log(data);
      if (error) {
        console.error('Error fetching notes:', error);
      } else {
        setNotes(data); 
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async (newNote) => {
    console.log(newNote);
    const { error } = await supabase.from('notes').insert([{ title: newNote.title, content: newNote.content }]);
    if (error) {
      console.error('Error adding note:', error);
    } else {
        const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
        setNotes(data); console.log(data);
    }
  };

  const handleEditNote = async (id, title, content) => {
    const { error } = await supabase.from('notes').update({ title, content }).eq('id', id);
    console.log(data);
    if (error) {
      console.error('Error updating note:', error);
    } else {
        const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
        setNotes(data); console.log(data);
    }
  };

  const handleDeleteNote = async (id) => {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    console.log(data);
    if (error) {
      console.error('Error deleting note:', error);
    } else {
        const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
        setNotes(data); console.log(data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Keep App</h1>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList notes={notes} onEditNote={handleEditNote} onDeleteNote={handleDeleteNote} />
    </div>
  );
}

export default App;