import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @DeleteWithNoContent(':id')
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumService.deleteAlbum(id);
  }
}
