import React, { useState } from "react";
import { ShelfRectangle } from "../math/shelfToRectangles";

export const ShelfBox: React.FC<{
  rect: ShelfRectangle;
  onClick: () => void;
}> = React.memo(({ rect, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      position={[rect.x, rect.y, 0]}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <boxBufferGeometry
        attach="geometry"
        args={[rect.width, rect.height, 1]}
      />
      <meshPhongMaterial
        attach="material-0"
        color={hovered ? "darkgray" : "#cecfcf"}
      />
      <meshPhongMaterial
        attach="material-1"
        color={hovered ? "darkgray" : "#cecfcf"}
      />
      <meshPhongMaterial
        attach="material-2"
        color={hovered ? "darkgray" : "#cecfcf"}
      />
      <meshPhongMaterial
        attach="material-3"
        color={hovered ? "darkgray" : "#cecfcf"}
      />
      <meshPhongMaterial
        attach="material-4"
        color={hovered ? "darkgray" : "gray"}
      />
      <meshPhongMaterial
        attach="material-5"
        color={hovered ? "darkgray" : "gray"}
      />
    </mesh>
  );
});
