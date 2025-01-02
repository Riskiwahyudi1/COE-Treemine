import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Grid,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Divider
} from "@mui/material";
import CostomPrototypeImg from '../assets/images/1.png';
import CostomAssemblyImg from '../assets/images/3.png';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCost } from "../api/service/rajaOngkirApi";
import { getCostomPrototypeData } from "../api/transaksiApi";
import { getDataAccount } from "../api/auth/dataAccount";
import { getProvinces, getCities } from "../api/service/rajaOngkirApi";
import Toast from "../utils/Toast";

const PaymentPage = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [costList, setCost] = useState([])
    const [costShipping, setcostShipping] = useState(0)
    const [estimasionDay, setEstimasionDay] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedCourier, setSelectedCourier] = useState('')
    const [shipingOption, setShipingOption] = useState([])
    const [dataAccount, setDataAccount] = useState([])
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [totalPriceProduct, settotalPriceProduct] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    // id untuk checkout
    const [idProductStandart, setIdProductStandart] = useState([])
    const [idProdukPrototype, setIdProductProrotype] = useState([])
    const [idProdukAssembly, setIdProductAssembly] = useState([])

    // get standar produk dari keranjang
    const selectedProducts = location.state?.selectedItems || [];
    const productListInCart = location.state?.productListInCart || [];

    const productsToCheckout = productListInCart.filter(product =>
        selectedProducts[product._id] === true
        
      );
    // get costom produk dari keranjang
    const costomProduct = location.state?.singleProductCostom || [];
      
   
      // mengambil id produk standart
      useEffect(() => {
        if (Array.isArray(productsToCheckout)) {
            const idProdukStandart = productsToCheckout.map((product) => ({
                id_product: product?.id_product?._id, 
                quantity: product?.quantity || 1,
            }));
    
            setIdProductStandart(idProdukStandart); 
        }
    }, []);

    // cek produk costom atau assembly
    useEffect(() => {
        if (Array.isArray(costomProduct) && costomProduct.length > 0) {
            
            const idProdukCostom = costomProduct.map((product) => ({
                id_request_costom: product?._id,
                name_request_costom: product?.name,
                quantity: 1,
            }));
    
            const prototypeItems = idProdukCostom.filter(
                (item) => item.name_request_costom === "Costom Prototype"
            );
            const assemblyItems = idProdukCostom.filter(
                (item) => item.name_request_costom === "Costom Assembly"
            );
            
            
            if (prototypeItems.length > 0) {
                setIdProductProrotype(prototypeItems);
            }
            if (assemblyItems.length > 0) {
                setIdProductAssembly(assemblyItems);
            }
        }
    }, [costomProduct]);
    


    // menghitung total harga produk
    useEffect(() => {
        let total = 0;
    
       if (costomProduct.length > 0) {
            total = costomProduct.reduce((total, product) => {
                const totalCost = Number(product.total_cost) || 0;
                return total + totalCost;
            }, 0);
        } else if (productsToCheckout.length > 0) {
            total = productsToCheckout.reduce((total, product) => {
                const price = Number(product.id_product?.harga) || 0;
                const quantity = Number(product.quantity) || 1;
                return total + (price * quantity);
            }, 0);
        }
    
        settotalPriceProduct(total);
    }, [productsToCheckout, costomProduct]);
    
  
    // menghitung total pembayaran
    useEffect(() => {
        const validTotalPrice = Number(totalPriceProduct) || 0;
        const validCostShipping = Number(costShipping) || 0;
      
        setTotalPayment(validTotalPrice + validCostShipping);
      }, [totalPriceProduct, costShipping]);
      
    //   data akun user
    useEffect(() => {
        const fetchDataAccount = async () => {
          try {
            const data = await getDataAccount();
            setDataAccount(data);
          } catch (error) {
          }
        };
        fetchDataAccount();
      }, []);

      //  provinsi user
    useEffect(() => {
        const fetchProvince = async () => {
        try {
            const dataProvinces = await getProvinces();
            if (dataProvinces?.data) {
            const province = dataProvinces.data.find(
                (prov) => prov.province_id === dataAccount?.address?.province
            );
            setProvince(province?.province);
            }
        } catch (error) {
            setProvince("Gagal memuat data..");
        }
        };
    
        if (dataAccount?.address?.province) {
        fetchProvince();
        }
    }, [dataAccount]);
      
        // kota berdasarkan profinsi
        useEffect(() => {
        if (dataAccount?.address?.province) {
          const fetchCities = async () => {
            try {
              const dataCity = await getCities(dataAccount?.address?.province);
              if (dataCity) {
                const city = dataCity.find(
                  (cities) => cities.city_id === dataAccount?.address?.city
                );
                setCity(city?.city_name || "Kota tidak ditemukan");
              }
            } catch (error) {
              setCity('Gagal memuat data..'); 
            }
          };
          fetchCities();
        } else {
          setCity([]); 
        }
      }, [dataAccount]);
      
   
    // memilih kurir
    useEffect(() => {
        const fetchCost = async () => {

            const product = [
                {
                    standart: idProductStandart,
                    costom_prototype: idProdukPrototype,
                    costom_assembly: idProdukAssembly 
                }
            ]

            if (!selectedCourier) return;
            try {
                const data = await getCost(selectedCourier, product); 
                setCost(data);  
            } catch (error) {
                console.error("Error fetching cost:", error);
            }
        };

        fetchCost(); 
    }, [selectedCourier]);



    // get ingkir dan estimasi pengiriman
    useEffect(() => {
        if (costList && Array.isArray(costList)) {
            const listServicesAndDescriptions = [];
            let costValue = '';
            let etd = '';
           
    
            costList.forEach((courier) => {
                if (courier.costs && Array.isArray(courier.costs)) {
                    courier.costs.forEach((service) => {
                        listServicesAndDescriptions.push({
                            service: service.service,
                            description: service.description,
                        });
                        
                        if (service.service === selectedOption && Array.isArray(service.cost)) {
                            const firstCost = service.cost[0]; 
                            if (firstCost) {
                                costValue = firstCost.value; 
                                etd = firstCost.etd;
                            }
                        }
                    });
                }
            });
    
            setShipingOption(listServicesAndDescriptions);
            setcostShipping(costValue); 
            setEstimasionDay(etd); 
        }
    }, [costList, selectedOption]);
    
    
    // handle list
    const handleSelectShippingOptions = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleSelectCouriers = (event) => {
        setSelectedCourier(event.target.value);
    };
    const handleBack = () => {
        navigate(-1); 
    };

    const handleEditAlamat = () => {
        navigate('/user/profileSettings');
    };

    const handleCheckout = async () => {
        const data = {
            id_user : dataAccount._id,
            product: [
                {
                    standart: idProductStandart,
                    costom_prototype: idProdukPrototype,
                    costom_assembly: idProdukAssembly 
                }
            ],
            expedition: [
                {
                    courier: selectedCourier,
                    shipping_option: selectedOption,
                    shipping_cost: costShipping, 
                },
            ],
            total_payment: totalPayment,
            estimated_delivery: estimasionDay,

        }
        
        try {
            const response = await getCostomPrototypeData(data);
            if (response.status === 201) {
                Toast.fire({
                    icon: 'success',
                    title: 'Transaction is created!',
                });
                navigate('/transaksi?status=menunggu-pembayaran&status=pembayaran-tertunda&status=sudah-bayar', { state: { showToast: true } });
            }
        } catch (error) {
            alert('Failed to fetch data. Please try again.');
        }
    };
    
 
    return (
        <Box
            sx={{
                padding: 4,
                bgcolor: "#f0f0f0",
                minHeight: "100vh", 
            }}
        >
            <Paper
                sx={{
                    padding: 4,
                    maxWidth: "1000px",
                    margin: "40px auto", 
                    bgcolor: "#f9f9f9",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                {/* Header */}
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Checkout
                </Typography>

                {/* Address Section */}
                <Card sx={{ mb: 3, bgcolor: "#e3f2fd" }}>
                    <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                            Destination Address:
                        </Typography>
                        <TextField
                            label="Recipient Name"
                            variant="outlined"
                            fullWidth
                            value={dataAccount.name || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={dataAccount.phone || ""}
                            sx={{ mb: 2 }}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                                        />
                        <TextField
                            fullWidth
                            label="Detail Alamat"
                            variant="outlined"
                            value={`${dataAccount?.address?.detail_address || ''}, ${city || ''}, ${province || ''}, ${dataAccount?.address?.postal_code || ''}`}
                            multiline
                            rows={3}
                            sx={{ mb: 2 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            InputProps={{
                            readOnly: true,
                            }}
                        />
                    <Button
                                type="submit"
                                onClick={handleEditAlamat}
                                variant="contained"
                                sx={{ backgroundColor: "#00A63F", textTransform: "none", color: "#fff" }}
                                
                              >Edit Alamat
                              </Button>
                    </CardContent>
                </Card>

                {
                    productsToCheckout.length > 0 && costomProduct.length > 0 ? (
                        <Typography variant="body1" color="text.secondary">
                        Error: Tidak bisa menampilkan kedua jenis produk bersamaan!
                        </Typography>
                    ) : costomProduct.length > 0 ? (
                        // Render produk khusus (costomProduct)
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                        {costomProduct.map((product) => (
                            <Grid item xs={12} key={product._id}>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}
                            >
                                {/* Gambar produk */}
                               
                                {product.name === 'Costom Prototype' ? (
                                <CardMedia
                                component="img"
                                image={CostomPrototypeImg}
                                alt={product.name}
                                
                                sx={{
                                    width: 100,
                                    height: 100,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    border: "1px solid #00A63F",
                                    borderColor: "primary.main",
                                }}
                                />
                            ) : (
                                <CardMedia
                                component="img"
                                image={CostomAssemblyImg}
                                alt={product.name}
                                
                                sx={{
                                    width: 100,
                                    height: 100,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    border: "1px solid #00A63F",
                                    borderColor: "primary.main",
                                }}
                                />
                            )}
                                {/* Informasi produk */}
                                <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {product.name || 'Unnamed Product'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Harga: Rp.{Number(product.total_cost).toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Qty: 1
                                </Typography>
                                </Box>
                            </Box>
                            </Grid>
                        ))}
                        </Grid>
                    ) : productsToCheckout.length > 0 ? (
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                        {productsToCheckout.map((product) => (
                            <Grid item xs={12} key={product._id}>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}
                            >
                                {/* Gambar produk */}
                                <CardMedia
                                component="img"
                                image={`http://localhost:5000${product.id_product?.picture_url || ''}`}
                                alt={product.id_product?.product_name || 'Unnamed Product'}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    border: "1px solid #00A63F",
                                    borderColor: "primary.main",
                                }}
                                />

                                {/* Informasi produk */}
                                <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {product.id_product?.product_name || 'Unnamed Product'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Harga: Rp. {product.id_product?.harga.toLocaleString()} /Pcs
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Qty: {product.quantity || 1}
                                </Typography>
                                </Box>
                            </Box>
                            </Grid>
                        ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                        No products selected for checkout!
                        </Typography>
                    )
                    }

                <Grid container spacing={2}  sx={{ mb: 2 }}>
                        <Grid item xs={6}> 
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Pilih Kurir</InputLabel>
                                <Select
                                    name="Pilih Kurir"
                                    value={selectedCourier}
                                    label="Pilih Kurir"
                                    onChange={handleSelectCouriers}
                                   
                                >
                                    
                                        <MenuItem  value='jne'>
                                            JNE Express
                                        </MenuItem>
                                        <MenuItem  value='pos'>
                                            POS Indonesia
                                        </MenuItem>
                                        <MenuItem  value='tiki'>
                                            TIKI
                                        </MenuItem>
                                 
                                </Select>
                            </FormControl>
                        </Grid>
                    {shipingOption?.length > 0 &&(
                        <Grid item xs={6}>  
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Opsi Layanan</InputLabel>
                                <Select
                                    name="Opsi Layanan"
                                    value={selectedOption}
                                    label="Opsi Layanan"
                                    onChange={handleSelectShippingOptions}
                                >
                                    {shipingOption.map((obj) => (
                                        <MenuItem key={obj.service} value={obj.service}>
                                            {obj.description}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                </Grid>


                {/* Summary Section */}
                <Box mb={3}>
                    <Typography variant="body1">
                        Subtotal ( product): Rp.
                        {totalPriceProduct.toLocaleString()}
                    </Typography>
                    <Typography variant="body1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>
                            Shipping Cost: Rp.{costShipping.toLocaleString() || '-'}
                        </span>
                        <span style={{ color: 'red', marginLeft: '8px' }}>
                            Estimation: {estimasionDay || '-'}
                        </span>
                    </Typography>


                    <Typography variant="h6" fontWeight="bold" mt={1}>
                        Total Payment: Rp.{totalPayment.toLocaleString()}
                    </Typography>
                </Box>

                {/* Action Buttons */}
                <Box display="flex" justifyContent="space-between">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleBack} 
                    >
                        Back
                    </Button>
                    <Button 
                        variant="contained" 
                        color="#00A63F" 
                        type="submit" 
                        sx={{
                            backgroundColor: "#00A63F",
                            color: "white",
                            "&:hover": { backgroundColor: "#007A2E" },
                        }}
                        onClick={handleCheckout}>
                        Pesan Sekarang
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default PaymentPage;
