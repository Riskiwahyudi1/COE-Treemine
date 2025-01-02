const mongoose = require('mongoose');

const requestCustomPrototypeSchema = new mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: { type: String, required: false  },
        board_type: { type: String, required: false  },
        x_out: { type: String, required: false  },
        panel_requirement: { type: String, required: false  },
        notes: { type: String, required: false  },
        route_process: { type: String, required: false  },
        design_in_panel: { type: String, required: false  },
        width: { type: String, required: false  }, 
        length: { type: String, required: false  }, 
        quantity: { type: String, required: false  }, 
        layer: { type: String, required: false  }, 
        copper_layer: { type: String, required: false  },
        solder_mask_position: { type: String, required: false  },
        silkscreen_position: { type: String, required: false  },
        material: { type: String, required: false  },
        material_option: { type: String, required: false  },
        thickness: { type: String, required: false  }, 
        min_track: { type: String, required: false  }, 
        min_hole: { type: String, required: false  }, 
        solder_mask: { type: String, required: false  },
        silkscreen: { type: String, required: false  },
        uv_printing: { type: String, required: false  },
        edge_connector: { type: String, required: false  },
        surface_finish: { type: String, required: false  },
        finish_copper: { type: String, required: false  },
        remove_product_no: { type: String, required: false  }, 
        weight: { type: Number, required: false  }, 
        design_file: { type: String, required: false  }, 
        status: { type: String, required: false  }, 
        shiping_cost: { type: String, required: false  }, 
        total_cost: { type: String, required: false  }, 
        reject_reason: { type: String, required: false },
    },
    { timestamps: true }
);

const RequestCustomPrototype = mongoose.model('RequestCustomPrototype', requestCustomPrototypeSchema);

module.exports = RequestCustomPrototype;
