import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Button, Modal, CircularProgress } from '@mui/material';
import { getTransaction } from "../api/transaksiApi"
import { formatDate } from "../utils/isoDate"
import { cancelTransaction, doneTransaction } from "../api/transaksiApi";
import CostomPrototypeImg from '../assets/images/1.png';
import CostomAssemblyImg from '../assets/images/3.png';
import Toast from "../utils/Toast";
import Dialog from "../utils/Dialog";
import { useNavigate } from 'react-router-dom';
import { getProvinces, getCities } from '../api/service/rajaOngkirApi'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext';
import apiConfig from '../config/apiConfig';

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
    const { userToken } = useAuth(); 
    const [transaction, setTransaction] = useState([]);
    const [searchParams] = useSearchParams();
    const [openModal, setOpenModal] = useState(false);
    const [idTransaction, setIdTransaction] = useState('')
    const [buyerData, setBuyerData] = useState([])
    const [provinces, setProvinces] = useState('');
    const [cities, setCities] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingButtonId, setLoadingButtonId] = useState(null);
    const [error, setError] = useState(null);
    // transaksi berdasarkan quesry status


    const handleReview = () => {
        navigate('/review')
    };

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const currentStatus = searchParams.getAll("status");

                setTransaction([]);

                if (currentStatus) {
                    const data = await getTransaction(currentStatus, userToken);
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
        if (result.isConfirmed) {
            try {
                const response = await cancelTransaction(data, userToken);
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
        if (result.isConfirmed) {
            try {
                const response = await doneTransaction(data, userToken);
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

    const handleOpenModal = (order) => {
        setIsLoading(true);
        const transactions = transaction.filter((trsData) => trsData._id === order);
        setIdTransaction(order);
        setBuyerData(transactions);
        setOpenModal(true);
    };

    useEffect(() => {
        const fetchProvince = async () => {
            if (buyerData && buyerData.length > 0) {
                try {
                    const dataProvinces = await getProvinces();
                    if (dataProvinces?.data) {
                        const province = dataProvinces.data.find(
                            (prov) => prov.province_id === buyerData[0].id_user.address.province
                        );
                        setProvinces(province?.province || "Provinsi tidak ditemukan");
                    }
                } catch (error) {
                    setProvinces("Gagal memuat data..");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchProvince();
    }, [buyerData]);

    useEffect(() => {
        if (buyerData && buyerData.length > 0) {
            const fetchCities = async () => {
                try {
                    const dataCity = await getCities(buyerData[0].id_user.address.province);
                    if (dataCity) {
                        const city = dataCity.find(
                            (cities) => cities.city_id === buyerData[0].id_user.address.city
                        );
                        setCities(city?.city_name || "error");
                    }
                } catch (error) {
                    setCities('Gagal memuat data..');
                }
            };
            fetchCities();
        }
    }, [buyerData]);

    const handleCloseModal = () => {
        setOpenModal(false);
        setIdTransaction(null);
    };

    const handlePayment = async (transactionId) => {
        try {

            if (!userToken) {

                Toast.fire({
                    icon: 'error',
                    title: 'Please log in first',
                });
                return;
            }
            setLoadingButtonId(transactionId);
            setError(null);
            const config = {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${userToken}`,
                }
            };
            const response = await axios.post(`${apiConfig.baseURL}payments/create-payment`,
                { transactionId },
                config
            );

            const { token, hasPaymentUrl, status } = response.data;

            if (hasPaymentUrl) {
                // Jika sudah ada URL pembayaran, redirect langsung ke sana
                window.location.href = token;
            } else {
                // Jika belum ada, gunakan Snap.js untuk memulai pembayaran
                window.snap.pay(token, {
                    onSuccess: function (result) {
                        Toast.fire({
                            icon: 'success',
                            title: 'Pembayaran Berhasil',
                        });
                        setTransaction((prevList) =>
                            prevList.map((transaction) =>
                                transaction._id === transactionId
                                    ? { ...transaction, status: 'sudah-bayar' }
                                    : transaction
                            )
                        );
                    },
                    onPending: function (result) {
                        Toast.fire({
                            icon: 'info',
                            title: 'Pembayaran Tertunda',
                        });
                        setTransaction((prevList) =>
                            prevList.map((transaction) =>
                                transaction._id === transactionId
                                    ? { ...transaction, status: 'pembayaran-tertunda' }
                                    : transaction
                            )
                        );
                    },
                    onError: function (result) {
                        Toast.fire({
                            icon: 'error',
                            title: 'Pembayaran Gagal',
                        });
                        setTransaction((prevList) =>
                            prevList.map((transaction) =>
                                transaction._id === transactionId
                                    ? { ...transaction, status: 'pembayaran-gagal' }
                                    : transaction
                            )
                        );
                    },
                    onClose: async () => {
                        Toast.fire({
                            icon: 'warning',
                            title: 'Pembayaran Tertunda',
                        });

                        setTransaction((prevList) =>
                            prevList.map((transaction) =>
                                transaction._id === transactionId
                                    ? { ...transaction, status: status }
                                    : transaction
                            )
                        );


                    },
                });


            }

        } catch (error) {
            console.error('Error initiating payment:', error);
            alert('Gagal memulai pembayaran');
        } finally {
            setLoadingButtonId(false);
        }
    };

    const continuePayment = async (transactionId) => {
        setLoadingButtonId(transactionId);
        try {
            if (!userToken) {

                Toast.fire({
                    icon: 'error',
                    title: 'Please log in first',
                });
                return;
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${userToken}`,
                }
            };
            const response = await axios.post(`${apiConfig.baseURL}payments/continue-payment`, { transactionId }, config);

            const { token } = response.data;

            // Gunakan Snap token untuk membuka pembayaran
            window.snap.pay(token, {
                onSuccess: function (result) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Pembayaran Berhasil',
                    });
                    setTransaction((prevList) =>
                        prevList.map((transaction) =>
                            transaction._id === transactionId
                                ? { ...transaction, status: 'sudah-bayar' }
                                : transaction
                        )
                    );
                },
                onPending: function (result) {
                    Toast.fire({
                        icon: 'info',
                        title: 'Pembayaran Tertunda',
                    });
                    setTransaction((prevList) =>
                        prevList.map((transaction) =>
                            transaction._id === transactionId
                                ? { ...transaction, status: 'pembayaran-tertunda' }
                                : transaction
                        )
                    );
                },
                onError: function (result) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Pembayaran Gagal',
                    });
                    setTransaction((prevList) =>
                        prevList.map((transaction) =>
                            transaction._id === transactionId
                                ? { ...transaction, status: 'pembayaran-gagal' }
                                : transaction
                        )
                    );
                },
                onClose: async () => {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Pembayaran Tertunda',
                    });
                    setTransaction((prevList) =>
                        prevList.map((transaction) =>
                            transaction._id === transactionId
                                ? { ...transaction, status: 'pembayaran-tertunda' }
                                : transaction
                        )
                    );


                },
            });
        } catch (error) {
            console.error('Error continuing payment:', error);
        } finally {
            setLoadingButtonId(false);
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
                                    {console.log('orderList', transaction)}
                                    {order.product.map((product, productIdx) => (
                                        <StyledTableCell align="center" key={`product-${productIdx}`}>
                                            {product.costom_prototype.length > 0
                                                ? "Custom Prototype"
                                                : product.costom_assembly.length > 0
                                                    ? "Custom Assembly"
                                                    : product.standart.length > 0
                                                        ? "Standard Product"
                                                        : "No Product Data"}
                                        </StyledTableCell>
                                    ))}


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
                                                onClick={() => handleOpenModal(order._id)}
                                            >
                                                Detail
                                            </Button>

                                            {/* Kondisi jika status adalah "menunggu-pembayaran" */}
                                            {order.status === 'menunggu-pembayaran' && (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handlePayment(order._id)}
                                                        disabled={loadingButtonId === order._id} 
                                                        startIcon={loadingButtonId === order._id ? <CircularProgress size={24} /> : null}
                                                        sx={{
                                                            backgroundColor: '#00A63F', // Hijau
                                                            color: '#ffffff',
                                                            textTransform: 'none',
                                                            '&:hover': {
                                                                backgroundColor: '#007B3E', // Warna hover
                                                            },
                                                        }}
                                                    >
                                                        {loadingButtonId === order._id ? 'Memulai Pembayaran...' : 'Bayar Sekarang'}
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
                                            {order.status === 'pembayaran-tertunda' && (
                                                <Button
                                                    variant="contained"
                                                    onClick={() => continuePayment(order._id)}
                                                    disabled={loadingButtonId === order._id} // Disable hanya tombol yang loading
                                                    startIcon={loadingButtonId === order._id ? <CircularProgress size={24} /> : null}
                                                    sx={{
                                                        backgroundColor: '#00A63F', // Hijau
                                                        color: '#ffffff',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: '#007B3E', // Warna hover
                                                        },
                                                    }}
                                                >
                                                    {loadingButtonId === order._id ? 'Memulai Pembayaran...' : 'Bayar Sekarang'}
                                                </Button>
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
                                            {order.status === 'selesai' && (
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleReview(order._id)}
                                                    sx={{
                                                        backgroundColor: '#008CBA', // Biru
                                                        color: '#ffffff',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: '#005F8A', // Warna hover
                                                        },
                                                    }}
                                                >
                                                    Review
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
                                    {isLoading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <CircularProgress />
                                            <Typography>Loading data...</Typography>
                                        </Box>
                                    ) : (
                                        <>
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

                                            <Box sx={{ marginBottom: 3 }}>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>No Order:</strong> {data._id || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>Tanggal:</strong>{' '}
                                                    {data.created_at ? new Date(data.created_at).toLocaleString('id-ID') : 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>Status:</strong>{' '}
                                                    {data.status
                                                        ?.split('-')
                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ') || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>Total Pembayaran:</strong> Rp.{' '}
                                                    {Number(data.total_payment).toLocaleString('id-ID') || 'N/A'}
                                                </Typography>
                                            </Box>

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
                                                    <strong>Alamat Penerima:</strong>{' '}
                                                    {`${data.id_user.address?.detail_address || 'N/A'}, ${cities}, ${provinces}, ${data.id_user.address?.postal_code || 'N/A'}`}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>Kurir:</strong> {data.expedition?.[0]?.courier || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>Jenis Layanan:</strong> {data.expedition?.[0]?.shipping_option || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>Ongkir:</strong> Rp.{' '}
                                                    {Number(data.expedition?.[0]?.shipping_cost || 0).toLocaleString('id-ID') || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>Estimasi Pengiriman:</strong> {data.estimated_delivery || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                                    <strong>No Resi:</strong> {data.expedition?.[0]?.delivery_receipt || <i>Belum Diterbitkan</i>}
                                                </Typography>
                                            </Box>

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
                                                {data.product?.length > 0 ? (
                                                    data.product.map((product, index) => (
                                                        <Box key={index}>
                                                            {product.standart?.length > 0 && (
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
                                                                                src={`${apiConfig.baseURL}${std.id_product.picture_url}`}
                                                                                alt="Standart Product"
                                                                                style={{
                                                                                    width: 80,
                                                                                    height: 80,
                                                                                    borderRadius: 4,
                                                                                    objectFit: 'cover',
                                                                                }}
                                                                            />
                                                                            <Box>
                                                                                <Typography variant="body1">
                                                                                    <strong>Nama Produk:</strong> {std.id_product.product_name || 'N/A'}
                                                                                </Typography>
                                                                                <Typography variant="body1">
                                                                                    <strong>Harga:</strong> Rp{' '}
                                                                                    {std.id_product.harga?.toLocaleString('id-ID') || 'N/A'}
                                                                                </Typography>
                                                                                <Typography variant="body2">
                                                                                    <strong>Jumlah:</strong> {std.quantity || 'N/A'}
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    ))}
                                                                </Box>
                                                            )}
                                                            {product.costom_prototype?.length > 0 && (
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
                                                                                }}
                                                                            />
                                                                            <Box>
                                                                                <Typography variant="body1">
                                                                                    <strong>Tipe Custom:</strong> Custom Prototype
                                                                                </Typography>
                                                                                <Typography variant="body1">
                                                                                    <strong>Jumlah:</strong> 1
                                                                                </Typography>
                                                                                <Typography variant="body1">
                                                                                    <strong>Harga:</strong> Rp{' '}
                                                                                    {Number(custom.id_request_costom.total_cost).toLocaleString('id-ID')}
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
                                                                                    { label: 'X Out', value: custom.id_request_costom.x_out },
                                                                                    { label: 'Route Process', value: custom.id_request_costom.route_process },
                                                                                    { label: 'Design in Panel', value: custom.id_request_costom.design_in_panel },
                                                                                    { label: 'Size', value: `${custom.id_request_costom.length} X ${custom.id_request_costom.width}` },
                                                                                    { label: 'Quantity', value: custom.id_request_costom.quantity },
                                                                                    { label: 'Layer', value: custom.id_request_costom.layer },
                                                                                    { label: 'Copper Layer', value: custom.id_request_costom.copper_layer },
                                                                                    { label: 'Solder Mask Position', value: custom.id_request_costom.solder_mask_position },
                                                                                    { label: 'Material', value: custom.id_request_costom.material },
                                                                                ].map((item, idx) => (
                                                                                    <Typography key={idx} variant="body2">
                                                                                        <strong>{item.label}: </strong> {item.value}
                                                                                    </Typography>
                                                                                ))}
                                                                            </Box>
                                                                            <Box sx={{ flex: 1 }}>
                                                                                {[
                                                                                    { label: 'Thickness', value: custom.id_request_costom.thickness },
                                                                                    { label: 'Min Track', value: custom.id_request_costom.min_track },
                                                                                    { label: 'Min Hole', value: custom.id_request_costom.min_hole },
                                                                                    { label: 'Solder Mask', value: custom.id_request_costom.solder_mask },
                                                                                    { label: 'Silkscreen', value: custom.id_request_costom.silkscreen },
                                                                                    { label: 'UV Printing', value: custom.id_request_costom.uv_printing },
                                                                                    { label: 'Surface Finish', value: custom.id_request_costom.surface_finish },
                                                                                    { label: 'Finish Copper', value: custom.id_request_costom.finish_copper },
                                                                                    { label: 'Remove Product No', value: custom.id_request_costom.remove_product_no },
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
                                                            {product.costom_assembly?.length > 0 && (
                                                                <Box>
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{ fontWeight: 'bold', marginBottom: 1 }}
                                                                    >
                                                                        Produk Custom Assembly:
                                                                    </Typography>
                                                                    {product.costom_assembly.map((custom, idx) => (
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
                                                                                src={CostomAssemblyImg}
                                                                                alt="Custom Assembly"
                                                                                style={{
                                                                                    width: 80,
                                                                                    height: 80,
                                                                                    borderRadius: 4,
                                                                                    objectFit: 'cover',
                                                                                }}
                                                                            />
                                                                            <Box>
                                                                                <Typography variant="body1">
                                                                                    <strong>Tipe Custom:</strong> Custom Assembly
                                                                                </Typography>
                                                                                <Typography variant="body1">
                                                                                    <strong>Jumlah:</strong> {custom.quantity}
                                                                                </Typography>
                                                                                <Typography variant="body1">
                                                                                    <strong>Harga:</strong> Rp{' '}
                                                                                    {Number(custom.id_request_costom.total_cost).toLocaleString('id-ID')}
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
                                                                    {product.costom_assembly.map((custom, idx) => (
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
                                                                                    { label: 'Flexible Option', value: custom.id_request_costom.flexible_option },
                                                                                    { label: 'Board Type', value: custom.id_request_costom.board_type },
                                                                                    { label: 'Assembly Side', value: custom.id_request_costom.assembly_side },
                                                                                    { label: 'Quantity', value: custom.id_request_costom.quantity },
                                                                                    { label: 'Pay Attention', value: custom.id_request_costom.pay_attention },
                                                                                    { label: 'Notes', value: custom.id_request_costom.notes },
                                                                                    { label: 'Number Unik Part', value: custom.id_request_costom.number_unik_part },
                                                                                ].map((item, idx) => (
                                                                                    <Typography key={idx} variant="body2">
                                                                                        <strong>{item.label}: </strong> {item.value}
                                                                                    </Typography>
                                                                                ))}
                                                                            </Box>
                                                                            <Box sx={{ flex: 1 }}>
                                                                                {[
                                                                                    { label: 'Number SMD Part', value: custom.id_request_costom.number_SMD_part },
                                                                                    { label: 'Number BGA/QFP', value: custom.id_request_costom.number_BGA_QFP },
                                                                                    { label: 'Through Hole', value: custom.id_request_costom.throught_hole },
                                                                                    { label: 'Board to Delivery', value: custom.id_request_costom.board_to_delivery },
                                                                                    { label: 'Function Test', value: custom.id_request_costom.function_test },
                                                                                    { label: 'Cable Wire Harness Assembly', value: custom.id_request_costom.cable_wire_harness_assembly },
                                                                                ].map((item, idx) => (
                                                                                    <Typography key={idx} variant="body2">
                                                                                        <strong>{item.label}: </strong> {item.value}
                                                                                    </Typography>
                                                                                ))}
                                                                            </Box>
                                                                        </Box>
                                                                    ))}
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{ fontWeight: 'bold', marginBottom: 1 }}
                                                                    >
                                                                        Informasi Tambahan:
                                                                    </Typography>
                                                                    {product.costom_assembly.map((custom, idx) => (
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
                                                                            <Box>
                                                                                <Typography key={idx} variant="body2">
                                                                                    {custom.id_request_costom.detail_information}
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    ))}
                                                                </Box>
                                                            )}

                                                        </Box>
                                                    ))
                                                ) : (
                                                    <Typography variant="body1">
                                                        Tidak ada produk dalam transaksi ini.
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
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
                                        </>
                                    )}
                                </Box>
                            ))
                    ) : (
                        <Typography variant="body1">Tidak ada transaksi ditemukan.</Typography>
                    )}
                </ModalContent>
            </StyledModal>
        </Box>
    );
}
