import React, { useState } from 'react';
import Navbar from './components/Navbar'; // Make sure Navbar.jsx exists
import './App.css';

function App() {
  const [mode, setMode] = useState('light');
  const [prompt, setPrompt] = useState('');
  const [sql, setSql] = useState('');
  const [history, setHistory] = useState([]);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Simulate SQL generation (replace with actual API call)
    const generatedSQL = `SELECT * FROM users WHERE prompt = '${prompt}';`;
    setSql(generatedSQL);

    // Update history
    setHistory([{ prompt, sql: generatedSQL }, ...history]);
  };

  return (
    <div className={`app ${mode}`}>
      <Navbar mode={mode} toggleMode={toggleMode} />

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Search History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                {item.prompt}
              </li>
            ))}
          </ul>
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

            {sql && (
              <div className="preview">
                <h3>Generated SQL:</h3>
                <pre>{sql}</pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
