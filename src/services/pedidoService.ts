import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pedido } from '../types';

const API_URL = 'http://tu-backend-url/api'; // Reemplazar con la URL real del backend

const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const getPedidos = async (): Promise<Pedido[]> => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_URL}/pedidos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    // En caso de error, retornar pedidos locales
    const pedidosLocales = await AsyncStorage.getItem('pedidos');
    return pedidosLocales ? JSON.parse(pedidosLocales) : [];
  }
};

export const crearPedido = async (pedido: Omit<Pedido, 'id'>): Promise<Pedido> => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(`${API_URL}/pedidos`, pedido, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear pedido:', error);
    // Guardar pedido localmente
    const pedidoLocal = {
      ...pedido,
      id: Date.now().toString(),
      estado: 'pendiente',
    };
    
    const pedidosLocales = await AsyncStorage.getItem('pedidos');
    const pedidos = pedidosLocales ? JSON.parse(pedidosLocales) : [];
    pedidos.push(pedidoLocal);
    await AsyncStorage.setItem('pedidos', JSON.stringify(pedidos));
    
    return pedidoLocal;
  }
};

export const sincronizarPedidos = async (): Promise<void> => {
  try {
    const token = await getAuthToken();
    const pedidosLocales = await AsyncStorage.getItem('pedidos');
    if (!pedidosLocales) return;

    const pedidos = JSON.parse(pedidosLocales);
    const pedidosPendientes = pedidos.filter((p: Pedido) => p.estado === 'pendiente');

    if (pedidosPendientes.length > 0) {
      await axios.post(`${API_URL}/pedidos/sync`, pedidosPendientes, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Actualizar estado de pedidos sincronizados
      const pedidosActualizados = pedidos.map((p: Pedido) => ({
        ...p,
        estado: 'sincronizado'
      }));
      
      await AsyncStorage.setItem('pedidos', JSON.stringify(pedidosActualizados));
    }
  } catch (error) {
    console.error('Error al sincronizar pedidos:', error);
  }
}; 