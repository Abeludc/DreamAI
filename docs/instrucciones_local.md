# Instrucciones para Ejecutar DreamAI en Entorno Local

Este documento proporciona instrucciones detalladas para ejecutar la aplicación DreamAI en tu entorno de desarrollo local, tanto para el frontend como para el backend.

## Índice
1. [Requisitos Previos](#requisitos-previos)
2. [Configuración del Backend](#configuración-del-backend)
3. [Configuración del Frontend](#configuración-del-frontend)
4. [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
5. [Pruebas y Desarrollo](#pruebas-y-desarrollo)
6. [Solución de Problemas Comunes](#solución-de-problemas-comunes)

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (v16.x o superior)
- **npm** (v8.x o superior)
- **Git** (opcional, para control de versiones)
- **Expo CLI** (`npm install -g expo-cli`)
- **Expo Go** app en tu dispositivo iOS (para pruebas en dispositivo físico)
- **Xcode** (solo para macOS, si deseas ejecutar el simulador de iOS)

## Configuración del Backend

### 1. Clonar el Repositorio

Si has recibido el proyecto como un archivo comprimido, descomprímelo. Si está en un repositorio Git, clónalo:

```bash
git clone <url-del-repositorio>
cd DreamAI
```

### 2. Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_clave_secreta_jwt_para_desarrollo
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_clave_de_supabase
AI_API_URL=https://api.deepseek.com
AI_API_KEY=sk-c81d028a38364949b0735f1059eedd15
```

Nota: Para desarrollo local, puedes usar cualquier valor para JWT_SECRET. Para Supabase, puedes crear una cuenta gratuita en [supabase.io](https://supabase.io) y obtener las credenciales necesarias.

### 4. Configurar la Base de Datos

#### Opción 1: Usar Supabase Cloud (Recomendado para Desarrollo)

1. Crea una cuenta en [supabase.io](https://supabase.io)
2. Crea un nuevo proyecto
3. Ve a SQL Editor y ejecuta los scripts SQL que se encuentran en `backend/src/db/schema.js`
4. Obtén la URL y la clave de API desde la sección de configuración del proyecto
5. Actualiza el archivo `.env` con estas credenciales

#### Opción 2: Usar Supabase Local (Avanzado)

Si prefieres ejecutar Supabase localmente, sigue las instrucciones en [https://supabase.io/docs/guides/local-development](https://supabase.io/docs/guides/local-development)

### 5. Iniciar el Servidor Backend

```bash
cd backend
npm run dev
```

El servidor se iniciará en `http://localhost:3000` y verás un mensaje de confirmación en la consola.

## Configuración del Frontend

### 1. Instalar Dependencias del Frontend

En una nueva terminal:

```bash
cd DreamAI/frontend/dreamai-app
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `frontend/dreamai-app/` con el siguiente contenido:

```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### 3. Configurar la Conexión con el Backend

Abre el archivo `frontend/dreamai-app/src/config/config.js` y asegúrate de que la URL de la API apunte a tu servidor local:

```javascript
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
```

## Ejecución de la Aplicación

### 1. Iniciar el Servidor de Desarrollo de Expo

```bash
cd DreamAI/frontend/dreamai-app
npx expo start
```

Esto iniciará el servidor de desarrollo de Expo y mostrará un código QR en la terminal.

### 2. Ejecutar en Simulador iOS (solo macOS)

Presiona `i` en la terminal donde se está ejecutando Expo para abrir el simulador de iOS.

### 3. Ejecutar en Dispositivo Físico

1. Instala la aplicación Expo Go en tu dispositivo iOS desde la App Store
2. Escanea el código QR con la cámara de tu iPhone (o con la app Expo Go en Android)
3. La aplicación se cargará en tu dispositivo

### 4. Acceder a la Aplicación Web (Alternativa)

También puedes acceder a una versión web de la aplicación presionando `w` en la terminal donde se está ejecutando Expo, aunque algunas funcionalidades específicas de iOS pueden no estar disponibles.

## Pruebas y Desarrollo

### Datos de Prueba

Para facilitar el desarrollo y las pruebas, la aplicación incluye datos de ejemplo:

- **Usuario de prueba**: test@example.com / password123
- **Sueños de ejemplo**: Se cargan automáticamente al iniciar sesión con el usuario de prueba
- **Interpretaciones de ejemplo**: Disponibles para los sueños precargados

### Modo de Desarrollo

La aplicación está configurada para funcionar en modo de desarrollo, lo que significa:

- Las llamadas a la API de DeepSeek están simuladas para no consumir créditos
- El sistema de suscripción está en modo de prueba (puedes alternar entre plan gratuito y premium)
- Los tiempos de respuesta están acelerados para facilitar el desarrollo

Para habilitar las llamadas reales a la API de DeepSeek, modifica el archivo `backend/src/services/aiService.js` y cambia `USE_MOCK_RESPONSES` a `false`.

## Solución de Problemas Comunes

### El Backend No Se Inicia

- Verifica que el puerto 3000 no esté en uso por otra aplicación
- Asegúrate de haber instalado todas las dependencias con `npm install`
- Comprueba que el archivo `.env` esté correctamente configurado

```bash
# Para verificar si el puerto está en uso
lsof -i :3000
# Para matar el proceso que usa el puerto
kill -9 <PID>
```

### Problemas con Expo

- Limpia la caché de Expo:
  ```bash
  npx expo start --clear
  ```
- Reinicia el servidor de desarrollo:
  ```bash
  npx expo start -c
  ```

### Errores de Conexión con el Backend

- Asegúrate de que el backend esté en ejecución
- Verifica que la URL en `config.js` sea correcta
- Si estás usando un dispositivo físico, asegúrate de que esté en la misma red WiFi que tu computadora
- Para dispositivos físicos, puede ser necesario usar la IP de tu computadora en lugar de `localhost`:
  ```javascript
  export const API_URL = 'http://192.168.1.X:3000'; // Reemplaza con tu IP local
  ```

### Problemas con Supabase

- Verifica las credenciales en el archivo `.env`
- Asegúrate de haber ejecutado los scripts SQL correctamente
- Comprueba que las políticas de seguridad de Supabase permitan las operaciones necesarias

## Desarrollo Adicional

Si deseas continuar el desarrollo de DreamAI, aquí hay algunas áreas en las que podrías enfocarte:

1. **Implementación de pruebas automatizadas**: Añadir pruebas unitarias y de integración
2. **Mejora de la interfaz de usuario**: Refinar animaciones y transiciones
3. **Optimización de rendimiento**: Mejorar la carga y procesamiento de datos
4. **Nuevas funcionalidades**: Añadir características como exportación de datos, más visualizaciones, etc.
5. **Integración con servicios adicionales**: Conectar con más APIs o servicios externos

Para cualquier pregunta o problema durante el desarrollo, no dudes en contactarme.
