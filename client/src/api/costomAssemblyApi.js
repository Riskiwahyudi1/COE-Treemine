import axios from "axios";

const API_URL = 'http://localhost:5000/admin/costom-assembly';

export const getAssemblyItem = async () => {
    try {
        const respon = await axios.get(API_URL);
        return respon.data;
    } catch (error) {
        console.error('Error fetching part:', error);
        throw error;
    }
};

export const getAssemblyById = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
        console.error('Error fetching part:', error);
        throw error;
    }
  };