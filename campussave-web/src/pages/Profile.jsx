import { useState } from 'react';
import { Mail, Phone, User, GraduationCap, Check } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    firstName: user.firstName, lastName: user.lastName || '', email: user.email,
    phone: user.phone || '', university: user.university || 'ESSECT', level: user.level || '',
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => { setSaved(false); setForm({ ...form, [k]: e.target.value }); };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.firstName.trim().length < 2) errs.firstName = 'First name is required.';
    if (form.lastName.trim().length < 2) errs.lastName = 'Last name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Adresse e-mail invalide.';
    if (form.phone && !/^[0-9 ]{8,12}$/.test(form.phone)) errs.phone = 'Invalid phone number.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    await updateProfile(form);
    setSaved(true);
  };

  const input = (name, label, Icon, type = 'text') => (
    <label className="form-row">
      <span>{label}</span>
      <div className={'field' + (errors[name] ? ' field--error' : '')}>
        <Icon size={16} />
        <input type={type} value={form[name]} onChange={set(name)} />
      </div>
      {errors[name] && <p className="error">{errors[name]}</p>}
    </label>
  );

  return (
    <DashboardLayout>
      <h1 className="dash__hello">My profile</h1>
      <p className="muted">Manage your personal information.</p>

      <div className="profile">
        <div className="profile__card">
          <span className="avatar avatar--xl">{(user.firstName[0] + (user.lastName?.[0] || '')).toUpperCase()}</span>
          <strong>{user.firstName} {user.lastName}</strong>
          <p className="small muted">{user.email}</p>
          <span className="pill pill--ok">Student</span>
        </div>

        <form className="profile__form" onSubmit={submit} noValidate>
          <div className="two-cols">
            {input('firstName', 'First name', User)}
            {input('lastName', 'Last name', User)}
          </div>
          {input('email', 'Adresse e-mail', Mail, 'email')}
          {input('phone', 'Phone', Phone, 'tel')}
          <div className="two-cols">
            {input('university', 'University', GraduationCap)}
            {input('level', 'Study level', GraduationCap)}
          </div>
          <div className="row-between">
            <button className="btn btn--primary">Save changes</button>
            {saved && <span className="saved"><Check size={16} /> Changes saved</span>}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
