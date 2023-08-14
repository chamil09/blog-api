import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should create a new post', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: "This is our post 8 to swag to the Database",
        content: "We are going to add lot of content to this website in coming weeks"
      })
      .expect(201)
  })
  it('should fetch a post', () => {
    return request(app.getHttpServer())
      .get('/posts/6')
      .expect(200)
  })
  
  });

  