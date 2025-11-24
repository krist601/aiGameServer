import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttributeController } from './controllers/attribute.controller';
import { AttributeEffectController } from './controllers/attribute-effect.controller';
import { CreateAttributeUseCase } from '../../application/attribute/use-cases/create-attribute.use-case';
import { LinkAttributeEffectToOptionUseCase } from '../../application/attribute/use-cases/link-attribute-effect-to-option.use-case';
import { ApplyAttributeEffectUseCase } from '../../application/attribute/use-cases/apply-attribute-effect.use-case';
import { ATTRIBUTE_PORT } from '../../application/attribute/ports/attribute.port';
import { OPTION_ATTRIBUTE_EFFECT_PORT } from '../../application/attribute/ports/option-attribute-effect.port';
import { AttributeMongoRepository } from './repositories/attribute-mongo.repository';
import { OptionAttributeEffectMongoRepository } from './repositories/option-attribute-effect-mongo.repository';
import { AttributeDocument, AttributeSchema } from './schemas/attribute.schema';
import {
  OptionAttributeEffectDocument,
  OptionAttributeEffectSchema,
} from './schemas/option-attribute-effect.schema';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttributeDocument.name, schema: AttributeSchema },
      {
        name: OptionAttributeEffectDocument.name,
        schema: OptionAttributeEffectSchema,
      },
    ]),
    PlayerModule,
  ],
  controllers: [AttributeController, AttributeEffectController],
  providers: [
    CreateAttributeUseCase,
    LinkAttributeEffectToOptionUseCase,
    ApplyAttributeEffectUseCase,
    AttributeMongoRepository,
    OptionAttributeEffectMongoRepository,
    {
      provide: ATTRIBUTE_PORT,
      useClass: AttributeMongoRepository,
    },
    {
      provide: OPTION_ATTRIBUTE_EFFECT_PORT,
      useClass: OptionAttributeEffectMongoRepository,
    },
  ],
  exports: [ATTRIBUTE_PORT, OPTION_ATTRIBUTE_EFFECT_PORT],
})
export class AttributeModule {}

