# 🎮 Guía Rápida - Sistema Jerárquico de Contenido

## 🚀 Inicio Rápido

### 1. Levantar MongoDB
```bash
docker compose up -d
```

### 2. Iniciar el Servidor
```bash
npm run start:dev
```

El servidor estará disponible en: `http://localhost:3000`

## 📖 Crear Contenido Paso a Paso

### Paso 1: Crear una Franquicia

```bash
curl -X POST http://localhost:3000/franchise \
  -H "Content-Type: application/json" \
  -d '{
    "franchise_id": "harry_potter",
    "name": "Harry Potter",
    "description": "La saga mágica de Harry Potter en Hogwarts",
    "author": "J.K. Rowling",
    "genre": ["Fantasy", "Adventure", "Magic"],
    "cover_image": "https://example.com/hp-cover.jpg",
    "is_active": true
  }'
```

### Paso 2: Crear un Libro

```bash
curl -X POST http://localhost:3000/book \
  -H "Content-Type: application/json" \
  -d '{
    "book_id": "hp_philosophers_stone",
    "franchise_id": "harry_potter",
    "title": "Harry Potter y la Piedra Filosofal",
    "description": "El primer año de Harry en Hogwarts",
    "volume_number": 1,
    "cover_image": "https://example.com/hp1-cover.jpg",
    "is_published": true,
    "estimated_duration": 480
  }'
```

### Paso 3: Crear un Capítulo

```bash
curl -X POST http://localhost:3000/chapter \
  -H "Content-Type: application/json" \
  -d '{
    "chapter_id": "hp1_ch1",
    "book_id": "hp_philosophers_stone",
    "title": "El Niño que Sobrevivió",
    "description": "La llegada de Harry a Privet Drive",
    "chapter_number": 1,
    "is_unlocked_by_default": true,
    "unlock_requirements": {}
  }'
```

### Paso 4: Crear Story Stages

```bash
curl -X POST http://localhost:3000/story-stage \
  -H "Content-Type: application/json" \
  -d '{
    "chapter_id": "hp1_ch1",
    "name": "Escena 1",
    "scene": "privet_drive_arrival",
    "title": "Una Noche Tormentosa",
    "sub_title": "Privet Drive, 1981",
    "image": "https://example.com/scene1.jpg",
    "text": "Era una noche oscura y tormentosa cuando apareció el profesor Dumbledore...",
    "question": "¿Qué debería hacer Dumbledore?",
    "stage_order": 1,
    "is_canonical_progress": true,
    "canonical_event": "harry_arrival"
  }'
```

## 🔍 Consultar Contenido

### Ver todas las franquicias
```bash
curl http://localhost:3000/franchise
```

### Ver una franquicia con todo su contenido
```bash
curl http://localhost:3000/franchise/harry_potter/content
```

Esto devuelve:
```json
{
  "franchise": {...},
  "books": [
    {
      "book": {...},
      "chapters": [
        {...}
      ]
    }
  ]
}
```

### Ver libros de una franquicia
```bash
curl http://localhost:3000/book/franchise/harry_potter
```

### Ver capítulos de un libro
```bash
curl http://localhost:3000/chapter/book/hp_philosophers_stone
```

### Ver story stages de un capítulo (ordenadas)
```bash
curl http://localhost:3000/story-stage/chapter-id/hp1_ch1
```

## 📋 Endpoints Disponibles

### Franchises
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/franchise` | Crear franquicia |
| GET | `/franchise` | Listar todas |
| GET | `/franchise/:id` | Obtener por ID |
| GET | `/franchise/:id/content` | Obtener con toda la jerarquía |

### Books
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/book` | Crear libro |
| GET | `/book/franchise/:franchiseId` | Libros de una franquicia |

### Chapters
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/chapter` | Crear capítulo |
| GET | `/chapter/book/:bookId` | Capítulos de un libro |

### Story Stages
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/story-stage` | Crear etapa |
| GET | `/story-stage/:id` | Obtener por ID |
| PUT | `/story-stage/:id` | Actualizar etapa |
| GET | `/story-stage/chapter-id/:chapterId` | Etapas de un capítulo (ordenadas) |

## 🎯 Ejemplo Completo: Harry Potter

