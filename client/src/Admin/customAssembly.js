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
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  },
}));

const CustomAssemblyPage = () => {
  const navigate = useNavigate();
  const [selectedAssembly, setSelectedAssembly] = useState('');
  
  const assemblyData = [
    { id: 1, name: 'Turnkey', price: 'Rp. 50.000' },
    { id: 2, name: 'Kitted or Consigned', price: 'Rp. 100.000' },
    { id: 3, name: 'Combo', price: 'Rp. 150.000' },
  ];

  const handleAddAssembly = () => {
    navigate('./addAssembly');
  };

  const handleEditAssembly = (id) => {

  };

  const handleDeleteAssembly = (id) => {

  };

  const handleSelectChange = (event) => {
    setSelectedAssembly(event.target.value);
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
          onClick={handleAddAssembly}
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
            value={selectedAssembly}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Assembly Type' }}
          >
            <MenuItem value="">
              <em>Assembly Type</em>
            </MenuItem>
            <MenuItem value="SMD">SMD Assembly</MenuItem>
            <MenuItem value="Through Hole">Through Hole Assembly</MenuItem>
            <MenuItem value="Mixed">Mixed Technology Assembly</MenuItem>
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
            {assemblyData.map((row) => (
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
                    onClick={() => handleEditAssembly(row.id)}
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
                    onClick={() => handleDeleteAssembly(row.id)}
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

export default CustomAssemblyPage;