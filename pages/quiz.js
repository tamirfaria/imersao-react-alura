/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget.Quiz>
      <Widget.Quiz.Header>
        <h1>Carregando...</h1>
      </Widget.Quiz.Header>
      <Widget.Quiz.Content>
        [Desafio do Loading]
      </Widget.Quiz.Content>
    </Widget.Quiz>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  questionTotal,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget.Quiz>
      <Widget.Quiz.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${questionTotal}`}
        </h3>
      </Widget.Quiz.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Quiz.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const anternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Quiz.Topic
                as="label"
                htmlFor={anternativeId}
              >
                <input
                  // style={{ display: 'none' }}
                  id={anternativeId}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Quiz.Topic>
            );
          })}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Quiz.Content>
    </Widget.Quiz>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const questionTotal = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < questionTotal) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bgQuiz}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            questionTotal={questionTotal}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou! Parabéns!</div>}
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tamirfaria/imersao-react-alura" />
    </QuizBackground>
  );
}
