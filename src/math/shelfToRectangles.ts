import { ShelfType } from "../utils/createShelf";

export type ShelfRectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  shelf: ShelfType;
};

function calculateTotalScale(shelves: ShelfType[]): number {
  let totalScaleSum = 0;

  shelves.forEach((shelf) => (totalScaleSum += shelf.scale));

  return totalScaleSum;
}

export const shelfSpacing = 0.01;

export function shelfToRectangles(
  shelf: ShelfType,
  x = 0,
  y = 0,
  widthParent = 3,
  heightParent = 1,
  rectangles: ShelfRectangle[] = []
): ShelfRectangle[] {
  const { split: parentSplitDirection } = shelf;

  const totalScalesSum = calculateTotalScale(shelf.shelves);

  const isVertical = parentSplitDirection === "vertical";

  const shelvesWithSizes = shelf.shelves.map((shelfChild) => {
    const { scale } = shelfChild;

    const portion = scale / totalScalesSum;

    const width = isVertical ? widthParent : portion * widthParent;
    const height = isVertical ? portion * heightParent : heightParent;

    return {
      shelf: shelfChild,
      width,
      height,
    };
  });

  let currentX = x;
  let currentY = y;

  const shelvesWithSizesWithPosition = shelvesWithSizes.map(
    ({ shelf, width, height }) => {
      const result = {
        shelf,
        width,
        height,
        x: currentX,
        y: currentY,
      };

      if (isVertical) {
        currentY += height;
      } else {
        currentX += width;
      }

      return result;
    }
  );

  shelvesWithSizesWithPosition.forEach(({ shelf, x, y, width, height }) => {
    if (shelf.shelves.length === 0) {
      rectangles.push({
        x: x + width / 2 + shelfSpacing,
        y: y + height / 2 + shelfSpacing,
        width: width - shelfSpacing * 2,
        height: height - shelfSpacing * 2,
        shelf,
      });
    } else {
      shelfToRectangles(shelf, x, y, width, height, rectangles);
    }
  });

  return rectangles;
}
