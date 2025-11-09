import { apiClient } from '@/lib/api-client'
import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from '@/types/api'

interface BackendLoginResponse {
  id: string
  nombre: string
  email: string
  token: string
  createdAt: string
  // OJO: Tu backend NO devuelve 'userType'
}

// Esta es la respuesta REAL que tu backend envía en el register
// (Fuente: backend/src/controllers/auth.controller.js)
interface BackendRegisterResponse {
  id: string
  nombre: string
  email: string
  createdAt: string
}

// Esta es la respuesta REAL que tu backend envía en /verify
// (Fuente: backend/src/controllers/auth.controller.js)
interface BackendVerifyResponse {
  id: string
  nombre: string
  email: string
}

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
    'api/login', // <-- Cambia esto
    credentials,
    { requiresAuth: false }
    )
    
    if (response.data) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('userType', response.data.user.userType)
      localStorage.setItem('userId', response.data.user.id)
      localStorage.setItem('userName', response.data.user.name)
      localStorage.setItem('userEmail', response.data.user.email)
      localStorage.setItem('isLoggedIn', 'true')
    }
    
    return response.data!
  },

  /**
   * Signup new user
   */
async signup(userData: SignupRequest): Promise<BackendRegisterResponse> {
    // 5. Endpoint corregido: '/register' (antes era '/auth/signup')
    // 6. Tipo de respuesta corregido: El backend solo devuelve el usuario
    const response = await apiClient.post<BackendRegisterResponse>(
      'api/register',
      userData,
      { requiresAuth: false }
    )
    return response
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // 8. Endpoint corregido: '/logout' (antes era '/auth/logout')
      await apiClient.post('/logout')
    } finally {
      // Esta lógica de limpiar localStorage está perfecta.
      localStorage.removeItem('authToken')
      localStorage.removeItem('userType')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('isLoggedIn')
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me')
    return response.data!
  },

  /**
   * Update user profile
   */
async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(
      'api/profile', // <-- PROBABLEMENTE INCORRECTO
      updates
    )
    
    if (response.data) {
      // Update localStorage
      if (response.data.name) {
        localStorage.setItem('userName', response.data.name)
      }
      if (response.data.email) {
        localStorage.setItem('userEmail', response.data.email)
      }
    }
    
    return response.data!
  },

  /**
   * Change password
   */
  // async changePassword(
  //   currentPassword: string,
  //   newPassword: string
  // ): Promise<void> {
  //   await apiClient.post('/auth/change-password', {
  //     currentPassword,
  //     newPassword,
  //   })
  // },

  /**
   * Request password reset
   */
  // async requestPasswordReset(email: string): Promise<void> {
  //   await apiClient.post(
  //     '/auth/forgot-password',
  //     { email },
  //     { requiresAuth: false }
  //   )
  // },

  /**
   * Reset password with token
   */
  // async resetPassword(token: string, newPassword: string): Promise<void> {
  //   await apiClient.post(
  //     '/auth/reset-password',
  //     { token, newPassword },
  //     { requiresAuth: false }
  //   )
  // },

  /**
   * Refresh auth token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      'api/refresh',
      { refreshToken },
      { requiresAuth: false }
    )
    
    if (response.data) {
      localStorage.setItem('authToken', response.data.token)
    }
    
    return response.data!
  },
}
