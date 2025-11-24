import { AddItemToInventoryUseCase } from './add-item-to-inventory.use-case';
import type { Inventory } from '../../../domain/inventory/inventory.entity';
import type { InventoryPort } from '../ports/inventory.port';

describe('AddItemToInventoryUseCase', () => {
  it('should add item to existing inventory', async () => {
    const existingInventory: Inventory = {
      id: 'inv1',
      player_id: 'player1',
      items: [
        { item_id: 'item1', quantity: 5, acquired_at: new Date() },
      ],
    };

    const updatedInventory: Inventory = {
      ...existingInventory,
      items: [
        { item_id: 'item1', quantity: 7, acquired_at: existingInventory.items[0].acquired_at },
      ],
    };

    const mockPort: InventoryPort = {
      findByPlayerId: jest.fn().mockResolvedValue(existingInventory),
      create: jest.fn(),
      update: jest.fn().mockResolvedValue(updatedInventory),
    };

    const useCase = new AddItemToInventoryUseCase(mockPort);
    const result = await useCase.execute('player1', 'item1', 2);

    expect(result.items[0].quantity).toBe(7);
    expect(mockPort.findByPlayerId).toHaveBeenCalledWith('player1');
    expect(mockPort.update).toHaveBeenCalled();
  });

  it('should create inventory if it does not exist', async () => {
    const newInventory: Inventory = {
      id: 'inv1',
      player_id: 'player1',
      items: [{ item_id: 'item1', quantity: 3, acquired_at: new Date() }],
    };

    const mockPort: InventoryPort = {
      findByPlayerId: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(newInventory),
      update: jest.fn().mockResolvedValue(newInventory),
    };

    const useCase = new AddItemToInventoryUseCase(mockPort);
    const result = await useCase.execute('player1', 'item1', 3);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].item_id).toBe('item1');
    expect(result.items[0].quantity).toBe(3);
    expect(mockPort.create).toHaveBeenCalled();
  });
});

