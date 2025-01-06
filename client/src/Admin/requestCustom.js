import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Modal, CardMedia } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button } from '@mui/material';
import { getRequestPrototypeByParams } from '../api/requestCostomPrototypeApi'
import { getRequestAssemblyByParams } from '../api/requestCostomAssemblyApi'
import axios from 'axios';
import Toast from '../utils/Toast';
import Dialog from '../utils/Dialog';
import { formatDate } from '../utils/isoDate';
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
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)', // Hover effect shadow
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Shadow for 3D effect
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
    const { adminToken } = useAuth();
    const navigate = useNavigate();
    const [requestPrototype, setRequestPrototype] = useState([]);
    const [requestAssembly, setRequestAssembly] = useState([]);
    const [requestCostom, setRequestCustom] = useState([])
    const [searchParams] = useSearchParams();
    const [openModal, setOpenModal] = useState(false);
    const [selectedIdPrototype, setselectedIdPrototype] = useState(null);
    const [selectedIdAssembly, setselectedIdAssembly] = useState(null);
    const [totalRequestCostom, setTotalRequestCostom] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentStatus = searchParams.getAll("status");

                // Reset state 
                setRequestPrototype([]);
                setRequestAssembly([]);
                setRequestCustom([]);

                if (currentStatus.length > 0) {
                    const [prototypeData, assemblyData] = await Promise.allSettled([
                        getRequestPrototypeByParams(currentStatus),
                        getRequestAssemblyByParams(currentStatus),
                    ]);

                    // Validasi data hasil API
                    const resolvedPrototypeData =
                        prototypeData.status === "fulfilled" && Array.isArray(prototypeData.value)
                            ? prototypeData.value
                            : [];
                    const resolvedAssemblyData =
                        assemblyData.status === "fulfilled" && Array.isArray(assemblyData.value)
                            ? assemblyData.value
                            : [];

                    // Gabungkan data
                    let combinedData = [...resolvedPrototypeData, ...resolvedAssemblyData];

                    combinedData = combinedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    const totalDataCount = combinedData.length;
                    setTotalRequestCostom(totalDataCount);


                    // Update state
                    setRequestPrototype(resolvedPrototypeData);
                    setRequestAssembly(resolvedAssemblyData);
                    setRequestCustom(combinedData);
                }
            } catch (error) {
                console.error("Failed to load products", error);
            }
        };

        fetchData();
    }, [searchParams]);




    const handleApprove = async (orderId, orderType) => {
        const result = await Dialog.fire({
            title: 'Anda yakin?',
            text: 'Ingin Menyetujui Pesanan?',
        });

        if (result.isConfirmed) {
            try {
                if (!adminToken) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Kamu tidak terountetikasi, silahkan login kembali!',
                    });
                    return;
                }
                const url =
                    orderType === 'Costom Prototype'
                        ? `http://localhost:5000/admin/request-custom-prototype/${orderId}/approve`
                        : `http://localhost:5000/admin/request-custom-assembly/${orderId}/approve`;

                const response = await axios.put(url, {}, {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                    },
                });

                if (response.status === 200) {

                    if (orderType === 'Costom Prototype') {
                        setRequestCustom((prev) =>
                            prev.filter((order) => order._id !== orderId)
                        );
                    } else if (orderType === 'Costom Assembly') {
                        setRequestCustom((prev) =>
                            prev.filter((order) => order._id !== orderId)
                        );
                    }

                    // Tampilkan pesan sukses
                    Toast.fire({
                        icon: 'success',
                        title: 'Request Disetujui',
                    });
                }
            } catch (error) {
                // Tangani kesalahan
                Toast.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                });
            }
        }
    };
    const handleReject = async (orderId, orderType) => {
        const { value: reason } = await Dialog.fire({
            title: 'Anda yakin?',
            text: 'Ingin Menolak Request? Silahkan berikan alasan.',
            input: 'textarea',
            inputPlaceholder: 'Tulis alasan penolakan di sini...',
            showCancelButton: true,
            confirmButtonText: 'Tolak',
            cancelButtonText: 'Batal',
            inputValidator: (value) => {
                if (!value) {
                    return 'Alasan tidak boleh kosong!';
                }
            },
        });

        if (reason) {
            try {
                // Tentukan URL berdasarkan tipe order
                const url =
                    orderType === 'Costom Prototype'
                        ? `http://localhost:5000/admin/request-custom-prototype/${orderId}/reject`
                        : `http://localhost:5000/admin/request-custom-assembly/${orderId}/reject`;

                const response = await axios.put(url, { reason }, {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                    },
                });

                if (response.status === 200) {
                    // Perbarui data sesuai dengan tipe order
                    if (orderType === 'Costom Prototype') {
                        setRequestCustom((prev) =>
                            prev.filter((order) => order._id !== orderId)
                        );
                    } else if (orderType === 'Costom Assembly') {
                        setRequestCustom((prev) =>
                            prev.filter((order) => order._id !== orderId)
                        );
                    }

                    // Tampilkan pesan sukses
                    Toast.fire({
                        icon: 'success',
                        title: 'Request Berhasil Ditolak',
                    });
                }
            } catch (error) {
                // Tangani kesalahan
                Toast.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                });
            }
        }
    };


    const handleOpenModal = (order) => {
        setselectedIdPrototype(order);
        setselectedIdAssembly(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setselectedIdPrototype(null);
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
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(Array.isArray(requestCostom) && requestCostom.length > 0) ? (
                            requestCostom.map((order, index) => (
                                <StyledTableRow key={order.id}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{order._id}</StyledTableCell>
                                    <StyledTableCell align="center">{order.id_user.username}</StyledTableCell>
                                    <StyledTableCell align="center">{formatDate(order.createdAt)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        Rp {Number(order.total_cost).toLocaleString('id-ID')}
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
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            <IconButton
                                                sx={{ color: '#00A63F' }}
                                                onClick={() => handleOpenModal(order._id)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                            {order.status === 'admin-review' && (
                                                <>
                                                    <IconButton
                                                        sx={{
                                                            color: '#00A63F',
                                                        }}
                                                        onClick={() => handleApprove(order._id, order.name)}
                                                    >
                                                        <CheckCircleIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        sx={{
                                                            color: '#f44336',
                                                        }}
                                                        onClick={() => handleReject(order._id, order.name)}
                                                    >
                                                        <CancelIcon />
                                                    </IconButton>
                                                </>
                                            )}
                                        </Box>
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))

                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={8} align="center">
                                    Belum ada data request
                                </StyledTableCell>
                            </StyledTableRow>
                        )}

                    </TableBody>
                </Table>
            </StyledTableContainer>
            <StyledModal open={openModal} onClose={handleCloseModal}>
                <ModalContent>
                    {/* Detail untuk Prototype */}
                    {requestPrototype && requestPrototype.length > 0 ? (
                        requestPrototype
                            .filter(data => data._id === selectedIdPrototype)
                            .map((data, idx) => (
                                <div key={idx}>
                                    {/* Header */}
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                        Detail Pesanan - Prototype
                                    </Typography>

                                    {/* Informasi Pesanan */}
                                    <Typography variant="body1">
                                        <strong>No Order:</strong> {data._id}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Type Custom:</strong> {data.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Tanggal:</strong> {formatDate(data.createdAt)}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Harga:</strong> Rp.{Number(data.total_cost).toLocaleString('id-ID')}
                                    </Typography>

                                    <Typography variant="body1">
                                        <strong>Status:</strong> {data.status
                                            .split('-')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Design:</strong>{' '}
                                        <a
                                            href={`http://localhost:5000/download/prototype-design/${data.design_file.split('/').pop()}`}
                                            download={data.design_file.split('/').pop()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
                                        >
                                            Download
                                        </a>
                                    </Typography>

                                    {/* Spesifikasi */}
                                    <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold', marginBottom: 1 }}>
                                        Spesifikasi :
                                    </Typography>
                                    <Box>
                                        {[
                                            { label: 'Board Type', value: data.board_type },
                                            { label: 'X Out', value: data.x_out },
                                            { label: 'Route Process', value: data.route_process },
                                            { label: 'Design in Panel', value: data.design_in_panel },
                                            { label: 'Size', value: `${data.length} X ${data.width}` },
                                            { label: 'Quantity', value: data.quantity },
                                            { label: 'Layer', value: data.layer },
                                            { label: 'Copper Layer', value: data.copper_layer },
                                            { label: 'Solder Mask Position', value: data.solder_mask_position },
                                            { label: 'Material', value: data.material },
                                            { label: 'Thickness', value: data.thickness },
                                            { label: 'Min Track', value: data.min_track },
                                            { label: 'Min Hole', value: data.min_hole },
                                            { label: 'Solder Mask', value: data.solder_mask },
                                            { label: 'Silkscreen', value: data.silkscreen },
                                            { label: 'UV Printing', value: data.uv_printing },
                                            { label: 'Surface Finish', value: data.surface_finish },
                                            { label: 'Finish Copper', value: data.finish_copper },
                                        ]
                                            .map((item, idx) => (
                                                <Typography key={idx} variant="body2">
                                                    <strong>{item.label}: </strong> {item.value}
                                                </Typography>
                                            ))}
                                    </Box>
                                </div>
                            ))
                    ) : (
                        // Loading State
                        <Typography variant="body1"></Typography>
                    )}

                    {/* Detail untuk Assembly */}
                    {requestAssembly && requestAssembly.length > 0 ? (
                        requestAssembly
                            .filter(data => data._id === selectedIdAssembly)
                            .map((data, idx) => (
                                <div key={idx}>
                                    {/* Header */}
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                        Detail Pesanan - Assembly
                                    </Typography>

                                    {/* Informasi Pesanan */}
                                    <Typography variant="body1">
                                        <strong>No Order:</strong> {data._id}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Type Custom:</strong> {data.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Tanggal:</strong> {formatDate(data.createdAt)}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Harga:</strong> Rp.{Number(data.total_cost).toLocaleString('id-ID')}
                                    </Typography>


                                    <Typography variant="body1">
                                        <strong>Status:</strong> {data.status
                                            .split('-')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Design:</strong>{' '}
                                        <a
                                            href={`http://localhost:5000/download/assembly-design/${data.design_file.split('/').pop()}`}
                                            download={data.design_file.split('/').pop()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
                                        >
                                            Download
                                        </a>
                                    </Typography>
                                

                                    {/* Spesifikasi untuk Assembly */}
                                    <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold', marginBottom: 1 }}>
                                        Spesifikasi :
                                    </Typography>
                                    <Box>
                                        {[{ label: 'Flexible Option', value: data.flexible_option },
                                        { label: 'Board Type', value: data.board_type },
                                        { label: 'Assembly Side', value: data.assembly_side },
                                        { label: 'Quantity', value: data.quantity },
                                        { label: 'Pay Attention', value: data.pay_attention },
                                        { label: 'Notes', value: data.notes },
                                        { label: 'Unique Part Number', value: data.number_unik_part },
                                        { label: 'SMD Part Number', value: data.number_SMD_part },
                                        { label: 'BGA/QFP Part Number', value: data.number_BGA_QFP },
                                        { label: 'Through Hole', value: data.throught_hole },
                                        { label: 'Board to Delivery', value: data.board_to_delivery },
                                        { label: 'Function Test', value: data.function_test },
                                        { label: 'Cable/Wire Harness Assembly', value: data.cable_wire_harness_assembly },
                                        { label: 'Detail Information', value: data.detail_information },
                                        ]
                                            .map((item, idx) => (
                                                <Typography key={idx} variant="body2">
                                                    <strong>{item.label}: </strong> {item.value ? item.value : 'N/A'}
                                                </Typography>
                                            ))}
                                    </Box>
                                </div>
                            ))
                    ) : (
                        // Loading State
                        <Typography variant="body1"></Typography>
                    )}

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
                </ModalContent>
            </StyledModal>


        </Box>
    );
}
