import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from './components/Search';
import Header from './components/Header'

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "14/12/2024"
    },
    {
      id: nanoid(),
      text: "This is my SECOND note!",
      date: "13/12/2024"
    },
    {
      id: nanoid(),
      text: "This is my THIRD note!",
      date: "12/12/2024"
    },
    {
      id: nanoid(),
      text: "This is my NEW note!",
      date: "11/12/2024"
    },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log("reading from localStorage");
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );
    
    if(savedNotes) {
      console.log("Loaded notes:", savedNotes);
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    console.log("Saving Notes to localStorage:", notes);
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText.toLowerCase())
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  )
}


export default App;