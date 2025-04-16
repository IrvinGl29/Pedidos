import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const NetworkStatus = () => {
  const isConnected = useNetworkStatus();
  const theme = useTheme();

  if (isConnected === null) return null;

  return (
    <View style={[
      styles.container,
      { backgroundColor: isConnected ? theme.colors.primary : theme.colors.error }
    ]}>
      <Text style={styles.text}>
        {isConnected ? 'Conectado' : 'Sin conexión - Modo offline'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 