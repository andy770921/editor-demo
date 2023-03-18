import { FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import ColorPicker from './ColorPicker';
import { selectedElementPropsAtom } from '../atoms';
import { ElementProps } from '../interfaces';

const RightPanelWrapper = styled.div`
  padding: 8px;
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 16px auto minmax(0, 1fr);
  grid-gap: 8px;
`;

const RightPanel: FC = () => {
  const [{ x, y, o, color }, setSelectedElementProps] = useAtom(selectedElementPropsAtom);
  const makeChangeHandler =
    (updatedKey: keyof ElementProps) => (e: ChangeEvent<HTMLInputElement>) => {
      const updatedValue =
        e.currentTarget.type === 'number' ? e.currentTarget.valueAsNumber : e.currentTarget.value;
      setSelectedElementProps({ [updatedKey]: updatedValue });
    };

  return (
    <RightPanelWrapper>
      <Label>
        X <input type="number" min={0} max={999} value={x} onChange={makeChangeHandler('x')} />
      </Label>
      <Label>
        Y <input type="number" min={0} max={999} value={y} onChange={makeChangeHandler('y')} />
      </Label>
      <Label>
        O <input type="number" min={0} max={100} value={o} onChange={makeChangeHandler('o')} />
        <input type="range" min={0} max={100} value={o} onChange={makeChangeHandler('o')} />
      </Label>
      <Label>
        B <ColorPicker color={color} onChange={makeChangeHandler('color')} /> {color.toUpperCase()}
      </Label>
    </RightPanelWrapper>
  );
};

export default RightPanel;
