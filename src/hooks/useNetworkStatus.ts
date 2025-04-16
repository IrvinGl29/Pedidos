import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { sincronizarPedidos } from '../services/pedidoService';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      
      // Si se recupera la conexión, sincronizar pedidos pendientes
      if (state.isConnected) {
        sincronizarPedidos();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
}; 