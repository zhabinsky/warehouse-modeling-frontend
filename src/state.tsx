import { atom } from "jotai";

export const ToolTypes = [
  "split-horizontal-2",
  "split-horizontal-8",
  "split-vertical-2",
  "split-vertical-8",
  "split-4",
  "split-16",
  "scale-cell-up",
  "scale-cell-down",
  "add-sibling",
  "delete",
] as const;

export type ToolType = typeof ToolTypes[number];

export const atomSelectedTool = atom<undefined | ToolType>(
  "split-horizontal-2"
);
