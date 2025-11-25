# Jerarquía de Contenido del Sistema

Este documento explica la estructura jerárquica implementada para organizar el contenido narrativo del juego.

## 📚 Estructura Jerárquica

```
Franchise (Franquicia)
  └── Book (Libro/Volumen)
      └── Chapter (Capítulo)
          └── StoryStage (Etapa de Historia/Escena)
              └── Decisions & Branches (Decisiones y Ramas)
```

## 🎯 Entidades

### 1. Franchise (Franquicia)
**Propósito**: Representa una franquicia o saga completa de historias.

**Ejemplos**:
- Harry Potter
- Star Wars
- El Señor de los Anillos
- Mi Historia Original

**Atributos principales**:
- `franchise_id`: Identificador único
- `name`: Nombre de la franquicia
- `description`: Descripción general
- `author`: Autor/creador
- `genre`: Géneros (Fantasy, Sci-Fi, etc.)
- `cover_image`: Imagen de portada
- `is_active`: Estado activo/inactivo

### 2. Book (Libro/Volumen)
**Propósito**: Representa un libro o volumen específico dentro de una franquicia.

**Ejemplos**:
- Harry Potter y la Piedra Filosofal
- Harry Potter y la Cámara Secreta
- Star Wars: Episodio IV

**Atributos principales**:
- `book_id`: Identificador único
- `franchise_id`: Referencia a la franquicia padre
- `title`: Título del libro
- `description`: Descripción del libro
- `volume_number`: Número del volumen en la serie
- `cover_image`: Imagen de portada
- `is_published`: Estado de publicación
- `estimated_duration`: Duración estimada en minutos

### 3. Chapter (Capítulo)
**Propósito**: Representa un capítulo dentro de un libro.

**Ejemplos**:
- Capítulo 1: El Niño que Sobrevivió
- Capítulo 2: El Vidrio que se Esfumó
- Capítulo 3: Las Cartas de Nadie

**Atributos principales**:
- `chapter_id`: Identificador único
- `book_id`: Referencia al libro padre
- `title`: Título del capítulo
- `description`: Descripción del capítulo
- `chapter_number`: Número del capítulo
- `is_unlocked_by_default`: Si está desbloqueado por defecto
- `unlock_requirements`: Requisitos para desbloquear
  - `previous_chapter_id`: Capítulo previo requerido
  - `required_canonical_events`: Eventos canónicos necesarios
  - `required_attributes`: Atributos mínimos del jugador

### 4. StoryStage (Etapa de Historia)
**Propósito**: Representa una escena o momento específico dentro de un capítulo.

**Ejemplos**:
- Escena 1: Harry despierta en el armario
- Escena 2: Llega la carta de Hogwarts
- Escena 3: Los Dursley intentan huir

**Atributos principales**:
- `id`: Identificador único
- `chapter_id`: Referencia al capítulo padre
- `name`: Nombre interno de la etapa
- `scene`: Identificador de la escena
- `title`: Título de la etapa
- `sub_title`: Subtítulo
- `image`: Imagen de la escena
- `text`: Texto narrativo
- `question`: Pregunta/decisión para el jugador
- `stage_order`: Orden dentro del capítulo
- `is_canonical_progress`: Si marca progreso canónico
- `canonical_event`: Evento canónico asociado

## 🔄 Flujo de Uso

### Creación de Contenido

1. **Crear Franquicia**
```bash
POST /franchise
{
  "franchise_id": "harry_potter",
  "name": "Harry Potter",
  "description": "La saga mágica de Harry Potter",
  "author": "J.K. Rowling",
  "genre": ["Fantasy", "Adventure", "Magic"],
  "is_active": true
}
```

2. **Crear Libro**
```bash
POST /book
{
  "book_id": "hp_philosophers_stone",
  "franchise_id": "harry_potter",
  "title": "Harry Potter y la Piedra Filosofal",
  "description": "El primer año de Harry en Hogwarts",
  "volume_number": 1,
  "is_published": true,
  "estimated_duration": 480
}
```

