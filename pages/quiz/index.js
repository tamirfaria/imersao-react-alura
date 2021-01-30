/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import GitHubCorner from '../../src/components/GitHubCorner';
import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import Button from '../../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h1>Carregando...</h1>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
        }}
        src="https://media.giphy.com/media/aotWWaGrXuNuo/giphy.gif"
      />
    </Widget>
  );
}

function ResultedWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <h1>Fim do Quiz!</h1>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '400px',
          objectFit: 'cover',
        }}
        src="https://media.giphy.com/media/wtgpiXTZKOyTS/giphy.gif"
      />
      <Widget.Header>
        <h1>⇩ Resultado do Quiz ⇩</h1>
      </Widget.Header>
      <Widget.Content>
        <h1>
          {`
          Você acertou
          ${results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}
          perguntas.
          `}
        </h1>
        <ul>
          {results.map((result, index) => (
            <Widget.Topic>
              <li key={`result__${result}`}>
                {`
                Questão ${index + 1}:
                ${result === true ? 'Acertou' : 'Errou'}
                `}
              </li>
            </Widget.Topic>
          ))}
        </ul>
      </Widget.Content>
    </Widget>

  );
}

function QuestionWidget({
  question,
  questionIndex,
  questionTotal,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${questionTotal}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && (
            <img
              alt="Opção correta"
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
              }}
              src="https://media.giphy.com/media/QAUxbMqnNcMo9U0jt8/giphy.gif"
            />
          )}
          {isQuestionSubmited && !isCorrect && (
            <img
              alt="Opção errada"
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
              }}
              src="https://media.giphy.com/media/VIz2F9yck4NhxmoC59/giphy.gif"
            />
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const questionTotal = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1500);
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
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src="https://upload.wikimedia.org/wikipedia/pt/6/6f/Adventure_Time_logo.png" description="Logo Hora de Aventura" width="100%" height="100%" />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            questionTotal={questionTotal}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultedWidget results={results} />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/tamirfaria/imersao-react-alura" />
    </QuizBackground>
  );
}
