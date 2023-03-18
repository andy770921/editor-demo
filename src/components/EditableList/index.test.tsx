import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditableList from './index';

const simpleList = [
  {
    id: '1',
    name: 'page 1',
  },
  {
    id: '2',
    name: 'page 2',
  },
];

const nestedList = [
  {
    id: '1',
    name: 'element 1',
  },
  {
    id: '2',
    name: 'element 2',
    children: [
      {
        id: '2-1',
        name: 'element 2-1',
        children: [
          {
            id: '2-1-1',
            name: 'element 2-1-1',
          },
        ],
      },
    ],
  },
];

describe('[EditableList]', () => {
  it('should render simple list in the DOM', () => {
    render(
      <EditableList
        list={simpleList}
        selectedId="1"
        onSingleClick={() => {}}
        onEditConfirm={() => {}}
      />,
    );
    const nameElement = screen.getByText('page 2');
    expect(nameElement).toBeInTheDocument();
  });

  it('should render nested list in the DOM', () => {
    render(
      <EditableList
        list={nestedList}
        selectedId="1"
        onSingleClick={() => {}}
        onEditConfirm={() => {}}
      />,
    );
    const nameElement = screen.getByText('element 2-1-1');
    expect(nameElement).toBeInTheDocument();
  });

  it('should render bold text when item was selected', () => {
    render(
      <EditableList
        list={nestedList}
        selectedId="2-1"
        onSingleClick={() => {}}
        onEditConfirm={() => {}}
      />,
    );
    const boldNameElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content === 'element 2-1';
    });

    expect(boldNameElement).toBeInTheDocument();
  });

  it('item should be able to single click', async () => {
    const handleSingleClick = vi.fn();

    render(
      <EditableList
        list={nestedList}
        selectedId="2-1"
        onSingleClick={handleSingleClick}
        onEditConfirm={() => {}}
      />,
    );

    const item = screen.getByTestId('editable-item-wrapper-2-1-1');
    fireEvent.click(item, { detail: 1 }); // NOTE: e.detail === 1 condition means single click

    expect(handleSingleClick).toHaveBeenCalledTimes(1);
  });

  it('item should be able to double click and confirm', async () => {
    const handleConfirm = vi.fn();

    render(
      <EditableList
        list={nestedList}
        selectedId="2-1"
        onSingleClick={() => {}}
        onEditConfirm={handleConfirm}
      />,
    );

    const item = screen.getByTestId('editable-item-wrapper-2-1-1');
    fireEvent.doubleClick(item);
    const agreeButton = screen.getByRole('button', {
      name: '✔',
    });

    expect(agreeButton).toBeInTheDocument();

    fireEvent.click(agreeButton);

    expect(agreeButton).not.toBeInTheDocument();
  });
});
