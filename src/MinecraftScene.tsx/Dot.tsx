import dot from './assets/dot.svg';

export default function Dot() {
  return (
    <img
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50px',
        height: '50px',
      }}
      src={dot}
    />
  );
}
