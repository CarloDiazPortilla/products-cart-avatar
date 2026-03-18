# Entrevista técnica Products cart
Aplicación fullstack con React (TypeScript) + Node/Express (TypeScript) que consume la API de DummyJSON, lista productos y simula un carrito de compras.

## Stack tecnológico
### Frontend:
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- Axios

### Backend:
- Node.js
- Express
- TypeScript
- Mongoose
- JWT

## Base de datos:
- MongoDB 7 (Docker)

## Arquitecturas
1. Frontend: Se utilizó una arquitectura basada en features.
2. Backend: Se utilizó clean architecture.

## Para probar la aplicación

1. Levantar la base de datos con el siguiente comando:
```bash
cd backend
docker compose up -d
```

2. Instalar dependencias requeridas:
```bash
npm install
```

3. Configurar variables de entorno, renombra el archivo `.env.example` a `.env`.

4. Rellenar base de datos con usuarios por defecto:
```bash
npm run seed
```
Usuarios creados por la seed: `admin@shop.com | admin1234` y `john@shop.com | john1234`

5. Luego, correr en modo desarollo:
```bash
npm run dev
```

El servidor corre en **http://localhost:3000**

6. Para correr el frontend:
```bash
cd frontend
npm install
npm run dev
```

La app corre en **http://localhost:5173**

## API Endpoints

### Auth
- POST `/api/auth/login`
- POST `/api/auth/refresh`
- POST `/api/auth/logout`

### Cart
- GET `/api/cart`
- POST `/api/cart/items`
- DELETE `/api/cart/items/:idProducto`

## Tiempo estimado vs Tiempo real utilizado
Se estimó un total de 6 horas para resolver la prueba técnica, se utilizó 5 horas para desarrollar la aplicación.
