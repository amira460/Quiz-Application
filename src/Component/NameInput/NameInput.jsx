const NameInput = ({ value, onChange }) => {
    return (
      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>
    );
  };
  
  export default NameInput;