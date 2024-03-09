import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';
import Axe from './Axe';

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

const vectorToArray = (v: RAPIER.Vector): [number, number, number] => [
  v.x,
  v.y,
  v.z,
];

const getVectorFromBoolean = (b1: boolean, b2: boolean) => {
  const v1 = b1 ? 1 : 0;
  const v2 = b2 ? 1 : 0;
  return v1 - v2;
};

export function Player({ lerp = THREE.MathUtils.lerp }) {
  const axeRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
  const rigidBodyRef = useRef<RAPIER.RigidBody>(null);
  const rapier = useRapier();
  const [, getKeyboard] = useKeyboardControls();

  // 카메라 설정
  useFrame(state => {
    if (!rigidBodyRef.current) return;
    state.camera.position.set(
      ...vectorToArray(rigidBodyRef.current.translation()),
    );
  });

  // 플레이어 이동
  useFrame(state => {
    if (!rigidBodyRef.current) return;

    const { forward, backward, left, right } = getKeyboard();
    const velocity = rigidBodyRef.current.linvel();

    frontVector.set(0, 0, getVectorFromBoolean(backward, forward));
    sideVector.set(getVectorFromBoolean(left, right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    rigidBodyRef.current.setLinvel(
      {
        x: direction.x,
        y: velocity.y,
        z: direction.z,
      },
      true,
    );
  });

  //  점프
  useFrame(() => {
    if (!rigidBodyRef.current) return;
    const { jump } = getKeyboard();

    const world = rapier.world;
    const ray = world.castRay(
      new RAPIER.Ray(rigidBodyRef.current.translation(), { x: 0, y: -1, z: 0 }),
      0,
      true,
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    if (jump && grounded)
      rigidBodyRef.current.setLinvel({ x: 0, y: 5.5, z: 0 }, true);
  });

  // 도끼
  useFrame(state => {
    if (!rigidBodyRef?.current || !axeRef.current?.children[0]) return;
    const velocity = rigidBodyRef.current.linvel();
    const isMoving =
      Math.sqrt(
        Math.abs(velocity.x) + Math.abs(velocity.y) + Math.abs(velocity.z),
      ) > 1;

    axeRef.current.children[0].rotation.x = lerp(
      axeRef.current.children[0].rotation.x,
      isMoving ? Math.sin(state.clock.elapsedTime * 10) / 6 : 0,
      0.1,
    );
    axeRef.current.rotation.copy(state.camera.rotation);
    axeRef.current.position
      .copy(state.camera.position)
      .add(state.camera.getWorldDirection(rotation).multiplyScalar(1));
  });

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[0, 10, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
      <group
        ref={axeRef}
        onPointerMissed={() => {
          if (!axeRef.current || !axeRef.current.children[0]) return;
          axeRef.current.children[0].rotation.x = -0.8;
        }}
      >
        <Axe position={[0.4, -0.2, 0.3]} />
      </group>
    </>
  );
}
