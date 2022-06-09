const AUTH_TOKEN_KEY = 'authToken';

export const getAuthToken = (): string | null => localStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token: string): void => localStorage.setItem(AUTH_TOKEN_KEY, token);

export const clearAuthToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);
