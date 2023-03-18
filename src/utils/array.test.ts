import { describe, expect, it } from 'vitest';
import { flattenTree, findTreeIndexPath, TreeNode } from './array';

const testTree: TreeNode[] = [
  {
    id: 'id_1',
    name: 'element 1',
    children: [
      {
        id: 'id_1-1',
        name: 'element 1-1',
        children: [
          {
            id: 'id_1-1-1',
            name: 'element 1-1-1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'id_2',
    name: 'element 2',
    children: [],
  },
  {
    id: 'id_3',
    name: 'element 3',
    children: [],
  },
  {
    id: 'id_4',
    name: 'element 1',
    children: [],
  },
  {
    id: 'id_5',
    name: 'element 2',
    children: [],
  },
];

describe('[flattenTree]', () => {
  it('should flatten nested tree of each child node', () => {
    const flattenedTree = flattenTree(testTree, 'children');
    const expectedResult = [
      {
        id: 'id_1',
        name: 'element 1',
        children: [
          {
            id: 'id_1-1',
            name: 'element 1-1',
            children: [
              {
                id: 'id_1-1-1',
                name: 'element 1-1-1',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'id_1-1',
        name: 'element 1-1',
        children: [
          {
            id: 'id_1-1-1',
            name: 'element 1-1-1',
            children: [],
          },
        ],
      },
      {
        id: 'id_1-1-1',
        name: 'element 1-1-1',
        children: [],
      },
      {
        id: 'id_2',
        name: 'element 2',
        children: [],
      },
      {
        id: 'id_3',
        name: 'element 3',
        children: [],
      },
      {
        id: 'id_4',
        name: 'element 1',
        children: [],
      },
      {
        id: 'id_5',
        name: 'element 2',
        children: [],
      },
    ];

    expect(flattenedTree).toEqual(expectedResult);
  });

  it('should return empty array tree of empty tree', () => {
    const flattenedTree = flattenTree([], 'children');

    expect(flattenedTree).toEqual([]);
  });
});

describe('[findTreeIndexPath]', () => {
  it('should find correct index list for top-level tree node', () => {
    const indexList = findTreeIndexPath(testTree, 'children', ({ id }: TreeNode) => id === 'id_3');

    expect(indexList).toEqual([2]);
  });

  it('should find correct index list for second-level tree node', () => {
    const indexList = findTreeIndexPath(
      testTree,
      'children',
      ({ id }: TreeNode) => id === 'id_1-1',
    );

    expect(indexList).toEqual([0, 0]);
  });

  it('should find correct index list for third-level tree node', () => {
    const indexList = findTreeIndexPath(
      testTree,
      'children',
      ({ id }: TreeNode) => id === 'id_1-1-1',
    );

    expect(indexList).toEqual([0, 0, 0]);
  });

  it('should return undefined for not found case', () => {
    const indexList = findTreeIndexPath(
      testTree,
      'children',
      ({ id }: TreeNode) => id === 'id_foo',
    );

    expect(indexList).toBe(undefined);
  });
});
