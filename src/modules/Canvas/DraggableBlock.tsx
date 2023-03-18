import { FC, HTMLProps } from 'react';
import styled from 'styled-components';
import { parseToRgb, rgba } from 'polished';
import { useDragBlock, DRAGGABLE_TYPE } from '../../services/reactDnd';
import { ElementProps } from '../interfaces';

const Block = styled.div<ElementProps & { active: boolean; isDragging: boolean }>`
  position: absolute;
  width: 50px;
  height: 50px;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  background-color: ${(props) => rgba({ ...parseToRgb(props.color), alpha: props.o / 100 })};
  outline: ${(props) => (props.active ? 4 : 0)}px solid #0274ff;
  cursor: pointer;
`;

type DraggableBlockProps = ElementProps &
  Omit<HTMLProps<HTMLDivElement>, 'as'> & {
    id: string;
    active: boolean;
  };

const DraggableBlock: FC<DraggableBlockProps> = ({ id, ...blockProps }) => {
  const { isDragging, dragRef } = useDragBlock({
    id,
    type: DRAGGABLE_TYPE.BLOCK,
    enabled: blockProps.active,
  });

  return <Block {...blockProps} ref={dragRef} isDragging={isDragging} />;
};

export default DraggableBlock;
