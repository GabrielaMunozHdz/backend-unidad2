# Template Express Básico

Template básico de Express.js v5.1.0 optimizado para Node.js v22.16.0 y el Curso NodeJS 2025.

## 🚀 Inicio Rápido

### 1. Copiar template

```bash
cp -r Templates/express-basic mi-nuevo-proyecto
cd mi-nuevo-proyecto
```

### 2. Configurar entorno

```bash
# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus valores
nano .env
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar servidor

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

### 5. Probar API

- **Principal**: http://localhost:3000
- **Health**: http://localhost:3000/health
- **Usuarios**: http://localhost:3000/api/users
- **Docs**: http://localhost:3000/docs

## 📋 Características Incluidas

### ✅ Configuración Moderna

- Express v5.1.0
- ES6 Modules (import/export)
- Variables de entorno (.env)
- CORS configurado
- Error handling global

### ✅ Middlewares Esenciales

- `express.json()` - Parser JSON
- `express.urlencoded()` - Parser formularios
- `cors()` - Cross-Origin Resource Sharing
- Custom logger - Logging de requests

### ✅ Rutas de Ejemplo

- `GET /` - Información de la API
- `GET /health` - Health check
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users/:id` - Obtener usuario por ID
- `GET /docs` - Documentación básica

### ✅ Validaciones

- Validación de datos de entrada
- Validación de email
- Manejo de errores 400/404/500

### ✅ Respuestas Consistentes

```json
{
  "success": true|false,
  "data": {...},
  "error": "mensaje de error",
  "message": "mensaje descriptivo"
}
```

## 🔧 Personalización

### Agregar Base de Datos

**MongoDB con Mongoose:**

```bash
npm install mongoose
```

```javascript
// En server.js
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB conectado");
```

**MySQL con Sequelize:**

```bash
npm install sequelize mysql2
```

```javascript
// En server.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

await sequelize.authenticate();
console.log("✅ MySQL conectado");
```

### Agregar Autenticación JWT

```bash
npm install jsonwebtoken bcrypt
```

### Estructura Recomendada para Crecer

```
mi-proyecto/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
├── .env
├── server.js
└── package.json
```

## 🧪 Testing

### Con Thunder Client (VS Code)

1. Instalar extensión "Thunder Client"
2. Crear nueva request
3. Probar endpoints

### Con cURL

```bash
# GET usuarios
curl http://localhost:3000/api/users

# POST crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@test.com"}'
```

## 📦 Dependencias

### Producción

- **express**: ^5.1.0 - Framework web
- **cors**: ^2.8.5 - CORS middleware
- **dotenv**: ^17.2.0 - Variables de entorno

### Desarrollo

- **nodemon**: ^3.1.10 - Auto-restart del servidor

## 🔗 Próximos Pasos

1. **Agregar base de datos** (MongoDB o MySQL)
2. **Implementar autenticación** (JWT)
3. **Crear modelos de datos**
4. **Separar en controladores y rutas**
5. **Agregar validaciones avanzadas**
6. **Implementar testing**

## 📚 Recursos

- [Express v5 Docs](https://expressjs.com/en/5x/api.html)
- [Node.js v22 Docs](https://nodejs.org/docs/latest-v22.x/api/)
- [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

_Template creado para el Curso NodeJS 2025 - Inadaptados_
