# Documentación Técnica - DreamAI

## Índice
1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Frontend (React Native/Expo)](#frontend-react-nativeexpo)
4. [Backend (Node.js/Express)](#backend-nodejsexpress)
5. [Base de Datos (Supabase)](#base-de-datos-supabase)
6. [Integración con IA (DeepSeek)](#integración-con-ia-deepseek)
7. [Sistema de Suscripción](#sistema-de-suscripción)
8. [Seguridad](#seguridad)
9. [Escalabilidad](#escalabilidad)
10. [Pruebas](#pruebas)

## Introducción

DreamAI es una aplicación móvil iOS para el registro, análisis emocional e interpretación de sueños mediante inteligencia artificial. Esta documentación técnica proporciona una visión detallada de la arquitectura y componentes del sistema para desarrolladores y administradores técnicos.

## Arquitectura del Sistema

DreamAI sigue una arquitectura cliente-servidor con los siguientes componentes principales:

- **Frontend**: Aplicación móvil desarrollada con React Native/Expo
- **Backend**: API RESTful desarrollada con Node.js/Express
- **Base de Datos**: Supabase (PostgreSQL)
- **Servicios de IA**: Integración con la API de DeepSeek para interpretación de sueños
- **Autenticación**: Sistema JWT con almacenamiento seguro de tokens

### Diagrama de Arquitectura

```
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|  Cliente iOS   |<--->|  API Backend   |<--->|    Supabase    |
|  React Native  |     |  Node.js/Express|     |  (PostgreSQL)  |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+
                              ^
                              |
                              v
                       +----------------+
                       |                |
                       |   DeepSeek AI  |
                       |     API        |
                       |                |
                       +----------------+
```

## Frontend (React Native/Expo)

### Estructura de Directorios

```
frontend/dreamai-app/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── common/       # Componentes UI básicos
│   │   ├── dreams/       # Componentes específicos de sueños
│   │   └── visualizations/ # Componentes de visualización
│   ├── screens/          # Pantallas de la aplicación
│   │   ├── onboarding/   # Pantallas de introducción
│   │   ├── auth/         # Pantallas de autenticación
│   │   ├── dreams/       # Pantallas de gestión de sueños
│   │   ├── analysis/     # Pantallas de análisis
│   │   ├── chat/         # Pantallas de chat
│   │   └── settings/     # Pantallas de configuración
│   ├── navigation/       # Configuración de navegación
│   ├── services/         # Servicios de API
│   ├── utils/            # Utilidades
│   ├── theme/            # Estilos y temas
│   └── config/           # Configuración
├── assets/               # Recursos estáticos
└── app.json              # Configuración de Expo
```

### Componentes Principales

#### Componentes Comunes
- **Button.js**: Botón personalizado con diferentes variantes
- **Input.js**: Campo de entrada de texto personalizado
- **Card.js**: Contenedor con estilo de tarjeta

#### Componentes de Sueños
- **DreamCard.js**: Tarjeta para mostrar un sueño
- **EmotionIndicator.js**: Indicador visual de emociones

#### Componentes de Visualización
- **EmotionVisualization.js**: Gráficos de distribución e intensidad emocional
- **PatternVisualization.js**: Visualización de patrones de sueños
- **DreamStatistics.js**: Estadísticas generales de sueños

### Pantallas Principales

- **OnboardingScreen.js**: Introducción a la aplicación
- **LoginScreen.js** y **RegisterScreen.js**: Autenticación
- **HomeScreen.js**: Dashboard principal
- **DreamFormScreen.js**: Formulario para registrar sueños
- **DreamInterpretationScreen.js**: Visualización de interpretaciones
- **CalendarScreen.js**: Calendario de sueños
- **AnalysisScreen.js**: Visualizaciones y análisis
- **ChatScreen.js**: Chat con analista onírico
- **SettingsScreen.js**: Configuración de la aplicación

### Navegación

La navegación se implementa utilizando React Navigation con una combinación de:
- Stack Navigator para flujos secuenciales
- Tab Navigator para la navegación principal
- Drawer Navigator para opciones adicionales

### Gestión de Estado

- Uso de Context API para estado global
- Hooks personalizados para lógica reutilizable
- Almacenamiento local con AsyncStorage para persistencia

## Backend (Node.js/Express)

### Estructura de Directorios

```
backend/
├── src/
│   ├── config/           # Configuración
│   ├── controllers/      # Controladores de rutas
│   ├── db/               # Configuración y modelos de base de datos
│   ├── middleware/       # Middleware personalizado
│   ├── routes/           # Definición de rutas
│   ├── services/         # Servicios de negocio
│   └── utils/            # Utilidades
└── server.js             # Punto de entrada
```

### Componentes Principales

#### Controladores
- **authController.js**: Gestión de autenticación
- **dreamController.js**: Operaciones CRUD para sueños
- **aiController.js**: Integración con IA para interpretaciones
- **chatController.js**: Gestión de conversaciones
- **subscriptionController.js**: Gestión de suscripciones
- **featureController.js**: Control de acceso a características

#### Middleware
- **auth.js**: Verificación de autenticación
- **subscription.js**: Verificación de suscripción premium

#### Servicios
- **aiService.js**: Integración con DeepSeek
- **subscriptionService.js**: Gestión de suscripciones
- **featureService.js**: Definición de características por plan

### API Endpoints

#### Autenticación
- `POST /api/auth/register`: Registro de usuario
- `POST /api/auth/login`: Inicio de sesión
- `POST /api/auth/refresh`: Renovación de token
- `GET /api/auth/me`: Información del usuario actual

#### Sueños
- `GET /api/dreams`: Listar sueños del usuario
- `POST /api/dreams`: Crear nuevo sueño
- `GET /api/dreams/:id`: Obtener sueño específico
- `PUT /api/dreams/:id`: Actualizar sueño
- `DELETE /api/dreams/:id`: Eliminar sueño

#### IA
- `POST /api/ai/dreams/:dreamId/interpret`: Interpretar sueño
- `POST /api/ai/dreams/:dreamId/emotions`: Analizar emociones
- `POST /api/ai/dreams/patterns`: Analizar patrones
- `POST /api/ai/process/audio`: Procesar audio a texto
- `POST /api/ai/process/image`: Procesar imagen a texto
- `POST /api/ai/analyst/response`: Generar respuesta del analista

#### Chat
- `POST /api/chat`: Crear conversación
- `GET /api/chat`: Listar conversaciones
- `GET /api/chat/:conversationId`: Obtener conversación
- `POST /api/chat/:conversationId/messages`: Enviar mensaje

#### Suscripciones
- `GET /api/subscriptions`: Obtener suscripción del usuario
- `POST /api/subscriptions`: Crear suscripción
- `POST /api/subscriptions/cancel`: Cancelar suscripción
- `GET /api/subscriptions/plans`: Obtener planes disponibles
- `POST /api/subscriptions/checkout`: Crear sesión de checkout
- `GET /api/subscriptions/premium-access`: Verificar acceso premium

#### Características
- `GET /api/features`: Listar características disponibles
- `GET /api/features/:featureKey`: Verificar disponibilidad de característica

## Base de Datos (Supabase)

### Esquema de Base de Datos

#### Tablas Principales

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  subscription_status TEXT DEFAULT 'free',
  subscription_end_date TIMESTAMP WITH TIME ZONE
);
```

**dreams**
```sql
CREATE TABLE dreams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  dream_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration INTEGER,
  is_lucid BOOLEAN DEFAULT FALSE
);
```

**dream_analyses**
```sql
CREATE TABLE dream_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dream_id UUID REFERENCES dreams(id) ON DELETE CASCADE,
  interpretation TEXT NOT NULL,
  main_symbol TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_premium BOOLEAN DEFAULT FALSE
);
```

**dream_emotions**
```sql
CREATE TABLE dream_emotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dream_id UUID REFERENCES dreams(id) ON DELETE CASCADE,
  emotion TEXT NOT NULL,
  intensity INTEGER CHECK (intensity BETWEEN 1 AND 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**dream_tags**
```sql
CREATE TABLE dream_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dream_id UUID REFERENCES dreams(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**conversations**
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**messages**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**subscriptions**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Índices

```sql
CREATE INDEX idx_dreams_user_id ON dreams(user_id);
CREATE INDEX idx_dreams_dream_date ON dreams(dream_date);
CREATE INDEX idx_dream_analyses_dream_id ON dream_analyses(dream_id);
CREATE INDEX idx_dream_emotions_dream_id ON dream_emotions(dream_id);
CREATE INDEX idx_dream_tags_dream_id ON dream_tags(dream_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

### Políticas de Seguridad

Supabase permite definir políticas de seguridad a nivel de fila (RLS):

```sql
-- Ejemplo para la tabla dreams
CREATE POLICY "Users can only access their own dreams"
ON dreams
FOR ALL
USING (auth.uid() = user_id);
```

## Integración con IA (DeepSeek)

### Configuración

La integración con DeepSeek se realiza a través de su API REST:

```javascript
const deepseekClient = axios.create({
  baseURL: 'https://api.deepseek.com',
  headers: {
    'Authorization': `Bearer ${config.AI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});
```

### Prompts Personalizados

Se han diseñado prompts específicos para diferentes tipos de análisis:

- **Interpretación básica**: Análisis general del sueño
- **Análisis emocional**: Identificación de emociones y su intensidad
- **Análisis de patrones**: Identificación de símbolos y temas recurrentes
- **Chat con analista onírico**: Conversación contextual sobre sueños

### Funciones Principales

- **interpretDream()**: Genera una interpretación completa de un sueño
- **analyzeDreamEmotions()**: Analiza las emociones presentes en un sueño
- **analyzeDreamPatterns()**: Identifica patrones en múltiples sueños
- **generateDreamAnalystResponse()**: Genera respuestas para el chat

### Manejo de Respuestas

Las respuestas de la API se procesan para extraer la información relevante:

```javascript
// Extraer y parsear la respuesta
const content = response.data.choices[0].message.content;

// Intentar parsear el JSON, si falla, extraer la parte JSON de la respuesta
try {
  return JSON.parse(content);
} catch (parseError) {
  // Buscar contenido JSON en la respuesta
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error('No se pudo extraer un JSON válido de la respuesta');
}
```

## Sistema de Suscripción

### Modelo Freemium

DreamAI implementa un modelo freemium con dos niveles:

#### Plan Gratuito
- Registro básico de sueños (hasta 100)
- Interpretaciones básicas (3 por mes)
- Análisis emocional básico (3 por mes)
- Chat limitado (3 mensajes por conversación)
- Calendario de sueños

#### Plan Premium
- Interpretaciones extendidas ilimitadas
- Análisis emocional detallado
- Análisis de patrones recurrentes
- Chat ilimitado con analista onírico
- Visualizaciones avanzadas
- Exportación de informes
- Modo privado (FaceID/PIN)
- Simbología personalizada

### Implementación

El sistema de suscripción se implementa mediante:

1. **Servicio de suscripción**: Simula la integración con Stripe
2. **Middleware de verificación**: Comprueba el acceso a funcionalidades premium
3. **Servicio de características**: Define qué está disponible en cada plan

### Verificación de Acceso Premium

```javascript
// Middleware para verificar si una ruta requiere acceso premium
const premiumFeatureMiddleware = async (req, res, next) => {
  try {
    // Verificar si el usuario tiene acceso premium
    const premiumAccess = await checkPremiumAccess(req.user.id);
    
    // Almacenar información de acceso premium en la request
    req.premiumAccess = premiumAccess;
    
    // Si la ruta requiere acceso premium y el usuario no lo tiene, devolver error
    if (req.requiresPremium && !premiumAccess.isPremium) {
      return res.status(403).json({
        error: 'Esta funcionalidad requiere una suscripción premium',
        isPremiumRequired: true,
        subscriptionStatus: premiumAccess.subscriptionStatus
      });
    }
    
    next();
  } catch (error) {
    console.error('Error al verificar acceso premium:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
```

## Seguridad

### Autenticación

- **JWT (JSON Web Tokens)**: Para autenticación de usuarios
- **Bcrypt**: Para hash seguro de contraseñas
- **Refresh Tokens**: Para renovación segura de sesiones

### Protección de Datos

- **HTTPS**: Toda la comunicación se realiza a través de HTTPS
- **Encriptación**: Datos sensibles encriptados en la base de datos
- **Sanitización**: Validación y sanitización de todas las entradas de usuario

### Mejores Prácticas

- **Rate Limiting**: Limitación de solicitudes para prevenir ataques de fuerza bruta
- **CORS**: Configuración adecuada de Cross-Origin Resource Sharing
- **Helmet**: Middleware para establecer cabeceras HTTP seguras
- **Validación**: Validación estricta de todos los datos de entrada

## Escalabilidad

### Estrategias de Escalabilidad

- **Arquitectura Modular**: Facilita la escalabilidad horizontal
- **Caché**: Implementación de caché para reducir carga en la base de datos
- **Optimización de Consultas**: Índices y consultas optimizadas
- **Procesamiento Asíncrono**: Para tareas intensivas como interpretaciones de IA

### Consideraciones para Alta Carga

- **Balanceo de Carga**: Distribución de tráfico entre múltiples instancias
- **Bases de Datos Replicadas**: Para alta disponibilidad y rendimiento
- **Microservicios**: Posibilidad de migrar a una arquitectura de microservicios
- **CDN**: Uso de redes de distribución de contenido para recursos estáticos

## Pruebas

### Tipos de Pruebas

- **Pruebas Unitarias**: Para componentes individuales
- **Pruebas de Integración**: Para interacciones entre componentes
- **Pruebas de API**: Para verificar endpoints
- **Pruebas de UI**: Para la interfaz de usuario
- **Pruebas de Rendimiento**: Para verificar la escalabilidad

### Herramientas

- **Jest**: Framework principal de pruebas
- **React Testing Library**: Para pruebas de componentes React
- **Supertest**: Para pruebas de API
- **Cypress**: Para pruebas end-to-end
- **k6**: Para pruebas de carga

### Estrategia de Pruebas

- **CI/CD**: Integración con sistemas de integración continua
- **Cobertura de Código**: Objetivo de cobertura superior al 80%
- **Pruebas Automatizadas**: Ejecución automática en cada commit
- **Pruebas Manuales**: Para flujos críticos y experiencia de usuario
