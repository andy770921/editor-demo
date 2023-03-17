import { FC } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue } from 'jotai';
import { parseToRgb, rgba } from 'polished';
import { elementsAtom, selectedElementIdAtom } from '../atoms';
import { ElementProps } from '../interfaces';

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
`;

const Block = styled.div<ElementProps & { active: boolean }>`
  position: absolute;
  width: 50px;
  height: 50px;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  background-color: ${(props) => rgba({ ...parseToRgb(props.color), alpha: props.o / 100 })};
  outline: ${(props) => (props.active ? 4 : 0)}px solid #0274ff;
  cursor: pointer;
`;

const Canvas: FC = () => {
  const elements = useAtomValue(elementsAtom);
  const [selectedElementId, setSelectedElementId] = useAtom(selectedElementIdAtom);

  return (
    <CanvasWrapper>
      {elements.map(({ id, props }) => (
        <Block
          key={id}
          {...props}
          active={id === selectedElementId}
          onClick={() => setSelectedElementId(id)}
        />
      ))}
    </CanvasWrapper>
  );
};

export default Canvas;
