import styled from 'styled-components';
import GlobalStyle from './global-style'
import ContentSection from './components/ContentSection';

function App() {
  return (
    <>
      <GlobalStyle />
      <AppStyled>
        <ContentSection
          title="멤버"
        >

        </ContentSection>
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
