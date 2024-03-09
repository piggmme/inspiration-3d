import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';
import Tool from './Tool';
import { useToolStore } from './store/useToolStore';
import { useKeyboardControls } from '@react-three/drei';
import { Controls } from '../r3fType';

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
  const rigidBodyRef = useRef<RAPIER.RigidBody>(null);

  // 카메라 설정
  useFrame(state => {
    if (!rigidBodyRef.current) return;
    state.camera.position.set(
      ...vectorToArray(rigidBodyRef.current.translation()),
    );
  });

  // 플레이어 이동
  const [, getKeyboard] = useKeyboardControls<Controls>();
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
  const rapier = useRapier();
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

  // 도구 바꾸기
  const changeTool = useKeyboardControls<Controls>(state => state.changeTool);
  const toolMode = useToolStore(state => state.mode);
  const toggleMode = useToolStore(state => state.toggleMode);
  const toolRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  useEffect(() => {
    changeTool && toggleMode();
  }, [changeTool]);

  // 도구 애니메이션
  useFrame(state => {
    if (!rigidBodyRef?.current || !toolRef.current?.children[0]) return;
    const velocity = rigidBodyRef.current.linvel();
    const isMoving =
      Math.sqrt(
        Math.abs(velocity.x) + Math.abs(velocity.y) + Math.abs(velocity.z),
      ) > 1;

    toolRef.current.children[0].rotation.x = lerp(
      toolRef.current.children[0].rotation.x,
      isMoving ? Math.sin(state.clock.elapsedTime * 10) / 6 : 0,
      0.1,
    );
    toolRef.current.rotation.copy(state.camera.rotation);
    toolRef.current.position
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
        ref={toolRef}
        onPointerMissed={() => {
          if (!toolRef.current || !toolRef.current.children[0]) return;
          toolRef.current.children[0].rotation.x = -0.8;
        }}
      >
        <Tool type={toolMode} />
      </group>
    </>
  );
}
