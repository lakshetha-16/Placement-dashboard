import { useState } from 'react';

// validate(values) must return an object like { email: 'Enter a valid email' }
export function useForm(initial, validate) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const handleSubmit = (onValid) => (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onValid(values);
  };
  return { values, errors, onChange, handleSubmit };
}
