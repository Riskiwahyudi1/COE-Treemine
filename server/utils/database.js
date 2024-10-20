const mongoose = require('mongoose');

// Menghubungkan ke database MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/COE_Treemine', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
})
// .then(() => {
//     console.log('Database connected');

//     // Buat schema untuk produk
//     const productSchema = new mongoose.Schema({
//         nama: { type: String, required: true },
//         harga: { type: String, required: true },
//     });

//     // Buat model dari schema tersebut
//     const Products = mongoose.model('Product', productSchema);

//     // Buat instance baru dari Product
//     const product1 = new Products({
//         nama: "PCB 10 Layer - VVIV Build",
//         harga: 150000
//     });

//     // Simpan data ke MongoDB
//     return product1.save();
// })
// .then((product) => console.log('Product saved:', product))
// .catch((error) => console.log('Error saving product:', error));
