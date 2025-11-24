import { Body, Controller, Post } from '@nestjs/common';
import type { OptionAttributeEffect } from '../../../domain/attribute/option-attribute-effect.entity';
import { LinkAttributeEffectToOptionUseCase } from '../../../application/attribute/use-cases/link-attribute-effect-to-option.use-case';

@Controller('attribute-effect')
export class AttributeEffectController {
  constructor(
    private readonly linkAttributeEffectToOptionUseCase: LinkAttributeEffectToOptionUseCase,
  ) {}

  @Post()
  async create(
    @Body() effect: OptionAttributeEffect,
  ): Promise<OptionAttributeEffect> {
    return this.linkAttributeEffectToOptionUseCase.execute(effect);
  }
}

