import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contrastText};
  }

  html, body {
    min-height: 100vh;
  }

  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const Theme = db.theme;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Quiz Hora de Aventura</title>
        <meta name="title" content="Quiz Hora de Aventura" />
        <meta name="description" content="Que tal testar seus conhecimentos sobre todas as aventuras de Finn e Jake na Terra de Ooo?" />
        <link rel="shortcut icon" href="https://img.icons8.com/fluent/48/000000/bmo.png" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://imersao-react-alura.tamirfaria.vercel.app/" />
        <meta property="og:title" content="Quiz Hora de Aventura" />
        <meta property="og:description" content="Que tal testar seus conhecimentos sobre todas as aventuras de Finn e Jake na Terra de Ooo?" />
        <meta property="og:image" content="https://images8.alphacoders.com/442/thumb-1920-442432.jpg" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://imersao-react-alura.tamirfaria.vercel.app/" />
        <meta property="twitter:title" content="Quiz Hora de Aventura" />
        <meta property="twitter:description" content="Que tal testar seus conhecimentos sobre todas as aventuras de Finn e Jake na Terra de Ooo?" />
        <meta property="twitter:image" content="https://images8.alphacoders.com/442/thumb-1920-442432.jpg" />

      </Head>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
