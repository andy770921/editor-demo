import { FC, Fragment } from 'react';
import { Element } from '../interfaces';
import DraggableBlock from './DraggableBlock';

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
          <DraggableBlock
            {...props}
            id={id}
            active={id === selectedElementId}
            onClick={() => onBlockClick(id)}
          />
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
