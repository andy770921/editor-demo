export interface TreeNode {
  [key: string]: any;
}

export function flattenTree(tree: TreeNode[], flattenKey: string): TreeNode[] {
  return tree.flatMap((item: TreeNode) =>
    item[flattenKey] ? [item, ...flattenTree(item[flattenKey], flattenKey)] : item,
  );
}

export function findTreeIndexPath(
  tree: TreeNode[],
  flattenKey: string,
  filterFn: (node: TreeNode) => boolean,
): number[] | undefined {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (filterFn(node)) {
      return [i];
    }
    if (node[flattenKey]) {
      const childResult = findTreeIndexPath(node[flattenKey], flattenKey, filterFn);
      if (childResult !== undefined) {
        return [i, ...childResult];
      }
    }
  }
  return undefined;
}
