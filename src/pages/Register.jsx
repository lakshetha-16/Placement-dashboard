import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import Field from '../components/Field';
import AuthShell from "../components/AuthShell";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [msg, setMsg] = useState('');
  const { values, errors, onChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirm: '', department: 'AI & Data Science', cgpa: '' },
    (v) => {
      const e = {};
      if (v.name.trim().length < 3) e.name = 'Enter your full name (at least 3 characters)';
      if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address';
      if (v.password.length < 6 || !/\d/.test(v.password)) e.password = 'Use at least 6 characters including a number';
      if (v.confirm !== v.password) e.confirm = 'Passwords do not match';
      if (v.cgpa === '' || v.cgpa < 0 || v.cgpa > 10) e.cgpa = 'CGPA must be between 0 and 10';
      return e;
    });
  const submit = handleSubmit(({ confirm, ...u }) => {
    try { register({ ...u, phone: '', skills: '' }); nav('/'); } catch (err) { setMsg(err.message); }
  });
  return (
    <AuthShell><form onSubmit={submit} noValidate>
      <h2>Create your account</h2>
      {msg && <p className="err" role="alert">{msg}</p>}
      <Field label="Full name" name="name" value={values.name} onChange={onChange} error={errors.name} />
      <Field label="Email" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} />
      <Field label="Department" name="department" value={values.department} onChange={onChange} />
      <Field label="CGPA" name="cgpa" type="number" step="0.01" value={values.cgpa} onChange={onChange} error={errors.cgpa} />
      <Field label="Password" name="password" type="password" value={values.password} onChange={onChange} error={errors.password} />
      <Field label="Confirm password" name="confirm" type="password" value={values.confirm} onChange={onChange} error={errors.confirm} />
      <button className="primary">Register</button>
      <p>Already registered? <Link to="/login">Log in</Link></p>
    </form></AuthShell>
  );
}
