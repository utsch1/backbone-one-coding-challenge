/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
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
  font-family: sans-serif;

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

  // searchbar functionality

  function onSubmit(event) {
    event.preventDefault();
  }
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div css={notesWrapper}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Search note"
          onChange={handleChange}
          value={searchInput}
          css={searchBar}
        />
      </form>
      <div>
        <NewNote
          title={title}
          text={text}
          setText={setText}
          setTitle={setTitle}
          notes={notes}
          setNotes={setNotes}
          date={date}
        />
      </div>
      <h1>Your notes</h1>
      <div css={noteFlexWrapper}>
        {notes
          .filter((note) => {
            const searchTerm = searchInput.toLowerCase();
            const noteTitle = note.title.toLowerCase();
            return noteTitle.startsWith(searchTerm);
          })
          .map((note) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                date={note.date}
                setDate={setDate}
                title={note.title}
                text={note.text}
                editing={editing}
                setEditing={setEditing}
                setText={setText}
                setTitle={setTitle}
                notes={notes}
                setNotes={setNotes}
              />
            );
          })}
      </div>
    </div>
  );
}
