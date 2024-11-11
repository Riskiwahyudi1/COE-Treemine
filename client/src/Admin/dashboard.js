import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Select, 
  MenuItem, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  styled
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DescriptionIcon from '@mui/icons-material/Description';
import AutorenewIcon from '@mui/icons-material/Autorenew';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  position: 'relative',
  height: '100%'
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#54cbbb',  
  '& .MuiTableCell-head': {
    fontWeight: 'bold',
    color: theme.palette.text.primary
  }
}));

const Dashboard = () => {
  const [month, setMonth] = useState('September');

  const reviewData = [
    { pembeli: 'First Buyer', total: 2500000, pembayaran: 'M-Banking BNI', noTelpon: '74534324' },
    { pembeli: 'Second Buyer', total: 7850000, pembayaran: 'M-Banking BCA', noTelpon: '34585636' },
    { pembeli: 'Third Buyer', total: 2450000, pembayaran: 'M-Banking BSI', noTelpon: '34795376' },
    { pembeli: 'Fourth Buyer', total: 12550000, pembayaran: 'M-Banking BNI', noTelpon: '5682643' },
    { pembeli: 'Fifth Buyer', total: 6300000, pembayaran: 'M-Banking BCA', noTelpon: '25785634' }
  ];

  const historyData = [
    { pembeli: 'First Buyer', total: 2500000, status: 'Perlu Konfirmasi', pesanan: 'Assembly' },
    { pembeli: 'Second Buyer', total: 7850000, status: 'disetujui', pesanan: 'Prototype' },
    { pembeli: 'Third Buyer', total: 2450000, status: 'disetujui', pesanan: 'Assembly' },
    { pembeli: 'Fourth Buyer', total: 12550000, status: 'Perlu Konfirmasi', pesanan: 'Prototype' },
    { pembeli: 'Fifth Buyer', total: 6300000, status: 'Perlu Konfirmasi', pesanan: 'Assembly' }
  ];

  return (
    <Box sx={{ pr: 3, pl: 3, pb: 3 }}>
      {/* Stats Cards */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom:'20px' }}>
            Dashboard
        </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, 
        gap: 3, 
        mb: 3 
      }}>
        {/* Revenue Card */}
        <StyledCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AccountBalanceWalletIcon sx={{ color: '#2f98cd' }} />
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  Rp. 15.789.000
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Pendapatan Bulan Ini
              </Typography>
            </Box>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              size="small"
              sx={{ 
                bgcolor: '#54cbbb',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSelect-select': { color: '#ffff', py: 0.5, px: 1.5 },
                marginTop:'35px'
              }}
            >
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="October">October</MenuItem>
              <MenuItem value="November">November</MenuItem>
            </Select>
          </Box>
          <Link 
            href="/selengkapnya" 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16,
              color: '#2f98cd',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Selengkapnya &gt;
          </Link>
        </StyledCard>

        {/* Review Files Card */}
        <StyledCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <DescriptionIcon sx={{ color: '#2f98cd' }} />
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  13
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Menunggu Review File
              </Typography>
            </Box>
          </Box>
          <Link 
            href="/selengkapnya" 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16,
              color: '#2f98cd',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Selengkapnya &gt;
          </Link>
        </StyledCard>

        {/* In Production Card */}
        <StyledCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AutorenewIcon sx={{ color: '#2f98cd' }} />
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  8
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Sedang Diproduksi
              </Typography>
            </Box>
          </Box>
          <Link 
            href="/selengkapnya" 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16,
              color: '#2f98cd',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Selengkapnya &gt;
          </Link>
        </StyledCard>
      </Box>

      {/* Tables Section */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
        gap: 3 
      }}>
        {/* Payment Review Table */}
        <StyledCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Review Pembayaran</Typography>
            <Link 
              href="/selengkapnya" 
              sx={{ 
                color: '#2f98cd',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Selengkapnya &gt;
            </Link>
          </Box>
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Pembeli</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Pembayaran</TableCell>
                  <TableCell>No. Telpon</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {reviewData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.pembeli}</TableCell>
                    <TableCell>{row.total.toLocaleString()}</TableCell>
                    <TableCell>{row.pembayaran}</TableCell>
                    <TableCell>{row.noTelpon}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>

        {/* Purchase History Table */}
        <StyledCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">History Pembelian</Typography>
            <Link 
              href="/selengkapnya" 
              sx={{ 
                color: '#2f98cd',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Selengkapnya &gt;
            </Link>
          </Box>
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Pembeli</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Pesanan</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {historyData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.pembeli}</TableCell>
                    <TableCell>{row.total.toLocaleString()}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.pesanan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledCard>
      </Box>
    </Box>
  );
};

export default Dashboard;