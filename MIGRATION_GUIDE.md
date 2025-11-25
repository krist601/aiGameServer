# 🔄 Script de Migración - StoryStage a Nueva Jerarquía

## Objetivo

Este script te ayudará a migrar tus `StoryStage` existentes al nuevo formato con la jerarquía completa de Franchise → Book → Chapter.

## 📋 Prerrequisitos

1. Tener MongoDB corriendo
2. Tener una copia de seguridad de tu base de datos
3. Node.js instalado

## 🛠️ Script de Migración

Crea un archivo `migration/migrate-to-hierarchy.ts`:

```typescript
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017/ai-game?authSource=admin';

interface OldStoryStage {
  _id: any;
  chapter?: string; // Campo antiguo (número)
  // ... otros campos
}

async function migrate() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');
    
    const db = client.db();
    
    // 1. Crear franquicia por defecto
    console.log('📚 Creando franquicia por defecto...');
    await db.collection('franchisedocuments').insertOne({
      franchise_id: 'default_franchise',
      name: 'Mi Historia',
      description: 'Contenido migrado automáticamente',
      author: 'Sistema',
      genre: ['Adventure'],
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });
    
    // 2. Crear libro por defecto
    console.log('📖 Creando libro por defecto...');
    await db.collection('bookdocuments').insertOne({
      book_id: 'default_book',
      franchise_id: 'default_franchise',
      title: 'Volumen 1',
      description: 'Contenido migrado',
      volume_number: 1,
      is_published: true,
      estimated_duration: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
    
    // 3. Obtener todos los capítulos únicos de story_stages
    console.log('🔍 Analizando capítulos existentes...');
    const stages = await db.collection('story_stages').find({}).toArray();
    const chapters = new Set<string>();
    
    stages.forEach((stage: any) => {
      if (stage.chapter) {
        chapters.add(stage.chapter);
      }
    });
    
    console.log(`   Encontrados ${chapters.size} capítulos únicos`);
    
    // 4. Crear documentos de Chapter para cada capítulo
    console.log('📝 Creando documentos de capítulos...');
    let chapterNumber = 1;
    const chapterMapping: Record<string, string> = {};
    
    for (const oldChapter of Array.from(chapters).sort()) {
      const chapterId = `chapter_${oldChapter}`;
      chapterMapping[oldChapter] = chapterId;
      
      await db.collection('chapterdocuments').insertOne({
        chapter_id: chapterId,
        book_id: 'default_book',
        title: `Capítulo ${oldChapter}`,
        description: `Capítulo ${oldChapter} migrado automáticamente`,
        chapter_number: chapterNumber++,
        is_unlocked_by_default: true,
        unlock_requirements: {},
        created_at: new Date(),
        updated_at: new Date(),
      });
      
      console.log(`   ✓ Capítulo ${oldChapter} → ${chapterId}`);
    }
    
    // 5. Actualizar StoryStages con chapter_id y stage_order
    console.log('🔄 Actualizando story stages...');
    let updatedCount = 0;
    
    // Agrupar stages por capítulo para asignar stage_order
    const stagesByChapter: Record<string, any[]> = {};
    stages.forEach((stage: any) => {
      const chapter = stage.chapter || 'unknown';
      if (!stagesByChapter[chapter]) {
        stagesByChapter[chapter] = [];
      }
      stagesByChapter[chapter].push(stage);
    });
    
    // Actualizar cada stage
    for (const [oldChapter, chapterStages] of Object.entries(stagesByChapter)) {
      const chapterId = chapterMapping[oldChapter] || 'chapter_unknown';
      
      // Ordenar por _id o fecha de creación para mantener orden
      chapterStages.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        return a._id.toString().localeCompare(b._id.toString());
      });
      
      // Asignar stage_order
      for (let i = 0; i < chapterStages.length; i++) {
        const stage = chapterStages[i];
        await db.collection('story_stages').updateOne(
          { _id: stage._id },
          {
            $set: {
              chapter_id: chapterId,
              stage_order: i + 1,
            }
          }
        );
        updatedCount++;
      }
      
      console.log(`   ✓ Actualizados ${chapterStages.length} stages del capítulo ${oldChapter}`);
    }
    
    console.log(`\n✅ Migración completada exitosamente!`);
    console.log(`   - Franquicia creada: default_franchise`);
    console.log(`   - Libro creado: default_book`);
    console.log(`   - Capítulos creados: ${chapters.size}`);
    console.log(`   - Story stages actualizados: ${updatedCount}`);
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Ejecutar migración
migrate()
  .then(() => {
    console.log('\n🎉 Proceso completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migración fallida:', error);
    process.exit(1);
  });
```

