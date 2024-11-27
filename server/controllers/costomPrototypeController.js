const CustomPrototype = require('../models/custom-prototype'); 

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

const showCustomPrototypeById = async (req, res) => {
    const {id} = req.params;
    try {
        const customPrototypeById = await CustomPrototype.findById(id);
        if (!customPrototypeById) {
            return res.status(404).json({ message: 'Data tidak ditemukan!' });
        }
        res.json(customPrototypeById);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

const addDataToPrototype = async (req, res) => {
    const { id } = req.params;
    const { type, cost } = req.body; 
  
    if (!type) {
      return res.status(400).json({ message: 'ID atau data baru tidak boleh kosong' });
    }
  
    try {
      const updatedPrototype = await CustomPrototype.findByIdAndUpdate(
        id,
        { $push: { data: { type, cost } } },  
        { new: true }
      );
  
      if (!updatedPrototype) {
        return res.status(404).json({ message: 'Custom prototype tidak ditemukan!' });
      }
  
      res.status(200).json(updatedPrototype); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server!' });
    }
  };

const deleteDataToPrototype = async (req, res) => {

  const { typeId, itemId } = req.params;
  try {
    await CustomPrototype.updateOne(
      { _id: typeId },
      { $pull: { data: { _id: itemId } } }
    );
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete item' });
  }
  };


  const editDataPrototype = async (req, res) => {
    const { typeId, itemId } = req.params;
    const { type, cost } = req.body;

    try {
      const updatedData = await CustomPrototype.findOneAndUpdate(
        { _id: typeId, "data._id": itemId },
        {
          $set: {
            "data.$.type": type,
            "data.$.cost": cost,
          },
        },
        { new: true } 
      );

      if (!updatedData) {
        return res.status(404).json({ message: "Item not found!" });
      }

      res.status(200).json(updatedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update item!" });
    }
  };

  const endpoinEditDataPrototype = async (req, res) => {
    const { typeId, itemId } = req.params;

    try {
      const item = await CustomPrototype.findOne({
        _id: typeId,
        "data._id": itemId, 
      });
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ message: 'Failed to fetch item', error: error.message });
    }
  
  }

  
  


module.exports = {
    showCustomPrototypeData,
    showCustomPrototypeById,
    addDataToPrototype,
    deleteDataToPrototype, 
    editDataPrototype,
    endpoinEditDataPrototype
};
