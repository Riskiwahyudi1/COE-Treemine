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
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#1B2D3F',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
        backgroundColor: '#d4ecf8',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#e0f4fc',
    },
    '&:hover': {
        backgroundColor: '#cbe7f6',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)', // Hover effect shadow
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '15px', // Rounded corners
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Shadow for 3D effect
  overflow: 'hidden',
}));

const BoardTypePage = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState('');
  
  const boardTypeData = [
    {id: 1, name: 'Single Piece', price: 35000},
    {id: 2, name: 'Panel by Customers', price: 0},
    {id: 3, name: 'Panel by Polibatam', price: 15000}
  ];

  const handleAddBoard = () => {
    navigate('./addPrototype');
  };

  const handleEditBoard = (id) => {
    // Implement edit logic
  };

  const handleDeleteBoard = (id) => {
    // Implement delete logic
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
        <Button
          variant="contained"
          onClick={handleAddBoard}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#54cbbb',
            color: '#ffffff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#7fd685',
            },
            height:'54px',
          }}
        >
          Add
        </Button>

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
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boardTypeData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  Rp. {row.price.toLocaleString('id-ID')}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#54cbbb',
                      color: '#ffffff',
                      textTransform: 'none',
                      marginRight: 1,
                      '&:hover': {
                        backgroundColor: '#7fd685',
                      },
                    }}
                    startIcon={<EditIcon />}
                    onClick={() => handleEditBoard(row.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      borderColor: '#f44336',
                      color: '#f44336',
                      '&:hover': {
                        backgroundColor: '#e0f4fc',
                        borderColor: '#f44336',
                        color: '#f44336',
                      },
                    }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteBoard(row.id)}
                  >
                    Delete
                  </Button>
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