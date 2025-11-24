import { ResolveDecisionOptionUseCase } from './resolve-decision-option.use-case';
import type { DecisionOption } from '../../../domain/decision/decision-option.entity';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import type { DecisionOptionPort } from '../ports/decision-option.port';
import type { PlayerSavePort } from '../../player/ports/player-save.port';

describe('ResolveDecisionOptionUseCase', () => {
  it('should resolve decision option and update player save', async () => {
    const mockOption: DecisionOption = {
      id: 'option1',
      decision_id: 'decision1',
      type: 'action',
      text: 'Choose option',
      result_text: 'You chose this',
      next_stage_id: 'stage2',
      attribute_effects: [
        {
          id: 'effect1',
          decision_option_id: 'option1',
          attribute_name: 'energy',
          energy_effect: 10,
        },
      ],
    };

    const mockPlayerSave: PlayerSave = {
      id: 'save1',
      player_id: 'player1',
      attributes_state: { energy: 50 },
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    const updatedPlayerSave: PlayerSave = {
      ...mockPlayerSave,
      current_stage_id: 'stage2',
      attributes_state: { energy: 60 },
      last_played_at: new Date(),
    };

    const mockDecisionOptionPort: DecisionOptionPort = {
      findById: jest.fn().mockResolvedValue(mockOption),
      create: jest.fn(),
      findByDecisionId: jest.fn(),
      update: jest.fn(),
    };

    const mockPlayerSavePort: PlayerSavePort = {
      findByPlayerId: jest.fn().mockResolvedValue(mockPlayerSave),
      create: jest.fn(),
      update: jest.fn().mockResolvedValue(updatedPlayerSave),
      delete: jest.fn(),
    };

    const useCase = new ResolveDecisionOptionUseCase(
      mockDecisionOptionPort,
      mockPlayerSavePort,
    );

    const result = await useCase.execute('option1', 'player1');

    expect(result.option).toEqual(mockOption);
    expect(result.updatedSave.attributes_state.energy).toBe(60);
    expect(result.updatedSave.current_stage_id).toBe('stage2');
    expect(mockDecisionOptionPort.findById).toHaveBeenCalledWith('option1');
    expect(mockPlayerSavePort.findByPlayerId).toHaveBeenCalledWith('player1');
    expect(mockPlayerSavePort.update).toHaveBeenCalled();
  });

  it('should throw error if option not found', async () => {
    const mockDecisionOptionPort: DecisionOptionPort = {
      findById: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      findByDecisionId: jest.fn(),
      update: jest.fn(),
    };

    const mockPlayerSavePort: PlayerSavePort = {
      findByPlayerId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const useCase = new ResolveDecisionOptionUseCase(
      mockDecisionOptionPort,
      mockPlayerSavePort,
    );

    await expect(useCase.execute('option1', 'player1')).rejects.toThrow(
      'Decision option option1 not found',
    );
  });
});

