import { FC } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue } from 'jotai';
import { elementsAtom, selectedElementIdAtom } from '../atoms';

const ElementsWrapper = styled.div``;

const ElementItem = styled.div`
  cursor: pointer;
`;

const Elements: FC = () => {
  const elements = useAtomValue(elementsAtom);
  const [selectedElementId, setSelectedElementId] = useAtom(selectedElementIdAtom);

  return (
    <ElementsWrapper>
      <h4>Elements</h4>
      {elements.map(({ id, name }) => (
        <ElementItem key={id} onClick={() => setSelectedElementId(id)}>
          {id === selectedElementId ? <strong>{name}</strong> : name}
        </ElementItem>
      ))}
    </ElementsWrapper>
  );
};

export default Elements;
