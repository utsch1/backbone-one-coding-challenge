import { useLocation } from 'react-router-dom';

const NewNote = ({ title, text, titleHandler, textHandler, saveHandler }) => {
  return (
    <div>
      <input
        rows="1"
        placeholder="space for the title"
        maxLength="20"
        value={title}
        onChange={titleHandler}
      />
      <input
        rows="5"
        placeholder="space for your note"
        maxLength="200"
        value={text}
        onChange={textHandler}
      />
      <button onClick={saveHandler}>Save</button>
    </div>
  );
};

export default NewNote;
