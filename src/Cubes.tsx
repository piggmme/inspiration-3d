import {
  InstancedRigidBodies,
  InstancedRigidBodyProps,
  RapierRigidBody,
} from '@react-three/rapier';
import { useMemo, useRef } from 'react';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';
import { Position } from './r3fType';

const MAX_COUNT = 2000;
const COL_COUNT = 5;
const CUBE_SIZE = 0.5;
const SIZE = COL_COUNT * CUBE_SIZE;

export const Cubes = ({
  position = [-SIZE / 2, CUBE_SIZE / 2, -SIZE / 2],
}: {
  position?: Position;
}) => {
  const api = useRef<RapierRigidBody[]>([]);

  const cubes = useMemo<InstancedRigidBodyProps[]>(
    () =>
      Array.from({
        length: COL_COUNT * COL_COUNT * COL_COUNT,
      }).map((_, i) => {
        const x = i % COL_COUNT;
        const y = Math.floor(i / COL_COUNT) % COL_COUNT;
        const z = Math.floor(i / (COL_COUNT * COL_COUNT));
        return {
          key: i,
          position: [x * CUBE_SIZE, y * CUBE_SIZE, z * CUBE_SIZE],
        };
      }),
    [],
  );

  return (
    <group position={position}>
      <InstancedRigidBodies instances={cubes} ref={api} colliders={'cuboid'}>
        <instancedMesh
          castShadow
          receiveShadow
          args={[
            new RoundedBoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE),
            undefined,
            MAX_COUNT,
          ]}
          count={cubes.length}
          onClick={evt => {
            api.current![evt.instanceId!].applyTorqueImpulse(
              {
                x: 0,
                y: 50,
                z: 0,
              },
              true,
            );
          }}
        >
          <meshPhysicalMaterial
            visible={true}
            transparent={true}
            opacity={1}
            // depth buffer
            depthTest={true}
            depthWrite={true}
            // rendering
            side={THREE.DoubleSide} // 양면
            wireframe={false}
            color="#deaaff"
            emissive="#deaaff" // 매쉬가 내는 빛. 기본값은 블랙
            roughness={0} // 거칠기
            metalness={0} // 금속감
            clearcoat={0.35} // 코팅
            clearcoatRoughness={0}
            flatShading={false} // 평면 쉐이딩. 기본값은 false
          />
        </instancedMesh>
      </InstancedRigidBodies>
    </group>
  );
};
