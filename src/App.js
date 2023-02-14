import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Notes from './Components/Notes';

export default function App() {
  // const [notes, setNotes] = useState([]);
  // const [title, setTitle] = useState('');
  // const [text, setText] = useState('');

  // console.log(notes);

  // const titleHandler = (event) => {
  //   setTitle(event.currentTarget.value);
  // };

  // const textHandler = (event) => {
  //   setText(event.currentTarget.value);
  // };

  return (
    <div>
      <Header />
      <Notes />
    </div>
  );
}
