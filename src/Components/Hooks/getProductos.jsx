import axios from 'axios';

export const getProductos = async () => {
  try {
    const response = await axios.get('/productos');
    return response.data.productos;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw new Error('Error al obtener las categorías');
  }
};
