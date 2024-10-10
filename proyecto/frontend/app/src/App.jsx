import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

const App = () => {
  return (
    <Router>
      <div>
        <AppRouter /> 
      </div>
    </Router>
  );
};

export default App;