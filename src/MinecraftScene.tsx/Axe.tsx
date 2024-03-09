/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Blender3D (https://sketchfab.com/Blender3D)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/0d62f4d3676545c88ec8523213c055dd
title: Minecraft Diamond Axe
*/

import { useGLTF } from '@react-three/drei';
import pickUrl from './assets/pick.glb?url';
import { Position } from '../r3fType';

export default function Axe({ position }: { position: Position }) {
  const { scene } = useGLTF(pickUrl);

  return (
    <group dispose={null} position={position}>
      <group rotation={[0, Math.PI / 8, -Math.PI * (3 / 2)]} scale={0.018}>
        <primitive object={scene} color="white" />
      </group>
    </group>
  );
}

useGLTF.preload(pickUrl);
