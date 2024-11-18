import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './login.css';
import './navbar.css';

const App = () => {
  return (
      <Router>
        <AppRouter />
      </Router>
  );
};

export default App;
