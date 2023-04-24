import { Canvas } from "@react-three/fiber";
import { Environment, Grid, MapControls } from "@react-three/drei";
import React from "react";
import { ShelfRectangle } from "../math/shelfToRectangles";
import { ShelfBox } from "./ShelfBox";
import { Vector3 } from "three";
import { ShelfType } from "../utils/createShelf";

const lightingConfig = {
  hemi: {
    intensity: 0.4,
  },
  direct: {
    intensity: 0.5,
    "shadow-mapSize-height": 2048,
    "shadow-mapSize-width": 2048,
  },
};

export const Shelf3D: React.FC<{
  onClickShelf: (shelf: ShelfType) => void;
  rectangles: ShelfRectangle[];
}> = ({ onClickShelf, rectangles }) => {
  return (
    <Canvas
      orthographic
      camera={{
        position: new Vector3(1, 1, 1).multiplyScalar(100),
        zoom: 250,
      }}
    >
      <Grid cellColor="black" args={[10, 10]} position-y={-2} />

      <group rotation-x={Math.PI} position-y={0.5} position-x={-1.5}>
        {rectangles.map((rect) => (
          <ShelfBox
            key={rect.shelf.id}
            rect={rect}
            onClick={() => onClickShelf(rect.shelf)}
          />
        ))}
      </group>

      <hemisphereLight
        position={[0, 10, 0]}
        color={0xffffff}
        {...lightingConfig.hemi}
      />

      <directionalLight color={0xffffff} {...lightingConfig.direct} />

      <ambientLight intensity={0.1} />

      <Environment preset="lobby" />

      <Environment preset="forest" />

      <MapControls />
    </Canvas>
  );
};
