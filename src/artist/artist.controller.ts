import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';
import { validate as isUuid } from 'uuid';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = await this.artistService.updateArtist(
      id,
      updateArtistDto,
    );
    if (!updatedArtist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return updatedArtist;
  }

  @DeleteWithNoContent(':id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const isArtistDeleted = await this.artistService.deleteArtist(id);
    if (!isArtistDeleted) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return;
  }
}
