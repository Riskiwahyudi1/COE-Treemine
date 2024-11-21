import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button } from '@mui/material';

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

export default function OrdersTable() {
    const navigate = useNavigate(); // Properly use useNavigate here

    const orders = [
        { id: 1, orderNumber: 'ORD001', name: 'John Doe', date: '2024-11-20', price: 150000 },
        { id: 2, orderNumber: 'ORD002', name: 'Jane Smith', date: '2024-11-18', price: 250000 },
        { id: 3, orderNumber: 'ORD003', name: 'Alice Johnson', date: '2024-11-17', price: 175000 },
        { id: 4, orderNumber: 'ORD004', name: 'Bob Brown', date: '2024-11-15', price: 300000 },
        { id: 5, orderNumber: 'ORD005', name: 'Charlie White', date: '2024-11-14', price: 225000 },
    ];

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
                Review File
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
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <StyledTableRow key={order.id}>
                                <StyledTableCell>{order.id}</StyledTableCell>
                                <StyledTableCell align="center">{order.orderNumber}</StyledTableCell>
                                <StyledTableCell align="center">{order.name}</StyledTableCell>
                                <StyledTableCell align="center">{order.date}</StyledTableCell>
                                <StyledTableCell align="center">
                                    Rp. {order.price.toLocaleString('id-ID')}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{
                                        color: '#FF9800', // Oranye untuk status
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Review
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
                                <StyledTableCell align="center">
                                    <Box sx={{ display: 'flex', gap: 1 }}>
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
                                            onClick={() => console.log(`Approved order ${order.id}`)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                textTransform: 'none',
                                                borderColor: '#f44336',
                                                color: '#f44336',
                                                '&:hover': {
                                                    backgroundColor: '#fddede',
                                                    borderColor: '#e53935',
                                                    color: '#e53935',
                                                },
                                            }}
                                            onClick={() => console.log(`Cancelled order ${order.id}`)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    );
}
