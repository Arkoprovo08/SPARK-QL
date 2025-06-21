import React from 'react';

export default function Sidebar({ history }) {
  return (
    <div className="sidebar">
      <h3>History</h3>
      <ul>
        {history.map((h,i) => (
          <li key={i}>
            <div><strong>{h.query}</strong> ({h.model})</div>
            <small>{h.time}</small>
          </li>
        ))}
        {history.length===0 && <li><em>No history yet</em></li>}
      </ul>
    </div>
  );
}
