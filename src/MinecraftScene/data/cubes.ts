import { CubeDto } from "../store/useCubesStore";
import { v4 as uuidv4 } from 'uuid';

export const CUBE_SIZE = 1;

export const grassDirtCube: CubeDto = {
  position: [0, CUBE_SIZE, -10],
  type: 'grassDirt',
  id: uuidv4(),
}

const GROUND_SIZE = 30;
const groundPositions = Array.from({ length: GROUND_SIZE }, (_, i) => i - (GROUND_SIZE / 2)).flatMap(x =>
  Array.from({ length: GROUND_SIZE }, (_, i) => i - (GROUND_SIZE / 2)).map<Position>(z => [x, 0, z])
);
export const groundCubes: CubeDto[] = groundPositions.map(position => ({
  type: 'grass',
  position,
  id: uuidv4(),
}));