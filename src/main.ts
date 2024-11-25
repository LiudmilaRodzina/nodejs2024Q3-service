import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LoggingService } from './logging/logging.service';
import { CustomExceptionFilter } from './logging/exception.filter';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (error) => {
    loggingService.error('Uncaught Exception', error.stack);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', JSON.stringify(reason));
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(new JwtService()));

  app.useGlobalFilters(new CustomExceptionFilter(loggingService));

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
