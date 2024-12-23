import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import { getTransaction } from "../api/transaksiApi"
import { formatDate } from "../utils/isoDate"
import { cancelTransaction, doneTransaction } from "../api/transaksiApi";
import Toast from "../utils/Toast";
import Dialog from "../utils/Dialog";
import { useNavigate } from 'react-router-dom';

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
    const [transaction, setTransaction] = useState([]);
    const [searchParams] = useSearchParams();
    
    // transaksi berdasarkan quesry status
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const currentStatus = searchParams.get("status");
    
                setTransaction([]);
    
                if (currentStatus) {
                    const data = await getTransaction(currentStatus);
                    setTransaction(data);
                }
            } catch (error) {
                console.error('Failed to load transactions', error);
            }
        };
    
        fetchTransaction();
    }, [searchParams]);

    // cancel transaksi
    const handleCancel = async (id) => {
        const result = await Dialog.fire({
            title: 'Anda yakin?',
            text: 'Ingin Membatalkan Pesanan?',
        });
        const data = {
            id: id,
        }
        if(result.isConfirmed){
            try {
                const response = await cancelTransaction(data);
                if (response.status === 200) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Transaksi dibatalkan!',
                    });
                    navigate('/transaksi?status=dibatalkan', { state: { showToast: true } });
                }
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: 'Gagal membatalkan pesanan!',
                });
            }
        }
    };

    // transaksi selesai
    const handleDoneTransaction = async (id) => {
        const result = await Dialog.fire({
            title: 'Anda yakin?',
            text: 'Pastikan pesanan sudah anda terima !',
        });
        const data = {
            id: id,
        }
        if(result.isConfirmed){
            try {
                const response = await doneTransaction(data);
                if (response.status === 200) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Transaksi Selesai!',
                    });
                    navigate('/transaksi?status=selesai', { state: { showToast: true } });
                }
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: 'Gagal konfirmasi pesanan!',
                });
            }
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
            {/* Keterangan di atas tabel */}
            <Typography
                variant="h6"
                sx={{
                    color: '#1B2D3F',
                    fontWeight: 'bold',
                    marginBottom: 2,
                    textAlign: 'center',
                }}
            >
                Data Pesanan - Status : {searchParams.get("status")
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
            </Typography>

            <StyledTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell align="center">No Order</StyledTableCell>
                            <StyledTableCell align="center">Tipe Produk</StyledTableCell>
                            <StyledTableCell align="center">Tanggal</StyledTableCell>
                            <StyledTableCell align="center">Total Bayar</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Aksi</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {transaction.length === 0 ? (
                        <StyledTableRow>
                            <StyledTableCell colSpan={7} align="center">
                                Tidak ada data
                            </StyledTableCell>
                        </StyledTableRow>
                    ) : (
                        transaction.map((order, idx) => (
                            <StyledTableRow key={order._id}>
                                <StyledTableCell>{idx + 1}</StyledTableCell>
                                <StyledTableCell align="center">{order._id}</StyledTableCell>
                                {order.product.map((product) => {
                                    if (product.costom_prototype.length > 0) {
                                        return product.costom_prototype.map((proto, index) => (
                                            <StyledTableCell align="center" key={index}>
                                                Custom Prototype
                                            </StyledTableCell>
                                        ));
                                    } else if (product.standart.length > 0) {
                                        return product.standart.map((std, index) => (
                                            <StyledTableCell align="center" key={index}>
                                                Standard Product
                                            </StyledTableCell>
                                        ));
                                    } else {
                                        return (
                                            <StyledTableCell align="center" key={`empty-${product._id}`}>
                                                No Product Data
                                            </StyledTableCell>
                                        );
                                    }
                                })}
                                <StyledTableCell align="center">{formatDate(order.created_at)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    Rp. {order.total_payment.toLocaleString('id-ID')}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{
                                        color: '#FF9800',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {order.status
                                        .split('-')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center', 
                                            gap: 2, 
                                        }}
                                    >
                                        {/* Tombol selalu ada */}
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#FFA500',
                                                color: '#ffffff',
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: '#FF8C00', 
                                                },
                                            }}
                                        >
                                            Detail
                                        </Button>

                                        {/* Kondisi jika status adalah "menunggu-pembayaran" */}
                                        {order.status === 'menunggu-pembayaran' && (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#00A63F', // Hijau
                                                        color: '#ffffff',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: '#007B3E', // Warna hover
                                                        },
                                                    }}
                                                >
                                                    Bayar Sekarang
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleCancel(order._id)}
                                                    sx={{
                                                        backgroundColor: '#FF0000', // Merah
                                                        color: '#ffffff',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: '#CC0000', // Warna hover
                                                        },
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        )}

                                        {/* Kondisi jika status adalah "dikirim" */}
                                        {order.status === 'dikirim' && (
                                            <Button
                                                variant="contained"
                                                onClick={() => handleDoneTransaction(order._id)}
                                                sx={{
                                                    backgroundColor: '#008CBA', // Biru
                                                    color: '#ffffff',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        backgroundColor: '#005F8A', // Warna hover
                                                    },
                                                }}
                                            >
                                                Terima
                                            </Button>
                                        )}
                                    </Box>
                                </StyledTableCell>

                            </StyledTableRow>
                        ))
                    )}


                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    );
}
