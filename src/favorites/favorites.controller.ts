import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllFavorites() {
    return await this.favoritesService.getAllFavorites();
  }

  @UseGuards(AuthGuard)
  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id', ParseUUIDPipe) trackId: string,
    @Body('userId') userId: string,
  ) {
    return await this.favoritesService.addTrackToFavorites(trackId, userId);
  }

  @UseGuards(AuthGuard)
  @DeleteWithNoContent('track/:id')
  async deleteTrackFromFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    await this.favoritesService.deleteTrackFromFavorites(trackId);
  }

  @UseGuards(AuthGuard)
  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', ParseUUIDPipe) albumId: string,
    @Body('userId') userId: string,
  ) {
    return await this.favoritesService.addAlbumToFavorites(albumId, userId);
  }

  @UseGuards(AuthGuard)
  @DeleteWithNoContent('album/:id')
  async deleteAlbumFromFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    await this.favoritesService.deleteAlbumFromFavorites(albumId);
  }

  @UseGuards(AuthGuard)
  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', ParseUUIDPipe) artistId: string,
    @Body('userId') userId: string,
  ) {
    return await this.favoritesService.addArtistToFavorites(artistId, userId);
  }

  @UseGuards(AuthGuard)
  @DeleteWithNoContent('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', ParseUUIDPipe) artistId: string,
  ) {
    return this.favoritesService.deleteArtistFromFavorites(artistId);
  }
}
