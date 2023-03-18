import { useDrop } from 'react-dnd';
import { DRAGGABLE_TYPE } from './constants';
import { ValueOf } from 'type-fest';

interface UseDropWithPositionDifferenceParams {
  accept: ValueOf<typeof DRAGGABLE_TYPE>;
  originalX: number;
  originalY: number;
  onDropFinished: (position: { nextX: number; nextY: number }) => void;
}

export const useDropUpdatePosition = ({
  accept,
  originalX,
  originalY,
  onDropFinished,
}: UseDropWithPositionDifferenceParams) => {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept,
      drop: (_, monitor) => {
        const offsetDifference = monitor.getDifferenceFromInitialOffset();

        if (offsetDifference) {
          onDropFinished({
            nextX: originalX + offsetDifference.x,
            nextY: originalY + offsetDifference.y,
          });
        }
      },
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
        };
      },
    }),
    [originalX, originalY],
  );

  return { isOver, dropRef };
};
