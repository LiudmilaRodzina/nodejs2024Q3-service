import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private albums = [];

  getAllAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = { id: uuidv4(), ...createAlbumDto };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return null;

    const updatedAlbum = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };
    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  deleteAlbum(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return null;

    this.albums.splice(albumIndex, 1);
    return true;
  }

  async nullifyArtistId(artistId: string): Promise<void> {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
