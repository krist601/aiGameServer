import { Body, Controller, Post } from '@nestjs/common';
import type { Attribute } from '../../../domain/attribute/attribute.entity';
import { CreateAttributeUseCase } from '../../../application/attribute/use-cases/create-attribute.use-case';

@Controller('attribute')
export class AttributeController {
  constructor(
    private readonly createAttributeUseCase: CreateAttributeUseCase,
  ) {}

  @Post()
  async create(@Body() attribute: Attribute): Promise<Attribute> {
    return this.createAttributeUseCase.execute(attribute);
  }
}

