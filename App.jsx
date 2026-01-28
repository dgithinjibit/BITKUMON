
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import Landing from './pages/Landing.jsx';
import Onboard from './pages/Onboard.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Lesson from './pages/Lesson.jsx';
import Sandbox from './pages/Sandbox.jsx';
import { useLearningStore } from './lib/learningStore.js';
import ExplanationSlider from './components/shared/ExplanationSlider.jsx';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboard" element={<Onboard />} />
            <Route path="/learn" element={<Dashboard />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/sandbox" element={<Sandbox />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

const Header = () => {
  const location = useLocation();
  const isOnboarded = useLearningStore((state) => state.isOnboarded);
  const showSlider = isOnboarded && (location.pathname.startsWith('/learn') || location.pathname.startsWith('/lesson'));

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={isOnboarded ? '/learn' : '/'} className="text-2xl font-bold text-bitcoin-orange">
            BitKumon
          </Link>
          <div className="flex items-center space-x-4">
            {showSlider && (
              <div className="hidden md:block w-64">
                <ExplanationSlider />
              </div>
            )}
            {isOnboarded && (
              <nav className="flex space-x-4">
                <Link to="/learn" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dashboard</Link>
                <Link to="/sandbox" className="text-sm font-medium text-gray-500 hover:text-gray-900">Sandbox</Link>
              </nav>
            )}
          </div>
        </div>
        {showSlider && (
          <div className="md:hidden pb-4 px-2">
            <ExplanationSlider />
          </div>
        )}
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-red-600 text-white text-center p-4 fixed bottom-0 w-full z-50">
    <p className="font-bold text-sm md:text-base">⚠️ NEVER ENTER REAL SEED PHRASES ANYWHERE</p>
  </footer>
);

export default App;
