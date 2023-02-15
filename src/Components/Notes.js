/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import NewNote from './NewNote';
import Note from './Note';

const notesWrapper = css`
  width: 90%;
  padding: 12px;
  margin: auto;

  h1 {
    text-align: center;
    text-transform: uppercase;
  }
`;

const noteFlexWrapper = css`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`;

const searchBar = css`
  width: 100%;
  height: 24px;
  border-radius: 6px;
  background-color: rgb(255, 255, 255, 0.2);
  border: 1px solid rgb(255, 255, 255, 0.2);
  color: rgb(255, 255, 255);
  font-size: 16px;
  @media (min-width: 1000px) {
    width: 32%;
  }

  ::placeholder {
    color: rgb(255, 255, 255);
    padding: 3px;
  }

  :focus {
    outline: none !important;
    border-color: rgb(255, 255, 255);
  }
`;
export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const localData = localStorage.getItem('Notes');
    if (localData !== null) return JSON.parse(localData);
    return [];
  });
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState(Date.now());
  const [editing, setEditing] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes));
  }, [notes]);

  const titleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  // searchbar functionality
  const handleChange = (event) => {
    setSearchInput(event.currentTarget.value);
  };

  const onSubmitSearchBar = (event) => {
    event.preventDefault();
  };

  if (searchInput.length > 0) {
    notes.filter((note) => {
      return note.headline.match(searchInput);
    });
  }

  const textHandler = (event) => {
    setText(event.currentTarget.value);
  };

  const saveHandler = () => {
    setNotes([
      ...notes,
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
    <div css={notesWrapper}>
      <form onSubmit={onSubmitSearchBar}>
        <input
          placeholder="Search note"
          onChange={handleChange}
          value={searchInput}
          css={searchBar}
        />
      </form>
      <h1>Your notes</h1>
      <div css={noteFlexWrapper}>
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
      <div>
        <NewNote
          title={title}
          text={text}
          titleHandler={titleHandler}
          textHandler={textHandler}
          saveHandler={saveHandler}
        />
      </div>
    </div>
  );
}
