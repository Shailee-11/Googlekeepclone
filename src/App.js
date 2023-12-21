import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load notes from local storage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to local storage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (title.trim() !== "" || content.trim() !== "") {
      const newNote = { title, content };
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    }
  };

  const deleteNote = (index) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
    }
  };

  return (
    <div>
      <h1 id="title">Google Keep Clone</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br/>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br/>
        <button onClick={addNote}>Add Note</button>
      </div>

      <div>
        {notes.map((note, index) => (
          <div key={index} style={{ border: "3px solid black", margin: "10px" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
