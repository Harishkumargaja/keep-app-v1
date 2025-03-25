// src/App.jsx
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState([]);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => { // Corrected line
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      const fetchNotes = async () => {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        if (error) {
          console.error('Error fetching notes:', error);
        } else {
          setNotes(data);
        }
      };
      fetchNotes();
    }
  }, [session]);

  const handleAddNote = async (newNote) => {
    if (session) {
      const { error } = await supabase
        .from('notes')
        .insert([{ title: newNote.title, content: newNote.content, user_id: session.user.id }]);
      if (error) {
        console.error('Error adding note:', error);
      } else {
        const { data } = await supabase
          .from('notes')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        setNotes(data);
      }
    } else {
      navigate('/login');
    }
  };

  const handleEditNote = async (id, title, content) => {
    if (session) {
      const { error } = await supabase
        .from('notes')
        .update({ title, content })
        .eq('id', id);
      if (error) {
        console.error('Error updating note:', error);
      } else {
        const { data } = await supabase
          .from('notes')
          .select('*')
          .order('created_at', { ascending: false });
        setNotes(data);
      }
    } else {
      navigate('/login');
    }
  };

  const handleDeleteNote = async (id) => {
    if (session) {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) {
        console.error('Error deleting note:', error);
      } else {
        const { data } = await supabase
          .from('notes')
          .select('*')
          .order('created_at', { ascending: false });
        setNotes(data);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          session ? (
            <div className="container mx-auto p-4 bg-gray-500">
              <h1 className="text-2xl font-bold mb-4">My Keep App</h1>
              <h2 className="text-xl font-bold mb-4">Welcome, {session.user.email}</h2>
              <button
                onClick={() => supabase.auth.signOut()}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Logout
              </button>
              <NoteForm onAddNote={handleAddNote} />
              <NoteList notes={notes} onEditNote={handleEditNote} onDeleteNote={handleDeleteNote} />
            </div>
          ) : (
            <LoginPage />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;