import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Agregar la configuración de autenticación JWT
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()  // Agregar esta línea para configurar la autenticación con JWT
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Usar un Validador de tuberías global para validar automáticamente las solicitudes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
