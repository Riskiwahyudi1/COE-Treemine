import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#84c9ef',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        backgroundColor: '#e0f4fc',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#d4ecf8',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#e0f4fc',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledButton = styled(Button)({
    backgroundColor: '#d565be',
    width: '150px',
    '&:hover': {
        backgroundColor: '#c44cad',
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const handleAddProduk = () => {
        navigate('./addProduct'); // Navigasi ke halaman Add Produk
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                gap: 2  // Konsistensi jarak antar elemen
            }}>
                <StyledButton variant="contained" onClick={handleAddProduk}>
                    Add Produk
                </StyledButton>

                <TextField
                    variant="outlined"
                    placeholder="Search Produk"
                    sx={{
                        width: '150px',
                        '& .MuiOutlinedInput-root': {
                            height: '36.5px',
                        }
                    }}
                />

                <StyledButton variant="contained" onClick={handlePrint}>
                    Print
                </StyledButton>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Category</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">Stock</StyledTableCell>
                            <StyledTableCell align="right">Image</StyledTableCell>
                            <StyledTableCell align="right">Description</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
