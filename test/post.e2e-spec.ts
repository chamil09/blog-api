import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let postId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
     app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should create a new post', async() => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: "This is our e2e post to the Database",
        content: "We are going to add lot of content to this website in coming weeks"
      })
      .expect(201)
      .expect('Content-Type', /json/)
      postId = response.body.data.id;  
  })
  it('should fetch the post', async() => {
    const getRoute = `/posts/` + postId;
    await request(app.getHttpServer())
      .get(getRoute)
      .expect(200)
  })
  it('should update the post', async() => {
    const putRoute = `/posts/` + postId;
    await request(app.getHttpServer())
    .put(putRoute)
      .send({
        title: "This is our e2e updated post of Database",
        content: "Content updated here"
      })
      .expect(200)
      .expect('Content-Type', /json/)
  })
  it('should delete the post', async() => {
    const deleteRoute = `/posts/` + postId;
    await request(app.getHttpServer())
      .delete(deleteRoute)
      .expect(200)
  })
  });

  