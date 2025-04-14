# Wireframes y Maquetas UI/UX para DreamAI

## Visión General del Diseño

DreamAI presenta un diseño minimalista, emocional e introspectivo, optimizado para dispositivos iOS. La paleta de colores se basa en tonos nocturnos (azules profundos, púrpuras y negros) con acentos brillantes para representar la naturaleza onírica de la aplicación.

## Principios de Diseño

- **Minimalismo emocional**: Interfaces limpias con elementos visuales que evocan emociones
- **Navegación intuitiva**: Flujos de usuario simples y predecibles
- **Viralidad incorporada**: Elementos compartibles diseñados para redes sociales
- **Accesibilidad**: Contraste adecuado, tamaños de texto legibles y soporte para VoiceOver
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla de iPhone

## Wireframes de Pantallas Principales

### 1. Onboarding y Registro

```
┌─────────────────────────┐
│                         │
│       [Logo DreamAI]    │
│                         │
│   "Descubre el mundo    │
│    de tus sueños"       │
│                         │
│   [Botón: Comenzar]     │
│                         │
│   [Botón: Iniciar       │
│    sesión]              │
│                         │
└─────────────────────────┘

┌─────────────────────────┐
│                         │
│   Registro              │
│                         │
│   [Campo: Email]        │
│                         │
│   [Campo: Contraseña]   │
│                         │
│   [Botón: Registrarse]  │
│                         │
│   "O continuar con:"    │
│                         │
│   [Botón: Apple]        │
│   [Botón: Google]       │
│                         │
└─────────────────────────┘
```

### 2. Dashboard Principal

```
┌─────────────────────────┐
│ DreamAI       [Perfil]  │
├─────────────────────────┤
│                         │
│   [Tarjeta del día]     │
│   "Tu símbolo de hoy"   │
│                         │
│   [Gráfico: Emociones   │
│    recientes]           │
│                         │
│   [Último sueño         │
│    registrado]          │
│                         │
│   [Patrones detectados] │
│                         │
├─────────────────────────┤
│ [Home] [+] [Calendario] │
└─────────────────────────┘
```

### 3. Registro de Sueños

```
┌─────────────────────────┐
│ Nuevo Sueño    [Cerrar] │
├─────────────────────────┤
│                         │
│   [Fecha: Hoy]          │
│                         │
│   [Opciones de entrada] │
│   [Texto] [Audio] [Foto]│
│                         │
│   [Campo de texto       │
│    multilinea:          │
│    "Describe tu sueño...│
│    "]                   │
│                         │
│   [Botón: Guardar]      │
│                         │
└─────────────────────────┘
```

### 4. Visualización de Interpretación

```
┌─────────────────────────┐
│ Interpretación [Guardar]│
├─────────────────────────┤
│                         │
│   [Fecha y hora]        │
│                         │
│   "Tu sueño:"           │
│   [Texto del sueño      │
│    resumido]            │
│                         │
│   "Interpretación:"     │
│   [Análisis básico]     │
│                         │
│   [Emociones detectadas]│
│   [Alegría] [Miedo] ... │
│                         │
│   [Símbolos principales]│
│                         │
│   [Botón: Análisis      │
│    completo (Premium)]  │
│                         │
└─────────────────────────┘
```

### 5. Calendario y Historial

```
┌─────────────────────────┐
│ Calendario     [Filtro] │
├─────────────────────────┤
│                         │
│   [Vista de calendario  │
│    mensual con días     │
│    marcados donde hay   │
│    sueños registrados]  │
│                         │
│   [Lista de sueños      │
│    recientes]           │
│                         │
│   - [Fecha] [Emoción]   │
│     [Título/Símbolo]    │
│                         │
│   - [Fecha] [Emoción]   │
│     [Título/Símbolo]    │
│                         │
└─────────────────────────┘
```

### 6. Chat con Analista Onírico (Premium)

