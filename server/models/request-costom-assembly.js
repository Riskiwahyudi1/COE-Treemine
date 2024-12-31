const mongoose = require('mongoose');

const requestCustomAssemblySchema = new mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: { type: String, required: false },
        flexible_option: { type: String, required: false },
        board_type: { type: String, required: false },
        assembly_side: { type: String, required: false },
        quantity: { type: Number, min: 1 },
        pay_attention: { type: String, required: false },
        notes: { type: String, required: false },
        number_unik_part: { type: Number, required: false },
        number_SMD_part: { type: Number, required: false },
        number_BGA_QFP: { type: Number, required: false },
        throught_hole: { type: Number, required: false },
        board_to_delivery: { type: String, required: false },
        function_test: { type: String, required: false },
        cable_wire_harness_assembly: { type: String, required: false },
        detail_information: { type: String, required: false },
        status: { type: String, required: false },
        total_cost: { type: Number, required: false },
        design_file: { type: String, required: false },
        reject_reason: { type: String, required: false },
    },
    { timestamps: true }
);

const RequestCustomAssembly = mongoose.model('RequestCustomAssembly', requestCustomAssemblySchema);

module.exports = RequestCustomAssembly;
