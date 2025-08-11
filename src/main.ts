import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log('Database Connection Sucessfull...!!!');
  } catch (error) {
    console.log('Database Connection Failed...', error);
  }
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
