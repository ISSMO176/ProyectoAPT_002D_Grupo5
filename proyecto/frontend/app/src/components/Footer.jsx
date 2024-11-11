import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src="/logo_1.png" alt="Logo" className="footer-logo" />
          <p className="footer-description">
            Somos expertos en mantención y operación de activos mineros entregando soluciones globales.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Enlaces Principales</h3>
          <ul className="footer-links">
            <li><Link to="/encuestas">Encuestas</Link></li>
            <li><Link to="/areas">Áreas</Link></li>
            <li><Link to="/mis-encuestas">Mis Encuestas</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-links">
            <li><Link to="/privacidad">Política de Privacidad</Link></li>
            <li><Link to="/terminos">Términos y Condiciones</Link></li>
            <li><Link to="/cookies">Política de Cookies</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contacto</h3>
          <ul className="footer-contact">
            <li>
              <MapPin size={16} />
              <span>Santiago, Chile</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+56 2 2345 6789</span>
            </li>
            <li>
              <Mail size={16} />
              <span>contacto@empresa.cl</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        <div className="footer-bottom-links">
          <Link to="/ley16744">Ley 16.744</Link>
          <Link to="/ley20393">Ley 20.393</Link>
          <Link to="/canal-denuncias">Canal de Denuncias</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;