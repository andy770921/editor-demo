import { FC } from 'react';
import styled from 'styled-components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { pagesAtom, selectedPageIdAtom, resetSelectedElementIdAtom } from '../atoms';

const PagesWrapper = styled.div`
  border-bottom: 1px solid;
  padding-bottom: 16px;
`;

const PageItem = styled.div`
  cursor: pointer;
`;

const Pages: FC = () => {
  const pages = useAtomValue(pagesAtom);
  const [selectedPageId, setSelectedPageId] = useAtom(selectedPageIdAtom);
  const resetSelectedElementId = useSetAtom(resetSelectedElementIdAtom);

  const makeClickHandler = (pageId: string) => () => {
    if (pageId === selectedPageId) {
      return;
    }
    setSelectedPageId(pageId);
    resetSelectedElementId();
  };

  return (
    <PagesWrapper>
      <h4>Pages</h4>
      {pages.map(({ id, name }) => (
        <PageItem key={id} onClick={makeClickHandler(id)}>
          {id === selectedPageId ? <strong>{name}</strong> : name}
        </PageItem>
      ))}
    </PagesWrapper>
  );
};

export default Pages;
