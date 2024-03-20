import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { KeyboardControls, PointerLockControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Cubes } from './Cube';
import { Player } from './Player';
import Dot from './Dot';
import { Controls } from '../r3fType';

export default function MinecraftScene() {
  return (
    <KeyboardControls
      map={[
        { name: Controls.forward, keys: ['ArrowUp', 'w', 'W', 'ㅈ'] },
        { name: Controls.backward, keys: ['ArrowDown', 's', 'S', 'ㄴ'] },
        { name: Controls.left, keys: ['ArrowLeft', 'a', 'A', 'ㅁ'] },
        { name: Controls.right, keys: ['ArrowRight', 'd', 'D', 'ㅇ'] },
        { name: Controls.jump, keys: ['Space'] },
        { name: Controls.changeTool, keys: ['f', 'F', 'ㄹ'] },
      ]}
    >
      <Canvas shadows camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={2} />
        <pointLight castShadow intensity={10} position={[30, 30, 30]} />
        <Physics gravity={[0, -30, 0]}>
          <Suspense>
            <Cubes />
            <Player />
          </Suspense>
        </Physics>
        <PointerLockControls />
      </Canvas>
      <Dot />
    </KeyboardControls>
  );
}
