import { useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import dirt from './assets/dirt.jpg';
import { Position } from '../r3fType';
import * as RAPIER from '@dimforge/rapier3d-compat';

type CubeProps = {
  position: Position;
  addCube?: (position: Position) => void;
};

export const Cubes = () => {
  const [cubes, setCubes] = useState<Position[]>([[0, 0.5, -10]]);
  const addCube = (position: Position) => {
    setCubes(cubes => [...cubes, position]);
  };

  return cubes.map((coords, index) => (
    <Cube key={index} position={coords} addCube={addCube} />
  ));
};

export function Cube({ position, addCube }: CubeProps) {
  const cubeRef = useRef<RAPIER.RigidBody>(null);
  const texture = useTexture(dirt);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const getDirection = (faceIndex: number) => {
    if (!cubeRef.current) return;
    const { x, y, z } = cubeRef.current.translation();
    const dir: Position[] = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ];
    return dir[Math.floor(faceIndex / 2)];
  };

  return (
    <RigidBody
      position={position}
      type="fixed"
      colliders="cuboid"
      ref={cubeRef}
    >
      <mesh
        receiveShadow
        castShadow
        onPointerOut={() => setHoverIdx(null)}
        onPointerMove={e => {
          if (!e.faceIndex) return;
          e.stopPropagation();
          setHoverIdx(Math.floor(e.faceIndex / 2));
        }}
        onClick={e => {
          if (!e.faceIndex) return;
          e.stopPropagation();
          const dir = getDirection(e.faceIndex);
          console.log('click', e.faceIndex, dir);
          if (dir) addCube?.(dir);
        }}
      >
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial
            attach={`material-${index}`}
            key={index}
            map={texture}
            color={hoverIdx === index ? 'hotpink' : 'white'}
          />
        ))}
        <boxGeometry />
      </mesh>
    </RigidBody>
  );
}
