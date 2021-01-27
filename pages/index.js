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
    <QuizBackground backgroundImage={db.bg}>
      <Head />
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Quiz Hora de Aventura</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Teste todos seus conhecimentos sobre Finn, o humano e seu fiel escudeiro, Jake!</p>
          </Widget.Content>
          <Widget.Content>
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                onChange={function (event) {
                  setName(event.target.value);
                }}
                placeholder="Fala ai seu nome!"
              />
              <Button type="submit" disabled={name.length === 0}>
                Bora pro quiz!
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <p><i>Hora de Aventura é um desenho animado criada por Pendleton Ward.</i></p>
            <p><i>A série segue as aventuras de Finn, o garoto humano e Jake,um cão com poderes que lhe permitem alterar a forma e tamanho.</i></p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tamirfaria/imersao-react-alura" />
    </QuizBackground>
  );
}
