import styled from 'styled-components';
import './styles/var.css'
import GlobalStyle from './global-style'
import RandomResult from './pages/RandomResult';
import { RandomResultProvider } from './context/RandomResultContext';

function App() {
  return (
      <>
        <GlobalStyle />
        <AppStyled>
          <RandomResultProvider>
            <RandomResult />
          </RandomResultProvider>
        </AppStyled>
      </>
  );
}

const AppStyled = styled.div`
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  padding: 30px 15px;
`

export default App;
