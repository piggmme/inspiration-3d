import { Position, Rotation } from '../r3fType';

export type ToolType = 'axe' | 'pick';
export type Tool = {
  position: Position;
  rotation: Rotation;
  scale: number;
};

export const AXE_DATA: Tool = {
  rotation: [-Math.PI / 8, -Math.PI / 2, 0],
  scale: 0.7,
  position: [0.4, -0.55, 0.3],
};

export const PICK_DATA: Tool = {
  rotation: [0, Math.PI / 8, -Math.PI * (3 / 2)],
  scale: 0.018,
  position: [0.4, -0.2, 0.3],
};
