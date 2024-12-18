import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button } from '@mui/material';
import { getRequestCostomPrototype } from '../api/requestCostomPrototypeApi'
import axios from 'axios';
import Toast from '../utils/Toast';
import { formatDate } from '../utils/isoDate';

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
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)', // Hover effect shadow
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Shadow for 3D effect
    overflow: 'hidden',
}));

export default function OrdersTable() {
    const navigate = useNavigate();
    const [requestPrototype, setRequestPrototype] = useState('');

    useEffect(() => {
        const fetchRequestPrototype = async () => {
            try {
                const data = await getRequestCostomPrototype();
                setRequestPrototype(data);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };
        fetchRequestPrototype();
    }, []);

    const handleApprove = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/request-costom-prototype/${orderId}/approve`, {
                status: 'Waiting Payment',
            });

            if (response.status === 200) {

                setRequestPrototype((prev) =>
                    prev.filter((order) => order._id !== orderId)
                );

                Toast.fire({
                    icon: 'success',
                    title: 'Item approved successfully',
                });
            }
        } catch (error) {
            console.error('Error approving order:', error.response?.data || error.message);
        }
    };
    const handleReject = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/request-costom-prototype/${orderId}/reject`, {
                status: 'Reject By Admin',
            });

            if (response.status === 200) {
                setRequestPrototype((prev) =>
                    prev.filter((order) => order._id !== orderId)
                );

                Toast.fire({
                    icon: 'success',
                    title: 'Item approved successfully',
                });
            }
        } catch (error) {
            console.error('Error approving order:', error.response?.data || error.message);
        }
    };

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
                        {(Array.isArray(requestPrototype) ? requestPrototype : []).map((order, index) => (
                            <StyledTableRow key={order.id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell align="center">{order._id}</StyledTableCell>
                                <StyledTableCell align="center">{order.id_user.username}</StyledTableCell>
                                <StyledTableCell align="center">{formatDate(order.createdAt)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    Rp. {order.total_cost.toLocaleString('id-ID')}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{
                                        color: '#FF9800',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {order.status}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton
                                        sx={{
                                            color: '#00A63F',
                                        }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            sx={{
                                                color: '#00A63F',
                                            }}
                                            onClick={() => handleApprove(order._id)}
                                        >
                                            <CheckCircleIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                color: '#f44336',
                                            }}
                                            onClick={() => handleReject(order._id)}
                                        >
                                            <CancelIcon />
                                        </IconButton>
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
