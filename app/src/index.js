import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';

//pages
import { StartPage } from './pages/start';
import { TypingPage } from './pages/typing';
import { ResultsPage } from './pages/results';

ReactDOM.render(
  <Router>
    <Routes>
    	<Route path="/" element={<StartPage />}/>
    	<Route path="/typing" element={<TypingPage />}/>
    	<Route path="/results" element={<ResultsPage />}/>
    </Routes>
  </Router>,

  document.getElementById("root")
);
