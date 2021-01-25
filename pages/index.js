import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget/index.js';
import Footer from '../src/components/Footer/index.js';
import GitHubCorner from '../src/components/GitHubCorner/index.js';
import QuizBackground from '../src/components/QuizBackground/index.js';
import QuizLogo from '../src/components/QuizLogo/index.js';


const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  };
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizLogo />
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Lorem ipsum dolor sit.</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Sed venenatis nisi id commodo laoreet.</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Sed varius tellus sed iaculis euismod.</h1>
            <p>Curabitur eu ex dignissim, laoreet elit sed, laoreet arcu.</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tamirfaria/aluraquiz-base"/>
    </QuizBackground>
  );
};