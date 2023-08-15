import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CommentController (e2e)', () => {
  let app: INestApplication;
  let commentId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
     app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should create a new comment', async() => {
    const response = await request(app.getHttpServer())
      .post('/comments')
      .send({
        "postId": 10,
        "text": "testing comment"
      })
      .expect(201)
      .expect('Content-Type', /json/)
      commentId = response.body.data.id;  
  })
  it('should fetch the comment', async() => {
    const getRoute = `/comments/` + commentId;
    await request(app.getHttpServer())
      .get(getRoute)
      .expect(200)
  })
  it('should delete the post', async() => {
    const deleteRoute = `/comments/` + commentId;
    await request(app.getHttpServer())
      .delete(deleteRoute)
      .expect(200)
  })

  });

  