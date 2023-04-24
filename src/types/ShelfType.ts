import { SplitDirection } from "./SplitDirection";

export type ShelfType = {
  shelves: ShelfType[];
  split: SplitDirection;
  id: string;
  scale: number;
};
