import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button } from '@mui/material';
import {getPrototypeHistory} from '../api/requestCostomPrototypeApi'
import Toast from '../utils/Toast';
import axios from 'axios';


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
    borderRadius: '15px', 
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', 
    overflow: 'hidden',
}));

export default function OrdersTable() {
    const navigate = useNavigate();

    const [prototypeHistory, setPrototypeHistory] = useState('');

    useEffect(() => {
        const fetchPrototypeHostory = async () => {
          try {
            const data = await getPrototypeHistory();
            setPrototypeHistory(data);
          } catch (error) {
            console.error('Failed to load products', error);
          }
        };
        fetchPrototypeHostory();
      }, []);

      


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                padding: 4,
            }}
        >
            {/* Header */}
            <Typography
                variant="h3"
                sx={{
                    color: '#1B2D3F',
                    fontWeight: 'bold',
                    marginBottom: 2,
                    textAlign: 'center',
                }}
            >
                History
            </Typography>

            <StyledTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell align="center">No Order</StyledTableCell>
                            <StyledTableCell align="center">Nama</StyledTableCell>
                            <StyledTableCell align="center">Tanggal</StyledTableCell>
                            <StyledTableCell align="center">Harga</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Detail</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(Array.isArray(prototypeHistory) ? prototypeHistory : []).map((order, index) => (
                            <StyledTableRow key={order._id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell align="center">{order._id}</StyledTableCell>
                                <StyledTableCell align="center">{order.name}</StyledTableCell>
                                <StyledTableCell align="center">{order.createdAt}</StyledTableCell>
                                <StyledTableCell align="center">
                                    Rp. {order.total_cost.toLocaleString('id-ID')}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{
                                        color: '#FF9800', // Oranye untuk status
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {order.status}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#54cbbb',
                                            color: '#ffffff',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#46b2a6',
                                            },
                                        }}
                                    >
                                        View Detail
                                    </Button>
                                </StyledTableCell>
                                
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    );
}
