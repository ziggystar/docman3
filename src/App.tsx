import classes from '*.module.css';
import { AppBar, Container, Icon, IconButton, InputBase, Paper, Toolbar } from '@material-ui/core';
import { ColDef, DataGrid } from '@material-ui/data-grid';
import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.css';

type Document = {
  id: string,
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

  const cols: ColDef[] = [
    { field: "correspondent", headerName: "Korrepondent", width: 300 },
    { field: "subject", headerName: "Betreff", width: 600 },
    { field: "date", headerName: "Datum", type: "date", width: 120 }
  ];

  return <Paper style={{ height: '80vh', width: '100%' }}>
    <DataGrid rows={rows ?? []} columns={cols} />
  </Paper>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Docman 3</h1>
        <Container>
          <DocList />
        </Container>
      </header>
    </div>
  );
}

export default App;
