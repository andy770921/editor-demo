import { FC, HTMLProps } from 'react';
import styled from 'styled-components';
import { parseToRgb, rgba } from 'polished';
import { useDrag } from 'react-dnd';
import { DRAGGABLE_TYPE } from '../../services/reactDnd/constants';
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
    active: boolean;
  };

const DraggableBlock: FC<DraggableBlockProps> = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAGGABLE_TYPE.BLOCK,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return <Block {...props} ref={drag} isDragging={isDragging} />;
};

export default DraggableBlock;
