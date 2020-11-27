import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <div>
        <Router>
            <HeaderComponent />
            <MainComponent />
            <FooterComponent />
        </Router>
    </div>
  );
}

export default App;
