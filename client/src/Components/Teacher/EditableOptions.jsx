import React from 'react';
import {
  OptionsWrapper,
  OptionRow,
  OptionIndex,
  OptionInput,
  RadioWrapper,
  AddOptionButton,
  DeleteButton,
  HeaderRow,
  Title
} from './EditableOptionsStyle';

const EditableOptions = ({options, setOptions}) => {

  const handleAddOption = () => {
    if (options.length >= 4) return;
    const newId = options.length ? Math.max(...options.map(o => o.id)) + 1 : 1;
    setOptions([...options, { id: newId, text: '', isCorrect: null }]);
  };

  const handleDelete = (id) => {
    if (options.length > 1) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const handleChange = (id, key, value) => {
    if (key === 'isCorrect' && value === true) {
      setOptions(options.map(opt =>
        opt.id === id
          ? { ...opt, isCorrect: true }
          : { ...opt, isCorrect: false }
      ));
    } else {
      setOptions(options.map(opt =>
        opt.id === id ? { ...opt, [key]: value } : opt
      ));
    }
  };

  return (
    <OptionsWrapper>
      <HeaderRow>
        <Title>
            Edit Options
        </Title>
        <Title>
          Is it correct?
        </Title>
      </HeaderRow>
      {options.map((option, idx) => (
        <OptionRow key={option.id}>
          <OptionIndex>{idx + 1}</OptionIndex>
          <OptionInput
            value={option.text}
            placeholder="Enter option..."
            onChange={(e) => handleChange(option.id, 'text', e.target.value)}
          />
          <RadioWrapper>
          <label>
            <input
              type="radio"
              name="globalCorrectOption"
              checked={option.isCorrect === true}
              onChange={() => handleChange(option.id, 'isCorrect', true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name={`incorrect-${option.id}`} // unique per row to isolate "No"
              checked={option.isCorrect === false}
              onChange={() => handleChange(option.id, 'isCorrect', false)}
            />
            No
          </label>
        </RadioWrapper>

          {options.length > 1 && (
            <DeleteButton onClick={() => handleDelete(option.id)}>✕</DeleteButton>
          )}
        </OptionRow>
      ))}
      <AddOptionButton
        onClick={handleAddOption}
        disabled={options.length >= 4}
        title={options.length >= 4 ? "Maximum 4 options allowed" : ""}
      >
        + Add More option
      </AddOptionButton>
    </OptionsWrapper>
  );
};

export default EditableOptions;
