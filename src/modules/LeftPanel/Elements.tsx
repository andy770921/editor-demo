import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { elementsAtom, selectedElementIdAtom, updateElementNameAtom } from '../atoms';
import EditableList, { EditConfirmParams } from './EditableList';

const ElementsWrapper = styled.div``;

const Elements: FC = () => {
  const elements = useAtomValue(elementsAtom);
  const [selectedElementId, setSelectedElementId] = useAtom(selectedElementIdAtom);
  const updateElementName = useSetAtom(updateElementNameAtom);

  const handleEditConfirm = useCallback(
    ({ id, name }: EditConfirmParams) => {
      updateElementName({ elementId: id, elementName: name });
    },
    [updateElementName],
  );

  const handleSingleClick = useCallback(
    (pageId: string) => {
      if (pageId !== selectedElementId) {
        setSelectedElementId(pageId);
      }
    },
    [selectedElementId, setSelectedElementId],
  );

  return (
    <ElementsWrapper>
      <h4>Elements</h4>
      <EditableList
        list={elements}
        selectedId={selectedElementId}
        onSingleClick={handleSingleClick}
        onEditConfirm={handleEditConfirm}
      />
    </ElementsWrapper>
  );
};

export default Elements;
