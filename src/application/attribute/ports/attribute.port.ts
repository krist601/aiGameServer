import type { Attribute } from '../../../domain/attribute/attribute.entity';

export interface AttributePort {
  create(attribute: Attribute): Promise<Attribute>;
  findById(id: string): Promise<Attribute | null>;
  findByName(name: string): Promise<Attribute | null>;
  findAll(): Promise<Attribute[]>;
}

export const ATTRIBUTE_PORT = Symbol('ATTRIBUTE_PORT');

