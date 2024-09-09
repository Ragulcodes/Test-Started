import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import QuizPage from './pages/QuizPage.jsx';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<QuizPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
  );
};

export default App;
