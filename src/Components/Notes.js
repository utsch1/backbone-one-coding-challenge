import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import NewNote from './NewNote';
import Note from './Note';

export default function Notes() {
  const [notes, setNotes] = useState([], () => {});
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState(Date.now());
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Notes'));
    if (data) {
      setNotes(data);
    }
  }, []);

  const titleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const textHandler = (event) => {
    setText(event.currentTarget.value);
  };

  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        title: title,
        text: text,
        date: date,
      },
    ]);
    setTitle('');
    setText('');
  };

  const setUpdateTitle = (updatedTitle, id) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          note.title = updatedTitle;
        }
        return note;
      }),
    );
  };

  const setUpdateText = (updatedText, id) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          note.text = updatedText;
        }
        return note;
      }),
    );
  };

  const editHandler = () => {
    if (editing === false) {
      setEditing(true);
      setDate(Date.now());
    } else {
      setEditing(false);
      setDate(Date.now());
    }
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  console.log(notes);

  return (
    <div>
      <NewNote
        title={title}
        text={text}
        titleHandler={titleHandler}
        textHandler={textHandler}
        saveHandler={saveHandler}
      />
      <div>
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            date={note.date}
            setDate={setDate}
            title={note.title}
            text={note.text}
            editing={editing}
            setEditing={setEditing}
            deleteNote={deleteNote}
            setUpdateTitle={setUpdateTitle}
            setUpdateText={setUpdateText}
            editHandler={editHandler}
          />
        ))}
      </div>
    </div>
  );
}
