import { FC, Fragment } from 'react';
import styled from 'styled-components';
import { parseToRgb, rgba } from 'polished';
import { Element, ElementProps } from '../interfaces';

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

interface BlockListProps {
  elements: Pick<Element, 'id' | 'props' | 'children'>[];
  selectedElementId: string;
  onBlockClick: (id: string) => void;
}

const BlockList: FC<BlockListProps> = ({ elements, selectedElementId, onBlockClick }) => {
  return (
    <>
      {elements.map(({ id, props, children }) => (
        <Fragment key={id}>
          <Block {...props} active={id === selectedElementId} onClick={() => onBlockClick(id)} />
          {children.length ? (
            <BlockList
              elements={children}
              selectedElementId={selectedElementId}
              onBlockClick={onBlockClick}
            />
          ) : null}
        </Fragment>
      ))}
    </>
  );
};

export default BlockList;
