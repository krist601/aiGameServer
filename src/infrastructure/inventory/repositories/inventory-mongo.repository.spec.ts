import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../../../../test/helpers/mongodb-test.helper';
import { InventoryMongoRepository } from './inventory-mongo.repository';
import {
  InventoryDocument,
  InventorySchema,
} from '../schemas/inventory.schema';
import type { Inventory } from '../../../../domain/inventory/inventory.entity';

describe('InventoryMongoRepository (Integration)', () => {
  let repository: InventoryMongoRepository;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: InventoryDocument.name, schema: InventorySchema },
        ]),
      ],
      providers: [InventoryMongoRepository],
    }).compile();

    repository = module.get<InventoryMongoRepository>(InventoryMongoRepository);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await module.close();
  });

  it('should create an inventory', async () => {
    const inventory: Inventory = {
      player_id: 'player1',
      items: [
        { item_id: 'item1', quantity: 5, acquired_at: new Date() },
        { item_id: 'item2', quantity: 10, acquired_at: new Date() },
      ],
    };

    const created = await repository.create(inventory);

    expect(created).toMatchObject(inventory);
    expect(created.id).toBeDefined();
    expect(created.items).toHaveLength(2);
  });

  it('should find inventory by player id', async () => {
    const inventory: Inventory = {
      player_id: 'player2',
      items: [{ item_id: 'item1', quantity: 3, acquired_at: new Date() }],
    };

    await repository.create(inventory);
    const found = await repository.findByPlayerId('player2');

    expect(found).toBeDefined();
    expect(found?.player_id).toBe('player2');
    expect(found?.items).toHaveLength(1);
  });

  it('should update inventory', async () => {
    const inventory: Inventory = {
      player_id: 'player3',
      items: [{ item_id: 'item1', quantity: 5, acquired_at: new Date() }],
    };

    const created = await repository.create(inventory);
    const updatedItems = [
      { item_id: 'item1', quantity: 7, acquired_at: new Date() },
      { item_id: 'item2', quantity: 2, acquired_at: new Date() },
    ];

    const updated = await repository.update(created.id!, {
      items: updatedItems,
    });

    expect(updated.items).toHaveLength(2);
    expect(updated.items[0].quantity).toBe(7);
  });
});

