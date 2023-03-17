import { FC } from 'react';
import styled from 'styled-components';
import LeftPanel from './modules/LeftPanel';
import Canvas from './modules/Canvas';
import RightPanel from './modules/RightPanel';

const AppWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 200px auto 200px;
  background: #232323;
  height: 100vh;
  color: white;
`;

const App: FC = () => {
  return (
    <AppWrapper>
      <LeftPanel />
      <Canvas />
      <RightPanel />
    </AppWrapper>
  );
};

export default App;
