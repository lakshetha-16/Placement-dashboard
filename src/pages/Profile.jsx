import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import Field from '../components/Field';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const { values, errors, onChange, handleSubmit } = useForm(user, (v) => {
    const e = {};
    if (v.name.trim().length < 3) e.name = 'Enter your full name';
    if (v.phone && !/^[6-9]\d{9}$/.test(v.phone)) e.phone = 'Enter a 10-digit Indian mobile number';
    if (v.cgpa === '' || v.cgpa < 0 || v.cgpa > 10) e.cgpa = 'CGPA must be between 0 and 10';
    return e;
  });
  return (
    <>
      <div className="pagehead"><h2>Profile</h2><p>Keep your details current so recruiters see the right information.</p></div>
      <form className="card narrow" onSubmit={handleSubmit((v) => { updateProfile(v); setSaved(true); })} noValidate>
        <Field label="Full name" name="name" value={values.name} onChange={onChange} error={errors.name} />
        <Field label="Email (cannot be changed)" name="email" value={values.email} disabled readOnly />
        <Field label="Phone" name="phone" value={values.phone} onChange={onChange} error={errors.phone} />
        <Field label="Department" name="department" value={values.department} onChange={onChange} />
        <Field label="CGPA" name="cgpa" type="number" step="0.01" value={values.cgpa} onChange={onChange} error={errors.cgpa} />
        <Field label="Skills (comma separated)" name="skills" value={values.skills} onChange={onChange} />
        <button className="primary">Save changes</button>
        {saved && <p role="status">Profile saved.</p>}
      </form>
    </>
  );
}
