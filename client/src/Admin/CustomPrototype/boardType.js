import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#54cbbb',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#d4ecf8',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#e0f4fc',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledButton = styled(Button)({
  backgroundColor: '#7fd685',
  width: '150px',
  '&:hover': {
    backgroundColor: '#6dc574',
  },
});

const ActionButton = styled(Button)({
  margin: '0 4px',
});

const BoardTypePage = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState('');
  
  // Sample data array
  const boardTypeData = [
    {id: 1, name: 'Single Piece', price: 'Rp. 35.000'},
    {id: 2, name: 'Panel by Customers', price: 'Rp. 0'},
    {id: 3, name: 'Panel by Polibatam', price: 'Rp. 15.000'}
  ];

  const handleAddBoard = () => {
    navigate('./addBoardType');
  };

  const handleEditBoard = (id) => {
    navigate(`./UpdateBoardType/${id}`);
  };

  const handleDeleteBoard = (id) => {
    // Implement delete logic or navigation
    console.log(`Delete board with id: ${id}`);
  };

  const handleSelectChange = (event) => {
    setSelectedBoard(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          gap: 2,
        }}
      >
        <StyledButton
          variant="contained"
          onClick={handleAddBoard}
          startIcon={<AddIcon />}
          sx={{ width: 'auto', height: '53px' }}
        >
          Add
        </StyledButton>

        <FormControl sx={{ width: '250px' }}>
          <Select
            value={selectedBoard}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Board Type' }}
          >
            <MenuItem value="">
              <em>Board Type</em>
            </MenuItem>
            <MenuItem value="Design">Designs in Panel</MenuItem>
            <MenuItem value="Size">Size</MenuItem>
            <MenuItem value="Layers">Layers</MenuItem>
            <MenuItem value="Coppers Layer">Coppers Layer</MenuItem>
            <MenuItem value="Material">Material</MenuItem>
            <MenuItem value="FR4-TG">FR4-TG</MenuItem>
            <MenuItem value="Thickness">Thickness</MenuItem>
            <MenuItem value="Spacing">Min Track / Spacing</MenuItem>
            <MenuItem value="Solder Mask">Solder Mask</MenuItem>
            <MenuItem value="Surface Finish">Surface Finish</MenuItem>
            <MenuItem value="Via Process">Via Process</MenuItem>
            <MenuItem value="Finished Copper">Finished Copper</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boardTypeData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  <ActionButton
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditBoard(row.id)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteBoard(row.id)}
                  >
                    Delete
                  </ActionButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BoardTypePage;