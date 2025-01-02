import React, { useState, useEffect } from 'react';
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
import { getPrototypeItem, getProductById } from './api/costomPrototypePartApi';
import { InputLabel } from '@mui/material';
import axios from 'axios';
import Toast from '../utils/Toast';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00A63F',
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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '10px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', 
  overflow: 'hidden',
}));

const BoardTypePage = () => {
  const navigate = useNavigate();
  const { adminToken } = useAuth(); 
  const [selectedBoard, setSelectedBoard] = useState('');
  const [prototypeItem, setPrototypeItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [productData, setProductData] = useState(null);

  const handleAddBoard = () => {
    navigate(`./addPrototype/${selectedBoard}`);
  };

  const handleEditBoard = (itemId) => {
    navigate(`./editItemPrototype/${selectedBoard}/item/${itemId}`);
  };
  
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBoard(selectedValue);
  };

  useEffect(() => {
    const fetchPrototypeItem = async () => {
      try {
        const data = await getPrototypeItem();
        setPrototypeItem(data);
      } catch (error) {
        setError('Failed to load categories');
      }
    };
    fetchPrototypeItem();
  }, []);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        if (selectedBoard) {
          const data = await getProductById(selectedBoard);
          setProductData(data);
        }
      } catch (error) {
        setError('Failed to load categories');
      }
    };
    fetchProductById();
  }, [selectedBoard]);

  const handleDeleteData = async (typeId, itemId) => {
    
    if (!typeId || !itemId) {
      setError("Invalid typeId or itemId. Please try again.");
      return;
    }
  
    try {
      setLoading(true);
      const isValidTypeId = /^[a-fA-F0-9]{24}$/.test(itemId);
      const isValidItemId = /^[a-fA-F0-9]{24}$/.test(itemId);
  
      if (!isValidTypeId || !isValidItemId) {
        setError("Invalid typeId or itemId format.");
        return;
      }
  
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Delete this item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      if (result.isConfirmed) {
        try {
          if (!adminToken) {
            setError('Kamu tidak terountetikasi, silahkan login kembali!');
            setLoading(false);
            return;
        }
          const response = await axios.delete(
            `http://localhost:5000/admin/costom-prototype/${typeId}/item/${itemId}`, {
              headers: {
                'Authorization': `Bearer ${adminToken}`, 
            },
            }
          );
  
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Item deleted successfully',
            });

            setLoading(false)
  
            const updatedData = productData.data.filter((item) => item._id !== itemId);
            setProductData({ ...productData, data: updatedData });
          } else {
            setError("Failed to delete data. Please try again.");
          }
        } catch (error) {
          console.error("Failed to delete data:", error);
          setError("Failed to delete data. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Validation failed:", error);
      setError("An error occurred while processing your request.");
    }

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
       {selectedBoard && (
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
            height: '54px',
          }}
        >
          Add
        </Button>
      )}
       
       <FormControl sx={{ width: '250px' }} variant="outlined">
          <Select
            defaultValue=""
            value={selectedBoard}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{
              'aria-label': 'Select Prototype Item',
            }}
            sx={{
              '& .MuiSelect-outlined': {
                padding: '15px', 
              },
            }}
          >
            <MenuItem value="" disabled>
              Select an item
            </MenuItem>
            {prototypeItem.map((item) => (
              <MenuItem key={item.id} value={item._id}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">
                  Loading...
                </StyledTableCell>
              </StyledTableRow>
            ) : error ? (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center" sx={{ color: 'red' }}>
                  {error}
                </StyledTableCell>
              </StyledTableRow>
            ) : productData && productData.data && productData.data.length > 0 ? (
              productData.data.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>{row.type}</StyledTableCell>
                  <StyledTableCell align="center">
                    Rp. {row.cost.toLocaleString('id-ID')}
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
                      onClick={() => handleEditBoard(row._id)}
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
                      onClick={() => handleDeleteData(selectedBoard, row._id)} 
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">
                  Select prototype item to load data!
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
};

export default BoardTypePage;
