import Notes from './Components/Notes';
import { container } from './Global';
import image from './img/background1.jpg';

/** @jsxImportSource @emotion/react */

export default function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        minHeight: '100vh',
      }}
      css={container}
    >
      <Notes />
    </div>
  );
}
