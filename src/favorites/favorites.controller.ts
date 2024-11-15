import {
  Controller,
  Get,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.addTrackToFavorites(trackId);
  }

  @DeleteWithNoContent('track/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async removeTrackFromFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.deleteTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.addAlbumToFavorites(albumId);
  }

  @DeleteWithNoContent('album/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.deleteAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.addArtistToFavorites(artistId);
  }

  @DeleteWithNoContent('artist/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async removeArtistFromFavorites(
    @Param('id', ParseUUIDPipe) artistId: string,
  ) {
    return this.favoritesService.deleteArtistFromFavorites(artistId);
  }
}
