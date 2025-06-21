import React from 'react';

export default function ResultTable({ data }) {
  if (!data?.length) return <p>No results</p>;
  const headers = Object.keys(data[0]);
  return (
    <div className="table-wrapper">
      <table>
        <thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead>
        <tbody>{data.map((row,i)=><tr key={i}>{headers.map(h=><td key={h}>{row[h]}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
