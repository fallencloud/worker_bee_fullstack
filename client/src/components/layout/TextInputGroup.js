import React from 'react';
import PropTypes from 'prop-types';

const TextInputGroup = ({ name, value, placeholder, type, onChange }) => {
  return (
    <div className='form-group'>
      <input
        type={type}
        className='form-control form-control-lg'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

TextInputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextInputGroup;
