/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  faCaretDown,
  faCaretUp,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const inputWrapper = css`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;

const buttonNewNote = css`
  background: rgb(255, 255, 255, 0.2);
  border: 1px solid rgb(255, 255, 255, 0.2);
  border-radius: 6px;
  margin: 6px 0;
  padding: 3px;
  align-self: center;
  color: rgb(255, 255, 255);
  font-size: 16px;
  width: 100%;
  align-self: flex-start;

  @media (min-width: 1000px) {
    width: 32%;
    float: left;
  }
`;

const newNoteWrapper = css`
  background-color: rgb(255, 255, 255, 0.2);
  border: 1px solid rgb(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 24px;
  div {
    font-weight: 600;
    padding: 4px 0;
    text-transform: uppercase;
  }
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

  textarea:focus {
    outline: none !important;
    border-color: rgb(255, 255, 255);
  }

  button {
    width: 100%;
    background: transparent;
    border: none;
    margin: 6px;
    align-self: center;
    color: rgb(255, 255, 255);
  }
`;

const NewNote = ({ title, text, setTitle, setText, notes, setNotes, date }) => {
  const [showInput, setShowInput] = useState(false);

  const showInputHandler = () => {
    setShowInput((wasOpened) => !wasOpened);
  };

  // Handlers
  const titleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

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

  return (
    <div css={inputWrapper}>
      {showInput === false ? (
        <button onClick={showInputHandler} css={buttonNewNote}>
          New note <FontAwesomeIcon icon={faCaretDown} />
        </button>
      ) : (
        <button onClick={showInputHandler} css={buttonNewNote}>
          New note <FontAwesomeIcon icon={faCaretUp} />
        </button>
      )}

      {showInput && (
        <div css={newNoteWrapper}>
          <div>Title</div>
          <textarea
            type="text"
            rows="1"
            maxLength="20"
            value={title}
            onChange={titleHandler}
          />
          <div>Note text</div>
          <textarea
            type="text"
            rows="5"
            maxLength="200"
            value={text}
            onChange={textHandler}
          />
          <button onClick={saveHandler}>
            <FontAwesomeIcon icon={faFloppyDisk} size="2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewNote;
