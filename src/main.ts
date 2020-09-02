import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Lemon 社区交友平台')
  .setDescription('努力，努力，再努力')
  .setVersion('1.0')
  .addTag('Ricardom')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
