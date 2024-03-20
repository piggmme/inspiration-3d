import { create } from 'zustand';
import { Position } from '../../r3fType';

export const CUBE_SIZE = 1;

type CubesStore = {
  cubes: Position[];
  addCube: (cube: Position) => void;
};

export const useCubesStore = create<CubesStore>(set => ({
  cubes: [[0, CUBE_SIZE / 2, -10]],
  addCube: cube => set(state => ({ cubes: [...state.cubes, cube] })),
}));
