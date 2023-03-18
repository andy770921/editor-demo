import { useRef, FC, MouseEvent } from 'react';
import styled from 'styled-components';
import { useClickAway } from 'react-use';
import EditableName, { EditableNameProps } from './EditableName';

const EditableItemWrapper = styled.div`
  cursor: pointer;
  user-select: none;
`;

interface EditableItemProps {
  id: string;
  onSingleClick: (id: string) => void;
  name: EditableNameProps['name'];
  shouldBold: EditableNameProps['shouldBold'];
  isEditing: EditableNameProps['isEditing'];
  setEditingId: (id: string | null) => void;
  onEditConfirm: EditableNameProps['onEditConfirm'];
}

const EditableItem: FC<EditableItemProps> = ({
  id,
  name,
  shouldBold,
  isEditing,
  setEditingId,
  onEditConfirm,
  onSingleClick,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleClickOutside = () => {
    if (isEditing) {
      setEditingId(null);
    }
  };

  const makeSingleClickHandler = (clickedId: string) => (e: MouseEvent<HTMLDivElement>) => {
    // NOTE: e.detail === 1 condition means single click
    if (e.detail === 1) {
      onSingleClick(clickedId);
    }
  };

  const makeDoubleClickHandler = (doubleClickedId: string) => () => {
    setEditingId(doubleClickedId);
  };

  useClickAway(ref, handleClickOutside);

  return (
    <EditableItemWrapper
      ref={ref}
      onClick={makeSingleClickHandler(id)}
      onDoubleClick={makeDoubleClickHandler(id)}
    >
      <EditableName
        name={name}
        shouldBold={shouldBold}
        isEditing={isEditing}
        onEditConfirm={onEditConfirm}
        onEditCancel={handleEditCancel}
      />
    </EditableItemWrapper>
  );
};

export default EditableItem;
