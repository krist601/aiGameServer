import { TriggerCanonicalEventUseCase } from './trigger-canonical-event.use-case';
import type { CanonicalEvent } from '../../../domain/canonical-event/canonical-event.entity';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import type { CanonicalEventPort } from '../ports/canonical-event.port';
import type { PlayerSavePort } from '../../player/ports/player-save.port';

describe('TriggerCanonicalEventUseCase', () => {
  it('should trigger canonical event and update player save', async () => {
    const mockEvent: CanonicalEvent = {
      id: 'event1',
      name: 'Test Event',
      order: 1,
      is_unlocked: false,
      required_stages: [],
    };

    const unlockedEvent: CanonicalEvent = {
      ...mockEvent,
      is_unlocked: true,
      unlocked_at: new Date(),
    };

    const mockPlayerSave: PlayerSave = {
      id: 'save1',
      player_id: 'player1',
      attributes_state: {},
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    const updatedPlayerSave: PlayerSave = {
      ...mockPlayerSave,
      unlocked_canonical_events: ['event1'],
    };

    const mockEventPort: CanonicalEventPort = {
      findById: jest.fn().mockResolvedValue(mockEvent),
      create: jest.fn(),
      findAll: jest.fn(),
      findByTriggerStage: jest.fn(),
      update: jest.fn().mockResolvedValue(unlockedEvent),
    };

    const mockPlayerSavePort: PlayerSavePort = {
      findByPlayerId: jest.fn().mockResolvedValue(mockPlayerSave),
      create: jest.fn(),
      update: jest.fn().mockResolvedValue(updatedPlayerSave),
      delete: jest.fn(),
    };

    const useCase = new TriggerCanonicalEventUseCase(
      mockEventPort,
      mockPlayerSavePort,
    );

    const result = await useCase.execute('event1', 'player1');

    expect(result.event.is_unlocked).toBe(true);
    expect(result.playerSave.unlocked_canonical_events).toContain('event1');
    expect(mockEventPort.update).toHaveBeenCalled();
    expect(mockPlayerSavePort.update).toHaveBeenCalled();
  });

  it('should throw error if required stages not completed', async () => {
    const mockEvent: CanonicalEvent = {
      id: 'event1',
      name: 'Test Event',
      order: 1,
      is_unlocked: false,
      required_stages: ['stage1', 'stage2'],
    };

    const mockPlayerSave: PlayerSave = {
      id: 'save1',
      player_id: 'player1',
      attributes_state: {},
      unlocked_canonical_events: ['stage1'], // Missing stage2
      active_power_ups: [],
      completed_achievements: [],
    };

    const mockEventPort: CanonicalEventPort = {
      findById: jest.fn().mockResolvedValue(mockEvent),
      create: jest.fn(),
      findAll: jest.fn(),
      findByTriggerStage: jest.fn(),
      update: jest.fn(),
    };

    const mockPlayerSavePort: PlayerSavePort = {
      findByPlayerId: jest.fn().mockResolvedValue(mockPlayerSave),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const useCase = new TriggerCanonicalEventUseCase(
      mockEventPort,
      mockPlayerSavePort,
    );

    await expect(useCase.execute('event1', 'player1')).rejects.toThrow(
      'Required stages not completed',
    );
  });
});

