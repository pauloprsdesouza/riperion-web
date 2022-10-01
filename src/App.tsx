import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import NavBar from './components/navbar/nav-bar';
import React from 'react';
import RecommendationPage from './pages/recommendations/recommendation';
import SignIn from './features/login/sign-in';
import SignUp from './features/login/sign-up';
import DomainPage from './pages/domains/domain';

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
          <Route path='domains' element={<DomainPage />} />
          <Route path='recommendations' element={<RecommendationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
