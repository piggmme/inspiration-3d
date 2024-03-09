import { create } from 'zustand';
import { ToolType } from '../data';

export const CUBE_SIZE = 1;

type ToolStore = {
  mode: ToolType;
  setMode: (mode: ToolType) => void;
  toggleMode: () => void;
};

export const useToolStore = create<ToolStore>(set => ({
  mode: 'pick',
  setMode: mode => set(() => ({ mode })),
  toggleMode: () =>
    set(state => ({ mode: state.mode === 'pick' ? 'axe' : 'pick' })),
}));