```bash
# 1. Crear la franquicia
curl -X POST http://localhost:3000/franchise \
  -H "Content-Type: application/json" \
  -d '{"franchise_id":"harry_potter","name":"Harry Potter","description":"Saga mágica","author":"J.K. Rowling","genre":["Fantasy"],"is_active":true}'

# 2. Crear el primer libro
curl -X POST http://localhost:3000/book \
  -H "Content-Type: application/json" \
  -d '{"book_id":"hp1","franchise_id":"harry_potter","title":"La Piedra Filosofal","volume_number":1,"is_published":true}'

# 3. Crear capítulo 1
curl -X POST http://localhost:3000/chapter \
  -H "Content-Type: application/json" \
  -d '{"chapter_id":"hp1_ch1","book_id":"hp1","title":"El Niño que Sobrevivió","chapter_number":1,"is_unlocked_by_default":true}'

# 4. Crear primera escena
curl -X POST http://localhost:3000/story-stage \
  -H "Content-Type: application/json" \
  -d '{"chapter_id":"hp1_ch1","name":"Scene1","scene":"privet_drive","title":"Llegada a Privet Drive","sub_title":"Noche del 1 de Noviembre","image":"img1.jpg","text":"Dumbledore llegó a Privet Drive...","question":"¿Qué hacer?","stage_order":1,"is_canonical_progress":false}'

# 5. Ver todo el contenido
curl http://localhost:3000/franchise/harry_potter/content | jq
```

## 📦 Importar Colección de Postman

1. Abre Postman
2. Click en "Import"
3. Selecciona: `extra/AI_Game_API.postman_collection.json`
4. ¡Listo! Tienes todos los endpoints organizados

## 🔐 Sistema de Desbloqueo de Capítulos

Los capítulos pueden tener requisitos de desbloqueo:

```json
{
  "unlock_requirements": {
    "previous_chapter_id": "hp1_ch1",
    "required_canonical_events": ["event_boss_defeated"],
    "required_attributes": {
      "courage": 50,
      "intelligence": 30
    }
  }
}
```

## 📊 Estructura de Datos

### Franchise
```typescript
{
  franchise_id: string;      // ID único
  name: string;              // Nombre
  description: string;       // Descripción
  author?: string;           // Autor
  genre?: string[];          // Géneros
  cover_image?: string;      // URL imagen
  is_active: boolean;        // Activo/Inactivo
}
```

### Book
```typescript
{
  book_id: string;           // ID único
  franchise_id: string;      // Franquicia padre
  title: string;             // Título
  description: string;       // Descripción
  volume_number: number;     // Número de volumen
  cover_image?: string;      // URL imagen
  is_published: boolean;     // Publicado
  estimated_duration?: number; // Duración en minutos
}
```

### Chapter
```typescript
{
  chapter_id: string;                  // ID único
  book_id: string;                     // Libro padre
  title: string;                       // Título
  description: string;                 // Descripción
  chapter_number: number;              // Número de capítulo
  is_unlocked_by_default: boolean;    // Desbloqueado por defecto
  unlock_requirements?: {              // Requisitos
    previous_chapter_id?: string;
    required_canonical_events?: string[];
    required_attributes?: Record<string, number>;
  };
}
```

### StoryStage
```typescript
{
  chapter_id: string;            // Capítulo padre
  name: string;                  // Nombre interno
  scene: string;                 // ID de escena
  title: string;                 // Título
  sub_title: string;             // Subtítulo
  image: string;                 // URL imagen
  text: string;                  // Texto narrativo
  question: string;              // Pregunta/decisión
  stage_order: number;           // Orden en capítulo
  is_canonical_progress: boolean; // Marca progreso
  canonical_event?: string;      // Evento asociado
}
```

## 🐛 Troubleshooting

### MongoDB no conecta
```bash
# Verificar que Docker está corriendo
docker ps

# Reiniciar MongoDB
docker compose restart
```

### Puerto 3000 ocupado
```bash
# Cambiar puerto en .env
PORT=3001
```

### Errores de compilación
```bash
# Limpiar y recompilar
rm -rf dist node_modules
npm install
npm run build
```

## 📚 Documentación Adicional

- **Jerarquía de Contenido**: Ver `CONTENT_HIERARCHY.md`
- **Resumen de Implementación**: Ver `IMPLEMENTATION_SUMMARY.md`
- **Configuración IA**: Ver `.clinerules`
- **API Completa**: Importar `extra/AI_Game_API.postman_collection.json`

## ✨ Características Destacadas

- ✅ Arquitectura Hexagonal completa
- ✅ TypeScript strict mode
- ✅ MongoDB con Mongoose
- ✅ Sistema de desbloqueo configurable
- ✅ Ordenamiento automático
- ✅ Índices optimizados
- ✅ Documentación completa

---

**¿Necesitas ayuda?** Revisa la documentación en la carpeta del proyecto.
