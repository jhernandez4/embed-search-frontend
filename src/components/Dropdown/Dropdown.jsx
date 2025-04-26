import './Dropdown.css';

/**
 * 
 * @param {Object} props
 * @param {string} props.value - The current selected value.
 * @param {Array} props.options - Array of options to display in the dropdown. 
 * @param {Function} props.onChange - Function to handle the change of selected option.
 */

const Dropdown = ({ value, options, onChange }) => {
  return (
    <div className="dropdown-container">
      <select
        id="dropdown"
        className="dropdown-select"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
