import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  pagesAtom,
  selectedPageIdAtom,
  resetSelectedElementIdAtom,
  updatePageNameAtom,
} from '../atoms';
import EditableList, { EditConfirmParams } from './EditableList';

const PagesWrapper = styled.div`
  border-bottom: 1px solid;
  padding-bottom: 16px;
`;

const Pages: FC = () => {
  const pages = useAtomValue(pagesAtom);
  const [selectedPageId, setSelectedPageId] = useAtom(selectedPageIdAtom);
  const resetSelectedElementId = useSetAtom(resetSelectedElementIdAtom);
  const updatePageName = useSetAtom(updatePageNameAtom);

  const handleEditConfirm = useCallback(
    ({ id, name }: EditConfirmParams) => {
      updatePageName({ pageId: id, pageName: name });
    },
    [updatePageName],
  );

  const handleSingleClick = useCallback(
    (pageId: string) => {
      if (pageId !== selectedPageId) {
        setSelectedPageId(pageId);
        resetSelectedElementId();
      }
    },
    [resetSelectedElementId, selectedPageId, setSelectedPageId],
  );

  return (
    <PagesWrapper>
      <h4>Pages</h4>
      <EditableList
        list={pages}
        selectedId={selectedPageId}
        onSingleClick={handleSingleClick}
        onEditConfirm={handleEditConfirm}
      />
    </PagesWrapper>
  );
};

export default Pages;
