import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import NavBar from './components/navbar/nav-bar';
import SignIn from './features/login/sign-in';
import SignUp from './features/login/sign-up';
import RecommendationPage from './pages/recommendations/recommendation';

declare global {
  interface Window { twttr: any; }
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/"  >
            <Route path='' element={<LoginPage />} >
              <Route path='' element={<SignIn />} />
              <Route path='signup' element={<SignUp />} />
            </Route>
          </Route>
          <Route path='recommendations' element={<RecommendationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
