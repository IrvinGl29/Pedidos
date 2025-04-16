export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Pedido {
  id: string;
  cliente: string;
  productos: ProductoPedido[];
  notas?: string;
  estado: 'pendiente' | 'sincronizado';
  fecha: string;
  usuarioId: string;
}

export interface ProductoPedido {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
} 