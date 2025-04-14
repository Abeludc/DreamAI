// Definición del esquema de la base de datos para Supabase

/*
Tablas principales:
1. users - Información de usuarios
2. dreams - Registros de sueños
3. dream_analyses - Análisis e interpretaciones de sueños
4. dream_tags - Etiquetas asociadas a sueños
5. dream_emotions - Emociones detectadas en sueños
6. subscriptions - Información de suscripciones
*/

const databaseSchema = {
  // Tabla de usuarios
  users: `
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    password text not null,
    name text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    subscription_status text default 'free',
    subscription_end_date timestamp with time zone,
    last_login timestamp with time zone
  `,

  // Tabla de sueños
  dreams: `
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade not null,
    content text not null,
    dream_date timestamp with time zone default now(),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    input_type text default 'text',
    is_private boolean default false
  `,

  // Tabla de análisis de sueños
  dream_analyses: `
    id uuid primary key default uuid_generate_v4(),
    dream_id uuid references dreams(id) on delete cascade not null,
    interpretation text not null,
    main_symbol text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    is_premium boolean default false
  `,

  // Tabla de etiquetas de sueños
  dream_tags: `
    id uuid primary key default uuid_generate_v4(),
    dream_id uuid references dreams(id) on delete cascade not null,
    tag text not null,
    created_at timestamp with time zone default now()
  `,

  // Tabla de emociones de sueños
  dream_emotions: `
    id uuid primary key default uuid_generate_v4(),
    dream_id uuid references dreams(id) on delete cascade not null,
    emotion text not null,
    intensity integer default 5,
    created_at timestamp with time zone default now()
  `,

  // Tabla de suscripciones
  subscriptions: `
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade not null,
    stripe_customer_id text,
    stripe_subscription_id text,
    status text not null,
    plan_type text not null,
    current_period_start timestamp with time zone,
    current_period_end timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
  `,

  // Tabla de conversaciones con el analista onírico
  chat_conversations: `
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
  `,

  // Tabla de mensajes de chat
  chat_messages: `
    id uuid primary key default uuid_generate_v4(),
    conversation_id uuid references chat_conversations(id) on delete cascade not null,
    sender text not null,
    content text not null,
    created_at timestamp with time zone default now()
  `
};

module.exports = databaseSchema;
