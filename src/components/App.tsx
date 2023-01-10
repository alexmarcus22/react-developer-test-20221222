import React, { Fragment, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from './Table';
import { fetchAllData } from '../features/data/dataSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const App = () => {
  const dispatch = useAppDispatch();
  const tableState = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(fetchAllData(true, 'users,projects'));
  }, [dispatch])

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Fragment>
          <Table getData={tableState.users} type={'users'} />
          <Table getData={tableState.projects} type={'projects'} />
        </Fragment>
      </Box>
    </Container>
  );
};

export default App;
