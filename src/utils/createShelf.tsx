import { nanoid } from "nanoid";
import { ShelfType } from "../types/ShelfType";

export const createShelf = (): ShelfType => {
  return {
    id: nanoid(),
    shelves: [],
    split: "horizontal",
    scale: 1,
  };
};
