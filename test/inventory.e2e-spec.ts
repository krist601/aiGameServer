import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from './helpers/mongodb-test.helper';

describe('InventoryController (e2e)', () => {
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

  it('/player/:id/inventory/add (POST)', () => {
    const playerId = 'test-player-inv';
    return request(app.getHttpServer())
      .post(`/player/${playerId}/inventory/add`)
      .send({ item_id: 'item1', quantity: 5 })
      .expect(201)
      .expect((res) => {
        expect(res.body.player_id).toBe(playerId);
        expect(res.body.items).toBeInstanceOf(Array);
        expect(res.body.items.length).toBeGreaterThan(0);
      });
  });

  it('/player/:id/inventory/remove (POST)', async () => {
    const playerId = 'test-player-remove';
    
    // First add an item
    await request(app.getHttpServer())
      .post(`/player/${playerId}/inventory/add`)
      .send({ item_id: 'item1', quantity: 10 })
      .expect(201);

    // Then remove some
    return request(app.getHttpServer())
      .post(`/player/${playerId}/inventory/remove`)
      .send({ item_id: 'item1', quantity: 3 })
      .expect(201)
      .expect((res) => {
        const item = res.body.items.find((i: any) => i.item_id === 'item1');
        expect(item.quantity).toBe(7);
      });
  });

  it('/player/:id/inventory/use (POST)', async () => {
    const playerId = 'test-player-use';
    
    // First add an item
    await request(app.getHttpServer())
      .post(`/player/${playerId}/inventory/add`)
      .send({ item_id: 'item1', quantity: 5 })
      .expect(201);

    // Then use it
    return request(app.getHttpServer())
      .post(`/player/${playerId}/inventory/use`)
      .send({ item_id: 'item1' })
      .expect(201)
      .expect((res) => {
        expect(res.body.inventory).toBeDefined();
        expect(res.body.effectsApplied).toBe(true);
      });
  });
});

