import * as THREE from 'three';
import { Plane, useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import grass from './assets/grass.jpg';

export function Ground() {
  const texture = useTexture(grass);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <RigidBody type="fixed" colliders={false}>
      <Plane
        receiveShadow
        castShadow
        args={[1000, 1000, 1, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshBasicMaterial map={texture} map-repeat={[1000, 1000]} />
      </Plane>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
}
