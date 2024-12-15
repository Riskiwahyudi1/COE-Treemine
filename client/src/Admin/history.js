import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import VisibilityIcon from '@mui/icons-material/Visibility'; //
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button, Modal, IconButton } from '@mui/material';
import { getPrototypeHistory } from '../api/requestCostomPrototypeApi';
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
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
}));

const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
    width: 500,
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: 24,
    padding: theme.spacing(4),
    outline: 'none',
}));

export default function OrdersTable() {
    const [prototypeHistory, setPrototypeHistory] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchPrototypeHistory = async () => {
            try {
                const data = await getPrototypeHistory();
                setPrototypeHistory(data);
            } catch (error) {
                console.error('Failed to load prototype history:', error);
            }
        };
        fetchPrototypeHistory();
    }, []);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOrder(null);
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
                                <StyledTableCell align="center">{order.id_user.username}</StyledTableCell>
                                <StyledTableCell align="center">{formatDate(order.createdAt)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    Rp.{Number(order.total_cost).toLocaleString('id-ID')}
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
                                            color: '#54cbbb',
                                        }}
                                        onClick={() => handleOpenModal(order)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <StyledModal open={openModal} onClose={handleCloseModal}>
                <ModalContent>
                    {selectedOrder ? (
                        <>
                            {/* Header */}
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Detail Pesanan
                            </Typography>

                            {/* Informasi Pesanan */}
                            <Typography variant="body1">
                                <strong>No Order:</strong> {selectedOrder._id}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Nama:</strong> {selectedOrder.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Tanggal:</strong> {formatDate(selectedOrder.createdAt)}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Harga:</strong> Rp.{Number(selectedOrder.total_cost).toLocaleString('id-ID')}
                            </Typography>

                            <Typography variant="body1">
                                <strong>Status:</strong> {selectedOrder.status}
                            </Typography>

                            {/* Spesifikasi */}
                            <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold',marginBottom: 1 }}>
                                Spesifikasi :
                            </Typography>
                            <Box>
                                {[
                                    { label: 'X Out', value: selectedOrder.x_out },
                                    { label: 'Route Process', value: selectedOrder.route_process },
                                    { label: 'Design in Panel', value: selectedOrder.design_in_panel },
                                    { label: 'Size', value: `${selectedOrder.length} X ${selectedOrder.width}` },
                                    { label: 'Quantity', value: selectedOrder.quantity },
                                    { label: 'Layer', value: selectedOrder.layer },
                                    { label: 'Copper Layer', value: selectedOrder.copper_layer },
                                    { label: 'Solder Mask Position', value: selectedOrder.solder_mask_position },
                                    { label: 'Material', value: selectedOrder.material },
                                    { label: 'Thickness', value: selectedOrder.thickness },
                                    { label: 'Min Track', value: selectedOrder.min_track },
                                    { label: 'Min Hole', value: selectedOrder.min_hole },
                                    { label: 'Solder Mask', value: selectedOrder.solder_mask },
                                    { label: 'Silkscreen', value: selectedOrder.silkscreen },
                                    { label: 'UV Printing', value: selectedOrder.uv_printing },
                                    { label: 'Surface Finish', value: selectedOrder.surface_finish },
                                    { label: 'Finish Copper', value: selectedOrder.finish_copper },
                                    { label: 'Remove Product No', value: selectedOrder.remove_product_no },
                                ].map((item, idx) => (
                                    <Typography key={idx} variant="body2">
                                       <strong>{item.label}: </strong>  {item.value}
                                    </Typography>
                                ))}
                            </Box>

                            {/* Tombol Penutup */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#54cbbb',
                                        '&:hover': { backgroundColor: '#46b2a6' },
                                    }}
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </Button>
                            </Box>
                        </>
                    ) : (
                        // Loading State
                        <Typography variant="body1">Loading...</Typography>
                    )}
                </ModalContent>
            </StyledModal>

        </Box>
    );
}
