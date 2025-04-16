import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../screens/LoginScreen';
import { useAuth } from '../context/AuthContext';
import { PedidosScreen } from '../screens/PedidosScreen';
import { NuevoPedidoScreen } from '../screens/NuevoPedidoScreen';
import { NetworkStatus } from '../components/NetworkStatus';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <>
      <NetworkStatus />
      <Tab.Navigator>
        <Tab.Screen 
          name="Pedidos" 
          component={PedidosScreen}
          options={{
            title: 'Mis Pedidos',
          }}
        />
        <Tab.Screen 
          name="NuevoPedido" 
          component={NuevoPedidoScreen}
          options={{
            title: 'Nuevo Pedido',
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export const AppNavigator = () => {
  const { authState, isLoading } = useAuth();

  if (isLoading) {
    return null; // O un componente de carga
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authState.isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen 
            name="Main" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 