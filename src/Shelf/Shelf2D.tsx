import { Box } from "@mui/material";

import { ShelfType } from "../utils/createShelf";

export const Shelf2D: React.FC<{
  shelf: ShelfType;
  onClickShelf: (shelf: ShelfType) => void;
}> = ({ shelf, onClickShelf }) => {
  const isLeafNode = shelf.shelves.length === 0;

  if (isLeafNode) {
    // This is a leaf node therefore we render it
    return (
      <Box position="relative">
        <Box
          onClick={() => onClickShelf(shelf)}
          sx={{
            content: '" "',
            position: "absolute",
            top: 2,
            left: 2,
            bottom: 2,
            right: 2,
            background: "white",
            "&:hover": {
              background: "rgba(240, 240, 240)",
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box width="100%" height="100%">
      <Box
        sx={{
          display: "grid",
          [shelf.split === "horizontal"
            ? "gridTemplateColumns"
            : "gridTemplateRows"]: shelf.shelves
            .map((e) => e.scale * 100 + "fr")
            .join(" "),
          height: "100%",
        }}
      >
        {shelf.shelves.map((shelfChild) => (
          <Shelf2D
            key={shelfChild.id}
            shelf={shelfChild}
            onClickShelf={onClickShelf}
          />
        ))}
      </Box>
    </Box>
  );
};
