const mongoose = require('mongoose');

const requestCustomAssemblySchema = new mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: { type: String, required: true },
        flexible_option: { type: String, required: true },
        board_type: { type: String, required: true },
        assembly_side: { type: String, required: true },
        quantity: { type: Number, min: 1 },
        pay_attention: { type: String, required: true },
        notes: { type: String, required: true },
        number_unik_part: { type: Number, required: true },
        number_SMD_part: { type: Number, required: true },
        number_BGA_QFP: { type: Number, required: true },
        throught_hole: { type: Number, required: true },
        board_to_delivery: { type: String, required: true },
        function_test: { type: String, required: true },
        cable_wire_harness_assembly: { type: String, required: true },
        detail_information: { type: String, required: true },
        weight: { type: Number, required: true },
        status: { type: String, required: true },
        total_cost: { type: Number, required: true },
        design_file: { type: String, required: null },
        reject_reason: { type: String, required: null },
    },
    { timestamps: true }
);

const RequestCustomAssembly = mongoose.model('RequestCustomAssembly', requestCustomAssemblySchema);

module.exports = RequestCustomAssembly;
