export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    telefono: string;
  };
}