import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue } from 'jotai';
import { elementsAtom, selectedElementIdAtom, selectedElementPropsAtom } from '../atoms';
import BlockList from './BlockList';
import { useDropUpdatePosition, DRAGGABLE_TYPE } from '../../services/reactDnd';

const CanvasWrapper = styled.div<{ isOverDroppableArea: boolean }>`
  position: relative;
  overflow: hidden;
  background-color: ${(props) => (props.isOverDroppableArea ? '#FEFDD7' : 'white')};
`;

const Canvas: FC = () => {
  const elements = useAtomValue(elementsAtom);
  const [selectedElementId, setSelectedElementId] = useAtom(selectedElementIdAtom);
  const [{ x: selectedElementX, y: selectedElementY }, setSelectedElementProps] =
    useAtom(selectedElementPropsAtom);

  const handleBlockClick = useCallback(
    (id: string) => {
      setSelectedElementId(id);
    },
    [setSelectedElementId],
  );

  const { isOver, dropRef } = useDropUpdatePosition({
    accept: DRAGGABLE_TYPE.BLOCK,
    originalX: selectedElementX,
    originalY: selectedElementY,
    onDropFinished: ({ nextX, nextY }) => {
      setSelectedElementProps({ x: nextX, y: nextY });
    },
  });

  return (
    <CanvasWrapper ref={dropRef} isOverDroppableArea={isOver}>
      <BlockList
        elements={elements}
        selectedElementId={selectedElementId}
        onBlockClick={handleBlockClick}
      />
    </CanvasWrapper>
  );
};

export default Canvas;
