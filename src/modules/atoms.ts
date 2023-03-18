import { atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { atomWithImmer } from 'jotai-immer';
import set from 'lodash/set';
import { flattenTree, findTreeIndexPath } from '../utils/array';
import { ElementProps, Element, IEditorConfig } from './interfaces';

const defaultElementProps: ElementProps = {
  x: 0,
  y: 0,
  o: 100,
  color: '#008000',
};

const defaultEditorConfig: IEditorConfig = {
  pages: [
    {
      id: 'page_uuid_a',
      name: 'page 1',
    },
    {
      id: 'page_uuid_b',
      name: 'page 2',
    },
  ],
  selectedPageId: 'page_uuid_a',
  elements: [
    {
      id: 'element_uuid_x',
      pageId: 'page_uuid_a',
      name: 'element 1',
      props: {
        x: 10,
        y: 10,
        o: 100,
        color: '#008000',
      },
      children: [
        {
          id: 'element_uuid_m',
          name: 'element 1-1',
          props: {
            x: 15,
            y: 70,
            o: 100,
            color: '#A00000',
          },
          children: [
            {
              id: 'element_uuid_n',
              name: 'element 1-1-1',
              props: {
                x: 20,
                y: 100,
                o: 80,
                color: '#000080',
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 'element_uuid_y',
      pageId: 'page_uuid_a',
      name: 'element 2',
      props: {
        x: 60,
        y: 60,
        o: 50,
        color: '#008000',
      },
      children: [],
    },
    {
      id: 'element_uuid_z',
      pageId: 'page_uuid_a',
      name: 'element 3',
      props: {
        x: 110,
        y: 110,
        o: 100,
        color: '#008000',
      },
      children: [],
    },
    {
      id: 'element_uuid_xx',
      pageId: 'page_uuid_b',
      name: 'element 1',
      props: {
        x: 0,
        y: 0,
        o: 100,
        color: '#008000',
      },
      children: [],
    },
    {
      id: 'element_uuid_yy',
      pageId: 'page_uuid_b',
      name: 'element 2',
      props: {
        x: 60,
        y: 60,
        o: 50,
        color: '#008000',
      },
      children: [],
    },
  ],
  selectedElementId: 'element_uuid_x',
};

export const editorConfigAtom = atomWithImmer<IEditorConfig>(defaultEditorConfig);

export const pagesAtom = selectAtom(editorConfigAtom, (config) => config.pages);

export const elementsAtom = selectAtom<IEditorConfig, Element[]>(editorConfigAtom, (config) =>
  config.elements.filter((element) => element.pageId === config.selectedPageId),
);

export const selectedPageIdAtom = atom(
  (_get) => _get(editorConfigAtom).selectedPageId,
  (_get, _set, pageId) => {
    _set(editorConfigAtom, (state) => {
      set(state, ['selectedPageId'], pageId);
    });
  },
);

export const selectedElementIdAtom = atom(
  (_get) => _get(editorConfigAtom).selectedElementId,
  (_get, _set, elementId: string) => {
    _set(editorConfigAtom, (state) => {
      set(state, ['selectedElementId'], elementId);
    });
  },
);

export const resetSelectedElementIdAtom = atom(null, (_get, _set) => {
  const selectedPageId = _get(editorConfigAtom).selectedPageId;
  const defaultElementId = _get(editorConfigAtom).elements.find(
    ({ pageId }) => pageId === selectedPageId,
  )?.id;

  _set(editorConfigAtom, (state) => {
    set(state, ['selectedElementId'], defaultElementId);
  });
});

export const selectedElementPropsAtom = atom(
  (_get) => {
    const selectedElementId = _get(editorConfigAtom).selectedElementId;
    const selectedElement = flattenTree(_get(editorConfigAtom).elements, 'children').find(
      ({ id }) => id === selectedElementId,
    );

    return selectedElement?.props ?? defaultElementProps;
  },
  (_get, _set, value: Record<keyof Omit<ElementProps, 'color'>, number> | { color: string }) => {
    _set(editorConfigAtom, (state) => {
      const [propsKey, propsValue] = Object.entries(value)[0];
      const selectedElementId = _get(editorConfigAtom).selectedElementId;
      const selectedElementIndexList = findTreeIndexPath(
        _get(editorConfigAtom).elements,
        'children',
        ({ id }) => id === selectedElementId,
      );

      if (!selectedElementIndexList) return;
      const pathSequence = selectedElementIndexList
        .flatMap((index) => [index, 'children'])
        .slice(0, -1);

      set(state, ['elements', ...pathSequence, 'props', propsKey], propsValue);
    });
  },
);

export const updatePageNameAtom = atom(
  null,
  (_get, _set, { pageId, pageName }: { pageId: string; pageName: string }) => {
    const pageIndex = _get(editorConfigAtom).pages.findIndex(({ id }) => id === pageId);

    _set(editorConfigAtom, (state) => {
      set(state, ['pages', pageIndex, 'name'], pageName);
    });
  },
);

export const updateElementNameAtom = atom(
  null,
  (_get, _set, { elementId, elementName }: { elementId: string; elementName: string }) => {
    const selectedElementIndexList = findTreeIndexPath(
      _get(editorConfigAtom).elements,
      'children',
      ({ id }) => id === elementId,
    );

    if (!selectedElementIndexList) return;
    const pathSequence = selectedElementIndexList
      .flatMap((index) => [index, 'children'])
      .slice(0, -1);

    _set(editorConfigAtom, (state) => {
      set(state, ['elements', ...pathSequence, 'name'], elementName);
    });
  },
);
