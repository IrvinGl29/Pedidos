import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials } from '../types';

export const LoginScreen = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setError(null);
      await login(credentials);
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TextInput
        label="Usuario"
        value={credentials.username}
        onChangeText={(text) => setCredentials({ ...credentials, username: text })}
        style={styles.input}
        mode="outlined"
      />
      
      <TextInput
        label="Contraseña"
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Ingresar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
}); 