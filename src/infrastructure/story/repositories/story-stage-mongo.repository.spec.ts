import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../../../../test/helpers/mongodb-test.helper';
import { StoryStageMongoRepository } from './story-stage-mongo.repository';
import {
  StoryStageDocument,
  StoryStageSchema,
} from '../schemas/story-stage.schema';
import type { StoryStage } from '../../../../domain/story/story-stage.entity';

describe('StoryStageMongoRepository (Integration)', () => {
  let repository: StoryStageMongoRepository;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: StoryStageDocument.name, schema: StoryStageSchema },
        ]),
      ],
      providers: [StoryStageMongoRepository],
    }).compile();

    repository = module.get<StoryStageMongoRepository>(StoryStageMongoRepository);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await module.close();
  });

  it('should create a story stage', async () => {
    const stage: StoryStage = {
      name: 'Test Stage',
      scene: 'scene1',
      title: 'Test Title',
      sub_title: 'Test Subtitle',
      image: 'test.jpg',
      text: 'Test text',
      question: 'Test question?',
      is_canonical_progress: false,
    };

    const created = await repository.create(stage);

    expect(created).toMatchObject(stage);
    expect(created.id).toBeDefined();
  });

  it('should find story stage by id', async () => {
    const stage: StoryStage = {
      name: 'Find Stage',
      scene: 'scene2',
      title: 'Find Title',
      sub_title: 'Find Subtitle',
      image: 'find.jpg',
      text: 'Find text',
      question: 'Find question?',
      is_canonical_progress: true,
    };

    const created = await repository.create(stage);
    const found = await repository.findById(created.id!);

    expect(found).toBeDefined();
    expect(found?.name).toBe(stage.name);
  });

  it('should find story stages by chapter', async () => {
    const stage1: StoryStage = {
      name: 'Chapter 1 Stage',
      scene: 'scene1',
      title: 'Chapter 1',
      sub_title: 'Subtitle',
      image: 'img.jpg',
      text: 'Text',
      question: 'Question?',
      is_canonical_progress: false,
      chapter: 'chapter1',
    };

    const stage2: StoryStage = {
      name: 'Chapter 1 Stage 2',
      scene: 'scene2',
      title: 'Chapter 1 Part 2',
      sub_title: 'Subtitle',
      image: 'img.jpg',
      text: 'Text',
      question: 'Question?',
      is_canonical_progress: false,
      chapter: 'chapter1',
    };

    await repository.create(stage1);
    await repository.create(stage2);

    const found = await repository.findByChapter('chapter1');

    expect(found).toHaveLength(2);
    expect(found.every((s) => s.chapter === 'chapter1')).toBe(true);
  });

  it('should update story stage', async () => {
    const stage: StoryStage = {
      name: 'Update Stage',
      scene: 'scene1',
      title: 'Update Title',
      sub_title: 'Update Subtitle',
      image: 'update.jpg',
      text: 'Update text',
      question: 'Update question?',
      is_canonical_progress: false,
    };

    const created = await repository.create(stage);
    const updated = await repository.update(created.id!, {
      title: 'Updated Title',
    });

    expect(updated.title).toBe('Updated Title');
    expect(updated.name).toBe(stage.name);
  });
});

