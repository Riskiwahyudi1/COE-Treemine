import React, { useEffect, useState } from 'react';
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
import { IconButton } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getWaitingPaymentPrototype } from '../api/requestCostomPrototypeApi'
import Toast from '../utils/Toast';
import axios from 'axios';

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

export default function OrdersTable() {
    const navigate = useNavigate();

    const [waitingPayment, setWaitingPaymentPrototype] = useState('');

    useEffect(() => {
        const fetchWaitingPaymentPrototype = async () => {
            try {
                const data = await getWaitingPaymentPrototype();
                setWaitingPaymentPrototype(data);
            } catch (error) {
                console.error('Failed to load request', error);
            }
        };
        fetchWaitingPaymentPrototype();
    }, []);

    const handleSendProcess = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/request-costom-prototype/${orderId}/send-process`, {
                status: 'Process',
            });

            if (response.status === 200) {

                setWaitingPaymentPrototype((prev) =>
                    prev.filter((order) => order._id !== orderId)
                );

                Toast.fire({
                    icon: 'success',
                    title: 'successfully',
                });
            }
        } catch (error) {
            console.error('Error approving order:', error.response?.data || error.message);
        }
    };
    const handleReject = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/request-costom-prototype/${orderId}/reject`, {
                status: 'Reject',
            });

            if (response.status === 200) {
                setWaitingPaymentPrototype((prev) =>
                    prev.filter((order) => order._id !== orderId)
                );

                Toast.fire({
                    icon: 'success',
                    title: 'Item reject successfully',
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
            <Typography
                variant="h3"
                sx={{
                    color: '#1B2D3F',
                    fontWeight: 'bold',
                    marginBottom: 2,
                    textAlign: 'center',
                }}
            >
                Review Payment
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
                            <StyledTableCell align="center">Detail Pesanan</StyledTableCell>
                            <StyledTableCell align="center">Detail Payment</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(Array.isArray(waitingPayment) ? waitingPayment : []).map((order, index) => (
                            <StyledTableRow key={order.id}>
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
                                        onClick={() => navigate(`/order-detail/${order._id}`)}
                                    >
                                        <AssignmentOutlinedIcon />
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton
                                        sx={{
                                            color: '#00A63F',
                                        }}
                                        onClick={() => navigate(`/payment-detail/${order.id}`)}
                                    >
                                        <PaymentIcon />
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            sx={{
                                                color: '#00A63F',
                                            }}
                                            onClick={() => handleSendProcess(order._id)}
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
