import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const options = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('blog')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
