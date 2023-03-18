import { FC, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
`;

const NameInput = styled.input`
  width: 80%;
`;

const Icon = styled.button`
  width: 24px;
`;

export interface EditableNameProps {
  name: string;
  shouldBold: boolean;
  isEditing: boolean;
  onEditConfirm: (name: string) => void;
  onEditCancel: () => void;
}

const EditableName: FC<EditableNameProps> = ({
  name,
  shouldBold,
  isEditing,
  onEditConfirm,
  onEditCancel,
}) => {
  const [currentName, setCurrentName] = useState(name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.currentTarget.value);
  };

  const handleConfirm = () => {
    if (!currentName) {
      onEditCancel();
      setCurrentName(name);
      return;
    }
    onEditConfirm(currentName);
  };

  const nameText = shouldBold ? <strong>{name}</strong> : name;

  return isEditing ? (
    <InputWrapper>
      <NameInput type="text" maxLength={30} value={currentName} onChange={handleChange} />
      <Icon onClick={handleConfirm}>✔</Icon>
      <Icon onClick={onEditCancel}>✘</Icon>
    </InputWrapper>
  ) : (
    <span>{nameText}</span>
  );
};

export default EditableName;
