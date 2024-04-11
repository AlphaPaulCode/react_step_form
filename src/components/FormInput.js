import React from 'react';
import TextField from 'material-ui/TextField';

const FormInput = ({ label, value, onChange }) => {
  return (
    <TextField
      hintText={`Enter your ${label}`}
      floatingLabelText={label}
      value={value}
      onChange={onChange}
    />
  );
}

export default FormInput;
