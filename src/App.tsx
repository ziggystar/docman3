import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.css';

type Document = {
  correspondent: string,
  subject: string,
  date: string
}

const DocList: FunctionComponent<{}> = () => {

  const [rows, setRows] = useState<Document[] | null>(null);

  useEffect(() => {
    if (rows == null) {
      fetch("/api/list.py")
        .then(res => res.json())
        .then(setRows,
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => { setRows([]) }
        )
    }
  }, [rows]);

  return <table>
    <thead>
      <tr>
        <th>Korrespondent</th>
        <th>Betreff</th>
        <th>Datum</th>
      </tr>
    </thead>
    <tbody>
      {(rows ?? []).map(r =>
        <tr>
          <td>{r.correspondent}</td>
          <td>{r.subject}</td>
          <td>{r.date}</td>
        </tr>)}
    </tbody>
  </table>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Docman 3</h1>
        <DocList />
      </header>
    </div>
  );
}

export default App;
