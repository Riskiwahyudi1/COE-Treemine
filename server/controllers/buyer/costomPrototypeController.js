const CustomPrototype = require('../../models/custom-prototype'); 
const RequestCustomPrototype = require('../../models/request-costom-prototype')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const showCustomPrototypeData = async (req, res) => {
    try {
        const customPrototypeData = await CustomPrototype.find(); 
        if (!customPrototypeData || customPrototypeData.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan!' });
        }
        res.json(customPrototypeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

const showCustomPrototypeByUser = async (req, res) => {
    const user = req.user;
    try {
        const customPrototypeData = await RequestCustomPrototype.find({id_user: user.id}); 
        if (!customPrototypeData || customPrototypeData.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan!' });
        }
        res.json(customPrototypeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

const requestCostomPrototype = async (req, res) => {
    const user = req.user;
    
    if (!user) {
        return res.status(401).json({ message: 'User not logged in' });
    }
    const id_user = user.id;
   
    try {
        const { 

       
            board_type,
            x_out,
            panel_Requirement,
            notes,
            route_process,
            design_in_panel,
            width,
            length,
            quantity,
            layer,
            copper_layer,
            solder_mask_position,
            silkscreen_position,
            material,
            material_option,
            thickness,
            min_track,
            min_hole,
            solder_mask,
            silkscreen,
            uv_printing,
            edge_conector,
            surface_finish,
            finish_copper,
            remove_product_no,
            design_file,
            total_cost,
         } = req.body;

        const newProduct = {
            id_user,
            name: 'Costom Prototype',
            board_type,
            x_out,
            panel_Requirement,
            notes,
            route_process,
            design_in_panel,
            width,
            length,
            quantity,
            layer,
            copper_layer,
            solder_mask_position,
            silkscreen_position,
            material,
            material_option,
            thickness,
            min_track,
            min_hole,
            solder_mask,
            silkscreen,
            uv_printing,
            edge_conector,
            surface_finish,
            finish_copper,
            remove_product_no,
            weight: 0,
            design_file,
            status: 'menunggu-pengajuan',
            total_cost,
        };

        const savedProduct = await RequestCustomPrototype.create(newProduct);

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
        cb(null, 'storage/prototype-design'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); 
    },
});
const upload = multer({ storage: storage });

const requestPrototypeToAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: 'Design file is required.' });
        }

        const design_file = `/prototype-design/${req.file.filename}`;

        const updateProduct = await RequestCustomPrototype.findByIdAndUpdate(
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
const deleteRequestPrototype = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRequest = await RequestCustomPrototype.findByIdAndDelete(id);
        
        if(!deleteRequest){
            return res.status(404).json({message : 'Request id not found!'})
        }
        res.status(200).json({ message: 'Request deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Request' });
    };
};

const cancelRequestPrototype = async (req, res) => {
    try {
        const { id } = req.params;
        

        const cancelRequest = await RequestCustomPrototype.findByIdAndUpdate(id, {
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
    showCustomPrototypeData,
    requestCostomPrototype,
    showCustomPrototypeByUser,
    requestPrototypeToAdmin,
    deleteRequestPrototype,
    cancelRequestPrototype,
    upload
};
