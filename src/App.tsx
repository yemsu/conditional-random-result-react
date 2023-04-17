import styled from 'styled-components';
import GlobalStyle from './global-style'
import RandomResult from './pages/RandomResult';

function App() {
  return (
      <>
        <GlobalStyle />
        <AppStyled>
          <RandomResult />
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
