import {
  Injectable,
  forwardRef,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async getAllFavorites() {
    const favorites = await this.prisma.favorite.findMany({
      include: {
        artist: true,
        album: true,
        track: true,
      },
    });

    const artists = favorites
      .filter((fav) => fav.artist)
      .map((fav) => fav.artist);
    const albums = favorites.filter((fav) => fav.album).map((fav) => fav.album);
    const tracks = favorites.filter((fav) => fav.track).map((fav) => fav.track);

    return { artists, albums, tracks };
  }

  async addTrackToFavorites(trackId: string, userId: string) {
    const track = await this.trackService.getTrackById(trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.prisma.favorite.create({
      data: {
        track: { connect: { id: trackId } },
        user: { connect: { id: userId } },
      },
    });
    return track;
  }

  async deleteTrackFromFavorites(trackId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { trackId },
    });
    if (!favorite) {
      throw new UnprocessableEntityException('Track not found in favorites');
    }
    await this.prisma.favorite.delete({ where: { id: favorite.id } });
    return;
  }

  async addAlbumToFavorites(albumId: string, userId: string) {
    const album = await this.albumService.getAlbumById(albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    await this.prisma.favorite.create({
      data: {
        album: { connect: { id: albumId } },
        user: { connect: { id: userId } },
      },
    });
    return album;
  }

  async deleteAlbumFromFavorites(albumId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { albumId },
    });
    if (!favorite) {
      throw new UnprocessableEntityException('Album not found in favorites');
    }
    await this.prisma.favorite.delete({ where: { id: favorite.id } });
    return;
  }

  async addArtistToFavorites(artistId: string, userId: string) {
    const artist = await this.artistService.getArtistById(artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    await this.prisma.favorite.create({
      data: {
        artist: { connect: { id: artistId } },
        user: { connect: { id: userId } },
      },
    });
    return artist;
  }

  async deleteArtistFromFavorites(artistId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { artistId },
    });
    if (!favorite) {
      throw new UnprocessableEntityException('Artist not found in favorites');
    }
    await this.prisma.favorite.delete({ where: { id: favorite.id } });
    return;
  }
}
