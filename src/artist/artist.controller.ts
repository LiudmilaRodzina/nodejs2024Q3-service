import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';
import { AuthGuard } from '../auth/jwt-auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllArtists() {
    return await this.artistService.getAllArtists();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  @UseGuards(AuthGuard)
  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.updateArtist(id, updateArtistDto);
  }

  @UseGuards(AuthGuard)
  @DeleteWithNoContent(':id')
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.artistService.deleteArtist(id);
  }
}
