import { OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const TABLE_BOX_SIZE = 10;
const CUBE_SIZE = 0.5;

type Position = [number, number, number];
type Cube = {
  position: Position;
};

export default function MyElement3D() {
  const cubes: {
    position: Position;
  }[] = Array.from({ length: 10 * 10 * 10 }).map((_, i) => {
    const x = i % 10;
    const y = Math.floor(i / 10) % 10;
    const z = Math.floor(i / 100);
    return {
      position: [x * CUBE_SIZE, y * CUBE_SIZE, z * CUBE_SIZE],
    };
  });

  return (
    <>
      <OrbitControls />

      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />
      <ambientLight intensity={0.2} />

      <axesHelper scale={10} />

      <group position={[-TABLE_BOX_SIZE / 4, 0, -TABLE_BOX_SIZE / 4]}>
        {cubes.map(cube => (
          <Cube position={cube.position} />
        ))}
      </group>

      <TableBox />
    </>
  );
}

function TableBox() {
  return (
    <RoundedBox
      args={[TABLE_BOX_SIZE, TABLE_BOX_SIZE / 2, TABLE_BOX_SIZE]}
      position={[0, -TABLE_BOX_SIZE / 4, 0]}
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
        color="#ffffff"
        emissive="#ffffff" // 매쉬가 내는 빛. 기본값은 블랙
        roughness={0} // 거칠기
        metalness={0} // 금속감
        clearcoat={0.35} // 코팅
        clearcoatRoughness={0}
        flatShading={false} // 평면 쉐이딩. 기본값은 false
        // 유리 관련 속성값
        transmission={0.35} // 투명도. 기본값은 0
        thickness={3} // 유리의 두께
        ior={1.3} // 굴절률
      />
    </RoundedBox>
  );
}

function Cube({ position }: { position: Position }) {
  return (
    <RoundedBox args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} position={position}>
      {/* <meshLambertMaterial attach="material" color="#f3c4fb" /> */}
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
        color="#f3c4fb"
        emissive="#deaaff" // 매쉬가 내는 빛. 기본값은 블랙
        roughness={0} // 거칠기
        metalness={0} // 금속감
        clearcoat={0.35} // 코팅
        clearcoatRoughness={0}
        flatShading={false} // 평면 쉐이딩. 기본값은 false
      />
    </RoundedBox>
  );
}
