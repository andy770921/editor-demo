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
