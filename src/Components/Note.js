export default function Note({
  id,
  date,
  title,
  text,
  deleteNote,
  editing,
  setUpdateText,
  setUpdateTitle,
  editHandler,
}) {
  const dateFormat = new Date(date);
  const yearOfNote = dateFormat.getFullYear();
  const monthOfNote = dateFormat.getMonth() + 1;
  const dateOfNote = dateFormat.getDay();
  const hours = dateFormat.getHours();
  const minutes = dateFormat.getMinutes();
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

  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  return (
    <div>
      <div style={viewMode}>
        <div>{title}</div>
        <div>{text}</div>
        <div>Date created/updated: {newDate}</div>
      </div>
      <div style={editMode}>
        <input
          value={title}
          onChange={(event) => setUpdateTitle(event.currentTarget.value, id)}
        />
        <input
          value={text}
          onChange={(event) => setUpdateText(event.currentTarget.value, id)}
        />
      </div>
      <button onClick={editHandler}>
        {editing === true ? 'Save' : 'Edit Note'}
      </button>
      <button onClick={() => deleteNote(id)}>Delete Note</button>
    </div>
  );
}
