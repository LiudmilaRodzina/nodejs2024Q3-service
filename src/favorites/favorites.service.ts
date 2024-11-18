import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Favorites } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async getAllFavorites() {
    const artists = await Promise.all(
      this.favorites.artists.map(async (id) => {
        const artist = await this.artistService.getArtistById(id);
        return artist ? artist : null;
      }),
    );

    const albums = await Promise.all(
      this.favorites.albums.map(async (id) => {
        const album = await this.albumService.getAlbumById(id);
        return album ? album : null;
      }),
    );

    const tracks = await Promise.all(
      this.favorites.tracks.map(async (id) => {
        const track = await this.trackService.getTrackById(id);
        return track ? track : null;
      }),
    );

    return {
      artists: artists.filter((artist) => artist !== null),
      albums: albums.filter((album) => album !== null),
      tracks: tracks.filter((track) => track !== null),
    };
  }

  async addTrackToFavorites(trackId: string) {
    const track = await this.trackService.getTrackById(trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    if (this.favorites.tracks.includes(trackId)) {
      return;
    }
    this.favorites.tracks.push(trackId);
    return;
  }

  async deleteTrackFromFavorites(trackId: string) {
    const index = this.favorites.tracks.indexOf(trackId);
    this.favorites.tracks.splice(index, 1);
    return;
  }

  async addAlbumToFavorites(albumId: string) {
    const album = await this.albumService.getAlbumById(albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    if (this.favorites.albums.includes(albumId)) {
      return;
    }
    this.favorites.albums.push(albumId);
    return;
  }

  async deleteAlbumFromFavorites(albumId: string) {
    const index = this.favorites.albums.indexOf(albumId);
    this.favorites.albums.splice(index, 1);
    return;
  }

  async addArtistToFavorites(artistId: string) {
    const artist = await this.artistService.getArtistById(artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    if (this.favorites.artists.includes(artistId)) {
      return;
    }
    this.favorites.artists.push(artistId);
    return;
  }

  async deleteArtistFromFavorites(artistId: string) {
    const index = this.favorites.artists.indexOf(artistId);
    this.favorites.artists.splice(index, 1);
    return;
  }
}
