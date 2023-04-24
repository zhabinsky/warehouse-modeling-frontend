import { useState } from "react";

type UndoStateParams<T> = {
  resetStateAndHistory: undefined | ((state?: T) => void);
  removeEditHistory: (state?: T) => void;
  undo: undefined | (() => void);
  undoDepth: number;
  canUndo: boolean;
};

const trimArray = <T>(arr: T[], maxCount: number) => {
  if (arr.length > maxCount) return arr.slice(arr.length - maxCount);
  return arr;
};

export const useStateUndo = <T>(
  value: T,
  maxUndo = 50
): [
  T,
  (value: T | ((prev: T) => T), ignorePreviousStateInHistory?: boolean) => void,
  UndoStateParams<T>
] => {
  const [prevStates, setPrevStates] = useState<T[]>([]);

  const [state, setState] = useState<T>(value);

  const removeEditHistory = () => {
    setPrevStates([]);
  };

  const resetStateAndHistory =
    prevStates.length > 0
      ? (resetValue: T = value) => {
          removeEditHistory();
          setState(resetValue);
        }
      : undefined;

  const undo =
    prevStates.length > 0
      ? () => {
          setState(prevStates[prevStates.length - 1]);
          setPrevStates(prevStates.slice(0, prevStates.length - 1));
        }
      : undefined;

  const undoDepth = prevStates.length;
  const canUndo = undoDepth > 0;

  return [
    state,

    (
      newValue: T | ((prev: T) => T),
      ignorePreviousStateInHistory?: boolean
    ) => {
      if (!ignorePreviousStateInHistory) {
        setPrevStates(trimArray([...prevStates, state], maxUndo));
      }

      setState(newValue);
    },

    {
      resetStateAndHistory,
      undo,
      undoDepth,
      canUndo,
      removeEditHistory,
    },
  ];
};
