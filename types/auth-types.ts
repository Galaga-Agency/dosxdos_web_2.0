// Interfaz para credenciales de inicio de sesión
export interface LoginCredentials {
  username: string;
  password: string;
}

// Interfaz para sesión de usuario
export interface UserSession {
  user: {
    id: string;
    username: string;
    email: string;
    role: "admin" | "editor" | "viewer";
  };
  expires: string;
}

// Interfaz para tokens de autenticación
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// Interfaz para respuesta de autenticación
export interface AuthResponse {
  success: boolean;
  user?: UserSession;
  error?: string;
}
