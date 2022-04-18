import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { bikeAtom } from '_state';
import { useBikeActions } from '_actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from'@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export { Bike };

function Bike({ match }) {
    const { id } = match.params;
    const bikes = useRecoilValue(bikeAtom);
    const bikeActions = useBikeActions();
    const [input, setInput] = useState('');
    
    useEffect(() => {
        bikeActions.getBikeById(id);

        return bikeActions.resetBike;
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <StyledDiv>
      <form  noValidate autoComplete="off" align = 'center'>
        <TextField 
          id="standard-basic" 
          label="Search by Bike id" 
          value = {input}
          onChange = { e => setInput(e.target.value) }
        />
        <label htmlFor="contained-button-file">
          <Link to={`/${input}`}>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Link>
        </label>
      </form >

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Bike ID</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
              <TableCell align="right">Reserved</TableCell>
              <TableCell align="right">Disabled</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikes?.map((bike) => (
                <TableRow key={bike.bike_Id}>
                  <Link to={`/bikes/bike/${bike.bike_Id}`}>
                    <TableCell component="th" scope="row">{bike.bike_Id}</TableCell>
                  </Link>
                  <TableCell align="right">{bike.lat}</TableCell>
                  <TableCell align="right">{bike.lon}</TableCell>
                  <TableCell align="right">{bike.is_Reserved? 'yes':'no'}</TableCell>
                  <TableCell align="right">{bike.is_Disabled? 'yes':'no'}</TableCell>
                  <TableCell align="right">{bike.vehicle_Type}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledDiv>
  );
};

// styles for the page
export const cardClassName = css({
  borderRadius: 7,
  color: 'white',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const StyledDiv = styled('div')(cardClassName, {
  marginBottom: 30,
});
