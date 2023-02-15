/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const inputWrapper = css`
  margin: 20px 0;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    font-size: 32px;
    text-transform: uppercase;
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

const NewNote = ({ title, text, titleHandler, textHandler, saveHandler }) => {
  return (
    <div css={inputWrapper}>
      <h2>New note</h2>
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
          {' '}
          <FontAwesomeIcon icon={faFloppyDisk} size="2xl" />
        </button>
      </div>
    </div>
  );
};

export default NewNote;
