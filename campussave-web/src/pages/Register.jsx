import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import AuthShell from '../components/AuthShell.jsx';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', terms: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const validate = () => {
    const e = {};
    if (form.firstName.trim().length < 2) e.firstName = 'First name is required.';
    if (form.lastName.trim().length < 2) e.lastName = 'Last name is required.';
    if (!emailOk(form.email)) e.email = 'Invalid email address.';
    if (form.phone && !/^[0-9 ]{8,12}$/.test(form.phone)) e.phone = 'Invalid phone number (8 digits).';
    if (form.password.length < 6) e.password = 'At least 6 characters.';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.';
    if (!form.terms) e.terms = 'You must accept the terms of use.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const { confirm, terms, ...data } = form;
      await register({ ...data, firstName: data.firstName.trim(), lastName: data.lastName.trim() });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ name, icon: Icon, placeholder, type = 'text', auto }) => (
    <>
      <div className={'field' + (errors[name] ? ' field--error' : '')}>
        <Icon size={16} />
        <input type={type} placeholder={placeholder} value={form[name]} onChange={set(name)} autoComplete={auto} aria-label={placeholder} />
      </div>
      {errors[name] && <p className="error">{errors[name]}</p>}
    </>
  );

  return (
    <AuthShell>
      <h1>Sign up</h1>
      <p className="muted small center">Create your CampusSave student account</p>
      <form onSubmit={submit} noValidate>
        {errors.form && <p className="alert" role="alert">{errors.form}</p>}
        <div className="two-cols">
          <div>{Field({ name: 'firstName', icon: User, placeholder: 'First name', auto: 'given-name' })}</div>
          <div>{Field({ name: 'lastName', icon: User, placeholder: 'Last name', auto: 'family-name' })}</div>
        </div>
        {Field({ name: 'email', icon: Mail, placeholder: 'Email address', type: 'email', auto: 'email' })}
        {Field({ name: 'phone', icon: Phone, placeholder: 'Phone (optional)', type: 'tel', auto: 'tel' })}
        {Field({ name: 'password', icon: Lock, placeholder: 'Password', type: 'password', auto: 'new-password' })}
        {Field({ name: 'confirm', icon: Lock, placeholder: 'Confirm password', type: 'password', auto: 'new-password' })}

        <label className="check small"><input type="checkbox" checked={form.terms} onChange={set('terms')} /> I accept the terms of use</label>
        {errors.terms && <p className="error">{errors.terms}</p>}

        <button className="btn btn--primary btn--block" disabled={loading}>{loading ? 'Creating account…' : 'Create my account'}</button>
      </form>
      <p className="small center">Already registered? <Link to="/login" className="link">Sign in</Link></p>
    </AuthShell>
  );
}
