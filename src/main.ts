import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './interceptors/global-exception.filter';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/',
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (configService.get<string>('APP_ENV') === 'local') {
    console.log('Generating swagger.yaml file');
    const yamlString = yaml.stringify(document);
    const filePath = path.resolve(process.cwd(), 'swagger.yaml');
    fs.writeFileSync(filePath, yamlString, 'utf8');
  }

  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