3. **Crear Capítulo**
```bash
POST /chapter
{
  "chapter_id": "hp1_ch1",
  "book_id": "hp_philosophers_stone",
  "title": "El Niño que Sobrevivió",
  "description": "La llegada de Harry a Privet Drive",
  "chapter_number": 1,
  "is_unlocked_by_default": true
}
```

4. **Crear Story Stages**
```bash
POST /story-stage
{
  "chapter_id": "hp1_ch1",
  "name": "Escena 1",
  "title": "Una noche tormentosa",
  "text": "Era una noche oscura y tormentosa...",
  "stage_order": 1
}
```

### Consulta de Contenido

1. **Ver todas las franquicias**
```bash
GET /franchise
```

2. **Ver libros de una franquicia**
```bash
GET /book/franchise/harry_potter
```

3. **Ver capítulos de un libro**
```bash
GET /chapter/book/hp_philosophers_stone
```

4. **Ver etapas de un capítulo**
```bash
GET /story-stage/chapter/hp1_ch1
```

## 🎮 Progresión del Jugador

El sistema permite:

1. **Desbloqueo Progresivo**: Los capítulos pueden requerir completar capítulos anteriores
2. **Requisitos de Atributos**: Ciertos capítulos pueden requerir atributos específicos del jugador
3. **Eventos Canónicos**: Story stages pueden desbloquear eventos importantes en la historia
4. **Decisiones Ramificadas**: Cada stage puede contener decisiones que afectan la narrativa

## 📊 Ejemplo Completo: Harry Potter

```
Franchise: Harry Potter
  ├── Book 1: La Piedra Filosofal
  │   ├── Capítulo 1: El Niño que Sobrevivió
  │   │   ├── Stage 1: La llegada de Dumbledore
  │   │   ├── Stage 2: El bebé en la puerta
  │   │   └── Stage 3: La cicatriz
  │   ├── Capítulo 2: El Vidrio que se Esfumó
  │   │   ├── Stage 1: El zoológico
  │   │   ├── Stage 2: La serpiente
  │   │   └── Stage 3: El castigo
  │   └── ...
  ├── Book 2: La Cámara Secreta
  │   └── ...
  └── Book 7: Las Reliquias de la Muerte
      └── ...
```

## 🛠️ Arquitectura Técnica

Cada nivel sigue la **Arquitectura Hexagonal**:

```
domain/
  ├── franchise/franchise.entity.ts
  ├── book/book.entity.ts
  ├── chapter/chapter.entity.ts
  └── story/story-stage.entity.ts

application/
  ├── franchise/
  │   ├── ports/franchise.repository.ts
  │   └── use-cases/
  ├── book/
  │   ├── ports/book.repository.ts
  │   └── use-cases/
  └── chapter/
      ├── ports/chapter.repository.ts
      └── use-cases/

infrastructure/
  ├── franchise/
  │   ├── schemas/franchise.schema.ts
  │   ├── repositories/mongoose-franchise.repository.ts
  │   ├── controllers/franchise.controller.ts
  │   └── franchise.module.ts
  └── ...
```

## 🚀 Beneficios de esta Estructura

1. **Organización Clara**: Contenido organizado en niveles lógicos
2. **Escalabilidad**: Fácil agregar nuevas franquicias y contenido
3. **Reutilización**: Una franquicia puede tener múltiples libros
4. **Flexibilidad**: Sistema de desbloqueo configurable por capítulo
5. **SEO/Marketing**: Fácil categorizar y promover por franquicia
6. **Analytics**: Métricas por franquicia, libro y capítulo
7. **Multitenancy**: Soporte para múltiples franquicias en el mismo sistema

## 📝 Notas Importantes

- Los IDs deben ser únicos y descriptivos (ej: `harry_potter`, `hp_philosophers_stone`)
- Los números de volumen y capítulo deben ser secuenciales
- Las imágenes de portada mejoran la experiencia del usuario
- Los requisitos de desbloqueo son opcionales pero recomendados para progresión
- El `stage_order` define el orden de las escenas dentro de un capítulo
