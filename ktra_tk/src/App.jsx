// src/App.jsx
import { useState } from "react";
import "./App.css";
import Menu from './components/Menu';
import Header from './components/Header';
import Content from './components/Contents';
import Notifications from './pages/Notifications';
import Help from './pages/Help';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="w-full min-h-screen flex justify-center overflow-x-hidden bg-gray-50 pt-0 mt-0">
        <div className="flex w-[1350px] h-screen overflow-hidden shadow-lg border border-gray-200 rounded-xl pt-0 mt-0">
          <Menu />
          <div className="flex-1 flex flex-col">
            <Header />
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/help" element={<Help />} />
                <Route path="/dashboard" element={<Content />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
