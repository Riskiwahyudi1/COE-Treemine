import React, { useState, useEffect } from 'react';
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
import { getPayments, getTransaksi, getTotalDataCosotom } from './api/dashboardApi'
import { useAuth } from '../contexts/AuthContext';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  position: 'relative',
  height: '100%'
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#00A63F',
  '& .MuiTableCell-head': {
    fontWeight: 'bold',
    color: theme.palette.text.primary
  }
}));

const Dashboard = () => {
    const { adminToken } = useAuth(); 
  const [payment, setPayment] = useState([])
  const [transaksi, setTransaksi] = useState([])
  const [totalPayment, setTotalPayment] = useState(0)
  const [jumlahRequestCostom, setJumlahRequest] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDataRequestCostom = async () => {
      try {
        const data = await getTotalDataCosotom(adminToken);
        setJumlahRequest(data);
      } catch (error) {
        setError('Failed to load categories');
      }
    };
    fetchDataRequestCostom();
  }, []);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayments(adminToken);
        setPayment(data);
        if (Array.isArray(data) && data.length === 0) {
          setError('Categories is empty!');
        }
      } catch (error) {
        setError('Failed to load categories');
      }
    };
    fetchPayments();
  }, []);
  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const data = await getTransaksi(adminToken);
        if (data) {
          setTransaksi(data.transactions);
          setTotalPayment(data.totalPayment);
        }

        if (Array.isArray(data.transactions) && data.transactions.length === 0) {
          setError('Transactions are empty!');
        }
      } catch (error) {
        setError('Failed to load transactions');
      }
    };
    fetchTransaksi();
  }, []);

  return (
    <Box sx={{ pr: 3, pl: 3, pb: 3 }}>
      {/* Stats Cards */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
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
                  Rp {totalPayment.toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total pendapatan
              </Typography>
            </Box>
          </Box>
        </StyledCard>

        {/* Review Files Card */}
        <StyledCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <DescriptionIcon sx={{ color: '#2f98cd' }} />
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  {jumlahRequestCostom.totalDataCount}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Request Custom
              </Typography>
            </Box>
          </Box>
          <Link
            href="/admin/request-custom?status=admin-review"
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
                  {transaksi.length}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Transaksi
              </Typography>
            </Box>
          </Box>
          <Link
            href="/admin/transaksi?status=menunggu-pembayaran&status=pembayaran-tertunda&status=sudah-bayar"
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
            <Typography variant="h6"> Pembayaran Terbaru</Typography>
          </Box>
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Pembeli</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Pembayaran</TableCell>
                  <TableCell>No. Telpon</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {payment
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 10)
                  .map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.transaction_id.id_user.name}</TableCell>
                      <TableCell>Rp {data.amount.toLocaleString('id', 'ID')}</TableCell>
                      <TableCell>{data.payment_method || 'Menunggu Pembayaran'}</TableCell>
                      <TableCell>{data.transaction_id.id_user.phone}</TableCell>
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
          </Box>
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Pembeli</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Pesanan</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {transaksi
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                  .slice(0, 10) 
                  .map((data, index) => {
                    let productName = "Standart Produk";

                    
                    if (
                      data.product[0].costom_assembly.length > 0 &&
                      data.product[0].costom_assembly[0].id_request_costom
                    ) {
                      productName = data.product[0].costom_assembly[0].id_request_costom.name;
                    }
                    else if (
                      data.product[0].costom_prototype.length > 0 &&
                      data.product[0].costom_prototype[0].id_request_costom
                    ) {
                      productName =
                        data.product[0].costom_prototype[0].id_request_costom.name;
                    }

                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.id_user.name}</TableCell>
                        <TableCell>Rp {data.total_payment.toLocaleString()}</TableCell>
                        <TableCell>{data.status}</TableCell>
                        <TableCell>{productName}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>

            </Table>
          </TableContainer>
        </StyledCard>
      </Box>
    </Box>
  );
};

export default Dashboard;