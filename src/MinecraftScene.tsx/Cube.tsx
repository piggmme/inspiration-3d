import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import dirt from './assets/dirt.jpg';
import { Position } from '../r3fType';

type CubeProps = {
  position: Position;
};

export function Cube({ position }: CubeProps) {
  const cubeRef = useRef(null);
  const texture = useTexture(dirt);

  return (
    <RigidBody
      position={position}
      type="fixed"
      colliders="cuboid"
      ref={cubeRef}
    >
      <mesh receiveShadow castShadow>
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial
            attach={`material-${index}`}
            key={index}
            map={texture}
            color="white"
          />
        ))}
        <boxGeometry />
      </mesh>
    </RigidBody>
  );
}
