import { useEffect, useState } from 'react';
import './NavbarSimple.css';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className={`navbar ${mounted ? 'navbar-mounted' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Dalal Streets</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
