import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';
import { validate as isUuid } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const album = await this.albumService.updateAlbum(id, updateAlbumDto);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  @DeleteWithNoContent(':id')
  async deleteAlbum(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const isAlbumDeleted = await this.albumService.deleteAlbum(id);
    if (!isAlbumDeleted) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
  }
}
