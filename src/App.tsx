import { AppBar, Box, Container, createStyles, CssBaseline, fade, Grid, Icon, IconButton, InputBase, makeStyles, Paper, Theme, Toolbar, Typography } from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import './App.css';
import { DocList } from './DocList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      height: '100vh'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    main: {
      height: '100%'
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
  }));

const RenderView: FunctionComponent<{ path?: string }> = (props) => {
  return (props.path ? <img width="100%" height="100%" alt="pdf render" src={"/api/render.py?path=" + props.path} /> : <div>nothing yet</div>);
}

export const App: FunctionComponent<{}> = () => {
  const classes = useStyles();

  const [viewedDocument, setViewedDocument] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);

  return (
    <div className={classes.root}>
      <CssBaseline />
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
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={6} lg={7}>
            <DocList search={search} setSelection={(s) => setViewedDocument(s)} />
        </Grid>
        <Grid item xs={6} lg={5}>
          <RenderView path={viewedDocument} />
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
