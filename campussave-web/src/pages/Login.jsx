import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Landmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import AuthShell from '../components/AuthShell.jsx';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!emailOk(form.email)) errs.email = 'Enter a valid email address.';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <h1>Sign in</h1>
      <p className="muted small center">Access your CampusSave account</p>

      <form onSubmit={submit} noValidate>
        {errors.form && <p className="alert" role="alert">{errors.form}</p>}

        <div className={'field' + (errors.email ? ' field--error' : '')}>
          <Mail size={16} />
          <input type="email" placeholder="Email address" value={form.email} onChange={set('email')} autoComplete="email" aria-label="Email address" />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}

        <div className={'field' + (errors.password ? ' field--error' : '')}>
          <Lock size={16} />
          <input type={show ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={set('password')} autoComplete="current-password" aria-label="Password" />
          <button type="button" className="eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        <div className="row-between small">
          <label className="check"><input type="checkbox" checked={form.remember} onChange={set('remember')} /> Remember me</label>
          <a href="#" className="link">Forgot password?</a>
        </div>

        <button className="btn btn--primary btn--block" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
      </form>

      <p className="divider small muted"><span>or sign in with</span></p>
      <div className="social-row">
        <button type="button" className="social" aria-label="Continue with Google"><b style={{ color: '#4285f4' }}>G</b></button>
        <button type="button" className="social" aria-label="University sign-in"><Landmark size={18} color="#0a2a66" /></button>
      </div>

      <p className="small center">Don’t have an account yet? <Link to="/inscription" className="link">Sign up</Link></p>
      <p className="hint small muted center">Demo: sabrine@essect.tn / 123456</p>
    </AuthShell>
  );
}
