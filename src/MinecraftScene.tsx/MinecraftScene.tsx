import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { KeyboardControls, PointerLockControls, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Cubes } from './Cube';
import { Ground } from './Ground';
import { Player } from './Player';
import Dot from './Dot';

export default function MinecraftScene() {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'w', 'W', 'ㅈ'] },
        { name: 'backward', keys: ['ArrowDown', 's', 'S', 'ㄴ'] },
        { name: 'left', keys: ['ArrowLeft', 'a', 'A', 'ㅁ'] },
        { name: 'right', keys: ['ArrowRight', 'd', 'D', 'ㅇ'] },
        { name: 'jump', keys: ['Space'] },
        { name: 'axe', keys: ['f', 'F', 'ㄹ'] },
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
            <Ground />
          </Suspense>
        </Physics>
        <PointerLockControls />
      </Canvas>
      <Dot />
    </KeyboardControls>
  );
}
