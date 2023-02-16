/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  faFloppyDisk,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const noteWrapper = css`
  width: 100%;
  padding: 12px;
  background-color: rgb(255, 255, 255, 0.2);
  border: 1px solid rgb(255, 255, 255, 0.2);
  border-radius: 6px;
  box-shadow: 2px 2px rgb(255, 255, 255, 0.5);
  @media (min-width: 1000px) {
    width: 30%;
  }

  :hover {
    box-shadow: 0px 0px 5px 5px rgb(255, 255, 255, 0.5);
  }
`;

const dateStyle = css`
  text-align: right;
`;

const headlineWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: transparent;
    border: none;
    font-size: 18px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    text-transform: uppercase;
    margin: 20px 0;
    padding: 0;
  }
`;

const textStyles = css`
  width: 100%;

  p {
    text-align: justify;
    color: rgb(255, 255, 255);
  }
`;

const inputWrapper = css`
  width: 100%;

  textarea {
    width: 100%;
    background: transparent;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 6px;
    margin-bottom: 6px;
    color: rgb(255, 255, 255);
    font-family: sans-serif;
    padding: 3px;
  }
`;

const buttonWrapper = css`
  display: flex;
  justify-content: flex-end;

  button {
    background: transparent;
    border: none;
    margin: 10px 6px;
    color: rgb(255, 255, 255);
  }
`;

export default function Note({
  id,
  date,
  title,
  text,
  editing,
  setEditing,
  setNotes,
  notes,
}) {
  const [showText, setShowText] = useState(false);
  const dateFormat = new Date(date);
  const yearOfNote = dateFormat.getFullYear();
  const monthOfNote = dateFormat.getMonth() + 1;
  const dateOfNote = dateFormat.getDate();
  const hours = dateFormat.getHours();
  const minutes = ('0' + dateFormat.getMinutes()).slice(-2);
  const newDate =
    dateOfNote +
    '/' +
    monthOfNote +
    '/' +
    yearOfNote +
    ', ' +
    hours +
    ':' +
    minutes;
  const viewMode = {};
  const editMode = {};

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
    } else {
      setEditing(false);
    }
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  if (editing) {
    viewMode.display = 'block';
  } else {
    editMode.display = 'none';
  }

  const onClick = () => setShowText((wasOpened) => !wasOpened);

  return (
    <div css={noteWrapper}>
      <div style={viewMode}>
        <div css={dateStyle}>{newDate}</div>
        <div css={headlineWrapper}>
          <button onClick={onClick}>{title}</button>
        </div>
        {showText ? (
          <div css={textStyles}>
            <p>{text}</p>
          </div>
        ) : null}
      </div>
      <div style={editMode} css={inputWrapper}>
        <textarea
          rows={1}
          value={title}
          maxLength={20}
          onChange={(event) => setUpdateTitle(event.currentTarget.value, id)}
        />
        <textarea
          rows={6}
          maxLength={200}
          value={text}
          onChange={(event) => setUpdateText(event.currentTarget.value, id)}
        />
      </div>
      <div css={buttonWrapper}>
        <button onClick={editHandler}>
          {editing === true ? (
            <FontAwesomeIcon icon={faFloppyDisk} size="2xl" />
          ) : (
            <FontAwesomeIcon icon={faPen} size="2xl" />
          )}
        </button>
        <button onClick={() => deleteNote(id)}>
          <FontAwesomeIcon icon={faTrash} size="2xl" />
        </button>
      </div>
    </div>
  );
}
