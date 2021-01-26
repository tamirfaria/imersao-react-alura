import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget/index.js';
import Footer from '../src/components/Footer/index.js';
import GitHubCorner from '../src/components/GitHubCorner/index.js';
import QuizBackground from '../src/components/QuizBackground/index.js';
import QuizLogo from '../src/components/QuizLogo/index.js';
import Head from 'next/head';

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
      <Head>
        <title>Quiz Hora de Aventura</title>
        <meta property="og:image" content="https://images8.alphacoders.com/442/thumb-1920-442432.jpg"/>
        <meta property="og:title" content="Quiz Hora de Aventura" key="title" />
        <meta property="og:description" content="Que tal testar seus conhecimentos sobre todas as aventuras de Finn e Jake na Terra de Ooo?" key="description" />
      </Head>
      <QuizLogo />
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Quiz Hora de Aventura</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Que tal testar seus conhecimentos sobre todas as aventuras de Finn e Jake na Terra de Ooo?</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <p><i>"Hora de Aventura é um desenho animado criada por Pendleton Ward. A série segue as aventuras de Finn, o garoto humano e Jake, um cão com poderes que lhe permitem alterar a forma e tamanho".</i></p>
          </Widget.Content>
            <button style={{
              backgroundColor: '#f50057',
              margin: '0 30px',
              marginBottom: '10px',
              padding: '10px',

            }}>
              <a href="/quiz"
                style={{
                  textDecoration: 'none',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '14px',                  
                }}
              >
                Bora para o Quiz
              </a>
            </button>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tamirfaria/imersao-react-alura"/>
    </QuizBackground>
  );
};