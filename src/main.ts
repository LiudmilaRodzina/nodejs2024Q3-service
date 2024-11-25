import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './logging/exception.filter';
import { LoggingService } from './logging/logging.service';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const loggingService = app.get(LoggingService);
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));

  process.on('uncaughtException', (err: Error) => {
    loggingService.error(`Uncaught Exception: ${err.message}`, err.stack);
  });

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    loggingService.error(`Unhandled Rejection: ${reason}`, '');
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, () =>
    console.log(`Application is listening on port: ${port}`),
  );
}

bootstrap();
