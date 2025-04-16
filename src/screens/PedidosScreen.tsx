import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, FAB } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { Pedido } from '../types';
import { getPedidos } from '../services/pedidoService';

export const PedidosScreen = () => {
  const { data: pedidos, isLoading } = useQuery<Pedido[]>({
    queryKey: ['pedidos'],
    queryFn: getPedidos,
  });

  const renderItem = ({ item }: { item: Pedido }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{item.cliente}</Text>
        <Text variant="bodyMedium">Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>
        <Text variant="bodyMedium">
          Estado: {item.estado === 'sincronizado' ? 'Sincronizado' : 'Pendiente'}
        </Text>
        <Text variant="bodyMedium">
          Productos: {item.productos.length}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Cargando pedidos...</Text>
      ) : (
        <FlatList
          data={pedidos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // Navegar a la pantalla de nuevo pedido
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 