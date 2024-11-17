import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Menu } from 'lucide-react';
import '../navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="/logo_salfa.jpg" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/encuestas" className="nav-link">Encuestas</Link>
          <Link to="/areas" className="nav-link">Áreas</Link>
          <Link to="/misencuestas" className="nav-link">Mis Encuestas</Link>
          <Link to="/asignarencuestas" className="nav-link">Asignar Encuestas</Link>
        </div>
        <div className="navbar-right">
          <button className="icon-button" aria-label="Notificaciones">
            <Bell size={20} />
          </button>
          <Link to="/perfil" className="icon-button" aria-label="Perfil de usuario">
            <User size={20} />
          </Link>
          <button className="icon-button menu-toggle" onClick={toggleMenu} aria-label="Menú">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
