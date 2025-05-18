export default () => ({
  port: parseInt(process.env['PORT'] ?? '3000', 10),

  database: {
    host: process.env['DB_HOST'] ?? 'localhost',
    port: parseInt(process.env['DB_PORT'] ?? '3306', 10),
    user: process.env['DB_USER'] ?? 'root',
    password: process.env['DB_PASSWORD'] ?? 'password',
    name: process.env['DB_NAME ']?? 'nest_app',
  },

  jwt: {
    secret: process.env['JWT_SECRET'] ?? 'my-very-secret-key',
    expiresIn: process.env['JWT_EXPIRES_IN'] ?? '1h',
    refreshSecret: process.env['JWT_REFRESH_SECRET'] ?? 'my-refresh-secret-key',
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] ?? '7d',
  },

  apiKey: process.env['API_KEY'] ?? 'some-secure-api-key',

  cors: {
    origin: process.env['.CORS_ORIGIN'] ?? '*',
    credentials: process.env['env.CORS_CREDENTIALS'] === 'true',
  },
});
