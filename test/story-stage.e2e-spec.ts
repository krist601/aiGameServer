import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from './helpers/mongodb-test.helper';

describe('StoryStageController (e2e)', () => {
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

  it('/story-stage (POST)', () => {
    const stage = {
      name: 'Test Stage',
      scene: 'scene1',
      title: 'Test Title',
      sub_title: 'Test Subtitle',
      image: 'test.jpg',
      text: 'Test text',
      question: 'Test question?',
      is_canonical_progress: false,
    };

    return request(app.getHttpServer())
      .post('/story-stage')
      .send(stage)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(stage);
        expect(res.body.id).toBeDefined();
      });
  });

  it('/story-stage/:id (GET)', async () => {
    const stage = {
      name: 'Get Stage',
      scene: 'scene2',
      title: 'Get Title',
      sub_title: 'Get Subtitle',
      image: 'get.jpg',
      text: 'Get text',
      question: 'Get question?',
      is_canonical_progress: true,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/story-stage')
      .send(stage)
      .expect(201);

    return request(app.getHttpServer())
      .get(`/story-stage/${createResponse.body.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(stage.name);
        expect(res.body.id).toBe(createResponse.body.id);
      });
  });

  it('/story-stage/:id (PUT)', async () => {
    const stage = {
      name: 'Update Stage',
      scene: 'scene3',
      title: 'Update Title',
      sub_title: 'Update Subtitle',
      image: 'update.jpg',
      text: 'Update text',
      question: 'Update question?',
      is_canonical_progress: false,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/story-stage')
      .send(stage)
      .expect(201);

    return request(app.getHttpServer())
      .put(`/story-stage/${createResponse.body.id}`)
      .send({ title: 'Updated Title' })
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe('Updated Title');
        expect(res.body.name).toBe(stage.name);
      });
  });

  it('/story-stage/chapter/:chapter (GET)', async () => {
    const stage1 = {
      name: 'Chapter Stage 1',
      scene: 'scene1',
      title: 'Chapter 1',
      sub_title: 'Subtitle',
      image: 'img.jpg',
      text: 'Text',
      question: 'Question?',
      is_canonical_progress: false,
      chapter: 'chapter1',
    };

    const stage2 = {
      name: 'Chapter Stage 2',
      scene: 'scene2',
      title: 'Chapter 1 Part 2',
      sub_title: 'Subtitle',
      image: 'img.jpg',
      text: 'Text',
      question: 'Question?',
      is_canonical_progress: false,
      chapter: 'chapter1',
    };

    await request(app.getHttpServer())
      .post('/story-stage')
      .send(stage1)
      .expect(201);

    await request(app.getHttpServer())
      .post('/story-stage')
      .send(stage2)
      .expect(201);

    return request(app.getHttpServer())
      .get('/story-stage/chapter/chapter1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
        expect(res.body.every((s: any) => s.chapter === 'chapter1')).toBe(true);
      });
  });
});

