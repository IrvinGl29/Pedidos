import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearPedido } from '../services/pedidoService';
import { Pedido } from '../types';

export const NuevoPedidoScreen = () => {
  const [cliente, setCliente] = useState('');
  const [notas, setNotas] = useState('');
  const [productos, setProductos] = useState<Array<{ nombre: string; cantidad: number; precio: number }>>([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: '', precio: '' });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: crearPedido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      // Limpiar formulario
      setCliente('');
      setNotas('');
      setProductos([]);
    },
  });

  const handleAgregarProducto = () => {
    if (nuevoProducto.nombre && nuevoProducto.cantidad && nuevoProducto.precio) {
      setProductos([
        ...productos,
        {
          nombre: nuevoProducto.nombre,
          cantidad: Number(nuevoProducto.cantidad),
          precio: Number(nuevoProducto.precio),
        },
      ]);
      setNuevoProducto({ nombre: '', cantidad: '', precio: '' });
    }
  };

  const handleSubmit = () => {
    if (!cliente || productos.length === 0) return;

    const pedido: Omit<Pedido, 'id'> = {
      cliente,
      productos,
      notas,
      estado: 'pendiente',
      fecha: new Date().toISOString(),
      usuarioId: 'current-user-id', // Esto debería venir del contexto de autenticación
    };

    mutate(pedido);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Cliente"
        value={cliente}
        onChangeText={setCliente}
        style={styles.input}
        mode="outlined"
      />

      <Text style={styles.sectionTitle}>Productos</Text>
      
      <View style={styles.productoForm}>
        <TextInput
          label="Nombre del producto"
          value={nuevoProducto.nombre}
          onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, nombre: text })}
          style={styles.input}
          mode="outlined"
        />
        
        <TextInput
          label="Cantidad"
          value={nuevoProducto.cantidad}
          onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, cantidad: text })}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />
        
        <TextInput
          label="Precio"
          value={nuevoProducto.precio}
          onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, precio: text })}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />
        
        <Button mode="contained" onPress={handleAgregarProducto} style={styles.button}>
          Agregar Producto
        </Button>
      </View>

      {productos.map((producto, index) => (
        <View key={index} style={styles.productoItem}>
          <Text>{producto.nombre}</Text>
          <Text>Cantidad: {producto.cantidad}</Text>
          <Text>Precio: ${producto.precio}</Text>
        </View>
      ))}

      <TextInput
        label="Notas"
        value={notas}
        onChangeText={setNotas}
        multiline
        style={styles.input}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        loading={isLoading}
        disabled={!cliente || productos.length === 0}
      >
        Crear Pedido
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productoForm: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  productoItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 32,
  },
}); 