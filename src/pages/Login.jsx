import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import Field from '../components/Field';
import AuthShell from "../components/AuthShell";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [msg, setMsg] = useState('');
  const { values, errors, onChange, handleSubmit } = useForm({ email: '', password: '' }, (v) => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address';
    if (!v.password) e.password = 'Enter your password';
    return e;
  });
  const submit = handleSubmit((v) => {
    try { login(v.email, v.password); nav('/'); } catch (err) { setMsg(err.message); }
  });
  return (
    <AuthShell><form onSubmit={submit} noValidate>
      <h2>Log in to PlaceTrack</h2>
      {msg && <p className="err" role="alert">{msg}</p>}
      <Field label="Email" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} />
      <Field label="Password" name="password" type="password" value={values.password} onChange={onChange} error={errors.password} />
      <button className="primary">Log in</button>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </form></AuthShell>
  );
}
