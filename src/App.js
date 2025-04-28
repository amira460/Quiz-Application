import { useState, useEffect, useCallback } from 'react';
import QuizSettings from './Component/QuizSetting/QuizSetting.jsx';
import Question from './Component/Question/Question.jsx';
import Results from './Component/Result/Result.jsx';
import Loading from './Component/Loading/Loading.jsx';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
 
  const [quizSettings, setQuizSettings] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  // ... states أخرى ...

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { category, difficulty } = quizSettings;
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
      } else {
        setError('Failed to load questions. Please try different settings.');
      }
    } catch (err) {
      setError('An error occurred while fetching questions.');
    } finally {
      setLoading(false);
    }
  }, [quizSettings]);

  useEffect(() => {
    if (quizSettings) {
      fetchQuestions();
    }
  }, [quizSettings, fetchQuestions]);

  const handleStartQuiz = (settings) => {
    if (!settings.name || !settings.category || !settings.difficulty) {
      setError('Please fill all fields');
      return;
    }
    setQuizSettings(settings);
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = {
      answer: selectedAnswer,
      isCorrect
    };
    setSelectedAnswers(newSelectedAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) {
      setError('Please select an answer');
      return;
    }
    setError('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizSettings(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setError('');
  };

  if (!quizSettings) {
    return <QuizSettings onStart={handleStartQuiz} error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={handleRestartQuiz}>Try Again</button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <Results
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestartQuiz}
        name={quizSettings.name}
      />
    );
  }

  if (questions.length > 0) {
    return (
      <Question
        question={questions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswerSelect={handleAnswerSelect}
        onNextQuestion={handleNextQuestion}
        selectedAnswer={selectedAnswers[currentQuestionIndex]?.answer}
        error={error}
      />
    );
  }

  return null;
}
export default App;

