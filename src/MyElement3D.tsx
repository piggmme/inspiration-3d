import { OrbitControls } from '@react-three/drei'

const TABLE_BOX_SIZE = 10
const CUBE_SIZE = 0.5

type Position = [number, number, number]
type Cube = {
  position: Position
}

export default function MyElement3D() {
  const cubes: {
    position: Position
  }[] = Array.from({ length: 10 * 10 * 10}).map((_, i) => {
    const x = i % 10
    const y = Math.floor(i / 10) % 10
    const z = Math.floor(i / 100)
    return {
      position: [x * CUBE_SIZE, y * CUBE_SIZE, z * CUBE_SIZE]
    }
  })

  return (
    <>
      <OrbitControls />

      <directionalLight position={[0,1,0]} />
      <directionalLight position={[1,2,8]} intensity={0.7} />
      <ambientLight intensity={0.2} />

      <axesHelper scale={10} />


      <group position={[-TABLE_BOX_SIZE/4,0, -TABLE_BOX_SIZE/4]}>
        {cubes.map(cube =>
          <Cube position={cube.position} />
        )}
      </group>

      <TableBox />
    </>
  )
}

function TableBox () {
  return (
    <mesh position={[0,-TABLE_BOX_SIZE/2,0]}>
      <boxGeometry args={[TABLE_BOX_SIZE, TABLE_BOX_SIZE, TABLE_BOX_SIZE]} />
      <meshStandardMaterial color="#eee" />
    </mesh>
  )
}

function Cube ({ position }: { position: Position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial color="cyan" />
    </mesh>
  )
}