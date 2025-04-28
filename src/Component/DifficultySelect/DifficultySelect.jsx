const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];
  
  const DifficultySelect = ({ value, onChange }) => {
    return (
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        >
          <option value="">Select difficulty</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty.value} value={difficulty.value}>
              {difficulty.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default DifficultySelect;