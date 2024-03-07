import './App.css';
import { Canvas } from '@react-three/fiber';
import MyElement3D from './MyElement3D';
import { Suspense } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';

function App() {
  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [8, 8, 5] }}
        shadows
        dpr={1}
        style={{
          background: 'linear-gradient(#c0fdff, #d8bbff)',
        }}
      >
        <Suspense>
          <OrbitControls />

          <Physics>
            <directionalLight
              castShadow
              position={[10, 10, 10]}
              shadow-camera-bottom={-40}
              shadow-camera-top={40}
              shadow-camera-left={-40}
              shadow-camera-right={40}
              shadow-mapSize-width={1024}
              shadow-bias={-0.0001}
            />

            <Environment preset="dawn" />
            <axesHelper scale={10} />

            <MyElement3D />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
