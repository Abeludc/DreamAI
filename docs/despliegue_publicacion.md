# Documentación de Despliegue y Publicación - DreamAI

## Índice
1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración del Entorno](#configuración-del-entorno)
5. [Despliegue del Backend](#despliegue-del-backend)
6. [Despliegue de la Aplicación iOS](#despliegue-de-la-aplicación-ios)
7. [Publicación en App Store](#publicación-en-app-store)
8. [Mantenimiento y Actualizaciones](#mantenimiento-y-actualizaciones)
9. [Solución de Problemas](#solución-de-problemas)

## Introducción

DreamAI es una aplicación móvil iOS para el registro, análisis emocional e interpretación de sueños mediante inteligencia artificial. Esta documentación proporciona instrucciones detalladas para desplegar y publicar la aplicación en un entorno de producción.

## Requisitos Previos

### Para el Backend
- Node.js (v16.x o superior)
- npm (v8.x o superior)
- Cuenta en Supabase (https://supabase.io)
- Cuenta en DeepSeek para la API de IA
- Servidor con sistema operativo Linux (recomendado Ubuntu 20.04 LTS)
- Dominio y certificados SSL

### Para la Aplicación iOS
- macOS (versión actual recomendada)
- Xcode (versión 14 o superior)
- Cuenta de desarrollador de Apple
- Expo CLI (`npm install -g expo-cli`)
- Cocoapods

## Estructura del Proyecto

```
DreamAI/
├── frontend/           # Aplicación React Native/Expo
│   └── dreamai-app/    # Código fuente de la aplicación
├── backend/            # Servidor Node.js/Express
│   ├── src/            # Código fuente del backend
│   └── server.js       # Punto de entrada del servidor
├── docs/               # Documentación
└── assets/             # Recursos gráficos y otros activos
```

## Configuración del Entorno

### Variables de Entorno del Backend

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```
PORT=3000
NODE_ENV=production
JWT_SECRET=tu_clave_secreta_jwt
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_clave_de_supabase
AI_API_URL=https://api.deepseek.com
AI_API_KEY=tu_clave_api_deepseek
```

### Configuración de Supabase

1. Crea un nuevo proyecto en Supabase
2. Ejecuta los scripts SQL de creación de tablas que se encuentran en `backend/src/db/schema.js`
3. Configura las políticas de seguridad según sea necesario
4. Obtén la URL y la clave de API para configurar las variables de entorno

## Despliegue del Backend

### Opción 1: Despliegue en VPS (Ubuntu)

1. Conecta a tu servidor vía SSH:
   ```
   ssh usuario@tu-servidor.com
   ```

2. Instala Node.js y npm:
   ```
   curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Instala PM2 para gestionar el proceso:
   ```
   sudo npm install -g pm2
   ```

4. Clona el repositorio:
   ```
   git clone https://tu-repositorio/dreamai.git
   cd dreamai/backend
   ```

5. Instala las dependencias:
   ```
   npm install --production
   ```

6. Configura el archivo `.env` con tus variables de entorno

7. Inicia la aplicación con PM2:
   ```
   pm2 start server.js --name dreamai-backend
   pm2 save
   pm2 startup
   ```

8. Configura Nginx como proxy inverso:
   ```
   sudo apt-get install nginx
   ```

   Crea un archivo de configuración en `/etc/nginx/sites-available/dreamai`:
   ```
   server {
       listen 80;
       server_name api.tudominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. Habilita el sitio y reinicia Nginx:
   ```
   sudo ln -s /etc/nginx/sites-available/dreamai /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. Configura SSL con Certbot:
    ```
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d api.tudominio.com
    ```

### Opción 2: Despliegue en Servicios Gestionados

#### Heroku
1. Instala Heroku CLI
2. Inicializa un repositorio Git si aún no existe
3. Crea una aplicación en Heroku:
   ```
   heroku create dreamai-backend
   ```
4. Configura las variables de entorno:
   ```
   heroku config:set NODE_ENV=production JWT_SECRET=tu_clave_secreta_jwt ...
   ```
5. Despliega la aplicación:
   ```
   git subtree push --prefix backend heroku main
   ```

#### AWS Elastic Beanstalk
1. Instala AWS CLI y EB CLI
2. Inicializa la aplicación EB:
   ```
   cd backend
   eb init
   ```
3. Crea un entorno:
   ```
   eb create dreamai-production
   ```
4. Configura las variables de entorno a través de la consola de AWS o con:
   ```
   eb setenv NODE_ENV=production JWT_SECRET=tu_clave_secreta_jwt ...
   ```
5. Despliega la aplicación:
   ```
   eb deploy
   ```

## Despliegue de la Aplicación iOS

### Preparación del Proyecto

1. Navega a la carpeta de la aplicación:
   ```
   cd frontend/dreamai-app
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura la URL del backend en `src/config/config.js`:
   ```javascript
   export const API_URL = 'https://api.tudominio.com';
   ```

4. Genera el proyecto nativo de iOS:
   ```
   expo prebuild --platform ios
   ```

### Compilación con Xcode

1. Abre el proyecto de Xcode generado:
   ```
   open ios/dreamaiapp.xcworkspace
   ```

2. Configura tu equipo de desarrollo en Xcode:
   - Selecciona el proyecto en el navegador de proyectos
   - En la pestaña "Signing & Capabilities", selecciona tu equipo de desarrollo
   - Asegúrate de que el Bundle Identifier sea único (ej. com.tuempresa.dreamai)

3. Configura los certificados de firma:
   - Genera un certificado de distribución en el portal de desarrolladores de Apple
   - Importa el certificado en Keychain Access
   - Selecciona el certificado en Xcode

4. Compila la aplicación para distribución:
   - Selecciona "Generic iOS Device" como destino
   - Selecciona Product > Archive en el menú

## Publicación en App Store

### Preparación de Metadatos

1. Prepara los recursos necesarios:
   - Icono de la aplicación (1024x1024 px)
   - Capturas de pantalla para diferentes dispositivos
   - Descripción de la aplicación
   - Palabras clave
   - URL de política de privacidad

2. Crea un registro de aplicación en App Store Connect:
   - Inicia sesión en https://appstoreconnect.apple.com
   - Selecciona "Mi Apps" > "+"
   - Completa la información básica de la aplicación

### Envío a App Store

1. Desde Xcode, después de archivar la aplicación:
   - Haz clic en "Distribute App"
   - Selecciona "App Store Connect"
   - Sigue las instrucciones del asistente

2. En App Store Connect:
   - Completa toda la información de la ficha de la aplicación
   - Sube las capturas de pantalla y el icono
   - Configura el precio y la disponibilidad
   - Completa la información de revisión de la aplicación

3. Envía la aplicación para revisión:
   - Asegúrate de que toda la información esté completa
   - Haz clic en "Enviar para revisión"
   - Responde a cualquier pregunta adicional

4. Espera la revisión de Apple:
   - El proceso puede tardar entre 24 horas y varios días
   - Recibirás notificaciones por correo electrónico sobre el estado

## Mantenimiento y Actualizaciones

### Actualizaciones del Backend

1. Realiza los cambios en el código
2. Prueba los cambios en un entorno de desarrollo
3. Despliega los cambios siguiendo los mismos pasos que en el despliegue inicial
4. Para servidores con PM2:
   ```
   git pull
   npm install
   pm2 restart dreamai-backend
   ```

### Actualizaciones de la Aplicación iOS

1. Incrementa el número de versión en `app.json`:
   ```json
   {
     "expo": {
       "version": "1.0.1",
       "ios": {
         "buildNumber": "2"
       }
     }
   }
   ```

2. Realiza los cambios en el código
3. Genera una nueva compilación siguiendo los pasos anteriores
4. Envía la actualización a App Store Connect
5. Completa la información de la nueva versión
6. Envía para revisión

## Solución de Problemas

### Problemas Comunes del Backend

1. **Error de conexión a la base de datos**:
   - Verifica las credenciales de Supabase
   - Comprueba que la IP del servidor no esté bloqueada

2. **Error en la API de DeepSeek**:
   - Verifica la clave API
   - Comprueba los límites de uso de la API

3. **El servidor se cierra inesperadamente**:
   - Revisa los logs con `pm2 logs dreamai-backend`
   - Aumenta la memoria asignada si es necesario

### Problemas Comunes de la Aplicación iOS

1. **Errores de compilación**:
   - Actualiza Cocoapods: `pod update`
   - Limpia el proyecto: Product > Clean Build Folder

2. **Rechazo en App Store**:
   - Revisa las directrices de revisión de Apple
   - Asegúrate de que la política de privacidad esté actualizada
   - Verifica que todas las funcionalidades funcionen correctamente

3. **Problemas de conexión con el backend**:
   - Verifica que la URL del backend sea correcta
   - Comprueba que los certificados SSL sean válidos
