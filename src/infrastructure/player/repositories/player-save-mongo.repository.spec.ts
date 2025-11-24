import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../../../../test/helpers/mongodb-test.helper';
import { PlayerSaveMongoRepository } from './player-save-mongo.repository';
import {
  PlayerSaveDocument,
  PlayerSaveSchema,
} from '../schemas/player-save.schema';
import type { PlayerSave } from '../../../../domain/player/player-save.entity';

describe('PlayerSaveMongoRepository (Integration)', () => {
  let repository: PlayerSaveMongoRepository;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: PlayerSaveDocument.name, schema: PlayerSaveSchema },
        ]),
      ],
      providers: [PlayerSaveMongoRepository],
    }).compile();

    repository = module.get<PlayerSaveMongoRepository>(
      PlayerSaveMongoRepository,
    );
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await module.close();
  });

  it('should create a player save', async () => {
    const save: PlayerSave = {
      player_id: 'player1',
      attributes_state: { energy: 100, health: 50 },
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    const created = await repository.create(save);

    expect(created).toMatchObject(save);
    expect(created.id).toBeDefined();
  });

  it('should find player save by player id', async () => {
    const save: PlayerSave = {
      player_id: 'player2',
      attributes_state: { energy: 100 },
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    await repository.create(save);
    const found = await repository.findByPlayerId('player2');

    expect(found).toBeDefined();
    expect(found?.player_id).toBe('player2');
  });

  it('should update player save', async () => {
    const save: PlayerSave = {
      player_id: 'player3',
      attributes_state: { energy: 100 },
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    const created = await repository.create(save);
    const updated = await repository.update(created.id!, {
      attributes_state: { energy: 150, health: 75 },
      current_stage_id: 'stage1',
    });

    expect(updated.attributes_state.energy).toBe(150);
    expect(updated.attributes_state.health).toBe(75);
    expect(updated.current_stage_id).toBe('stage1');
  });

  it('should delete player save', async () => {
    const save: PlayerSave = {
      player_id: 'player4',
      attributes_state: {},
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    const created = await repository.create(save);
    await repository.delete(created.id!);

    const found = await repository.findByPlayerId('player4');
    expect(found).toBeNull();
  });
});

