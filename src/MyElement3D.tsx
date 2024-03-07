import { RoundedBox } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { Cubes } from './Cubes';
import { useThree } from '@react-three/fiber';

const TABLE_BOX_SIZE = 10;

export default function MyElement3D() {
  useThree(({ camera }) => {
    camera.rotation.set(THREE.MathUtils.degToRad(15), 0, 0);
  });

  return (
    <>
      <Cubes />
      <FloorBox />
    </>
  );
}

function FloorBox() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, -TABLE_BOX_SIZE / 4, 0]}>
        <RoundedBox
          castShadow
          receiveShadow
          args={[TABLE_BOX_SIZE, TABLE_BOX_SIZE / 2, TABLE_BOX_SIZE]}
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
            color="#fff"
            emissive="#f3c4fb" // 매쉬가 내는 빛. 기본값은 블랙
            roughness={0} // 거칠기
            metalness={0} // 금속감
            clearcoat={0.35} // 코팅
            clearcoatRoughness={0}
            flatShading={false} // 평면 쉐이딩. 기본값은 false
            // 유리 관련 속성값
            ior={1.3} // 굴절률
          />
        </RoundedBox>
      </mesh>
    </RigidBody>
  );
}
