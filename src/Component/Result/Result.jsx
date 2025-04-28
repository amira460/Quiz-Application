const Results = ({ score, totalQuestions, onRestart, name }) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
  
    if (percentage >= 80) {
      message = 'Excellent job!';
    } else if (percentage >= 60) {
      message = 'Good job!';
    } else if (percentage >= 40) {
      message = 'Not bad!';
    } else {
      message = 'Keep practicing!';
    }
  
    return (
      <div className="results-container">
        <h1>Quiz Results</h1>
        <h2>Congratulations, {name}!</h2>
        <div className="score-circle">
          <div className="score-text">
            {score}/{totalQuestions}
          </div>
          <div className="score-percentage">{percentage}%</div>
        </div>
        <p className="result-message">{message}</p>
        <button className="restart-button" onClick={onRestart}>
          Try Again
        </button>
      </div>
    );
  };
  
  export default Results;