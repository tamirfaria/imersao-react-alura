/* eslint-disable quotes */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

export const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.mainBg};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  color: #FFFFFF;
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.mainBg};
  color: #ffffff;
  padding: 10px;
  margin: 24px auto;
  font-size: bold;
  width: 100%;
  border-radius: 4px;

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
  const router = useRouter();
  const [name, setName] = React.useState('');
  console.log('retorno do useState', name, setName);

  return (
    <QuizBackground backgroundImage={db.bgQuiz}>
      <Head />
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Quiz Hora de Aventura</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Nosso quiz ainda está em produção, volte em breve!</p>
          </Widget.Content>
          <Widget.Content>
            <img src="https://i.pinimg.com/originals/ac/98/81/ac9881829a76bab547b663f0db6745a2.png" alt="Personagem Beemo" width="90%" height="90%" />
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/`);
            }}
            >
              <Button type="submit">
                Voltar pra home
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tamirfaria/imersao-react-alura" />
    </QuizBackground>
  );
}