```
┌─────────────────────────┐
│ Analista Onírico        │
├─────────────────────────┤
│                         │
│   [Burbuja: "Hola,      │
│    soy tu analista      │
│    onírico. ¿En qué     │
│    puedo ayudarte?"]    │
│                         │
│   [Burbuja: Usuario]    │
│                         │
│   [Burbuja: Analista]   │
│                         │
│                         │
│                         │
│                         │
├─────────────────────────┤
│ [Campo: Mensaje]  [Enviar]│
└─────────────────────────┘
```

### 7. Visualizaciones y Patrones (Premium)

```
┌─────────────────────────┐
│ Patrones       [Periodo]│
├─────────────────────────┤
│                         │
│   [Gráfico circular:    │
│    Emociones dominantes]│
│                         │
│   [Gráfico de línea:    │
│    Evolución emocional] │
│                         │
│   [Nube de símbolos     │
│    recurrentes]         │
│                         │
│   [Lista de patrones    │
│    detectados con       │
│    explicaciones]       │
│                         │
└─────────────────────────┘
```

### 8. Configuración y Perfil

```
┌─────────────────────────┐
│ Perfil         [Editar] │
├─────────────────────────┤
│                         │
│   [Foto/Avatar]         │
│   [Nombre de usuario]   │
│                         │
│   [Estado de suscripción]│
│                         │
│   [Configuración]       │
│   - Notificaciones      │
│   - Privacidad          │
│   - Modo oscuro/claro   │
│   - Exportar datos      │
│                         │
│   [Gestionar suscripción]│
│                         │
│   [Cerrar sesión]       │
│                         │
└─────────────────────────┘
```

## Elementos de Diseño Clave

### Tarjetas Compartibles

Las tarjetas compartibles son elementos diseñados específicamente para ser viralizados en redes sociales como TikTok e Instagram:

```
┌─────────────────────────┐
│                         │
│     [Logo DreamAI]      │
│                         │
│  "Símbolo del día"      │
│                         │
│  [Ilustración simbólica]│
│                         │
│  "Significado breve"    │
│                         │
│  #DreamAI #Sueños       │
│                         │
└─────────────────────────┘
```

### Paleta de Colores

- **Primario**: Azul profundo (#1A237E)
- **Secundario**: Púrpura onírico (#7B1FA2)
- **Acento**: Turquesa brillante (#00BCD4)
- **Fondo**: Negro/Azul muy oscuro (#121212)
- **Texto**: Blanco (#FFFFFF) y gris claro (#E0E0E0)
- **Emociones**: 
  - Alegría: Amarillo (#FFC107)
  - Miedo: Rojo (#F44336)
  - Tristeza: Azul (#2196F3)
  - Confusión: Púrpura (#9C27B0)
  - Paz: Verde (#4CAF50)

### Tipografía

- **Títulos**: SF Pro Display (Bold)
- **Cuerpo de texto**: SF Pro Text (Regular)
- **Acentos y elementos especiales**: SF Pro Display (Light Italic)

## Componentes Reutilizables

### Botones

```
┌─────────────────────────┐
│ [Botón primario]        │
│ [Botón secundario]      │
│ [Botón terciario]       │
└─────────────────────────┘
```

### Tarjetas de Sueño

```
┌─────────────────────────┐
│ [Fecha]      [Emoción]  │
│                         │
│ [Fragmento del sueño]   │
│                         │
│ [Símbolo principal]     │
└─────────────────────────┘
```

### Indicadores de Emoción

```
┌─────────────────────────┐
│ [●] Alegría  [●] Miedo  │
│ [●] Tristeza [●] Paz    │
└─────────────────────────┘
```

## Consideraciones de Accesibilidad

- Contraste de color que cumple con WCAG 2.1 AA
- Tamaños de texto ajustables
- Soporte para VoiceOver
- Etiquetas de accesibilidad en todos los elementos interactivos
- Navegación con teclado para usuarios de Switch Control

## Animaciones y Transiciones

- Transiciones suaves entre pantallas
- Animaciones sutiles para elementos de carga
- Efectos visuales para representar estados oníricos
- Microinteracciones en elementos interactivos

## Próximos Pasos

1. Crear maquetas de alta fidelidad en Figma
2. Desarrollar componentes React Native basados en estos wireframes
3. Implementar navegación entre pantallas
4. Crear prototipos interactivos para pruebas de usabilidad
