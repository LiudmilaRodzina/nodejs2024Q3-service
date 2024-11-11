import { applyDecorators, Delete, HttpCode, HttpStatus } from '@nestjs/common';

export const DeleteWithNoContent = (path?: string | string[]) =>
  applyDecorators(Delete(path), HttpCode(HttpStatus.NO_CONTENT));
