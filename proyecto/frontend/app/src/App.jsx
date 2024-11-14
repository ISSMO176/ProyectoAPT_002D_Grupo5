import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './login.css';
import './navbar.css';
import './Styles.css';

const App = () => {
  return (
      <Router>
        <AppRouter />
      </Router>
  );
};

export default App;