## 🚀 Cómo Usar

### 1. Hacer backup de la base de datos
```bash
# Exportar la base de datos actual
docker exec -it ai-game-mongodb-1 mongodump --uri="mongodb://admin:password@localhost:27017/ai-game?authSource=admin" --out=/backup

# Copiar backup a tu máquina
docker cp ai-game-mongodb-1:/backup ./backup-$(date +%Y%m%d)
```

### 2. Instalar dependencias adicionales
```bash
npm install --save-dev mongodb @types/mongodb
```

### 3. Crear el archivo de migración
```bash
mkdir -p migration
# Copiar el script de arriba a migration/migrate-to-hierarchy.ts
```

### 4. Compilar y ejecutar
```bash
# Compilar TypeScript
npx tsc migration/migrate-to-hierarchy.ts --esModuleInterop --resolveJsonModule

# Ejecutar migración
node migration/migrate-to-hierarchy.js
```

## 📊 Qué hace el script

1. **Crea Franquicia por defecto**: `default_franchise`
2. **Crea Libro por defecto**: `default_book`
3. **Analiza capítulos existentes**: Lee el campo `chapter` de todos los story_stages
4. **Crea documentos Chapter**: Por cada capítulo único encontrado
5. **Actualiza StoryStages**: Añade `chapter_id` y `stage_order` a cada stage

## 🎯 Después de la Migración

### Verificar que todo funcionó
```bash
# Ver franquicia creada
curl http://localhost:3000/franchise/default_franchise

# Ver con toda la jerarquía
curl http://localhost:3000/franchise/default_franchise/content | jq

# Ver stages de un capítulo
curl http://localhost:3000/story-stage/chapter-id/chapter_1
```

### Reorganizar el contenido
Ahora puedes:

1. **Crear franquicias reales**:
```bash
curl -X POST http://localhost:3000/franchise \
  -H "Content-Type: application/json" \
  -d '{
    "franchise_id": "mi_historia",
    "name": "Mi Historia Real",
    "description": "Descripción apropiada",
    "is_active": true
  }'
```

2. **Mover capítulos a libros apropiados**:
```bash
# Actualizar el book_id de los capítulos
# Puedes hacer esto manualmente o con otro script
```

3. **Actualizar el chapter_id de los stages**:
```bash
# Si reorganizas capítulos, actualiza las referencias
```

## 🔄 Script de Rollback

Si algo sale mal, puedes revertir:

```typescript
// migration/rollback.ts
import { MongoClient } from 'mongodb';

async function rollback() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db();
    
    // Eliminar campos nuevos de story_stages
    await db.collection('story_stages').updateMany(
      {},
      {
        $unset: {
          chapter_id: "",
          stage_order: ""
        }
      }
    );
    
    // Eliminar colecciones nuevas
    await db.collection('franchisedocuments').drop();
    await db.collection('bookdocuments').drop();
    await db.collection('chapterdocuments').drop();
    
    console.log('✅ Rollback completado');
  } finally {
    await client.close();
  }
}

rollback();
```

## ⚠️ Consideraciones Importantes

1. **Backup siempre**: Antes de cualquier migración, haz backup
2. **Ambiente de prueba**: Prueba primero en desarrollo
3. **Datos existentes**: El campo `chapter` original se mantiene por compatibilidad
4. **Stage order**: El orden se determina por fecha de creación o _id
5. **Nombres genéricos**: Los nombres iniciales son genéricos, personalízalos después

## 📝 Personalización del Script

### Crear múltiples franquicias
Si quieres crear franquicias específicas basadas en algún criterio:

```typescript
// Ejemplo: Detectar franquicia por nombre de escena
function detectFranchise(stage: any): string {
  if (stage.scene?.includes('harry_potter')) {
    return 'harry_potter';
  }
  if (stage.scene?.includes('star_wars')) {
    return 'star_wars';
  }
  return 'default_franchise';
}
```

### Mantener orden específico
Si tienes un campo que indica el orden:

```typescript
// Ordenar por un campo específico
chapterStages.sort((a, b) => {
  if (a.order_field && b.order_field) {
    return a.order_field - b.order_field;
  }
  return 0;
});
```

## 🎉 Resultado Final

Después de la migración tendrás:

```
Franchise: default_franchise
  └── Book: default_book
      ├── Chapter: chapter_1
      │   ├── StoryStage (order: 1)
      │   ├── StoryStage (order: 2)
      │   └── ...
      ├── Chapter: chapter_2
      │   └── ...
      └── ...
```

---

**¿Necesitas ayuda con la migración?** Revisa los logs del script y el estado de MongoDB.
