const CustomPrototype = require('../../models/custom-prototype'); 
const RequestCustomAssembly = require('../../models/request-costom-assembly')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const showCustomAssemblyByUser = async (req, res) => {
    const user = req.user;
    try {
        const customPrototypeData = await RequestCustomAssembly.find({id_user: user.id}); 
        if (!customPrototypeData || customPrototypeData.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan!' });
        }
        res.json(customPrototypeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

const requestCostomAssembly = async (req, res) => {
    const user = req.user;
    
    if (!user) {
        return res.status(401).json({ message: 'User not logged in' });
    }
    const id_user = user.id;
    try {
        const { 
            name,
            flexible_option,
            board_type,
            assembly_side,
            quantity,
            pay_attention,
            notes,
            number_unik_part,
            number_SMD_part,
            number_BGA_QFP,
            throught_hole,
            board_to_delivery,
            function_test,
            cable_wire_harness_assembly,
            detail_information,
            total_cost
         } = req.body;

        const newProduct = {
            id_user,
            name,
            flexible_option,
            board_type,
            assembly_side,
            quantity,
            pay_attention,
            notes,
            number_unik_part,
            number_SMD_part,
            number_BGA_QFP,
            throught_hole,
            board_to_delivery,
            function_test,
            cable_wire_harness_assembly,
            detail_information,
            weight: 1000,
            status: 'menunggu-pengajuan',
            total_cost
        };

        const savedProduct = await RequestCustomAssembly.create(newProduct);

        res.status(201).json({
            message: 'Product added successfully',
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/assembly-design'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); 
    },
});
const upload = multer({ storage: storage });

const requestAssemblyToAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: 'Design file is required.' });
        }

        const design_file = `/prototype-design/${req.file.filename}`;

        const updateProduct = await RequestCustomAssembly.findByIdAndUpdate(
            id,
            { status : 'admin-review', design_file },
            { new: true }
        );

        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            data: updateProduct,
        });
    } catch (error) {
        console.error('Error in Controller:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// delete request
const deleteRequestAssembly = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRequest = await RequestCustomAssembly.findByIdAndDelete(id);
        
        if(!deleteRequest){
            return res.status(404).json({message : 'Request id not found!'})
        }
        res.status(200).json({ message: 'Request deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Request' });
    };
};

const cancelRequestAssembly = async (req, res) => {
    try {
        const { id } = req.params;

        const cancelRequest = await RequestCustomAssembly.findByIdAndUpdate(id, {
            status : 'dibatalkan-pembeli'            
        }, { new: true });

        if (!cancelRequest) {
            return res.status(404).json({ message: "request not found" });
        }
        res.status(200).json({ message: 'request Canceled ', data: cancelRequest, });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete request' });
    }
};


module.exports = {
    // showCustomPrototypeData,
    requestCostomAssembly,
    showCustomAssemblyByUser,
    requestAssemblyToAdmin,
    deleteRequestAssembly,
    cancelRequestAssembly,
    upload
};
