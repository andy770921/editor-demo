import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue } from 'jotai';
import { elementsAtom, selectedElementIdAtom } from '../atoms';
import BlockList from './BlockList';

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
`;

const Canvas: FC = () => {
  const elements = useAtomValue(elementsAtom);
  const [selectedElementId, setSelectedElementId] = useAtom(selectedElementIdAtom);
  const handleBlockClick = useCallback(
    (id: string) => {
      setSelectedElementId(id);
    },
    [setSelectedElementId],
  );

  return (
    <CanvasWrapper>
      <BlockList
        elements={elements}
        selectedElementId={selectedElementId}
        onBlockClick={handleBlockClick}
      />
      {/* {elements.map(({ id, props, children }) => (
        <Fragment key={id}>
          <Block
            {...props}
            active={id === selectedElementId}
            onClick={() => setSelectedElementId(id)}
          />
          {children.length ? (
            <Block
              {...children.props}
              active={id === selectedElementId}
              onClick={() => setSelectedElementId(id)}
            />
          ) : null}
        </Fragment>
      ))} */}
    </CanvasWrapper>
  );
};

export default Canvas;
