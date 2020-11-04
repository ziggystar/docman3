import { AppBar, Box, createStyles, fade, Grid, Icon, IconButton, InputBase, makeStyles, Paper, Theme, Toolbar, Typography } from '@material-ui/core';
import { ColDef, DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.css';

type Document = {
  id: string,
  correspondent: string,
  subject: string,
  date: string,
  path: string
}

const DocList: FunctionComponent<{ search: string | undefined, setSelection: (v: string) => void }> = (props) => {

  const [rows, setRows] = useState<Document[] | null>(null);

  useEffect(() => {
      fetch("/api/list.py" + (props.search !== undefined ? ("?search=" + encodeURI(props.search ?? "")) : ""))
        .then(res => res.json())
        .then(setRows,
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => { setRows([]) }
        )
  }, [props.search]);

  const cols: ColDef[] = [
    { field: "correspondent", headerName: "Korrepondent", width: 100 },
    { field: "subject", headerName: "Betreff", width: 300 },
    { field: "date", headerName: "Datum", type: "date", width: 130 },
    {
      field: "path", headerName: "Download", width: 100,
      renderCell: (params: ValueFormatterParams) => (<a href={"/api/render.py?path=" + params.value?.toString()}>Download</a>)
    }
  ];

  return <Paper style={{ padding: '1em', height: '80vh', width: '100%' }}>
    <DataGrid rows={rows ?? []} columns={cols} onSelectionChange={params => {
      if (params.rows.length > 0) {
        props.setSelection(params.rows[0]["path"])
      }
    }
    } />
  </Paper>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

const RenderView: FunctionComponent<{ path?: string }> = (props) => {
  return (props.path ? <img width="100%" height="100%" alt="pdf render" src={"/api/render.py?path=" + props.path} /> : <div>nothing yet</div>);
}

export const App: FunctionComponent<{}> = () => {
  const classes = useStyles();

  const [selection, setSelection] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);

  return (
    <Box className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            docman3
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Icon>search</Icon>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Grid container direction="row">
        <Grid item xs={10} md={5}>
          <DocList search={search} setSelection={(s) => setSelection(s)} />
        </Grid>
        <Grid item xs={10} md={5}>
          <RenderView path={selection} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
