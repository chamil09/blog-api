import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/posts (POST)', () => {
    it('should create a new post', () => {
      const createPostDto = { title: 'New Post', content: 'Post content' };
  
      return request(app.getHttpServer())
        .post('/posts')
        .send(createPostDto)
        .expect(201)
        .then(response => {
          const createdPost = response.body.data;
          expect(createdPost.title).toEqual(createPostDto.title);
          expect(createdPost.content).toEqual(createPostDto.content);
        });
    });
  
  });

  describe('/posts (GET)', () => {
    it('should get all posts', () => {
      return request(app.getHttpServer())
        .get('/posts')
        .expect(200)
        .then(response => {
          const posts = response.body.data.posts;
          expect(posts).toBeDefined();
          // Add more assertions
        });
    });
  
    // Add more test cases for pagination, etc.
  });
});




