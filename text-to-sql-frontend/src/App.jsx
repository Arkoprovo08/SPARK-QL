import React, { useState } from 'react';
import Navbar from './components/Navbar'; // Make sure Navbar.jsx exists
import './App.css';
import api from './api.js'


function App() {
  const [mode, setMode] = useState('light');
  const [prompt, setPrompt] = useState('');

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'dark' : 'light');
  };



  const handleSubmit = async (e) =>{
     e.preventDefault();

    console.log(`Before sending the prompt to server ${prompt}`);
    try {
      await api.post('/generate', {'content':prompt});
    } catch (error) {
      console.error("Error sending prompt to server", error);
    }

  }


  return (
    <div className={`app ${mode}`}>
      <Navbar mode={mode} toggleMode={toggleMode} />

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Search History</h2>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <label htmlFor="prompt">Enter your query description:</label>
              <textarea
                id="prompt"
                rows="4"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Show me all orders above $100"
              />

              <div className="controls">
                <select defaultValue="openai">
                  <option value="openai">GPT-4</option>
                  <option value="gemini">Gemini Pro</option>
                  <option value="ollama">Ollama</option>
                </select>

                <button type="submit">Generate SQL</button>
              </div>
            </form>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
