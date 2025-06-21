import React, { useState } from 'react';
export default function QueryForm({ onSubmit }) {
  const [q,setQ]=useState(''); const [m,setM]=useState('openai');
  return (
    <form className="form-wrapper" onSubmit={e => { e.preventDefault(); onSubmit(q,m); }}>
      <textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask your question..." rows="4" />
      <div className="controls">
        <select value={m} onChange={e=>setM(e.target.value)}>
          <option value="openai">GPT‑4</option>
          <option value="gemini">Gemini Pro</option>
          <option value="ollama">Ollama</option>
        </select>
        <button type="submit">Generate SQL</button>
      </div>
    </form>
  );
}
