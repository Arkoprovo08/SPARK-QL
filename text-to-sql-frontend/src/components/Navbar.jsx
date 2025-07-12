import React from 'react';

export default function Navbar({ mode, toggleMode }) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712040.png" className="logo" alt="logo" />
        <h1>GenAI SQL Studio</h1>
      </div>

      <div className="navbar-right">
        {/* 🌗 Custom Toggle Switch */}
        <div className="switch-wrapper">
          <label className="switch">
            <input type="checkbox" onChange={toggleMode} checked={mode === 'dark'} />
            <span className="slider"></span>
          </label>
        </div>

      </div>
    </div>
  );
}
