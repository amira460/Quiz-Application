import { useState, useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Question = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelect,
  onNextQuestion,
  selectedAnswer,
  error,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    if (question) {
      const answers = [...question.incorrect_answers, question.correct_answer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    }
  }, [question]);

  const handleAnswerClick = (answer) => {
    if (!selectedAnswer) {
      onAnswerSelect(answer);
    }
  };

  return (
    <div className="question-container">
      <div className="progress">
        Question {questionNumber} of {totalQuestions}
      </div>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="answers">
        {shuffledAnswers.map((answer, index) => {
          const isSelected = answer === selectedAnswer;
          const isCorrect = answer === question.correct_answer;
          let className = 'answer-button';
          
          if (selectedAnswer) {
            if (isSelected) {
              className += isCorrect ? ' correct' : ' incorrect';
            } else if (isCorrect) {
              className += ' correct';
            } else {
              className += ' disabled';
            }
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleAnswerClick(answer)}
              disabled={selectedAnswer && answer !== selectedAnswer && answer !== question.correct_answer}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      {error && <ErrorMessage message={error} />}
      <button className="next-button" onClick={onNextQuestion}>
        {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
};

export default Question;