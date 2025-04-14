# Arquitectura de la Aplicación DreamAI

## Visión General

DreamAI es una aplicación móvil iOS-first diseñada para el registro, análisis emocional e interpretación simbólica de sueños personales utilizando inteligencia artificial. La aplicación sigue un modelo freemium con funcionalidades básicas gratuitas y características avanzadas de pago.

## Arquitectura Técnica

### Frontend (React Native/Expo)

La aplicación está desarrollada utilizando React Native con Expo, lo que permite un desarrollo rápido y una experiencia nativa en dispositivos iOS, con la posibilidad de expandirse a Android en el futuro.

#### Estructura de Carpetas

```
frontend/
├── assets/              # Imágenes, fuentes y otros recursos estáticos
├── components/          # Componentes reutilizables
│   ├── common/          # Botones, inputs, tarjetas, etc.
│   ├── dreams/          # Componentes específicos para sueños
│   ├── analysis/        # Componentes para visualizaciones y análisis
│   └── subscription/    # Componentes relacionados con suscripciones
├── navigation/          # Configuración de navegación
├── screens/             # Pantallas principales de la aplicación
│   ├── auth/            # Pantallas de autenticación
│   ├── onboarding/      # Pantallas de introducción
│   ├── dreams/          # Pantallas de registro y visualización de sueños
│   ├── analysis/        # Pantallas de análisis y patrones
│   ├── chat/            # Chat con "analista onírico" IA
│   └── settings/        # Configuración y perfil
├── services/            # Servicios para comunicación con API y procesamiento
│   ├── api/             # Cliente API para backend
│   ├── auth/            # Servicios de autenticación
│   ├── dreamAnalysis/   # Servicios para análisis de sueños
│   └── subscription/    # Gestión de suscripciones
├── utils/               # Utilidades y helpers
├── hooks/               # Custom hooks de React
├── context/             # Contextos de React (estado global)
└── theme/               # Configuración de temas y estilos
```

### Backend (Node.js/Express)

El backend proporciona una API RESTful para la comunicación con el frontend y gestiona la integración con servicios externos como la IA para interpretación de sueños.

#### Estructura de Carpetas

```
backend/
├── config/              # Configuración de la aplicación
├── controllers/         # Controladores para manejar solicitudes
├── middleware/          # Middleware para autenticación, validación, etc.
├── models/              # Modelos de datos
├── routes/              # Definición de rutas API
├── services/            # Servicios para lógica de negocio
│   ├── ai/              # Servicios de integración con IA
│   ├── auth/            # Servicios de autenticación
│   └── payment/         # Servicios de pago
├── utils/               # Utilidades y helpers
└── app.js               # Punto de entrada de la aplicación
```

### Base de Datos (Supabase)

Utilizaremos Supabase como plataforma de base de datos y autenticación, proporcionando una solución completa para almacenamiento de datos, autenticación de usuarios y almacenamiento de archivos.

#### Estructura de Datos

```
- users                  # Información de usuarios
- dreams                 # Registros de sueños
- dream_analyses         # Análisis e interpretaciones de sueños
- dream_tags             # Etiquetas asociadas a sueños
- dream_emotions         # Emociones detectadas en sueños
- subscriptions          # Información de suscripciones
```

## Flujo de Datos

1. El usuario registra un sueño a través de la aplicación (texto, audio o imagen).
2. La aplicación procesa la entrada (convierte audio/imagen a texto si es necesario).
3. El backend envía el texto al servicio de IA con prompts personalizados.
4. La IA genera una interpretación y análisis emocional.
5. El backend almacena el sueño y su análisis en la base de datos.
6. La aplicación muestra la interpretación al usuario y actualiza las visualizaciones.

## Integración con IA

La aplicación utiliza modelos de lenguaje avanzados para:

1. Interpretar el contenido simbólico de los sueños.
2. Identificar patrones emocionales y símbolos recurrentes.
3. Proporcionar un chat contextual como "analista onírico".

## Sistema de Suscripción

El modelo freemium incluye:

### Funcionalidades Gratuitas
- Registro de un sueño diario
- Interpretación básica
- Etiquetas y emociones automáticas
- Calendario y historial básico

### Funcionalidades Premium
- Interpretaciones extendidas
- Análisis semanal y mensual con visualizaciones
- Chat IA contextual
- Exportación de datos
- Modo privado con protección adicional
- Simbología personalizada

## Consideraciones de Seguridad y Privacidad

- Autenticación segura de usuarios
- Encriptación de datos sensibles
- Cumplimiento con buenas prácticas de privacidad
- Sin compartir datos con terceros
- Disclaimer claro sobre el carácter no médico de la aplicación
