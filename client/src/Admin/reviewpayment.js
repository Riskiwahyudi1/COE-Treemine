import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, MenuItem, Select, Modal, Button, CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaymentIcon from '@mui/icons-material/Payment';
import CostomPrototypeImg from '../assets/images/1.png';
import { getTransactionAdmin, approveTransaction, rejectTransaction, sendTransaction } from '../api/transaksiApi'
import Toast from '../utils/Toast';
import Dialog from "../utils/Dialog";
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
    borderRadius: '10px',
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
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [transaction, setTransaction] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idTransaction, setselectedIdTransaction] = useState('')

    console.log(transaction)
   // transaksi berdasarkan quesry status
       useEffect(() => {
           const fetchTransaction = async () => {
               try {
                   const currentStatus = searchParams.get("status");
       
                   setTransaction([]);
       
                   if (currentStatus) {
                       const data = await getTransactionAdmin(currentStatus);
                       setTransaction(data);
                   }
               } catch (error) {
                   console.error('Failed to load transactions', error);
               }
           };
       
           fetchTransaction();
       }, [searchParams]);

    const handleApprove = async (orderId) => {
        const result = await Dialog.fire({
            title: 'Anda yakin?',
            text: 'Lanjutkan proses transaksi?',
        });

        const data = {
            id: orderId,
        }
        if(result.isConfirmed){
            try {
                const response = await approveTransaction(data)
    
                if (response.status === 200) {
                    setTransaction((prev) =>
                        prev.filter((order) => order._id !== orderId)
                    );
    
                    Toast.fire({
                        icon: 'success',
                        title: 'Status transaksi berhasil di update',
                    });
                }
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                });
            }
        }
    };

    const handleReject = async (orderId) => {
        const result = await Dialog.fire({
            title: 'Anda yakin?',
            text: 'Tolak Transaksi ini ?',
        });

        const data = {
            id: orderId,
        }
        if(result.isConfirmed){
            try {
                const response = await rejectTransaction(data)
    
                if (response.status === 200) {
                    setTransaction((prev) =>
                        prev.filter((order) => order._id !== orderId)
                    );
    
                    Toast.fire({
                        icon: 'success',
                        title: 'Transaksi Berhasil Ditolak',
                    });
                }
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                });
            }
        }
    };
    const handleSendTransaction = async (orderId) => {
        const result = await Dialog.fire({
            title: 'Anda yakin?',
            text: 'Kirim pesanan sekarang ?',
        });

        const data = {
            id: orderId,
        }
        if(result.isConfirmed){
            try {
                const response = await sendTransaction(data)
    
                if (response.status === 200) {
                    setTransaction((prev) =>
                        prev.filter((order) => order._id !== orderId)
                    );
    
                    Toast.fire({
                        icon: 'success',
                        title: 'Transaksi Siap Dikirim',
                    });
                }
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                });
            }
        }
    };

    const handleOpenModal = (order) => {
        setselectedIdTransaction(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setselectedIdTransaction(null);
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
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%', 
                marginBottom: 3,
            }}
        >
            {/* Select di kiri */}
            {(searchParams.get("status") === 'selesai' || 
            searchParams.get("status") === 'ditolak-admin' || 
            searchParams.get("status") === 'dibatalkan-pembeli') && (
                <Select
                    defaultValue=""
                    displayEmpty
                    inputProps={{
                        'aria-label': 'Pilih Status',
                    }}
                    onChange={(event) => {
                        const selectedValue = event.target.value;
                        if (selectedValue) {
                            navigate(`?status=${selectedValue}`);
                        }
                    }}
                    sx={{
                        width: '250px',
                        '& .MuiSelect-outlined': {
                            padding: '10px',
                        },
                    }}
                >
                    {/* Placeholder */}
                    <MenuItem value="" disabled>
                        Pilih Status
                    </MenuItem>

                    {/* Opsi Status */}
                    <MenuItem value="selesai">Selesai</MenuItem>
                    <MenuItem value="ditolak-admin">Ditolak Admin</MenuItem>
                    <MenuItem value="dibatalkan-pembeli">Dibatalkan Pembeli</MenuItem>
                </Select>
            )}

    
            {/* Judul di tengah */}
            <Typography
                variant="h3"
                sx={{
                    color: '#1B2D3F',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    flexGrow: 1, 
                    marginRight: '250px', 
                }}
            >
                Data Transaksi
            </Typography>
        </Box>
    
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
                        {searchParams.get("status") === 'menunggu-pembayaran' && (
                            <StyledTableCell align="center">Detail Payment</StyledTableCell>
                        )}
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(transaction) && transaction.length > 0 ? (
                        transaction.map((order, index) => (
                            <StyledTableRow key={order.id || index}>
                                {/* Nomor */}
                                <StyledTableCell>{index + 1}</StyledTableCell>

                                {/* ID Order */}
                                <StyledTableCell align="center">{order._id || 'N/A'}</StyledTableCell>

                                {/* Username */}
                                <StyledTableCell align="center">{order.id_user?.username || 'Unknown'}</StyledTableCell>

                                {/* Tanggal */}
                                <StyledTableCell align="center">{order.created_at ? formatDate(order.created_at) : 'N/A'}</StyledTableCell>

                                {/* Total Payment */}
                                <StyledTableCell align="center">
                                    {order.total_payment !== undefined
                                        ? `Rp. ${Number(order.total_payment).toLocaleString('id-ID')}`
                                        : 'N/A'}
                                </StyledTableCell>

                                {/* Status */}
                                <StyledTableCell
                                    align="center"
                                    sx={{
                                        color: '#FF9800',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {order.status
                                        ? order.status
                                            .split('-')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')
                                        : 'N/A'}
                                </StyledTableCell>

                                {/* Tombol Aksi */}
                                {order.status === 'menunggu-pembayaran' && (
                                <StyledTableCell align="center" sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                        
                                    <IconButton
                                        sx={{
                                            color: '#00A63F',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => navigate(`/payment-detail/${order.id}`)}
                                    >
                                        <PaymentIcon />
                                    </IconButton>
                                </StyledTableCell>
                                      
                                    )}

                                {/* Tombol Lain */}
                                <StyledTableCell align="center">
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                        {order.status === 'menunggu-pembayaran' && (
                                            <>
                                                <IconButton
                                                    sx={{
                                                        color: '#00A63F',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                    onClick={() => handleApprove(order._id)}
                                                >
                                                    <CheckCircleIcon />
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        color: '#f44336',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                    onClick={() => handleReject(order._id)}
                                                >
                                                    <CancelIcon />
                                                </IconButton>
                                            </>
                                        )}

                                        {order.status === 'diproses' && (
                                            <IconButton
                                                sx={{
                                                    color: '#00A63F',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                onClick={() => handleSendTransaction(order._id)}
                                            >
                                                <LocalShippingIcon /> {/* Ikon truk pengiriman */}
                                            </IconButton>
                                        )}

                                        {/* Tombol mata untuk melihat detail transaksi */}
                                        <IconButton
                                            sx={{
                                                color: '#00A63F',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onClick={() => handleOpenModal(order._id)}
                                        >
                                            <VisibilityIcon /> {/* Ikon mata untuk detail */}
                                        </IconButton>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        // Fallback State
                        <StyledTableRow>
                            <StyledTableCell colSpan={8} align="center">
                                Belum ada data transaksi
                            </StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>

            </Table>
        </StyledTableContainer>
        <StyledModal open={openModal} onClose={handleCloseModal}>
        <ModalContent
            sx={{
                padding: 3,
                borderRadius: 2,
                boxShadow: 24,
                maxWidth: 700,
                maxHeight: '90vh',
                margin: 'auto',
                backgroundColor: '#ffffff',
                overflowY: 'auto',
            }}
        >
            {transaction && transaction.length > 0 ? (
                transaction
                    .filter(data => data._id === idTransaction)
                    .map((data, idx) => (
                        <Box key={idx}>
                            {/* Header */}
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: 3,
                                    textAlign: 'center',
                                    borderBottom: '2px solid #e0e0e0',
                                    paddingBottom: 2,
                                }}
                            >
                                Detail Transaksi
                            </Typography>

                            {/* Informasi Pesanan */}
                            <Box sx={{ marginBottom: 3 }}>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>No Order:</strong> {data._id || 'N/A'}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Pembeli:</strong> {data.id_user?.username || 'N/A'}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Tanggal:</strong>{' '}
                                    {data.created_at ? new Date(data.created_at).toLocaleString('id-ID') : 'N/A'}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Status:</strong>{' '}
                                    {data.status
                                            .split('-')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ') || 'N/A'}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Total Pembayaran:</strong> Rp.{' '}
                                    {Number(data.total_payment).toLocaleString('id-ID') || 'N/A'}
                                </Typography>
                            </Box>

                            {/* Detail Pengiriman */}
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: 2,
                                    borderBottom: '1px solid #e0e0e0',
                                    paddingBottom: 1,
                                }}
                            >
                                Detail Pengiriman
                            </Typography>
                            <Box sx={{ marginBottom: 3 }}>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Alamat Penerima:</strong> {`${data.id_user.address.detail_address} , ${data.id_user.address.city} , ${data.id_user.address.province}, ${data.id_user.address.postal_code}}`}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Kurir:</strong> {data.expedition[0].courier}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Jenis Layanan:</strong>{' '}
                                    {data.expedition[0].shipping_option}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Ongkir:</strong> Rp.{' '}
                                    {Number(data.expedition?.[0]?.shipping_cost).toLocaleString('id-ID') || 'N/A'}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Estimasi Pengiriman:</strong> {data.estimated_delivery || 'N/A'}
                                </Typography>
                            </Box>

                            {/* Informasi Produk */}
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: 2,
                                    borderBottom: '1px solid #e0e0e0',
                                    paddingBottom: 1,
                                }}
                            >
                                Produk yang Dipesan
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    marginBottom: 3,
                                }}
                            >
                                {data.product && data.product.length > 0 ? (
                                    data.product.map((product, index) => (
                                        <Box key={index}>
                                            {/* Produk Standar */}
                                            {product.standart && product.standart.length > 0 && (
                                                <Box sx={{ marginBottom: 2 }}>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: 'bold', marginBottom: 1 }}
                                                    >
                                                        Produk Standar:
                                                    </Typography>
                                                    {product.standart.map((std, idx) => (
                                                        <Box
                                                            key={idx}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 2,
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: 2,
                                                                padding: 2,
                                                                marginBottom: 1,
                                                            }}
                                                        >
                                                            <img
                                                                src={`http://localhost:5000${std.id_product.picture_url}`}
                                                                alt="Standart Product"
                                                                style={{
                                                                    width: 80,
                                                                    height: 80,
                                                                    borderRadius: 4,
                                                                    objectFit: 'cover',
                                                                    border: "1px solid #007BFF",
                                                                    borderColor: "primary.main",
                                                                }}
                                                            />
                                                            <Box>
                                                                <Typography variant="body1">
                                                                    <strong>Nama Produk:</strong> {std.id_product.product_name || 'N/A'}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    <strong>Harga:</strong>Rp {std.id_product.harga.toLocaleString('id-ID') || 'N/A'}/pcs
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    <strong>Jumlah:</strong> {std.quantity || 'N/A'}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )}

                                            {/* Produk Custom Prototype */}
                                            {product.costom_prototype && product.costom_prototype.length > 0 && (
                                                <Box>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: 'bold', marginBottom: 1 }}
                                                    >
                                                        Produk Custom Prototype:
                                                    </Typography>
                                                    {product.costom_prototype.map((custom, idx) => (
                                                        <Box
                                                            key={idx}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 2,
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: 2,
                                                                padding: 2,
                                                                marginBottom: 1,
                                                            }}
                                                        >
                                                            <img
                                                                src={CostomPrototypeImg}
                                                                alt="Custom Product"
                                                                style={{
                                                                    width: 80,
                                                                    height: 80,
                                                                    borderRadius: 4,
                                                                    objectFit: 'cover',
                                                                    border: "1px solid #007BFF",
                                                                    borderColor: "primary.main",
                                                                }}
                                                            />
                                                            <Box>
                                                                <Typography variant="body1" >
                                                                   <strong>Tipe Custom:</strong> Custom Prototype
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                   <strong>Jumlah:</strong> 1
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                   <strong>Harga:</strong> Rp {Number(custom.id_request_prototype.total_cost).toLocaleString('id', 'ID')}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: 'bold', marginBottom: 1 }}
                                                    >
                                                        Spesifikasi:
                                                    </Typography>
                                                    {product.costom_prototype.map((custom, idx) => (
                                                        <Box
                                                            key={idx}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 2,
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: 2,
                                                                padding: 2,
                                                                marginBottom: 1,
                                                            }}
                                                        >
                                                            <Box sx={{ flex: 1 }}>
                                                                {[
                                                                    { label: 'X Out', value: custom.id_request_prototype.x_out },
                                                                    { label: 'Route Process', value: custom.id_request_prototype.route_process },
                                                                    { label: 'Design in Panel', value: custom.id_request_prototype.design_in_panel },
                                                                    { label: 'Size', value: `${custom.id_request_prototype.length} X ${custom.id_request_prototype.width}` },
                                                                    { label: 'Quantity', value: custom.id_request_prototype.quantity },
                                                                    { label: 'Layer', value: custom.id_request_prototype.layer },
                                                                    { label: 'Copper Layer', value: custom.id_request_prototype.copper_layer },
                                                                    { label: 'Solder Mask Position', value: custom.id_request_prototype.solder_mask_position },
                                                                    { label: 'Material', value: custom.id_request_prototype.material },
                                                                ].map((item, idx) => (
                                                                    <Typography key={idx} variant="body2">
                                                                        <strong>{item.label}: </strong> {item.value}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                            <Box sx={{ flex: 1 }}>
                                                                {[
                                                                    { label: 'Thickness', value: custom.id_request_prototype.thickness },
                                                                    { label: 'Min Track', value: custom.id_request_prototype.min_track },
                                                                    { label: 'Min Hole', value: custom.id_request_prototype.min_hole },
                                                                    { label: 'Solder Mask', value: custom.id_request_prototype.solder_mask },
                                                                    { label: 'Silkscreen', value: custom.id_request_prototype.silkscreen },
                                                                    { label: 'UV Printing', value: custom.id_request_prototype.uv_printing },
                                                                    { label: 'Surface Finish', value: custom.id_request_prototype.surface_finish },
                                                                    { label: 'Finish Copper', value: custom.id_request_prototype.finish_copper },
                                                                    { label: 'Remove Product No', value: custom.id_request_prototype.remove_product_no },
                                                                ].map((item, idx) => (
                                                                    <Typography key={idx} variant="body2">
                                                                        <strong>{item.label}: </strong> {item.value}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body1">Tidak ada produk dalam transaksi ini.</Typography>
                                )}
                            </Box>

                            {/* Tombol Aksi */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 2,
                                    marginTop: 3,
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#54cbbb',
                                            '&:hover': { backgroundColor: '#46b2a6' },
                                        }}
                                        onClick={handleCloseModal}
                                    >
                                        Tutup
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ))
            ) : (
                // Loading State
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        Memuat Detail...
                    </Typography>
                    <CircularProgress />
                </Box>
            )}
        </ModalContent>
    </StyledModal>


    </Box>
    
    );
}
