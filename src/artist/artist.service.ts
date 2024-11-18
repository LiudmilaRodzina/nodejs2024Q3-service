import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumService } from 'src/album/album.service';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  constructor(private readonly albumService: AlbumService) {}

  getAllArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = { id: uuidv4(), ...createArtistDto };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    const updatedArtist = { ...this.artists[artistIndex], ...updateArtistDto };
    this.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<boolean> {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    await this.albumService.deleteArtistFromAlbums(id);
    this.artists.splice(artistIndex, 1);
    return true;
  }
}
