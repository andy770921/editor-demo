import { FC } from 'react';
import styled from 'styled-components';

const ElementsWrapper = styled.div``;

const Elements: FC = () => {
  return (
    <ElementsWrapper>
      <h4>Elements</h4>
      <div>
        <strong>Element 1</strong>
      </div>
      <div>Element 2</div>
      <div>Element 3</div>
    </ElementsWrapper>
  );
};

export default Elements;
