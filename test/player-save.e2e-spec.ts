import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from './helpers/mongodb-test.helper';

describe('PlayerSaveController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  it('/player-save/:id (GET) - should return null for non-existent player', () => {
    return request(app.getHttpServer())
      .get('/player-save/nonexistent')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeNull();
      });
  });

  it('/player-save/:id (PUT) - should create or update player save', () => {
    const playerId = 'test-player-1';
    const save = {
      player_id: playerId,
      attributes_state: { energy: 100, health: 50 },
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    return request(app.getHttpServer())
      .put(`/player-save/${playerId}`)
      .send(save)
      .expect(200)
      .expect((res) => {
        expect(res.body.player_id).toBe(playerId);
        expect(res.body.attributes_state.energy).toBe(100);
        expect(res.body.id).toBeDefined();
      });
  });

  it('/player-save/:id (GET) - should return existing player save', async () => {
    const playerId = 'test-player-2';
    const save = {
      player_id: playerId,
      attributes_state: { energy: 100 },
      unlocked_canonical_events: [],
      active_power_ups: [],
      completed_achievements: [],
    };

    await request(app.getHttpServer())
      .put(`/player-save/${playerId}`)
      .send(save)
      .expect(200);

    return request(app.getHttpServer())
      .get(`/player-save/${playerId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.player_id).toBe(playerId);
        expect(res.body.attributes_state.energy).toBe(100);
      });
  });

  it('/player-save/:id/reset (POST) - should reset player save', async () => {
    const playerId = 'test-player-3';
    const save = {
      player_id: playerId,
      attributes_state: { energy: 100, health: 50 },
      unlocked_canonical_events: ['event1'],
      active_power_ups: [],
      completed_achievements: ['ach1'],
    };

    await request(app.getHttpServer())
      .put(`/player-save/${playerId}`)
      .send(save)
      .expect(200);

    return request(app.getHttpServer())
      .post(`/player-save/${playerId}/reset`)
      .expect(201)
      .expect((res) => {
        expect(res.body.player_id).toBe(playerId);
        expect(res.body.unlocked_canonical_events).toHaveLength(0);
        expect(res.body.completed_achievements).toHaveLength(0);
        expect(res.body.attributes_state).toEqual({});
      });
  });
});

