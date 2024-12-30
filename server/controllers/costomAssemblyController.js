const CustomAssembly = require('../models/costom-assembly'); 

// menampilkan data part assembly
const showCustomAssemblyData = async (req, res) => {
    try {
        const customAssemblyData = await CustomAssembly.find(); 
        if (!customAssemblyData || customAssemblyData.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan!' });
        }
        console.log(customAssemblyData)
        res.json(customAssemblyData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

// menampilkan data part assembly berdasarkan id
const showCustomAssemblyDataById = async (req, res) => {
    const {id} = req.params;
    try {
        const customAssemblyById = await CustomAssembly.findById(id);
        if (!customAssemblyById) {
            return res.status(404).json({ message: 'Data tidak ditemukan!' });
        }
        res.json(customAssemblyById);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server!" });
    }
};

// manambahkan item assemly
const addDataAsembly = async (req, res) => {
    const { id } = req.params;
    const { type, cost } = req.body; 
  
    if (!type) {
      return res.status(400).json({ message: 'ID atau data baru tidak boleh kosong' });
    }
  
    try {
      const updatedAssembly = await CustomAssembly.findByIdAndUpdate(
        id,
        { $push: { data: { type, cost } } },  
        { new: true }
      );
  
      if (!updatedAssembly) {
        return res.status(404).json({ message: 'Custom Assembly tidak ditemukan!' });
      }
  
      res.status(200).json(updatedAssembly); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan server!' });
    }
  };

// Menghapus data assembly
const deleteDataAssembly = async (req, res) => {

  const { typeId, itemId } = req.params;
  try {
    await CustomAssembly.updateOne(
      { _id: typeId },
      { $pull: { data: { _id: itemId } } }
    );
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete item' });
  }
  };

// edit data assembly
  const editDataAssembly = async (req, res) => {
    const { typeId, itemId } = req.params;
    const { type, cost } = req.body;

    try {
      const updatedData = await CustomAssembly.findOneAndUpdate(
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

//   Mendapatkan item assembly untuk CRUD
  const endpoinEditDataAssembly = async (req, res) => {
    const { typeId, itemId } = req.params;

    try {
      const item = await CustomAssembly.findOne({
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
    showCustomAssemblyData,
    showCustomAssemblyDataById,
    addDataAsembly,
    deleteDataAssembly, 
    editDataAssembly,
    endpoinEditDataAssembly
};