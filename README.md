# Editor Demo

## Demo Link

https://editor-demo-sigma.vercel.app/

## Packages

- [Vite](https://vitejs.dev/guide/why.html)
- [jotai](https://jotai.org/)
- [Styled Components](https://styled-components.com/)
- [Polished](https://polished.js.org/docs/#installation)
- [React DnD](https://react-dnd.github.io/react-dnd/docs/overview)
- [React Use](https://github.com/streamich/react-use)
- [Lodash](https://lodash.com/docs/)
- [Vitest](https://vitest.dev/guide/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Folder Structure under \src

```
┌──  components                 # Shared components
│    └── EditableList
│         ├── EditableItem.tsx
│         ├── EditableName.tsx
│         ├── index.tsx        # <EditableList /> for <Pages /> and <Elements /> usage
│         └── index.test.tsx
├── modules                    # Specific business logic and  compound component
│    ├── Canvas
│    │    ├── BlockList.tsx
│    │    ├── DraggableBlock.tsx
│    │    └── index.tsx        # Root of <Canvas />
│    ├── LeftPanel
│    │    ├── Elements.tsx
│    │    ├── index.tsx        # Root of <LeftPanel />
│    │    └── Pages.tsx
│    ├── RightPanel
│    │    ├── ColorPicker.tsx
│    │    └── index.tsx        # Root of <RightPanel />
│    ├──  atoms.ts             # Cross-module shared state
│    └──  interfaces.ts        # TypeScript interface
├── services                   # Customization for each packages
│    ├── reactDnd              # Third-party lib for drag and drop
│    │    ├── constants.ts
│    │    ├── contexts.tsx
│    │    ├── hooks.ts
│    │    └── index.tsx        # Root of all DnD exported items
│    └──  testingLibrary
│         └── index.tsx        # Global import for all test file
├── utils                      # Utility functions
│    ├── array.ts              # Array utility functions
│    └── array.test.ts
├── App.tsx                    # Root of overall layout
├── main.tsx                   # Root of ReactDOM renderer
├── styles.css                 # Global css settings
└── vite-env.d.ts              # Vite TS declaration file
```

## Project Environment Setup:

- [Vite](https://vitejs.dev/guide/) tutorial
- More detail steps listed [here](https://github.com/andy770921/react_vite_test_boilerplate).

## Global State Schema:

- Schema

```ts
// src\modules\interfaces.ts

export interface Page {
  id: string;
  name: string;
}

export interface ElementProps {
  x: number;
  y: number;
  o: number;
  color: string;
}

export interface Element {
  id: string;
  pageId: string;
  name: string;
  props: ElementProps;
  children: Omit<Element, 'pageId'>[];
}

export interface IEditorConfig {
  pages: Page[];
  selectedPageId: string;
  elements: Element[];
  selectedElementId: string;
}
```

- Example

```ts
// src\modules\atoms.ts

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
            // ...
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
    //...
  ],
  selectedElementId: 'element_uuid_x',
};
```

## Available Scripts

### `npm run dev`, `npm run build`, `npm run preview`

Command line Offered by [Vite](https://vitejs.dev/guide/cli.html).

### `npm run lint`

Check lint.

### `npm run format`

Adjust format and save.

### `npm run test`, `npm run coverage`

Command line Offered by [Vitest](https://vitest.dev/guide/#command-line-interface).
