export const environment = {
  production: true,
  apiUrl: 'http://localhost:5000/api/v1',
  jwtSecret: '', // Should be empty - will be replaced during deployment
  tokenStorageKey: 'prodAuthToken',
  userStorageKey: 'prodCurrentUser',
  tokenExpiration: 3600 * 24, // 60 minutes in production
  refreshTokenExpiration: 604800, // 1 week in production
  enableDebug: false,
};
