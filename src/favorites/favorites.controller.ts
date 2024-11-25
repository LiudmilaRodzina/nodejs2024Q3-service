import { Controller, Get, Post, Param, Body } from '@nestjs/common';
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
  async addTrackToFavorites(
    @Param('id', ParseUUIDPipe) trackId: string,
    @Body('userId') userId: string,
  ) {
    return await this.favoritesService.addTrackToFavorites(trackId, userId);
  }

  @DeleteWithNoContent('track/:id')
  async deleteTrackFromFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    await this.favoritesService.deleteTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', ParseUUIDPipe) albumId: string,
    @Body('userId') userId: string,
  ) {
    return await this.favoritesService.addAlbumToFavorites(albumId, userId);
  }

  @DeleteWithNoContent('album/:id')
  async deleteAlbumFromFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    await this.favoritesService.deleteAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', ParseUUIDPipe) artistId: string,
    @Body('userId') userId: string,
  ) {
    return await this.favoritesService.addArtistToFavorites(artistId, userId);
  }

  @DeleteWithNoContent('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', ParseUUIDPipe) artistId: string,
  ) {
    return this.favoritesService.deleteArtistFromFavorites(artistId);
  }
}
