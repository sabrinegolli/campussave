import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function PageLayout({ children }) {
  return (
    <div className="page">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
