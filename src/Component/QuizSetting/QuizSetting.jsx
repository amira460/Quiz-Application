import { useState } from 'react';
import NameInput from '../NameInput/NameInput';
import CategorySelect from '../CategorySelect/CategorySelect';
import DifficultySelect from '../DifficultySelect/DifficultySelect';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const QuizSettings = ({ onStart, error }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ name, category, difficulty });
  };

  return (
    <div className="quiz-settings">
      <h1>Quiz Settings</h1>
      <form onSubmit={handleSubmit}>
        <NameInput value={name} onChange={setName} />
        <CategorySelect value={category} onChange={setCategory} />
        <DifficultySelect value={difficulty} onChange={setDifficulty} />
        {error && <ErrorMessage message={error} />}
        <button type="submit" className="start-button">
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizSettings;