import { create } from 'zustand';
import { Position } from '../../r3fType';
import { grassDirtCube, groundCubes } from '../data/cubes';
import { v4 as uuidv4 } from 'uuid';

export type TextureType = 'dirt' | 'grass' | 'grassDirt';

export type CubeDto = {
  position: Position;
  type: TextureType;
  id: string;
}

type CubesStore = {
  cubes: CubeDto[];
  addCube: (cube: Omit<CubeDto, "id">) => void;
  addCubes: (cubes: Omit<CubeDto, "id">[]) => void;
};

const initialCubes: CubeDto[] = [grassDirtCube, ...groundCubes]

export const useCubesStore = create<CubesStore>(set => ({
  cubes: initialCubes,
  addCube: cube => set(state => ({ cubes: [...state.cubes, {...cube, id: uuidv4()}] })),
  addCubes: newCubes => set(state => ({ cubes: [
    ...state.cubes,
    ...newCubes.map(cube => ({...cube, id: uuidv4()}))
    ]
  })),
}));
