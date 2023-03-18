import { useState, FC, Fragment } from 'react';
import styled from 'styled-components';
import EditableItem from './EditableItem';

const EditableListWrapper = styled.div`
  padding-left: 8px;
`;

interface EditableItemInfo {
  id: string;
  name: string;
  children?: EditableItemInfo[];
}

export interface EditConfirmParams {
  id: string;
  name: string;
}

interface EditableListProps<T extends EditableItemInfo = EditableItemInfo> {
  list: T[];
  selectedId: string;
  onEditConfirm: (data: EditConfirmParams) => void;
  onSingleClick: (id: string) => void;
}

const EditableList: FC<EditableListProps> = ({
  list,
  selectedId,
  onSingleClick,
  onEditConfirm,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEditConfirm = (name: string) => {
    if (!editingId) return;
    onEditConfirm({ id: editingId, name });
    setEditingId(null);
  };

  return (
    <EditableListWrapper>
      {list.map(({ id, name, children }) => (
        <Fragment key={id}>
          <EditableItem
            id={id}
            name={name}
            shouldBold={id === selectedId}
            isEditing={id === editingId}
            setEditingId={setEditingId}
            onSingleClick={onSingleClick}
            onEditConfirm={handleEditConfirm}
          />
          {children?.length ? (
            <EditableList
              list={children}
              selectedId={selectedId}
              onSingleClick={onSingleClick}
              onEditConfirm={onEditConfirm}
            />
          ) : null}
        </Fragment>
      ))}
    </EditableListWrapper>
  );
};

export default EditableList;
