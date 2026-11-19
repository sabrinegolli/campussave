import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import DashboardLayout from '../components/DashboardLayout.jsx';

export default function ComingSoon({ title, publicPage = false }) {
  const body = (
    <div className="empty empty--card">
      <h1>{title}</h1>
      <p>This page will be built in the next step of the project.</p>
      <Link to={publicPage ? '/' : '/dashboard'} className="btn btn--outline btn--sm">Go back</Link>
    </div>
  );
  return publicPage ? <PageLayout><div className="section">{body}</div></PageLayout> : <DashboardLayout>{body}</DashboardLayout>;
}
