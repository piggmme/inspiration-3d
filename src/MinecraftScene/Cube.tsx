import { useRef, useState } from 'react';
import { Edges, useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import dirt from './assets/texture/dirt.png';
import grass from './assets/texture/grass.png';
import grassDirtSide from './assets/texture/grassDirtSide.png';
import * as THREE from 'three';
import { Position } from '../r3fType';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { CubeDto, TextureType, useCubesStore } from './store/useCubesStore';
import { CUBE_SIZE } from './data/cubes';

type CubeProps = {
  position: Position;
  type?: TextureType;
  addCube: (cube: Omit<CubeDto, "id">) => void;
};

export const Cubes = () => {
  const cubes = useCubesStore(state => state.cubes);
  const addCube = useCubesStore(state => state.addCube);

  return cubes.map(({position, type, id}) => <Cube key={id} type={type} position={position} addCube={addCube} />);
};

export function Cube({ position, type = 'grassDirt', addCube }: CubeProps) {
  const cubeRef = useRef<RAPIER.RigidBody>(null);

  const { getTexture } = useTextures();
  const textures = getTexture(type);

  const [hovered, hover] = useState(false);

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
        onPointerOver={e => {
          e.stopPropagation();
          hover(true);
        }}
        onPointerOut={() => hover(false)}
        onClick={e => {
          if (!e.faceIndex) return;
          e.stopPropagation();
          const dir = getDirection(e.faceIndex);
          if (dir) addCube?.({ position: dir, type });
        }}
      >
        {textures.map((texture, index) => (
          <meshStandardMaterial
            attach={`material-${index}`}
            key={index}
            map={texture}
          />
        ))}
        <Edges
          visible={hovered}
          threshold={15}
          color={'#000'}
          renderOrder={hovered ? 1000 : 0}
        />
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      </mesh>
    </RigidBody>
  );
}

function useTextures() {
  const dirtTexture = useTexture(dirt);
  dirtTexture.magFilter = THREE.NearestFilter;
  const dirtTextures = Array(6).fill(dirtTexture);

  const grassTexture = useTexture(grass);
  grassTexture.magFilter = THREE.NearestFilter;
  const grassTextures = Array(6).fill(grassTexture);

  const grassDirtSideTexture = useTexture(grassDirtSide);
  grassDirtSideTexture.magFilter = THREE.NearestFilter;
  const grassDirtSideTextures = [
    grassDirtSideTexture,
    grassDirtSideTexture,
    grassTexture,
    dirtTexture,
    grassDirtSideTexture,
    grassDirtSideTexture,
  ];

  const getTexture = (texture: TextureType) => {
    switch (texture) {
      case 'dirt':
        return dirtTextures;
      case 'grass':
        return grassTextures;
      case 'grassDirt':
        return grassDirtSideTextures;
      default:
        return dirtTextures;
    }
  };

  return { getTexture, dirtTextures, grassTextures, grassDirtSideTextures };
}
