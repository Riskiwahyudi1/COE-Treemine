const CustomPrototype = require('../../models/custom-prototype'); 
const RequestCustomPrototype = require('../../models/request-costom-prototype')

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

const requestCostomPrototype = async (req, res) => {
    console.log(req.body)
    
    try {
        const { 
            name,
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
            status,
            shiping_cost,
            total_cost,
         } = req.body;

        const newProduct = {
            name,
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
            status,
            shiping_cost,
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

module.exports = {
    showCustomPrototypeData,
    requestCostomPrototype
};
