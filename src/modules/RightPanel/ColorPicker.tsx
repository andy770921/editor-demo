import { FC, ChangeEvent } from 'react';
import styled from 'styled-components';

const ColorPickerWrapper = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  align-self: center;
  overflow: hidden;
  background-color: ${(props) => props.color};
`;

const ColorInput = styled.input`
  opacity: 0;
  display: block;
  width: 32px;
  height: 32px;
  border: none;
`;

interface ColorPickerProps {
  color: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <ColorPickerWrapper color={color}>
      <ColorInput type="color" value={color} onChange={onChange} />
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
