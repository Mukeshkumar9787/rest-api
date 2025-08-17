import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';

let app: INestApplication;
let response: request.Response;

Given('I have a NestJS app', async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

When('I call GET {string}', async (path: string) => {
  response = await request(app.getHttpServer()).get(path);
});

Then('I should receive {int}', (expected: number) => {
  if (response.status !== expected) {
    throw new Error(`Expected "${expected}", got "${response.status}"`);
  }
});
