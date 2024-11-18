import { Controller, Get, Post, Param } from '@nestjs/common';
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
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.addTrackToFavorites(trackId);
  }

  @DeleteWithNoContent('track/:id')
  async deleteTrackFromFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.deleteTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.addAlbumToFavorites(albumId);
  }

  @DeleteWithNoContent('album/:id')
  async deleteAlbumFromFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.deleteAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.addArtistToFavorites(artistId);
  }

  @DeleteWithNoContent('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', ParseUUIDPipe) artistId: string,
  ) {
    return this.favoritesService.deleteArtistFromFavorites(artistId);
  }
}
