import { Inject, Injectable } from '@nestjs/common';
import type { Attribute } from '../../../domain/attribute/attribute.entity';
import { ATTRIBUTE_PORT, type AttributePort } from '../ports/attribute.port';

@Injectable()
export class CreateAttributeUseCase {
  constructor(
    @Inject(ATTRIBUTE_PORT)
    private readonly attributePort: AttributePort,
  ) {}

  async execute(attribute: Attribute): Promise<Attribute> {
    return this.attributePort.create(attribute);
  }
}

